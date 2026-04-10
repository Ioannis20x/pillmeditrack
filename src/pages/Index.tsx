import { useMedications } from '@/hooks/useMedications';
import { MedicationCard } from '@/components/MedicationCard';
import { AddMedicationDialog } from '@/components/AddMedicationDialog';
import { TimeOfDay, TIME_OF_DAY_CONFIG } from '@/types/medication';
import { useAuth } from '@/hooks/useAuth';
import { useReminderSettings } from '@/hooks/useReminderSettings';
import { Pill, LogOut, Loader2, CalendarDays, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationToggle } from '@/components/NotificationToggle';
import { ReminderSettingsDialog } from '@/components/ReminderSettingsDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BottomNav } from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { medications, loading, addMedication, removeMedication, updateMedication, toggleTaken } = useMedications();
  const { signOut } = useAuth();
  const { settings } = useReminderSettings();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  
  const getMedsForTime = (time: TimeOfDay) => {
    return medications.filter(m => 
      m.scheduleType === 'times_of_day' && m.timesOfDay?.includes(time)
    );
  };

  const intervalMeds = medications.filter(m => m.scheduleType === 'interval');

  const totalDoses = (['morning', 'noon', 'evening'] as TimeOfDay[]).reduce((acc, t) => acc + getMedsForTime(t).length, 0) + intervalMeds.length;
  const takenDoses = medications.reduce((acc, m) => {
    return acc + Object.keys(m.taken).filter(k => k.startsWith(today) && m.taken[k]).length;
  }, 0);
  const progress = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Guten Morgen.';
    if (hour < 17) return 'Guten Tag.';
    return 'Guten Abend.';
  };

  const getTimeForSlot = (time: TimeOfDay) => {
    if (time === 'morning') return settings.morningTime;
    if (time === 'noon') return settings.noonTime;
    return settings.eveningTime;
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="size-8 md:size-10 bg-primary rounded-full flex items-center justify-center">
            <Pill className="size-4 md:size-5 text-primary-foreground" />
          </div>
          <span className="text-lg md:text-xl font-body font-medium tracking-tight">MediTrack</span>
        </div>
        <div className="flex items-center gap-0.5 md:gap-1">
          <div className="hidden sm:block">
            <AddMedicationDialog onAdd={addMedication} />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground size-8 md:size-10 hidden md:flex" onClick={() => navigate('/history')}>
            <CalendarDays className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground size-8 md:size-10 hidden md:flex" onClick={() => navigate('/statistics')}>
            <BarChart3 className="size-4" />
          </Button>
          <ReminderSettingsDialog />
          <NotificationToggle />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground size-8 md:size-10" onClick={signOut}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 md:px-12 py-4 md:py-8">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-8 animate-spin text-primary" /></div>
        ) : (
        <>
        <header className="mb-8 md:mb-16">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-tight mb-3">
            {greeting()}<br />
            <span className="text-muted-foreground">Alles unter Kontrolle.</span>
          </h1>
          {totalDoses > 0 && (
            <div className="mt-4 md:mt-6 flex items-center gap-3 md:gap-4">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-700" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <span className="text-xs md:text-sm font-body text-muted-foreground font-medium tabular-nums whitespace-nowrap">
                {takenDoses}/{totalDoses} genommen
              </span>
            </div>
          )}
        </header>

        {/* Mobile add button - hidden since bottom nav has it */}

        {medications.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <div className="size-16 md:size-20 mx-auto mb-4 md:mb-6 rounded-full bg-secondary flex items-center justify-center">
              <Pill className="size-6 md:size-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl italic mb-2">Noch keine Medikamente</h2>
            <p className="text-muted-foreground text-sm md:text-base">Füge dein erstes Medikament hinzu, um loszulegen.</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {(['morning', 'noon', 'evening'] as TimeOfDay[]).map(time => {
              const meds = getMedsForTime(time);
              if (meds.length === 0) return null;
              const config = TIME_OF_DAY_CONFIG[time];
              return (
                <section key={time}>
                  <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body font-medium mb-4 md:mb-6">
                    {config.icon} {config.label} — {getTimeForSlot(time)}
                  </h2>
                  <div className="space-y-3 md:space-y-4">
                    {meds.map(med => (
                      <MedicationCard
                        key={med.id}
                        medication={med}
                        timeOfDay={time}
                        onToggleTaken={toggleTaken}
                        onRemove={removeMedication}
                        onUpdate={updateMedication}
                        onUpdateNotes={(id, notes) => updateMedication(id, { notes })}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {intervalMeds.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body font-medium mb-4 md:mb-6">
                  ⏰ Intervall-Medikamente
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {intervalMeds.map(med => (
                    <MedicationCard
                      key={med.id}
                      medication={med}
                      timeOfDay="morning"
                      onToggleTaken={toggleTaken}
                      onRemove={removeMedication}
                      onUpdate={updateMedication}
                      onUpdateNotes={(id, notes) => updateMedication(id, { notes })}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
        </>
        )}
        {/* Bottom padding for mobile nav */}
        <div className="h-20 md:hidden" />
      </main>
      <BottomNav onAddMedication={addMedication} />
    </div>
  );
};

export default Index;
