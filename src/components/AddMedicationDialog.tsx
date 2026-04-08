import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PillVisualizer } from './PillVisualizer';
import { useOpenFDA } from '@/hooks/useOpenFDA';
import { 
  Medication, PillShape, PillColor, ScheduleType, TimeOfDay,
  PILL_SHAPES, PILL_COLORS
} from '@/types/medication';
import { cn } from '@/lib/utils';
import { Plus, Search, Loader2 } from 'lucide-react';

interface AddMedicationDialogProps {
  onAdd: (med: Omit<Medication, 'id' | 'taken' | 'createdAt'>) => void;
}

export function AddMedicationDialog({ onAdd }: AddMedicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('mg');
  const [pillShape, setPillShape] = useState<PillShape>('round');
  const [pillColor, setPillColor] = useState<PillColor>('white');
  const [scheduleType, setScheduleType] = useState<ScheduleType>('times_of_day');
  const [timesOfDay, setTimesOfDay] = useState<TimeOfDay[]>(['morning']);
  const [intervalHours, setIntervalHours] = useState(8);
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const { results, loading, searchDrugs } = useOpenFDA();
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchDrugs(searchQuery);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery, searchDrugs]);

  const toggleTimeOfDay = (t: TimeOfDay) => {
    setTimesOfDay(prev => 
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
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
    resetForm();
  };

  const resetForm = () => {
    setName(''); setDosage(''); setUnit('mg'); setPillShape('round');
    setPillColor('white'); setScheduleType('times_of_day');
    setTimesOfDay(['morning']); setIntervalHours(8); setNotes('');
    setSearchQuery(''); setShowSearch(false);
  };

  const selectDrug = (brandName: string) => {
    setName(brandName);
    setSearchQuery('');
    setShowSearch(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          Medikament hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] rounded-3xl border-border bg-card p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-2xl italic">Neues Medikament</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Medikament suchen
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={showSearch ? searchQuery : name}
                onChange={(e) => { setSearchQuery(e.target.value); setName(e.target.value); setShowSearch(true); }}
                onFocus={() => setShowSearch(true)}
                placeholder="Name eingeben oder suchen..."
                className="pl-10 rounded-xl bg-secondary/50 border-border"
              />
              {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />}
            </div>
            {showSearch && results.length > 0 && (
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg max-h-40 overflow-y-auto">
                {results.map((drug, i) => (
                  <button
                    key={i}
                    onClick={() => selectDrug(drug.brand_name)}
                    className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors text-sm flex justify-between items-center border-b border-border last:border-0"
                  >
                    <span className="font-medium">{drug.brand_name}</span>
                    <span className="text-muted-foreground text-xs">{drug.dosage_form}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dosage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Dosierung</Label>
              <Input value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="z.B. 500" className="rounded-xl bg-secondary/50 border-border" />
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
                    <button
                      key={c.value}
                      onClick={() => setPillColor(c.value)}
                      className={cn(
                        'size-7 rounded-full transition-all border-2',
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
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Besondere Hinweise, Nebenwirkungen..."
              className="w-full bg-secondary/50 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground/50 min-h-[80px] border border-border"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium">
            Medikament speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
