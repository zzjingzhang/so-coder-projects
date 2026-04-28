export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomQuestions = (questions, count, excludeIds = []) => {
  const availableQuestions = questions.filter(q => !excludeIds.includes(q.id));
  const shuffled = shuffleArray(availableQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const saveProgressToLocalStorage = (progress) => {
  localStorage.setItem('quizProgress', JSON.stringify(progress));
};

export const getProgressFromLocalStorage = () => {
  const saved = localStorage.getItem('quizProgress');
  return saved ? JSON.parse(saved) : null;
};

export const clearProgressFromLocalStorage = () => {
  localStorage.removeItem('quizProgress');
};

export const saveScoreToLocalStorage = (score) => {
  const scores = getScoresFromLocalStorage();
  scores.push({
    ...score,
    date: new Date().toISOString()
  });
  localStorage.setItem('quizScores', JSON.stringify(scores));
};

export const getScoresFromLocalStorage = () => {
  const saved = localStorage.getItem('quizScores');
  return saved ? JSON.parse(saved) : [];
};
