import { Medication, TimeOfDay, TIME_OF_DAY_CONFIG } from '@/types/medication';
import { PillVisualizer } from './PillVisualizer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Trash2, StickyNote } from 'lucide-react';
import { useState } from 'react';

interface MedicationCardProps {
  medication: Medication;
  timeOfDay: TimeOfDay;
  onToggleTaken: (id: string, key: string) => void;
  onRemove: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export function MedicationCard({ medication, timeOfDay, onToggleTaken, onRemove, onUpdateNotes }: MedicationCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const takenKey = `${today}-${timeOfDay}`;
  const isTaken = medication.taken[takenKey];

  return (
    <div className={cn(
      'rounded-[2rem] p-6 border border-border transition-all duration-500',
      isTaken 
        ? 'bg-primary/5 border-primary/20' 
        : 'bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <PillVisualizer shape={medication.pillShape} color={medication.pillColor} />
          <div>
            <h3 className="text-lg font-body font-medium">{medication.name}</h3>
            <p className="text-muted-foreground text-sm">
              {medication.dosage} {medication.unit}
              {medication.notes && ' • '}
              {medication.notes && <span className="italic">{medication.notes.slice(0, 30)}{medication.notes.length > 30 ? '...' : ''}</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => setShowNotes(!showNotes)}
          >
            <StickyNote className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(medication.id)}
          >
            <Trash2 className="size-4" />
          </Button>
          <Button
            onClick={() => onToggleTaken(medication.id, takenKey)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all',
              isTaken 
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
            )}
          >
            {isTaken ? (
              <span className="flex items-center gap-2"><Check className="size-4" /> Genommen</span>
            ) : (
              'Einnehmen'
            )}
          </Button>
        </div>
      </div>
      
      {showNotes && (
        <div className="mt-4 pt-4 border-t border-border">
          <textarea
            value={medication.notes}
            onChange={(e) => onUpdateNotes(medication.id, e.target.value)}
            placeholder="Notizen hinzufügen..."
            className="w-full bg-secondary/50 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground/50 min-h-[80px]"
          />
        </div>
      )}
    </div>
  );
}
