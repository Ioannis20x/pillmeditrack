import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, TrendingUp, Calendar, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/BottomNav';

type ViewMode = 'week' | 'month';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

interface MedStats {
  id: string;
  name: string;
  pillColor: string;
  totalDoses: number;
  takenDoses: number;
  dailyData: Record<string, { total: number; taken: number }>;
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function Statistics() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [offset, setOffset] = useState(0);
  const [medications, setMedications] = useState<any[]>([]);
  const [takenRecords, setTakenRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dateRange = useMemo(() => {
    const now = new Date();
    if (viewMode === 'week') {
      const monday = getMonday(now);
      monday.setDate(monday.getDate() + offset * 7);
      const sunday = new Date(monday);
      sunday.setDate(sunday.getDate() + 6);
      return { start: monday, end: sunday };
    } else {
      const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      return { start: d, end };
    }
  }, [viewMode, offset]);

  const days = useMemo(() => {
    const result: string[] = [];
    const d = new Date(dateRange.start);
    while (d <= dateRange.end) {
      result.push(formatDateStr(d));
      d.setDate(d.getDate() + 1);
    }
    return result;
  }, [dateRange]);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const startStr = formatDateStr(dateRange.start);
    const endStr = formatDateStr(dateRange.end);

    const [{ data: meds }, { data: taken }] = await Promise.all([
      supabase.from('medications').select('*').order('created_at', { ascending: true }),
      supabase.from('medication_taken').select('*').gte('taken_key', startStr).lte('taken_key', endStr + 'z'),
    ]);

    setMedications(meds || []);
    setTakenRecords(taken || []);
    setLoading(false);
  }, [user, dateRange]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const stats: MedStats[] = useMemo(() => {
    return medications.map(med => {
      const timesOfDay: string[] = med.times_of_day || ['morning'];
      const dailyData: Record<string, { total: number; taken: number }> = {};
      let totalDoses = 0;
      let takenDoses = 0;

      const medCreated = formatDateStr(new Date(med.created_at));

      days.forEach(day => {
        if (day < medCreated) {
          dailyData[day] = { total: 0, taken: 0 };
          return;
        }

        const dosesForDay = med.schedule_type === 'times_of_day' ? timesOfDay.length : 1;
        totalDoses += dosesForDay;

        const takenForDay = takenRecords.filter(r =>
          r.medication_id === med.id && r.taken_key.startsWith(day)
        ).length;

        takenDoses += takenForDay;
        dailyData[day] = { total: dosesForDay, taken: Math.min(takenForDay, dosesForDay) };
      });

      return {
        id: med.id,
        name: med.name,
        pillColor: med.pill_color,
        totalDoses,
        takenDoses,
        dailyData,
      };
    });
  }, [medications, takenRecords, days]);

  const overallTotal = stats.reduce((a, s) => a + s.totalDoses, 0);
  const overallTaken = stats.reduce((a, s) => a + s.takenDoses, 0);
  const overallRate = overallTotal > 0 ? Math.round((overallTaken / overallTotal) * 100) : 0;

  const bestStreak = useMemo(() => {
    let streak = 0, maxStreak = 0;
    days.forEach(day => {
      const dayTotal = stats.reduce((a, s) => a + (s.dailyData[day]?.total || 0), 0);
      const dayTaken = stats.reduce((a, s) => a + (s.dailyData[day]?.taken || 0), 0);
      if (dayTotal > 0 && dayTaken >= dayTotal) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else if (dayTotal > 0) {
        streak = 0;
      }
    });
    return maxStreak;
  }, [stats, days]);

  const rangeLabel = viewMode === 'week'
    ? `${dateRange.start.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })} – ${dateRange.end.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}`
    : `${MONTHS[dateRange.start.getMonth()]} ${dateRange.start.getFullYear()}`;

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="text-xl font-body font-medium tracking-tight">Statistik</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-4">
        {/* View mode toggle */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => { setViewMode('week'); setOffset(0); }} className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all',
            viewMode === 'week' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}>Woche</button>
          <button onClick={() => { setViewMode('month'); setOffset(0); }} className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all',
            viewMode === 'month' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}>Monat</button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOffset(o => o - 1)}>
            <ChevronLeft className="size-5" />
          </Button>
          <h2 className="font-display text-xl italic">{rangeLabel}</h2>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOffset(o => o + 1)} disabled={offset >= 0}>
            <ChevronRight className="size-5" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-10">
              <div className="rounded-2xl bg-card border border-border p-4 md:p-5 text-center flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                <TrendingUp className="size-5 text-primary sm:mb-2" />
                <p className="text-2xl md:text-3xl font-display italic">{overallRate}%</p>
                <p className="text-xs text-muted-foreground sm:mt-1">Einnahmetreue</p>
              </div>
              <div className="rounded-2xl bg-card border border-border p-4 md:p-5 text-center flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                <Target className="size-5 text-primary sm:mb-2" />
                <p className="text-2xl md:text-3xl font-display italic">{overallTaken}/{overallTotal}</p>
                <p className="text-xs text-muted-foreground sm:mt-1">Dosen genommen</p>
              </div>
              <div className="rounded-2xl bg-card border border-border p-4 md:p-5 text-center flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                <Calendar className="size-5 text-primary sm:mb-2" />
                <p className="text-2xl md:text-3xl font-display italic">{bestStreak}</p>
                <p className="text-xs text-muted-foreground sm:mt-1">Tage-Streak</p>
              </div>
            </div>

            {/* Daily bar chart */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body font-medium mb-4">Tägliche Übersicht</h3>
              <div className="flex items-end gap-1" style={{ height: 120 }}>
                {days.map(day => {
                  const dayTotal = stats.reduce((a, s) => a + (s.dailyData[day]?.total || 0), 0);
                  const dayTaken = stats.reduce((a, s) => a + (s.dailyData[day]?.taken || 0), 0);
                  const pct = dayTotal > 0 ? (dayTaken / dayTotal) * 100 : 0;
                  const d = new Date(day + 'T12:00:00');
                  const isToday = day === formatDateStr(new Date());

                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full relative" style={{ height: 90 }}>
                        <div className="absolute bottom-0 w-full rounded-t-md bg-secondary" style={{ height: '100%' }} />
                        <div
                          className={cn('absolute bottom-0 w-full rounded-t-md transition-all', pct === 100 ? 'bg-primary' : 'bg-primary/60')}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className={cn('text-[10px] font-body', isToday ? 'text-primary font-bold' : 'text-muted-foreground')}>
                        {viewMode === 'week' ? WEEKDAYS[d.getDay() === 0 ? 6 : d.getDay() - 1] : d.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Per-medication stats */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body font-medium mb-4">Pro Medikament</h3>
              {stats.map(med => {
                const rate = med.totalDoses > 0 ? Math.round((med.takenDoses / med.totalDoses) * 100) : 0;
                return (
                  <div key={med.id} className="rounded-2xl bg-card border border-border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full" style={{ backgroundColor: `hsl(var(--pill-${med.pillColor}))` }} />
                        <span className="font-body font-medium">{med.name}</span>
                      </div>
                      <span className="text-sm font-body font-medium tabular-nums">{rate}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{med.takenDoses} von {med.totalDoses} Dosen</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="h-20 md:hidden" />
      </main>
      <BottomNav />
    </div>
  );
}
