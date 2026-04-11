ALTER TABLE public.medications ADD COLUMN brand text NOT NULL DEFAULT '';
ALTER TABLE public.medications ADD COLUMN active_ingredient text NOT NULL DEFAULT '';