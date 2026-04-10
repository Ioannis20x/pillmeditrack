import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PillVisualizer } from './PillVisualizer';
import {
  Medication, PillShape, PillColor, ScheduleType, TimeOfDay,
  PILL_SHAPES, PILL_COLORS
} from '@/types/medication';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

interface EditMedicationDialogProps {
  medication: Medication;
  onUpdate: (id: string, updates: Partial<Medication>) => void;
}

export function EditMedicationDialog({ medication, onUpdate }: EditMedicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(medication.name);
  const [dosage, setDosage] = useState(medication.dosage);
  const [unit, setUnit] = useState(medication.unit);
  const [pillShape, setPillShape] = useState<PillShape>(medication.pillShape);
  const [pillColor, setPillColor] = useState<PillColor>(medication.pillColor);
  const [scheduleType, setScheduleType] = useState<ScheduleType>(medication.scheduleType);
  const [timesOfDay, setTimesOfDay] = useState<TimeOfDay[]>(medication.timesOfDay || ['morning']);
  const [intervalHours, setIntervalHours] = useState(medication.intervalHours || 8);
  const [notes, setNotes] = useState(medication.notes);

  const toggleTimeOfDay = (t: TimeOfDay) => {
    setTimesOfDay(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onUpdate(medication.id, {
      name: name.trim(),
      dosage,
      unit,
      pillShape,
      pillColor,
      scheduleType,
      timesOfDay: scheduleType === 'times_of_day' ? timesOfDay : undefined,
      intervalHours: scheduleType === 'interval' ? intervalHours : undefined,
      notes,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground size-8">
          <Pencil className="size-3.5 md:size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] rounded-3xl border-border bg-card p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-2xl italic">Medikament bearbeiten</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl bg-secondary/50 border-border" />
          </div>

          {/* Dosage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Dosierung</Label>
              <Input value={dosage} onChange={(e) => setDosage(e.target.value)} className="rounded-xl bg-secondary/50 border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Einheit</Label>
              <div className="flex gap-2">
                {['mg', 'ml', 'Stk', 'IE'].map(u => (
                  <button key={u} onClick={() => setUnit(u)} className={cn(
                    'px-3 py-2 rounded-xl text-sm font-medium transition-all',
                    unit === u ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}>{u}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Pill Appearance */}
          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Aussehen</Label>
            <div className="flex items-center gap-6">
              <PillVisualizer shape={pillShape} color={pillColor} size="lg" />
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {PILL_SHAPES.map(s => (
                    <button key={s.value} onClick={() => setPillShape(s.value)} className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-medium transition-all',
                      pillShape === s.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    )}>{s.label}</button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {PILL_COLORS.map(c => (
                    <button key={c.value} onClick={() => setPillColor(c.value)}
                      className={cn('size-7 rounded-full transition-all border-2',
                        pillColor === c.value ? 'border-foreground scale-110' : 'border-transparent'
                      )}
                      style={{ backgroundColor: `hsl(var(--pill-${c.value}))` }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Einnahme-Zeitplan</Label>
            <div className="flex gap-2">
              <button onClick={() => setScheduleType('times_of_day')} className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1',
                scheduleType === 'times_of_day' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              )}>Morgens / Mittags / Abends</button>
              <button onClick={() => setScheduleType('interval')} className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1',
                scheduleType === 'interval' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              )}>Alle X Stunden</button>
            </div>

            {scheduleType === 'times_of_day' ? (
              <div className="flex gap-2">
                {(['morning', 'noon', 'evening'] as TimeOfDay[]).map(t => (
                  <button key={t} onClick={() => toggleTimeOfDay(t)} className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all flex-1 flex flex-col items-center gap-1',
                    timesOfDay.includes(t) ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'
                  )}>
                    <span>{t === 'morning' ? '🌅' : t === 'noon' ? '☀️' : '🌙'}</span>
                    <span>{t === 'morning' ? 'Morgens' : t === 'noon' ? 'Mittags' : 'Abends'}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Alle</span>
                <Input type="number" value={intervalHours} onChange={(e) => setIntervalHours(Number(e.target.value))} className="w-20 rounded-xl bg-secondary/50 border-border text-center" min={1} max={24} />
                <span className="text-sm text-muted-foreground">Stunden</span>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Notizen</Label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Besondere Hinweise, Nebenwirkungen..."
              className="w-full bg-secondary/50 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground/50 min-h-[80px] border border-border"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium">
            Änderungen speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
