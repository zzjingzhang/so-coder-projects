export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId: string;
  answers: { questionId: string; optionId: string }[];
  submittedAt: Date;
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  optionResults: { optionId: string; optionText: string; count: number }[];
  totalResponses: number;
}
