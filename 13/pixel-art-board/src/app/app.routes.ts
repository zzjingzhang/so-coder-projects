import { Routes } from '@angular/router';
import { PixelBoardComponent } from './components/pixel-board/pixel-board.component';

export const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'board', component: PixelBoardComponent },
];
