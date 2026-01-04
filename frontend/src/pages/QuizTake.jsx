import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuizTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentQuiz, currentQuestions, userAnswers, startQuiz, submitAnswer, finishQuiz, resetQuiz } = useQuiz();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    startQuiz(id);
    return () => resetQuiz();
  }, [id]);

  useEffect(() => {
    if (currentQuiz) {
      setTimeLeft(currentQuiz.duration * 60);
    }
  }, [currentQuiz]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    submitAnswer(currentQuestion.id, answerIndex);
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    const quizResults = finishQuiz();
    setResults(quizResults);
    setShowResults(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuiz || !currentQuestions.length) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (showResults && results) {
    return (
      <DashboardLayout>
        <div className="p-8 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎉</span>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Completed!</h1>
              <p className="text-muted-foreground mb-8">Great job on finishing the quiz</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-3xl font-bold text-primary mb-1">{results.score}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-3xl font-bold text-foreground mb-1">{results.correct}/{results.total}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-3xl font-bold text-foreground mb-1">{results.timeTaken}</p>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate('/quizzes')}>
                  Back to Quizzes
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  startQuiz(id);
                }}>
                  Retake Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const selectedAnswer = userAnswers[currentQuestion.id];

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">{currentQuiz.title}</h1>
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono font-semibold text-foreground">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border-2 transition-all',
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      selectedAnswer === index
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    )}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-foreground">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentQuestionIndex === currentQuestions.length - 1 ? (
              <Button onClick={handleFinishQuiz}>
                Finish Quiz
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
