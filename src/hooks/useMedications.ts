import { useState, useEffect } from 'react';
import { Medication } from '@/types/medication';

const STORAGE_KEY = 'medications';

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  }, [medications]);

  const addMedication = (med: Omit<Medication, 'id' | 'taken' | 'createdAt'>) => {
    const newMed: Medication = {
      ...med,
      id: crypto.randomUUID(),
      taken: {},
      createdAt: new Date().toISOString(),
    };
    setMedications(prev => [...prev, newMed]);
  };

  const removeMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const toggleTaken = (id: string, key: string) => {
    setMedications(prev => prev.map(m => {
      if (m.id !== id) return m;
      const taken = { ...m.taken };
      taken[key] = !taken[key];
      return { ...m, taken };
    }));
  };

  return { medications, addMedication, removeMedication, updateMedication, toggleTaken };
}
