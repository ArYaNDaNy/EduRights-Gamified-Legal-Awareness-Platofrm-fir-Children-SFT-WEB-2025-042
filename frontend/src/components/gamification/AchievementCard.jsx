import { Progress } from '@/components/ui/progress';
import { Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AchievementCard({ achievement }) {
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <div
      className={cn(
        'bg-card rounded-xl p-4 border transition-all duration-300 hover:shadow-lg',
        achievement.completed
          ? 'border-green-500/50 bg-green-50 dark:bg-green-900/20'
          : 'border-border hover:border-primary/50'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
            achievement.completed
              ? 'bg-green-500 shadow-lg'
              : 'bg-muted'
          )}
        >
          {achievement.completed ? (
            <CheckCircle2 className="w-6 h-6 text-white" />
          ) : (
            <span>{achievement.icon}</span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground">{achievement.title}</h4>
            <div className="flex items-center gap-1 text-primary">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">+{achievement.xpReward} XP</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

          <div className="space-y-1">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{achievement.progress} / {achievement.maxProgress}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
