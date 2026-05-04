export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  timeRemaining: number;
  isCompleted: boolean;
  answers: (number | null)[];
}
