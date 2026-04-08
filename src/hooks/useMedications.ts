import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Medication, PillShape, PillColor, ScheduleType, TimeOfDay } from '@/types/medication';

export function useMedications() {
  const { user } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch medications
  const fetchMedications = useCallback(async () => {
    if (!user) { setMedications([]); setLoading(false); return; }
    
    const { data: meds, error } = await supabase
      .from('medications')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) { console.error('Error fetching medications:', error); setLoading(false); return; }

    const { data: takenRecords } = await supabase
      .from('medication_taken')
      .select('*');

    const takenMap: Record<string, Record<string, boolean>> = {};
    (takenRecords || []).forEach(r => {
      if (!takenMap[r.medication_id]) takenMap[r.medication_id] = {};
      takenMap[r.medication_id][r.taken_key] = true;
    });

    const mapped: Medication[] = (meds || []).map(m => ({
      id: m.id,
      name: m.name,
      dosage: m.dosage,
      unit: m.unit,
      pillShape: m.pill_shape as PillShape,
      pillColor: m.pill_color as PillColor,
      scheduleType: m.schedule_type as ScheduleType,
      timesOfDay: m.times_of_day as TimeOfDay[] | undefined,
      intervalHours: m.interval_hours ?? undefined,
      notes: m.notes || '',
      taken: takenMap[m.id] || {},
      createdAt: m.created_at,
    }));

    setMedications(mapped);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchMedications(); }, [fetchMedications]);

  const addMedication = async (med: Omit<Medication, 'id' | 'taken' | 'createdAt'>) => {
    if (!user) return;
    const { error } = await supabase.from('medications').insert({
      user_id: user.id,
      name: med.name,
      dosage: med.dosage,
      unit: med.unit,
      pill_shape: med.pillShape,
      pill_color: med.pillColor,
      schedule_type: med.scheduleType,
      times_of_day: med.timesOfDay || null,
      interval_hours: med.intervalHours || null,
      notes: med.notes,
    });
    if (!error) fetchMedications();
  };

  const removeMedication = async (id: string) => {
    const { error } = await supabase.from('medications').delete().eq('id', id);
    if (!error) fetchMedications();
  };

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    const dbUpdates: Record<string, any> = {};
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.dosage !== undefined) dbUpdates.dosage = updates.dosage;
    
    const { error } = await supabase.from('medications').update(dbUpdates).eq('id', id);
    if (!error) fetchMedications();
  };

  const toggleTaken = async (id: string, key: string) => {
    if (!user) return;
    const med = medications.find(m => m.id === id);
    if (!med) return;

    if (med.taken[key]) {
      await supabase.from('medication_taken')
        .delete()
        .eq('medication_id', id)
        .eq('taken_key', key);
    } else {
      await supabase.from('medication_taken').insert({
        user_id: user.id,
        medication_id: id,
        taken_key: key,
      });
    }
    fetchMedications();
  };

  return { medications, loading, addMedication, removeMedication, updateMedication, toggleTaken };
}
