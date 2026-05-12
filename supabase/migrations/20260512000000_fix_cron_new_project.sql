-- Remove old fixed-time cron jobs
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
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-push-every-5min') THEN
    PERFORM cron.unschedule('send-push-every-5min');
  END IF;
END $$;

-- Single job every 5 minutes — the function checks each user's configured time
SELECT cron.schedule(
  'send-push-every-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://iirvstnpcdkabkqueqze.supabase.co/functions/v1/send-push-notifications',
    headers := '{"Content-Type": "application/json", "x-cron-secret": "cron_7kp2mq9xnb4r8fs1"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
