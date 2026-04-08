export type PillShape = 'round' | 'oval' | 'capsule' | 'rectangle' | 'diamond';
export type PillColor = 'coral' | 'teal' | 'amber' | 'lavender' | 'blue' | 'pink' | 'green' | 'white';
export type ScheduleType = 'times_of_day' | 'interval';
export type TimeOfDay = 'morning' | 'noon' | 'evening';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  unit: string;
  pillShape: PillShape;
  pillColor: PillColor;
  scheduleType: ScheduleType;
  timesOfDay?: TimeOfDay[];
  intervalHours?: number;
  notes: string;
  taken: Record<string, boolean>; // key: date-timeOfDay or date-hour
  createdAt: string;
}

export const PILL_SHAPES: { value: PillShape; label: string }[] = [
  { value: 'round', label: 'Rund' },
  { value: 'oval', label: 'Oval' },
  { value: 'capsule', label: 'Kapsel' },
  { value: 'rectangle', label: 'Rechteckig' },
  { value: 'diamond', label: 'Raute' },
];

export const PILL_COLORS: { value: PillColor; label: string }[] = [
  { value: 'white', label: 'Weiß' },
  { value: 'coral', label: 'Koralle' },
  { value: 'teal', label: 'Türkis' },
  { value: 'amber', label: 'Bernstein' },
  { value: 'lavender', label: 'Lavendel' },
  { value: 'blue', label: 'Blau' },
  { value: 'pink', label: 'Rosa' },
  { value: 'green', label: 'Grün' },
];

export const TIME_OF_DAY_CONFIG: Record<TimeOfDay, { label: string; time: string; icon: string }> = {
  morning: { label: 'Morgens', time: '08:00', icon: '🌅' },
  noon: { label: 'Mittags', time: '13:00', icon: '☀️' },
  evening: { label: 'Abends', time: '20:00', icon: '🌙' },
};
