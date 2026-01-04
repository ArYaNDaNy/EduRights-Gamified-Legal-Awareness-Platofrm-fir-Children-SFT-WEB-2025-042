import { useGamification } from '@/contexts/GamificationContext';
import { Zap, Star, Flame } from 'lucide-react';

export function XPProgressBar() {
  const { level, currentLevelXp, totalXpForNextLevel, xp, streak } = useGamification();
  const progressPercentage = (currentLevelXp / totalXpForNextLevel) * 100;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {level}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Level</p>
            <p className="font-bold text-foreground text-lg">Level {level}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-full">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-600 dark:text-orange-400">{streak} day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-yellow-600 dark:text-yellow-400">{xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-pulse rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-primary" />
            {currentLevelXp} XP
          </span>
          <span>{totalXpForNextLevel - currentLevelXp} XP to Level {level + 1}</span>
        </div>
      </div>
    </div>
  );
}
