
CREATE TABLE public.medication_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT '',
  active_ingredient TEXT NOT NULL DEFAULT '',
  dosage TEXT NOT NULL DEFAULT '',
  unit TEXT NOT NULL DEFAULT 'mg',
  pill_shape TEXT NOT NULL DEFAULT 'round',
  pill_color TEXT NOT NULL DEFAULT 'white',
  schedule_type TEXT NOT NULL DEFAULT 'times_of_day',
  times_of_day TEXT[] DEFAULT ARRAY['morning'],
  interval_hours INTEGER,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.medication_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
ON public.medication_favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
ON public.medication_favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
ON public.medication_favorites FOR DELETE
USING (auth.uid() = user_id);
