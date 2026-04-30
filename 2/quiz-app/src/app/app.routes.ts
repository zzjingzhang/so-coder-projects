import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { DemoComponent } from './components/demo/demo.component';

export const routes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];
