import { useLocation, useNavigate } from 'react-router-dom';
import { Pill, CalendarDays, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddMedicationDialog } from './AddMedicationDialog';
import { Medication } from '@/types/medication';

interface BottomNavProps {
  onAddMedication?: (med: Omit<Medication, 'id' | 'taken' | 'createdAt'>) => void;
}

const navItems = [
  { path: '/', icon: Pill, label: 'Heute' },
  { path: '/history', icon: CalendarDays, label: 'Verlauf' },
  { path: '/statistics', icon: BarChart3, label: 'Statistik' },
];

export function BottomNav({ onAddMedication }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="size-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
        {onAddMedication && (
          <div className="flex flex-col items-center justify-center w-16">
            <AddMedicationDialog onAdd={onAddMedication} variant="bottom-nav" />
          </div>
        )}
      </div>
    </nav>
  );
}
