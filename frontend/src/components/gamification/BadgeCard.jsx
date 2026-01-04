import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BadgeCard({ badge, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const categoryColors = {
    learning: 'from-blue-400 to-blue-600',
    quiz: 'from-green-400 to-green-600',
    streak: 'from-orange-400 to-red-500',
    social: 'from-pink-400 to-purple-500',
    special: 'from-yellow-400 to-amber-500',
  };

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center transition-all duration-300',
          sizeClasses[size],
          badge.earned
            ? `bg-gradient-to-br ${categoryColors[badge.category]} shadow-lg group-hover:scale-110 group-hover:shadow-xl`
            : 'bg-muted'
        )}
      >
        {badge.earned ? (
          <span className="drop-shadow-md">{badge.icon}</span>
        ) : (
          <Lock className="w-6 h-6 text-muted-foreground" />
        )}
        {badge.earned && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
      <div className="text-center">
        <p className={cn(
          'font-semibold text-sm',
          badge.earned ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {badge.name}
        </p>
        {size !== 'sm' && (
          <p className="text-xs text-muted-foreground max-w-[120px]">
            {badge.description}
          </p>
        )}
      </div>
    </div>
  );
}
