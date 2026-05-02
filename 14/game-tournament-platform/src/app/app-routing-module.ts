import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { MatchProgress } from './components/match-progress/match-progress';
import { TeamProfile } from './components/team-profile/team-profile';

const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: Leaderboard, title: '排行榜' },
  { path: 'matches', component: MatchProgress, title: '比赛进度' },
  { path: 'teams', component: TeamProfile, title: '参赛战队' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
