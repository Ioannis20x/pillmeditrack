import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ReminderSettings {
  morningTime: string;
  noonTime: string;
  eveningTime: string;
}

const DEFAULT_SETTINGS: ReminderSettings = {
  morningTime: '08:00',
  noonTime: '13:00',
  eveningTime: '20:00',
};

export function useReminderSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    
    const { data } = await supabase
      .from('reminder_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setSettings({
        morningTime: (data as any).morning_time?.slice(0, 5) || '08:00',
        noonTime: (data as any).noon_time?.slice(0, 5) || '13:00',
        eveningTime: (data as any).evening_time?.slice(0, 5) || '20:00',
      });
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSettings = useCallback(async (newSettings: ReminderSettings) => {
    if (!user) return;
    setSettings(newSettings);

    const payload = {
      user_id: user.id,
      morning_time: newSettings.morningTime + ':00',
      noon_time: newSettings.noonTime + ':00',
      evening_time: newSettings.eveningTime + ':00',
    };

    const { data: existing } = await supabase
      .from('reminder_settings')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await supabase.from('reminder_settings').update(payload).eq('user_id', user.id);
    } else {
      await supabase.from('reminder_settings').insert(payload);
    }
  }, [user]);

  return { settings, loading, updateSettings };
}
