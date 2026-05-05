import { useEffect, useState } from 'react';
import { Bell, BellOff, CheckCircle2, XCircle, Loader2, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Capacitor } from '@capacitor/core';

export function PushStatusCard() {
  const { supported, permission, isSubscribed, loading, subscribe, unsubscribe } = usePushNotifications();
  const { user } = useAuth();
  const [serverCount, setServerCount] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);
  const [sending, setSending] = useState(false);
  const isNative = Capacitor.isNativePlatform();

  const refreshServerStatus = async () => {
    if (!user) return;
    setChecking(true);
    if (isNative) {
      const { count } = await supabase
        .from('device_tokens')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setServerCount(count ?? 0);
    } else {
      const { count } = await supabase
        .from('push_subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setServerCount(count ?? 0);
    }
    setChecking(false);
  };

  useEffect(() => {
    refreshServerStatus();
  }, [user, isSubscribed]);

  const sendTest = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-test-push');
      if (error) throw error;
      const d = data?.debug ?? {};
      const fcmOk = d.fcm_access_token_ok;
      const fcmErr = d.fcm_access_token_error ?? d.fcm_send_error ?? null;
      const fcmTokens = d.device_token_count ?? 0;
      const webSubs = d.web_sub_count ?? 0;
      const description = [
        `Web: ${webSubs} Sub(s), FCM: ${fcmTokens} Token(s)`,
        fcmOk === false ? `FCM Auth: FEHLER – ${JSON.stringify(fcmErr)}` : null,
        fcmOk === true && fcmTokens > 0 && data?.sent <= webSubs ? `FCM Send: FEHLER – ${JSON.stringify(d.fcm_send_error)}` : null,
      ].filter(Boolean).join(' | ');
      toast({
        title: data?.sent > 0 ? '✅ Test-Push gesendet' : 'Kein Push gesendet',
        description,
        variant: data?.sent > 0 ? 'default' : 'destructive',
      });
      await refreshServerStatus();
    } catch (e: any) {
      toast({ title: 'Fehler', description: e.message ?? 'Unbekannter Fehler', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  if (!supported) {
    return (
      <Card className="p-4 border-dashed">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <AlertTriangle className="size-4" />
          Dieses Gerät/Browser unterstützt keine Push-Benachrichtigungen.
        </div>
      </Card>
    );
  }

  const StatusRow = ({ ok, label, value }: { ok: boolean; label: string; value: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium">
        {ok ? <CheckCircle2 className="size-4 text-green-600" /> : <XCircle className="size-4 text-destructive" />}
        {value}
      </span>
    </div>
  );

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg italic">Benachrichtigungs-Status</h3>
        {isSubscribed ? <Bell className="size-5 text-primary" /> : <BellOff className="size-5 text-muted-foreground" />}
      </div>

      <div className="mb-4">
        <StatusRow
          ok={permission === 'granted'}
          label="Browser-Berechtigung"
          value={permission === 'granted' ? 'Erlaubt' : permission === 'denied' ? 'Blockiert' : 'Nicht gefragt'}
        />
        <StatusRow
          ok={isSubscribed}
          label="Lokale Subscription"
          value={isSubscribed ? 'Aktiv' : 'Inaktiv'}
        />
        <StatusRow
          ok={(serverCount ?? 0) > 0}
          label={isNative ? 'FCM Token (Server)' : 'Server-Subscription (VAPID)'}
          value={checking ? '…' : serverCount === null ? '—' : `${serverCount} Gerät(e)`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {isSubscribed ? (
          <Button variant="outline" size="sm" onClick={unsubscribe} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <BellOff className="size-4" />}
            Deaktivieren
          </Button>
        ) : (
          <Button size="sm" onClick={subscribe} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Bell className="size-4" />}
            Aktivieren
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={sendTest}
          disabled={sending || !isSubscribed || (serverCount ?? 0) === 0}
        >
          {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          Test-Push senden
        </Button>
      </div>

      {permission === 'denied' && (
        <p className="text-xs text-destructive mt-3">
          Push wurde im Browser blockiert. Aktiviere es in den Browser-/Geräte-Einstellungen für diese Seite.
        </p>
      )}
    </Card>
  );
}
