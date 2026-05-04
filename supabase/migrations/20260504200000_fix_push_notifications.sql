-- Fix: allow upsert (INSERT ON CONFLICT DO UPDATE) by adding UPDATE policy
CREATE POLICY "Users can update their own subscriptions"
  ON public.push_subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Cron jobs for push notifications
-- Uses CRON_SECRET instead of service_role_key — no ALTER DATABASE needed.
-- REQUIRED: Add CRON_SECRET = "cron_7kp2mq9xnb4r8fs1" as a Secret
--           in Lovable → Supabase → Secrets
-- ============================================================

-- Remove old jobs if they exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-morning-push') THEN
    PERFORM cron.unschedule('send-morning-push');
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-noon-push') THEN
    PERFORM cron.unschedule('send-noon-push');
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-evening-push') THEN
    PERFORM cron.unschedule('send-evening-push');
  END IF;
END $$;

-- Morning: 08:00 Berlin = 06:00 UTC (summer)
SELECT cron.schedule(
  'send-morning-push',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url := 'https://khbyziyyepuyklwmqqpl.supabase.co/functions/v1/send-push-notifications',
    headers := '{"Content-Type": "application/json", "x-cron-secret": "cron_7kp2mq9xnb4r8fs1"}'::jsonb,
    body := '{"time_of_day": "morning"}'::jsonb
  );
  $$
);

-- Noon: 13:00 Berlin = 11:00 UTC (summer)
SELECT cron.schedule(
  'send-noon-push',
  '0 11 * * *',
  $$
  SELECT net.http_post(
    url := 'https://khbyziyyepuyklwmqqpl.supabase.co/functions/v1/send-push-notifications',
    headers := '{"Content-Type": "application/json", "x-cron-secret": "cron_7kp2mq9xnb4r8fs1"}'::jsonb,
    body := '{"time_of_day": "noon"}'::jsonb
  );
  $$
);

-- Evening: 20:00 Berlin = 18:00 UTC (summer)
SELECT cron.schedule(
  'send-evening-push',
  '0 18 * * *',
  $$
  SELECT net.http_post(
    url := 'https://khbyziyyepuyklwmqqpl.supabase.co/functions/v1/send-push-notifications',
    headers := '{"Content-Type": "application/json", "x-cron-secret": "cron_7kp2mq9xnb4r8fs1"}'::jsonb,
    body := '{"time_of_day": "evening"}'::jsonb
  );
  $$
);
