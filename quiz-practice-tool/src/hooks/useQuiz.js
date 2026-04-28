import { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/mockData';
import { 
  getRandomQuestions, 
  saveProgressToLocalStorage, 
  getProgressFromLocalStorage,
  clearProgressFromLocalStorage,
  saveScoreToLocalStorage
} from '../utils';

export const useQuiz = (category = 'all', questionCount = 5) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [quizStatus, setQuizStatus] = useState('idle');
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const initializeQuiz = useCallback(() => {
    let filteredQuestions = questions;
    if (category !== 'all') {
      filteredQuestions = questions.filter(q => q.category === category);
    }
    
    const randomQuestions = getRandomQuestions(filteredQuestions, questionCount);
    setQuizQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setTotalAnswered(0);
    setQuizStatus('active');
    setAnsweredQuestions([]);
    clearProgressFromLocalStorage();
  }, [category, questionCount]);

  const resumeQuiz = useCallback(() => {
    const savedProgress = getProgressFromLocalStorage();
    if (savedProgress) {
      setQuizQuestions(savedProgress.quizQuestions);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setScore(savedProgress.score);
      setTotalAnswered(savedProgress.totalAnswered);
      setAnsweredQuestions(savedProgress.answeredQuestions || []);
      setQuizStatus('active');
      return true;
    }
    return false;
  }, []);

  const selectAnswer = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    
    setIsCorrect(correct);
    setIsAnswered(true);
    setTotalAnswered(prev => prev + 1);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: correct
      }
    ]);

    saveProgressToLocalStorage({
      quizQuestions,
      currentQuestionIndex,
      score: correct ? score + 1 : score,
      totalAnswered: totalAnswered + 1,
      answeredQuestions: [
        ...answeredQuestions,
        {
          questionId: currentQuestion.id,
          selectedAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: correct
        }
      ]
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
      
      saveProgressToLocalStorage({
        quizQuestions,
        currentQuestionIndex: currentQuestionIndex + 1,
        score,
        totalAnswered,
        answeredQuestions
      });
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizStatus('finished');
    saveScoreToLocalStorage({
      score,
      totalQuestions: quizQuestions.length,
      category,
      percentage: Math.round((score / quizQuestions.length) * 100)
    });
    clearProgressFromLocalStorage();
  };

  const resetQuiz = () => {
    initializeQuiz();
  };

  useEffect(() => {
    if (quizStatus === 'active' && isAnswered) {
      const timer = setTimeout(() => {
        goToNextQuestion();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnswered, quizStatus]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = quizQuestions.length > 0 
    ? ((currentQuestionIndex + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100 
    : 0;

  return {
    quizStatus,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: quizQuestions.length,
    selectedAnswer,
    isAnswered,
    isCorrect,
    score,
    totalAnswered,
    progress,
    initializeQuiz,
    resumeQuiz,
    selectAnswer,
    submitAnswer,
    goToNextQuestion,
    resetQuiz,
    finishQuiz,
    answeredQuestions,
    quizQuestions
  };
};
