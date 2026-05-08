import { Medication, TimeOfDay, TIME_OF_DAY_CONFIG } from '@/types/medication';
import { PillVisualizer } from './PillVisualizer';
import { EditMedicationDialog } from './EditMedicationDialog';
import { DrugInfoDialog } from './DrugInfoDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Trash2, StickyNote } from 'lucide-react';
import { useState } from 'react';

interface MedicationCardProps {
  medication: Medication;
  timeOfDay: TimeOfDay;
  onToggleTaken: (id: string, key: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Medication>) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export function MedicationCard({ medication, timeOfDay, onToggleTaken, onRemove, onUpdate, onUpdateNotes }: MedicationCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const takenKey = `${today}-${timeOfDay}`;
  const isTaken = medication.taken[takenKey];

  return (
    <div className={cn(
      'rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-border transition-all duration-500',
      isTaken 
        ? 'bg-primary/5 border-primary/20' 
        : 'bg-card shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]'
    )}>
      <div className="flex items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 md:gap-5 min-w-0 flex-1">
          <PillVisualizer shape={medication.pillShape} color={medication.pillColor} size="sm" className="shrink-0" />
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-body font-medium truncate">{medication.name}</h3>
            {(medication.brand || medication.activeIngredient) && (
              <p className="text-muted-foreground text-[11px] md:text-xs truncate">
                {medication.brand}{medication.brand && medication.activeIngredient ? ' • ' : ''}{medication.activeIngredient}
              </p>
            )}
            <p className="text-muted-foreground text-xs md:text-sm truncate">
              {medication.dosage} {medication.unit}
              {medication.notes && ' • '}
              {medication.notes && <span className="italic">{medication.notes.slice(0, 20)}{medication.notes.length > 20 ? '...' : ''}</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <EditMedicationDialog medication={medication} onUpdate={onUpdate} />
          <DrugInfoDialog name={medication.name} activeIngredient={medication.activeIngredient} />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground size-8"
            onClick={() => setShowNotes(!showNotes)}
          >
            <StickyNote className="size-3.5 md:size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-destructive size-8 hidden sm:flex"
            onClick={() => onRemove(medication.id)}
          >
            <Trash2 className="size-3.5 md:size-4" />
          </Button>
          <Button
            onClick={() => onToggleTaken(medication.id, takenKey)}
            className={cn(
              'rounded-full px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-all h-auto',
              isTaken 
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
            )}
          >
            {isTaken ? (
              <span className="flex items-center gap-1.5"><Check className="size-3.5 md:size-4" /> <span className="hidden sm:inline">Genommen</span><span className="sm:hidden">✓</span></span>
            ) : (
              <span className="whitespace-nowrap">Einnehmen</span>
            )}
          </Button>
        </div>
      </div>
      
      {showNotes && (
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
          <textarea
            value={medication.notes}
            onChange={(e) => onUpdateNotes(medication.id, e.target.value)}
            placeholder="Notizen hinzufügen..."
            className="w-full bg-secondary/50 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground/50 min-h-[80px]"
          />
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden mt-2 text-destructive hover:text-destructive"
            onClick={() => onRemove(medication.id)}
          >
            <Trash2 className="size-3.5 mr-1.5" /> Löschen
          </Button>
        </div>
      )}
    </div>
  );
}
