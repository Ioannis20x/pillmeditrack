import { useMemo } from 'react';
import { checkInteractions, InteractionWarning } from '@/data/drugInteractions';
import { Medication } from '@/types/medication';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractionWarningsProps {
  medications: Medication[];
}

const severityConfig = {
  high: {
    icon: ShieldAlert,
    label: 'Schwerwiegend',
    containerClass: 'bg-destructive/10 border-destructive/30',
    iconClass: 'text-destructive',
    labelClass: 'text-destructive',
  },
  moderate: {
    icon: AlertTriangle,
    label: 'Mäßig',
    containerClass: 'bg-amber-500/10 border-amber-500/30',
    iconClass: 'text-amber-500',
    labelClass: 'text-amber-600 dark:text-amber-400',
  },
  low: {
    icon: Info,
    label: 'Gering',
    containerClass: 'bg-blue-500/10 border-blue-500/30',
    iconClass: 'text-blue-500',
    labelClass: 'text-blue-600 dark:text-blue-400',
  },
};

export function InteractionWarnings({ medications }: InteractionWarningsProps) {
  const warnings = useMemo(
    () => checkInteractions(medications.map(m => ({ name: m.name, activeIngredient: m.activeIngredient }))),
    [medications]
  );

  if (warnings.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body font-medium flex items-center gap-1.5">
        <AlertTriangle className="size-3.5" />
        Wechselwirkungen ({warnings.length})
      </h2>
      <div className="space-y-2">
        {warnings.map((w, i) => {
          const config = severityConfig[w.severity];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={cn(
                'rounded-2xl border p-3 md:p-4 transition-all',
                config.containerClass
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn('size-5 mt-0.5 shrink-0', config.iconClass)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm">{w.med1Name}</span>
                    <span className="text-muted-foreground text-xs">+</span>
                    <span className="font-medium text-sm">{w.med2Name}</span>
                    <span className={cn('text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-md', config.labelClass, config.containerClass)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{w.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground">
        ⚕️ Diese Hinweise ersetzen keine ärztliche Beratung. Bitte konsultiere deinen Arzt oder Apotheker.
      </p>
    </section>
  );
}
