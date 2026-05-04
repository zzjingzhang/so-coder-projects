import { createContext, useContext, useState } from 'react';

const PracticeContext = createContext();

export const PracticeProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [practiceTime, setPracticeTime] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const resetPractice = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectWords([]);
    setStartTime(null);
    setEndTime(null);
  };

  const value = {
    words,
    setWords,
    practiceTime,
    setPracticeTime,
    currentIndex,
    setCurrentIndex,
    correctCount,
    setCorrectCount,
    incorrectWords,
    setIncorrectWords,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    resetPractice,
  };

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  );
};

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};
