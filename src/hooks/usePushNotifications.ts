import { useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// ── Web Push helpers ──────────────────────────────────────────────────────────

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function fetchServerVapidKey(): Promise<string> {
  const { data, error } = await supabase.functions.invoke('get-vapid-key');
  if (error || !data?.publicKey) throw new Error('VAPID key konnte nicht geladen werden');
  return data.publicKey as string;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePushNotifications() {
  const { user } = useAuth();
  const isNative = Capacitor.isNativePlatform();

  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (isNative) {
      setSupported(true);
    } else {
      setSupported('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window);
    }
  }, [isNative]);

  // Check existing native subscription
  useEffect(() => {
    if (!isNative || !user) return;
    supabase
      .from('device_tokens')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .then(({ data }) => setIsSubscribed((data ?? []).length > 0));
  }, [isNative, user]);

  // Check existing web subscription
  useEffect(() => {
    if (isNative || !supported || !user) return;
    navigator.serviceWorker.ready
      .then(async (reg) => {
        const sub = await reg.pushManager.getSubscription();
        setIsSubscribed(!!sub);
      })
      .catch(() => {});
  }, [isNative, supported, user]);

  // ── Native subscribe ────────────────────────────────────────────────────────
  const subscribeNative = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let permResult = await PushNotifications.checkPermissions();
      console.log('[Push] permission state:', permResult.receive);
      if (permResult.receive === 'prompt') {
        permResult = await PushNotifications.requestPermissions();
        console.log('[Push] after request:', permResult.receive);
      }
      if (permResult.receive !== 'granted') {
        setPermission('denied');
        console.warn('[Push] permission denied');
        return;
      }
      setPermission('granted');

      // Remove stale listeners before re-registering
      await PushNotifications.removeAllListeners();

      // Listeners must be set up BEFORE register() is called
      const tokenValue = await new Promise<string>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('FCM registration timeout after 15s')), 15000);

        PushNotifications.addListener('registration', (token) => {
          clearTimeout(timeout);
          console.log('[Push] FCM token received:', token.value.substring(0, 20) + '...');
          resolve(token.value);
        });
        PushNotifications.addListener('registrationError', (err) => {
          clearTimeout(timeout);
          console.error('[Push] FCM registration error:', JSON.stringify(err));
          reject(new Error(JSON.stringify(err)));
        });

        console.log('[Push] calling PushNotifications.register()...');
        PushNotifications.register().catch(reject);
      });

      const platform = Capacitor.getPlatform() as 'ios' | 'android';
      console.log('[Push] upserting token for user', user.id, 'platform', platform);
      // Remove stale tokens for this user before saving the new one
      await supabase.from('device_tokens').delete().eq('user_id', user.id).neq('token', tokenValue);
      const { error: upsertError } = await supabase.from('device_tokens').upsert(
        { user_id: user.id, token: tokenValue, platform },
        { onConflict: 'user_id,token' }
      );
      if (upsertError) {
        console.error('[Push] upsert failed:', upsertError.message, upsertError.code, upsertError.details);
        throw upsertError;
      }
      console.log('[Push] token saved to DB successfully');
      setIsSubscribed(true);
    } catch (err) {
      console.error('[Push] Native subscribe failed:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ── Native unsubscribe ──────────────────────────────────────────────────────
  const unsubscribeNative = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      await supabase.from('device_tokens').delete().eq('user_id', user.id);
      await PushNotifications.removeAllListeners();
      setIsSubscribed(false);
    } catch (err) {
      console.error('Native unsubscribe failed:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ── Web subscribe ───────────────────────────────────────────────────────────
  const subscribeWeb = useCallback(async () => {
    if (!supported || !user) return;
    setLoading(true);
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') return;

      const vapidKey = await fetchServerVapidKey();
      const registration = await navigator.serviceWorker.ready;

      const existing = await registration.pushManager.getSubscription();
      if (existing) {
        await supabase.from('push_subscriptions').delete().eq('endpoint', existing.endpoint);
        await existing.unsubscribe();
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const rawP256 = subscription.getKey('p256dh');
      const rawAuth = subscription.getKey('auth');

      await supabase.from('push_subscriptions').upsert(
        {
          user_id: user.id,
          endpoint: subscription.endpoint,
          p256dh: rawP256 ? arrayBufferToBase64Url(rawP256) : '',
          auth_key: rawAuth ? arrayBufferToBase64Url(rawAuth) : '',
        },
        { onConflict: 'user_id,endpoint' }
      );

      setIsSubscribed(true);
    } catch (err) {
      console.error('Web push subscription failed:', err);
    } finally {
      setLoading(false);
    }
  }, [supported, user]);

  // ── Web unsubscribe ─────────────────────────────────────────────────────────
  const unsubscribeWeb = useCallback(async () => {
    if (!supported || !user) return;
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await supabase.from('push_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('endpoint', subscription.endpoint);
        await subscription.unsubscribe();
      }
      setIsSubscribed(false);
    } catch (err) {
      console.error('Web push unsubscribe failed:', err);
    } finally {
      setLoading(false);
    }
  }, [supported, user]);

  return {
    supported,
    permission,
    isSubscribed,
    loading,
    subscribe: isNative ? subscribeNative : subscribeWeb,
    unsubscribe: isNative ? unsubscribeNative : unsubscribeWeb,
  };
}
