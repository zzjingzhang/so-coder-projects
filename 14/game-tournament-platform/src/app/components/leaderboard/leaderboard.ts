import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

export interface Player {
  id: number;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  team: string;
  wins: number;
  losses: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
  standalone: false
})
export class Leaderboard implements OnInit {
  players: Player[] = [
    { id: 1, name: '张伟', avatar: '🎮', score: 9850, rank: 1, team: '龙之队', wins: 42, losses: 8 },
    { id: 2, name: '李娜', avatar: '🎯', score: 8720, rank: 2, team: '闪电战队', wins: 38, losses: 12 },
    { id: 3, name: '王强', avatar: '⚔️', score: 7950, rank: 3, team: '暗影猎人', wins: 35, losses: 15 },
    { id: 4, name: '刘洋', avatar: '🔥', score: 7200, rank: 4, team: '龙之队', wins: 32, losses: 18 },
    { id: 5, name: '陈静', avatar: '💎', score: 6850, rank: 5, team: '极光战队', wins: 30, losses: 20 },
    { id: 6, name: '杨磊', avatar: '🌙', score: 6100, rank: 6, team: '闪电战队', wins: 28, losses: 22 },
    { id: 7, name: '赵敏', avatar: '⭐', score: 5750, rank: 7, team: '暗影猎人', wins: 26, losses: 24 },
    { id: 8, name: '黄涛', avatar: '🚀', score: 5200, rank: 8, team: '极光战队', wins: 24, losses: 26 },
  ];

  displayedPlayers: Player[] = [];
  isAnimating = false;

  ngOnInit(): void {
    this.displayedPlayers = [...this.players];
    
    interval(5000).pipe(
      startWith(0),
      tap(() => this.updateScores())
    ).subscribe();
  }

  updateScores(): void {
    this.isAnimating = true;
    
    this.players.forEach(player => {
      const change = Math.floor(Math.random() * 200) - 50;
      player.score = Math.max(0, player.score + change);
    });

    this.players.sort((a, b) => b.score - a.score);
    this.players.forEach((player, index) => {
      player.rank = index + 1;
    });

    this.displayedPlayers = [...this.players];
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  getRankBadgeClass(rank: number): string {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 shadow-lg shadow-gray-400/30';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30';
      default: return 'bg-slate-600 text-white shadow-md';
    }
  }

  getScoreChange(score: number): string {
    const random = Math.random();
    if (random > 0.7) {
      return `+${Math.floor(Math.random() * 50)}`;
    } else if (random < 0.3) {
      return `-${Math.floor(Math.random() * 30)}`;
    }
    return '';
  }
}
