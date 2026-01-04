import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { XPProgressBar } from '@/components/gamification/XPProgressBar';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { AchievementCard } from '@/components/gamification/AchievementCard';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { useGamification } from '@/contexts/GamificationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Award, Target, Users } from 'lucide-react';

export default function Achievements() {
  const { badges, achievements, addXP } = useGamification();

  const badgeCategories = [
    { key: 'all', label: 'All Badges' },
    { key: 'learning', label: 'Learning' },
    { key: 'quiz', label: 'Quizzes' },
    { key: 'streak', label: 'Streaks' },
    { key: 'social', label: 'Social' },
    { key: 'special', label: 'Special' },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Achievements & Rewards</h1>
            <p className="text-muted-foreground">Track your progress and earn rewards!</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <PointsDisplay />
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <XPProgressBar />
        </div>

        {/* Demo button to test animations */}
        <div className="mb-8">
          <button
            onClick={() => addXP(50)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            🎮 Earn 50 XP (Demo)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Your Badges</h2>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 flex-wrap h-auto gap-2">
                  {badgeCategories.map((cat) => (
                    <TabsTrigger key={cat.key} value={cat.key} className="text-sm">
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {badgeCategories.map((cat) => (
                  <TabsContent key={cat.key} value={cat.key}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {badges
                        .filter((b) => cat.key === 'all' || b.category === cat.key)
                        .map((badge) => (
                          <BadgeCard key={badge.id} badge={badge} size="md" />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Achievements Section */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Achievements</h2>
                <span className="text-sm text-muted-foreground">
                  ({achievements.filter((a) => a.completed).length}/{achievements.length} completed)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <Leaderboard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
