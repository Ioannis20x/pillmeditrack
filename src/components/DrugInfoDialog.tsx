import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Loader2, AlertTriangle, ShieldAlert, Pill, FileText } from 'lucide-react';
import { fetchDrugInfo, DrugInfo } from '@/hooks/useOpenFDA';

interface Props {
  name: string;
  activeIngredient?: string;
}

export function DrugInfoDialog({ name, activeIngredient }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<DrugInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true); setError(null); setInfo(null);
    (async () => {
      let res = await fetchDrugInfo(name);
      if (!res && activeIngredient) res = await fetchDrugInfo(activeIngredient);
      if (!res) setError('Keine Informationen in der OpenFDA-Datenbank gefunden.');
      setInfo(res);
      setLoading(false);
    })();
  }, [open, name, activeIngredient]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-foreground size-8"
          title="Nebenwirkungen & Infos"
        >
          <Info className="size-3.5 md:size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl italic">
            {name}
            {activeIngredient && <span className="block text-sm not-italic font-body text-muted-foreground mt-1">{activeIngredient}</span>}
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="size-5 animate-spin mr-2" /> Lade Informationen…
          </div>
        )}

        {error && !loading && (
          <div className="text-sm text-muted-foreground py-6 text-center">
            {error}
            <p className="text-xs mt-2">Tipp: Versuche den Wirkstoffnamen (z.B. „Ibuprofen") für bessere Treffer.</p>
          </div>
        )}

        {info && !loading && (
          <div className="space-y-5 text-sm">
            <Section icon={<Pill className="size-4" />} title="Anwendung" content={info.indications_and_usage} />
            <Section icon={<FileText className="size-4" />} title="Dosierung" content={info.dosage_and_administration} />
            <Section icon={<AlertTriangle className="size-4 text-destructive" />} title="Nebenwirkungen" content={info.adverse_reactions} highlight />
            <Section icon={<ShieldAlert className="size-4 text-orange-500" />} title="Warnhinweise" content={info.warnings} />
            <Section icon={<ShieldAlert className="size-4 text-destructive" />} title="Gegenanzeigen" content={info.contraindications} />
            <p className="text-[10px] text-muted-foreground italic pt-2 border-t border-border">
              Quelle: openFDA Drug Label API. Keine medizinische Beratung. Bei Fragen Arzt oder Apotheker konsultieren.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Section({ icon, title, content, highlight }: { icon: React.ReactNode; title: string; content?: string; highlight?: boolean }) {
  if (!content) return null;
  return (
    <div className={highlight ? 'rounded-2xl bg-destructive/5 border border-destructive/20 p-4' : ''}>
      <h4 className="font-medium flex items-center gap-2 mb-2">{icon} {title}</h4>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
        {content.length > 1500 ? content.slice(0, 1500) + '…' : content}
      </p>
    </div>
  );
}
