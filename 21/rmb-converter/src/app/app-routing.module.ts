import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinConverterComponent } from './coin-converter/coin-converter.component';
import { GameComponent } from './game/game.component';
import { InstructionsComponent } from './instructions/instructions.component';

const routes: Routes = [
  { path: '', redirectTo: '/converter', pathMatch: 'full' },
  { path: 'converter', component: CoinConverterComponent },
  { path: 'game', component: GameComponent },
  { path: 'instructions', component: InstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
