import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { SuccessComponent } from './pages/success/success.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: '拼图游戏 - 首页',
  },
  {
    path: 'game',
    component: GameComponent,
    title: '拼图游戏 - 游戏中',
  },
  {
    path: 'success',
    component: SuccessComponent,
    title: '拼图游戏 - 恭喜完成',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
