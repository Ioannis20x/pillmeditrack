
-- Create medications table
CREATE TABLE public.medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL DEFAULT '',
  unit TEXT NOT NULL DEFAULT 'mg',
  pill_shape TEXT NOT NULL DEFAULT 'round',
  pill_color TEXT NOT NULL DEFAULT 'white',
  schedule_type TEXT NOT NULL DEFAULT 'times_of_day',
  times_of_day TEXT[] DEFAULT ARRAY['morning'],
  interval_hours INTEGER,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medication_taken table for tracking doses
CREATE TABLE public.medication_taken (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  taken_key TEXT NOT NULL,
  taken_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(medication_id, taken_key)
);

-- Enable RLS
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_taken ENABLE ROW LEVEL SECURITY;

-- Medications policies
CREATE POLICY "Users can view their own medications" ON public.medications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own medications" ON public.medications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own medications" ON public.medications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own medications" ON public.medications FOR DELETE USING (auth.uid() = user_id);

-- Medication_taken policies
CREATE POLICY "Users can view their own taken records" ON public.medication_taken FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own taken records" ON public.medication_taken FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own taken records" ON public.medication_taken FOR DELETE USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON public.medications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
