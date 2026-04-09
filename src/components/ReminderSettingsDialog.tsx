import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Clock } from 'lucide-react';
import { useReminderSettings } from '@/hooks/useReminderSettings';
import { toast } from '@/hooks/use-toast';

export function ReminderSettingsDialog() {
  const { settings, loading, updateSettings } = useReminderSettings();
  const [open, setOpen] = useState(false);
  const [morning, setMorning] = useState(settings.morningTime);
  const [noon, setNoon] = useState(settings.noonTime);
  const [evening, setEvening] = useState(settings.eveningTime);

  useEffect(() => {
    setMorning(settings.morningTime);
    setNoon(settings.noonTime);
    setEvening(settings.eveningTime);
  }, [settings]);

  const handleSave = async () => {
    await updateSettings({ morningTime: morning, noonTime: noon, eveningTime: evening });
    toast({ title: 'Erinnerungszeiten gespeichert', description: `Morgens ${morning}, Mittags ${noon}, Abends ${evening}` });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-3xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl italic">Erinnerungszeiten</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {[
            { label: '🌅 Morgens', value: morning, set: setMorning },
            { label: '☀️ Mittags', value: noon, set: setNoon },
            { label: '🌙 Abends', value: evening, set: setEvening },
          ].map(({ label, value, set }) => (
            <div key={label} className="flex items-center justify-between">
              <Label className="text-sm font-body font-medium flex items-center gap-2">
                {label}
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="pl-10 w-36 rounded-xl bg-secondary/50 border-border"
                />
              </div>
            </div>
          ))}
          <Button onClick={handleSave} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 font-medium" disabled={loading}>
            Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
