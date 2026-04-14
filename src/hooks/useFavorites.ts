import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Medication, PillShape, PillColor, ScheduleType, TimeOfDay } from '@/types/medication';

export type FavoriteMedication = Omit<Medication, 'id' | 'taken' | 'createdAt'> & { id: string };

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteMedication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user) { setFavorites([]); setLoading(false); return; }

    const { data, error } = await supabase
      .from('medication_favorites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) { console.error('Error fetching favorites:', error); setLoading(false); return; }

    setFavorites((data || []).map(f => ({
      id: f.id,
      name: f.name,
      brand: f.brand || '',
      activeIngredient: f.active_ingredient || '',
      dosage: f.dosage,
      unit: f.unit,
      pillShape: f.pill_shape as PillShape,
      pillColor: f.pill_color as PillColor,
      scheduleType: f.schedule_type as ScheduleType,
      timesOfDay: f.times_of_day as TimeOfDay[] | undefined,
      intervalHours: f.interval_hours ?? undefined,
      notes: f.notes || '',
    })));
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  const addFavorite = async (med: Omit<Medication, 'id' | 'taken' | 'createdAt'>) => {
    if (!user) return;
    const { error } = await supabase.from('medication_favorites').insert({
      user_id: user.id,
      name: med.name,
      brand: med.brand || '',
      active_ingredient: med.activeIngredient || '',
      dosage: med.dosage,
      unit: med.unit,
      pill_shape: med.pillShape,
      pill_color: med.pillColor,
      schedule_type: med.scheduleType,
      times_of_day: med.timesOfDay || null,
      interval_hours: med.intervalHours || null,
      notes: med.notes,
    });
    if (!error) fetchFavorites();
  };

  const removeFavorite = async (id: string) => {
    const { error } = await supabase.from('medication_favorites').delete().eq('id', id);
    if (!error) fetchFavorites();
  };

  return { favorites, loading: loading, addFavorite, removeFavorite };
}
