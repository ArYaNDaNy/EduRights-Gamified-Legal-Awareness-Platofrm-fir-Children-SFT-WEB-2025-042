import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext(undefined);

// Sample quiz data
const initialQuizzes = [
  {
    id: '1',
    title: 'Basic Rights Fundamentals',
    description: 'Test your knowledge on fundamental rights',
    category: 'Rights',
    difficulty: 'Easy',
    questions: 10,
    duration: 15,
    thumbnail: '⚖️',
    completed: false,
    score: null,
  },
  {
    id: '2',
    title: 'Constitutional Law Quiz',
    description: 'Advanced questions on constitutional law',
    category: 'Law',
    difficulty: 'Hard',
    questions: 15,
    duration: 20,
    thumbnail: '📜',
    completed: true,
    score: 85,
  },
  {
    id: '3',
    title: 'Human Rights Basics',
    description: 'Understanding human rights principles',
    category: 'Rights',
    difficulty: 'Medium',
    questions: 12,
    duration: 18,
    thumbnail: '🤝',
    completed: false,
    score: null,
  },
  {
    id: '4',
    title: 'Legal Procedures',
    description: 'Learn about legal procedures and processes',
    category: 'Law',
    difficulty: 'Medium',
    questions: 10,
    duration: 15,
    thumbnail: '⚖️',
    completed: true,
    score: 92,
  },
];

// Sample questions for a quiz
const sampleQuestions = [
  {
    id: 'q1',
    question: 'What is the fundamental right to freedom of speech protected under?',
    options: [
      'Article 19',
      'Article 21',
      'Article 14',
      'Article 32',
    ],
    correctAnswer: 0,
  },
  {
    id: 'q2',
    question: 'Which article guarantees the right to life and personal liberty?',
    options: [
      'Article 19',
      'Article 20',
      'Article 21',
      'Article 22',
    ],
    correctAnswer: 2,
  },
  {
    id: 'q3',
    question: 'The right to equality is enshrined in which articles?',
    options: [
      'Articles 12-18',
      'Articles 14-18',
      'Articles 19-22',
      'Articles 23-24',
    ],
    correctAnswer: 1,
  },
];

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);

  const startQuiz = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    setCurrentQuiz(quiz);
    setCurrentQuestions(sampleQuestions);
    setUserAnswers({});
    setQuizStartTime(Date.now());
  };

  const submitAnswer = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const finishQuiz = () => {
    const correct = currentQuestions.filter(
      (q) => userAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correct / currentQuestions.length) * 100);
    
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === currentQuiz.id
          ? { ...q, completed: true, score }
          : q
      )
    );

    const timeTaken = Math.round((Date.now() - quizStartTime) / 1000 / 60);
    
    return {
      score,
      correct,
      total: currentQuestions.length,
      timeTaken,
    };
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestions([]);
    setUserAnswers({});
    setQuizStartTime(null);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        currentQuiz,
        currentQuestions,
        userAnswers,
        startQuiz,
        submitAnswer,
        finishQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
