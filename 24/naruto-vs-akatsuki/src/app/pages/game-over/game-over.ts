import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule],
  templateUrl: './game-over.html',
  styleUrls: ['./game-over.css']
})
export class GameOverComponent implements OnInit {
  isVictory: boolean = false;
  finalScore: number = 0;
  waveReached: number = 1;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.isVictory = navigation.extras.state['isVictory'] || false;
      this.finalScore = navigation.extras.state['score'] || 0;
      this.waveReached = navigation.extras.state['wave'] || 1;
    }
  }

  ngOnInit(): void {
  }

  restartGame(): void {
    this.router.navigate(['/game']);
  }

  backToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
