import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Pill, ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/BottomNav';

interface HistoryEntry {
  id: string;
  medicationName: string;
  takenKey: string;
  takenAt: string;
  pillColor: string;
}

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

export default function History() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(now.toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${getDaysInMonth(year, month)}`;

    const { data: takenRecords } = await supabase
      .from('medication_taken')
      .select('id, medication_id, taken_key, taken_at')
      .gte('taken_key', startDate)
      .lte('taken_key', endDate + 'z');

    const { data: meds } = await supabase
      .from('medications')
      .select('id, name, pill_color');

    const medMap = new Map((meds || []).map(m => [m.id, m]));

    const mapped: HistoryEntry[] = (takenRecords || []).map(r => {
      const med = medMap.get(r.medication_id);
      return {
        id: r.id,
        medicationName: med?.name || 'Unbekannt',
        takenKey: r.taken_key,
        takenAt: r.taken_at,
        pillColor: med?.pill_color || 'white',
      };
    });

    setEntries(mapped);
    setLoading(false);
  }, [user, year, month]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const datesWithEntries = new Set(entries.map(e => e.takenKey.split('-').slice(0, 3).join('-')));

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = now.toISOString().split('T')[0];

  const selectedEntries = entries.filter(e => e.takenKey.startsWith(selectedDate || ''));

  const getTimeLabel = (key: string) => {
    if (key.endsWith('-morning')) return '🌅 Morgens';
    if (key.endsWith('-noon')) return '☀️ Mittags';
    if (key.endsWith('-evening')) return '🌙 Abends';
    return '';
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="text-xl font-body font-medium tracking-tight">Verlauf</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-4">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={prevMonth}>
            <ChevronLeft className="size-5" />
          </Button>
          <h2 className="font-display text-2xl italic">
            {MONTHS[month]} {year}
          </h2>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={nextMonth}>
            <ChevronRight className="size-5" />
          </Button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs font-body font-medium text-muted-foreground uppercase tracking-wider py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-8">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEntries = datesWithEntries.has(dateStr);
            const isToday = dateStr === today;
            const isSelected = dateStr === selectedDate;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={cn(
                  'aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-body transition-all relative',
                  isSelected ? 'bg-primary text-primary-foreground' :
                  isToday ? 'bg-accent/20 text-foreground' :
                  'hover:bg-secondary text-foreground'
                )}
              >
                {day}
                {hasEntries && (
                  <div className={cn(
                    'absolute bottom-1.5 size-1.5 rounded-full',
                    isSelected ? 'bg-primary-foreground' : 'bg-primary'
                  )} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected day details */}
        {selectedDate && (
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body font-medium">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            {selectedEntries.length === 0 ? (
              <div className="text-center py-10">
                <div className="size-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Pill className="size-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">Keine Einnahmen an diesem Tag</p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedEntries.map(entry => (
                  <div key={entry.id} className="rounded-2xl p-4 bg-card border border-border flex items-center gap-4">
                    <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `hsl(var(--pill-${entry.pillColor}))` }}>
                      <Check className="size-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-medium text-sm">{entry.medicationName}</p>
                      <p className="text-muted-foreground text-xs">{getTimeLabel(entry.takenKey)}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.takenAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="h-20 md:hidden" />
      </main>
      <BottomNav />
    </div>
  );
}
