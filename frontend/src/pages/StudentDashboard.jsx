import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { XPProgressBar } from "@/components/gamification/XPProgressBar";
import { BadgesGrid } from "@/components/gamification/BadgesGrid";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { BookOpen, Trophy, Clock, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from "react-router-dom";

const studentStats = [
  {
    title: "Quizzes Completed",
    value: "12",
    change: "+3",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    title: "Badges Earned",
    value: "8",
    change: "+1",
    icon: Trophy,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    title: "Study Time",
    value: "14h 30m",
    change: "+2h",
    icon: Clock,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    title: "Average Score",
    value: "92%",
    change: "+4%",
    icon: TrendingUp,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey today
          </p>
        </div>

        {/* Gamification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {studentStats.map((stat, index) => (
            <div key={index} className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('p-2 rounded-xl border', stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  +{stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <XPProgressBar />
        </div>

        {/* Badges */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Your Badges</h2>
            <Link to="/achievements" className="text-primary hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          <BadgesGrid limit={8} />
        </div>

        {/* Quick Actions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-2xl p-8 hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Take Quiz</h3>
                <p className="text-sm text-muted-foreground">Test your knowledge</p>
              </div>
            </div>
            <Link to="/quizzes" className="text-blue-500 hover:underline font-medium">Start Now →</Link>
          </div>

          <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-2xl p-8 hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Achievements</h3>
                <p className="text-sm text-muted-foreground">View your progress</p>
              </div>
            </div>
            <Link to="/achievements" className="text-green-500 hover:underline font-medium">View Badges →</Link>
          </div>

          <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-2xl p-8 hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Daily Goals</h3>
                <p className="text-sm text-muted-foreground">Complete today's targets</p>
              </div>
            </div>
            <button className="text-orange-500 hover:underline font-medium">View Goals →</button>
          </div>
        </div> */}

        {/* Points Display */}
        <div className="mb-8">
          <PointsDisplay />
        </div>
      </div>
    </DashboardLayout>
  );
}
