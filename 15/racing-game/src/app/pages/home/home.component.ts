import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCardModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  highScore = 0;

  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.gameState$.subscribe(state => {
      this.highScore = state.highScore;
    });
  }

  startGame(): void {
    this.gameService.resetGame();
    this.router.navigate(['/game']);
  }
}
