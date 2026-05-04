import { Question } from './question.model';

export enum SurveyStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed'
}

export interface Survey {
  id: string;
  title: string;
  questions: Question[];
  status: SurveyStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
