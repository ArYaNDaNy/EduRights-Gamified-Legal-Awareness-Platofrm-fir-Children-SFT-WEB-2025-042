import { useGamification } from '@/contexts/GamificationContext';
import { BadgeCard } from './BadgeCard';
import { Trophy } from 'lucide-react';

export function BadgesGrid({ showAll = false, limit = 6 }) {
  const { badges } = useGamification();
  
  const displayedBadges = showAll ? badges : badges.slice(0, limit);
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">Badges</h3>
            <p className="text-sm text-muted-foreground">
              {earnedCount} of {badges.length} earned
            </p>
          </div>
        </div>
        {!showAll && (
          <a href="/achievements" className="text-primary text-sm font-medium hover:underline">
            View All →
          </a>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {displayedBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} size="sm" />
        ))}
      </div>
    </div>
  );
}
