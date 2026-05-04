import { Routes } from '@angular/router';
import { PrincipleComponent } from './pages/principle/principle.component';
import { ExperimentComponent } from './pages/experiment/experiment.component';
import { QuizComponent } from './pages/quiz/quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: 'principle', pathMatch: 'full' },
  { path: 'principle', component: PrincipleComponent },
  { path: 'experiment', component: ExperimentComponent },
  { path: 'quiz', component: QuizComponent },
];
