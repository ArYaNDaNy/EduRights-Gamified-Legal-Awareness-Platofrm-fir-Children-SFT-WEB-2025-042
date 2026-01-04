import { useGamification } from '@/contexts/GamificationContext';
import { Crown, Medal, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Leaderboard() {
  const { leaderboard } = useGamification();

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank, isYou) => {
    if (isYou) return 'bg-primary/10 border-primary';
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-300';
      default:
        return 'bg-card border-border hover:border-primary/30';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg">Leaderboard</h3>
          <p className="text-sm text-muted-foreground">Top learners this week</p>
        </div>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry) => {
          const isYou = entry.name === 'You';
          return (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center gap-4 p-3 rounded-xl border transition-all duration-200',
                getRankBg(entry.rank, isYou),
                isYou && 'ring-2 ring-primary/50'
              )}
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                {entry.avatar}
              </div>

              <div className="flex-1">
                <p className={cn(
                  'font-semibold',
                  isYou ? 'text-primary' : 'text-foreground'
                )}>
                  {entry.name} {isYou && '(You)'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Level {entry.level} • {entry.badges} badges
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-foreground">{entry.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>

              {entry.rank <= 3 && (
                <TrendingUp className="w-4 h-4 text-green-500" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
