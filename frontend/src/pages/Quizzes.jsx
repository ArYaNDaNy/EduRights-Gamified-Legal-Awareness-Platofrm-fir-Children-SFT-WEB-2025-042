import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, BookOpen, Trophy, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Quizzes() {
  const { quizzes } = useQuiz();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || quiz.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and track your progress</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterDifficulty === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterDifficulty('all')}
            >
              All
            </Button>
            <Button
              variant={filterDifficulty === 'Easy' ? 'default' : 'outline'}
              onClick={() => setFilterDifficulty('Easy')}
            >
              Easy
            </Button>
            <Button
              variant={filterDifficulty === 'Medium' ? 'default' : 'outline'}
              onClick={() => setFilterDifficulty('Medium')}
            >
              Medium
            </Button>
            <Button
              variant={filterDifficulty === 'Hard' ? 'default' : 'outline'}
              onClick={() => setFilterDifficulty('Hard')}
            >
              Hard
            </Button>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              {/* Quiz Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl mb-4">
                {quiz.thumbnail}
              </div>

              {/* Quiz Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{quiz.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getDifficultyColor(quiz.difficulty))}>
                    {quiz.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {quiz.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.duration} min</span>
                  </div>
                </div>
              </div>

              {/* Quiz Status */}
              {quiz.completed ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">Score: {quiz.score}%</span>
                  </div>
                  <Link to={`/quiz/${quiz.id}`}>
                    <Button variant="outline" size="sm">Retake</Button>
                  </Link>
                </div>
              ) : (
                <Link to={`/quiz/${quiz.id}`}>
                  <Button className="w-full">Start Quiz</Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No quizzes found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
