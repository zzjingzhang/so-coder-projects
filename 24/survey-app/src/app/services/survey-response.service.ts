import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SurveyResponse, QuestionResult } from '../models/survey-response.model';
import { SurveyService } from './survey.service';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyResponseService {
  private readonly STORAGE_KEY = 'survey_app_responses';
  
  private responsesSubject = new BehaviorSubject<SurveyResponse[]>([]);
  public responses$ = this.responsesSubject.asObservable();

  constructor(private surveyService: SurveyService) {
    this.loadResponses();
  }

  private loadResponses(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const responses = JSON.parse(stored).map((r: any) => ({
        ...r,
        submittedAt: new Date(r.submittedAt)
      }));
      this.responsesSubject.next(responses);
    }
  }

  private saveResponsesToStorage(responses: SurveyResponse[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(responses));
    this.responsesSubject.next(responses);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  submitResponse(surveyId: string, respondentId: string, answers: { questionId: string; optionId: string }[]): Observable<SurveyResponse> {
    const newResponse: SurveyResponse = {
      id: this.generateId(),
      surveyId,
      respondentId,
      answers,
      submittedAt: new Date()
    };
    
    const responses = [...this.responsesSubject.value, newResponse];
    this.saveResponsesToStorage(responses);
    
    return of(newResponse);
  }

  hasRespondentCompletedSurvey(surveyId: string, respondentId: string): Observable<boolean> {
    const hasCompleted = this.responsesSubject.value.some(
      r => r.surveyId === surveyId && r.respondentId === respondentId
    );
    return of(hasCompleted);
  }

  getSurveyResults(surveyId: string): Observable<QuestionResult[]> {
    const surveyResponse = this.surveyService.getSurveyById(surveyId);
    
    return new Observable<QuestionResult[]>(observer => {
      surveyResponse.subscribe(survey => {
        if (!survey) {
          observer.next([]);
          observer.complete();
          return;
        }
        
        const responses = this.responsesSubject.value.filter(r => r.surveyId === surveyId);
        const results: QuestionResult[] = [];
        
        for (const question of survey.questions) {
          const optionResults = question.options.map(option => {
            const count = responses.filter(r => 
              r.answers.some(a => a.questionId === question.id && a.optionId === option.id)
            ).length;
            
            return {
              optionId: option.id,
              optionText: option.text,
              count
            };
          });
          
          results.push({
            questionId: question.id,
            questionText: question.text,
            optionResults,
            totalResponses: responses.length
          });
        }
        
        observer.next(results);
        observer.complete();
      });
    });
  }

  getResponsesBySurvey(surveyId: string): Observable<SurveyResponse[]> {
    const responses = this.responsesSubject.value.filter(r => r.surveyId === surveyId);
    return of(responses);
  }
}
