import { useGamification } from '@/contexts/GamificationContext';
import { Coins, Zap, Flame, Trophy } from 'lucide-react';

export function PointsDisplay() {
  const { points, xp, streak, badges } = useGamification();
  const earnedBadges = badges.filter((b) => b.earned).length;

  const stats = [
    {
      icon: Coins,
      label: 'Points',
      value: points,
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: Zap,
      label: 'Total XP',
      value: xp,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: streak,
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: Trophy,
      label: 'Badges',
      value: earnedBadges,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
