import React, { createContext, useContext, useState } from 'react';

const calculateLevel = (xp) => {
  const baseXp = 100;
  const multiplier = 1.5;
  let level = 1;
  let totalXpRequired = baseXp;
  let xpAccumulated = 0;

  while (xp >= xpAccumulated + totalXpRequired) {
    xpAccumulated += totalXpRequired;
    level++;
    totalXpRequired = Math.floor(baseXp * Math.pow(multiplier, level - 1));
  }

  return {
    level,
    currentLevelXp: xp - xpAccumulated,
    totalXpForNextLevel: totalXpRequired,
  };
};

const initialBadges = [
  { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '👶', earned: true, earnedAt: new Date(), category: 'learning' },
  { id: '2', name: 'Quiz Master', description: 'Score 100% on any quiz', icon: '🏆', earned: true, earnedAt: new Date(), category: 'quiz' },
  { id: '3', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned: false, category: 'streak' },
  { id: '4', name: 'Rights Champion', description: 'Complete all basic rights modules', icon: '⚖️', earned: false, category: 'learning' },
  { id: '5', name: 'Knowledge Seeker', description: 'Read 10 articles in Knowledge Hub', icon: '📚', earned: true, earnedAt: new Date(), category: 'learning' },
  { id: '6', name: 'Social Butterfly', description: 'Share your progress with friends', icon: '🦋', earned: false, category: 'social' },
  { id: '7', name: 'Perfect Score', description: 'Get 5 perfect quiz scores in a row', icon: '💯', earned: false, category: 'quiz' },
  { id: '8', name: 'Early Bird', description: 'Complete a lesson before 8 AM', icon: '🌅', earned: false, category: 'special' },
  { id: '9', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', earned: true, earnedAt: new Date(), category: 'special' },
  { id: '10', name: 'Super Learner', description: 'Reach Level 10', icon: '🌟', earned: false, category: 'special' },
  { id: '11', name: 'Legal Eagle', description: 'Complete all advanced modules', icon: '🦅', earned: false, category: 'learning' },
  { id: '12', name: 'Helping Hand', description: 'Help 5 other learners', icon: '🤝', earned: false, category: 'social' },
];

const initialAchievements = [
  { id: '1', title: 'First Lesson', description: 'Complete your first lesson', progress: 1, maxProgress: 1, xpReward: 50, completed: true, icon: '📖' },
  { id: '2', title: 'Quiz Beginner', description: 'Complete 5 quizzes', progress: 3, maxProgress: 5, xpReward: 100, completed: false, icon: '❓' },
  { id: '3', title: 'Streak Starter', description: 'Learn for 3 days in a row', progress: 2, maxProgress: 3, xpReward: 75, completed: false, icon: '🔥' },
  { id: '4', title: 'Module Master', description: 'Complete 3 learning modules', progress: 1, maxProgress: 3, xpReward: 150, completed: false, icon: '🎓' },
  { id: '5', title: 'Knowledge Explorer', description: 'Read 20 articles', progress: 8, maxProgress: 20, xpReward: 200, completed: false, icon: '🔍' },
  { id: '6', title: 'Point Collector', description: 'Earn 1000 points', progress: 650, maxProgress: 1000, xpReward: 250, completed: false, icon: '💎' },
];

const initialLeaderboard = [
  { rank: 1, name: 'Arjun S.', avatar: '🧑', xp: 4250, level: 12, badges: 8 },
  { rank: 2, name: 'Priya M.', avatar: '👧', xp: 3890, level: 11, badges: 7 },
  { rank: 3, name: 'Rahul K.', avatar: '👦', xp: 3450, level: 10, badges: 6 },
  { rank: 4, name: 'Ananya R.', avatar: '👩', xp: 2980, level: 9, badges: 5 },
  { rank: 5, name: 'You', avatar: '😊', xp: 2450, level: 8, badges: 4 },
  { rank: 6, name: 'Vikram P.', avatar: '🧑', xp: 2100, level: 7, badges: 4 },
  { rank: 7, name: 'Sneha G.', avatar: '👧', xp: 1850, level: 6, badges: 3 },
  { rank: 8, name: 'Amit D.', avatar: '👦', xp: 1600, level: 5, badges: 3 },
  { rank: 9, name: 'Kavya N.', avatar: '👩', xp: 1350, level: 5, badges: 2 },
  { rank: 10, name: 'Rohan B.', avatar: '🧑', xp: 1100, level: 4, badges: 2 },
];

const GamificationContext = createContext(undefined);

export function GamificationProvider({ children }) {
  const [state, setState] = useState(() => {
    const xp = 2450;
    const levelInfo = calculateLevel(xp);
    return {
      xp,
      level: levelInfo.level,
      totalXpForNextLevel: levelInfo.totalXpForNextLevel,
      currentLevelXp: levelInfo.currentLevelXp,
      points: 650,
      streak: 5,
      badges: initialBadges,
      achievements: initialAchievements,
      leaderboard: initialLeaderboard,
      showRewardAnimation: false,
      rewardData: null,
    };
  });

  const addXP = (amount) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      const levelInfo = calculateLevel(newXp);
      const leveledUp = levelInfo.level > prev.level;

      return {
        ...prev,
        xp: newXp,
        level: levelInfo.level,
        totalXpForNextLevel: levelInfo.totalXpForNextLevel,
        currentLevelXp: levelInfo.currentLevelXp,
        showRewardAnimation: true,
        rewardData: leveledUp 
          ? { type: 'level', value: levelInfo.level }
          : { type: 'xp', value: amount },
      };
    });
  };

  const addPoints = (amount) => {
    setState((prev) => ({
      ...prev,
      points: prev.points + amount,
    }));
  };

  const earnBadge = (badgeId) => {
    setState((prev) => {
      const badge = prev.badges.find((b) => b.id === badgeId);
      if (!badge || badge.earned) return prev;

      return {
        ...prev,
        badges: prev.badges.map((b) =>
          b.id === badgeId ? { ...b, earned: true, earnedAt: new Date() } : b
        ),
        showRewardAnimation: true,
        rewardData: { type: 'badge', value: badge.name },
      };
    });
  };

  const updateAchievementProgress = (achievementId, progress) => {
    setState((prev) => {
      const achievement = prev.achievements.find((a) => a.id === achievementId);
      if (!achievement || achievement.completed) return prev;

      const newProgress = Math.min(progress, achievement.maxProgress);
      const completed = newProgress >= achievement.maxProgress;

      return {
        ...prev,
        achievements: prev.achievements.map((a) =>
          a.id === achievementId ? { ...a, progress: newProgress, completed } : a
        ),
        xp: completed ? prev.xp + achievement.xpReward : prev.xp,
        showRewardAnimation: completed,
        rewardData: completed ? { type: 'achievement', value: achievement.title } : null,
      };
    });
  };

  const hideRewardAnimation = () => {
    setState((prev) => ({
      ...prev,
      showRewardAnimation: false,
      rewardData: null,
    }));
  };

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        addXP,
        addPoints,
        earnBadge,
        updateAchievementProgress,
        hideRewardAnimation,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
