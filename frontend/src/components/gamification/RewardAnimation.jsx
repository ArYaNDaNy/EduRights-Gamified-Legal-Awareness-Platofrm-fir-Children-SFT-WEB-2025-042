import { useEffect, useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';
import { Zap, Star, Trophy, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RewardAnimation() {
  const { showRewardAnimation, rewardData, hideRewardAnimation } = useGamification();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (showRewardAnimation) {
      // Generate confetti particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);

      // Auto-hide after animation
      const timer = setTimeout(() => {
        hideRewardAnimation();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showRewardAnimation, hideRewardAnimation]);

  if (!showRewardAnimation || !rewardData) return null;

  const getIcon = () => {
    switch (rewardData.type) {
      case 'xp':
        return <Zap className="w-16 h-16 text-yellow-400" />;
      case 'level':
        return <Star className="w-16 h-16 text-purple-400" />;
      case 'badge':
        return <Award className="w-16 h-16 text-blue-400" />;
      case 'achievement':
        return <Trophy className="w-16 h-16 text-green-400" />;
    }
  };

  const getMessage = () => {
    switch (rewardData.type) {
      case 'xp':
        return `+${rewardData.value} XP Earned!`;
      case 'level':
        return `Level Up! You're now Level ${rewardData.value}!`;
      case 'badge':
        return `Badge Unlocked: ${rewardData.value}!`;
      case 'achievement':
        return `Achievement Complete: ${rewardData.value}!`;
    }
  };

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={hideRewardAnimation}
    >
      {/* Confetti */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: colors[particle.id % colors.length],
            animationDelay: `${particle.delay}s`,
            animationDuration: '1s',
          }}
        />
      ))}

      {/* Main reward card */}
      <div className="animate-scale-in bg-gradient-to-br from-card via-card to-primary/10 rounded-3xl p-8 shadow-2xl border border-primary/30 text-center max-w-md mx-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping opacity-30">
            {getIcon()}
          </div>
          <div className="relative animate-bounce">
            {getIcon()}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">
          🎉 Congratulations! 🎉
        </h2>
        
        <p className="text-xl font-semibold text-primary mb-4 animate-fade-in">
          {getMessage()}
        </p>

        <p className="text-sm text-muted-foreground animate-fade-in">
          Click anywhere to continue
        </p>

        {/* Sparkle effects */}
        <div className="absolute top-4 left-4 animate-pulse">✨</div>
        <div className="absolute top-4 right-4 animate-pulse delay-100">⭐</div>
        <div className="absolute bottom-4 left-4 animate-pulse delay-200">🌟</div>
        <div className="absolute bottom-4 right-4 animate-pulse delay-300">💫</div>
      </div>
    </div>
  );
}
