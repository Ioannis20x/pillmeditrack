-- Fix: add Authorization header so Supabase gateway lets the request through
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-push-every-5min') THEN
    PERFORM cron.unschedule('send-push-every-5min');
  END IF;
END $$;

SELECT cron.schedule(
  'send-push-every-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://iirvstnpcdkabkqueqze.supabase.co/functions/v1/send-push-notifications',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer sb_publishable_xVnoXzlIV21FJeGoqMQMzQ_QFSkk_U9", "apikey": "sb_publishable_xVnoXzlIV21FJeGoqMQMzQ_QFSkk_U9", "x-cron-secret": "cron_7kp2mq9xnb4r8fs1"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
