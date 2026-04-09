
CREATE TABLE public.reminder_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  morning_time TIME NOT NULL DEFAULT '08:00:00',
  noon_time TIME NOT NULL DEFAULT '13:00:00',
  evening_time TIME NOT NULL DEFAULT '20:00:00',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reminder_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings"
ON public.reminder_settings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own settings"
ON public.reminder_settings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
ON public.reminder_settings FOR UPDATE
USING (auth.uid() = user_id);
