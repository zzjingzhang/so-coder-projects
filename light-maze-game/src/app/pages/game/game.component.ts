import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCanvasComponent } from '../../components/game-canvas/game-canvas.component';
import { StartScreenComponent } from '../../components/start-screen/start-screen.component';
import { LevelInfoComponent } from '../../components/level-info/level-info.component';
import { LevelCompleteComponent } from '../../components/level-complete/level-complete.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    GameCanvasComponent,
    StartScreenComponent,
    LevelInfoComponent,
    LevelCompleteComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  constructor() {}
}
