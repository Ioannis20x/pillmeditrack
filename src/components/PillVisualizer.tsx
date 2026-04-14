import { PillShape, PillColor } from '@/types/medication';
import { cn } from '@/lib/utils';

interface PillVisualizerProps {
  shape: PillShape;
  color: PillColor;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const colorMap: Record<PillColor, string> = {
  coral: 'bg-pill-coral',
  teal: 'bg-pill-teal',
  amber: 'bg-pill-amber',
  lavender: 'bg-pill-lavender',
  blue: 'bg-pill-blue',
  pink: 'bg-pill-pink',
  green: 'bg-pill-green',
  white: 'bg-pill-white border border-border',
};

const sizeMap = {
  xs: { container: 'size-6', pill: 'scale-50' },
  sm: { container: 'size-10', pill: 'scale-75' },
  md: { container: 'size-14', pill: 'scale-100' },
  lg: { container: 'size-20', pill: 'scale-125' },
};

export function PillVisualizer({ shape, color, size = 'md', className }: PillVisualizerProps) {
  const colorClass = colorMap[color];
  const sizeClass = sizeMap[size];

  const pillElement = () => {
    switch (shape) {
      case 'round':
        return <div className={cn('size-7 rounded-full shadow-inner', colorClass)} />;
      case 'oval':
        return <div className={cn('w-10 h-5 rounded-full shadow-inner', colorClass)} />;
      case 'capsule':
        return (
          <div className={cn('w-4 h-10 rounded-full overflow-hidden shadow-inner flex flex-col', colorClass)}>
            <div className="w-full h-1/2 bg-foreground/5" />
          </div>
        );
      case 'rectangle':
        return <div className={cn('w-9 h-5 rounded-md shadow-inner', colorClass)} />;
      case 'diamond':
        return <div className={cn('size-6 rotate-45 rounded-sm shadow-inner', colorClass)} />;
      default:
        return <div className={cn('size-7 rounded-full shadow-inner', colorClass)} />;
    }
  };

  return (
    <div className={cn('rounded-2xl bg-secondary flex items-center justify-center', sizeClass.container, className)}>
      <div className={sizeClass.pill}>
        {pillElement()}
      </div>
    </div>
  );
}
