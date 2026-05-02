import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

export interface Match {
  id: number;
  teamA: {
    name: string;
    logo: string;
    score: number;
    players: string[];
  };
  teamB: {
    name: string;
    logo: string;
    score: number;
    players: string[];
  };
  status: 'upcoming' | 'live' | 'finished';
  progress: number;
  stage: string;
  startTime: string;
  currentRound: string;
}

@Component({
  selector: 'app-match-progress',
  templateUrl: './match-progress.html',
  styleUrl: './match-progress.css',
  standalone: false
})
export class MatchProgress implements OnInit {
  currentMatch: Match = {
    id: 1,
    teamA: {
      name: '龙之队',
      logo: '🐉',
      score: 2,
      players: ['张伟', '刘洋', '陈明', '赵阳']
    },
    teamB: {
      name: '闪电战队',
      logo: '⚡',
      score: 1,
      players: ['李娜', '杨磊', '王芳', '刘强']
    },
    status: 'live',
    progress: 65,
    stage: '半决赛',
    startTime: '19:00',
    currentRound: '第三回合'
  };

  upcomingMatches: Match[] = [
    {
      id: 2,
      teamA: {
        name: '暗影猎人',
        logo: '🌙',
        score: 0,
        players: ['王强', '赵敏', '周杰', '吴鹏']
      },
      teamB: {
        name: '极光战队',
        logo: '💎',
        score: 0,
        players: ['陈静', '黄涛', '林达', '郑天']
      },
      status: 'upcoming',
      progress: 0,
      stage: '半决赛',
      startTime: '21:00',
      currentRound: ''
    }
  ];

  finishedMatches: Match[] = [
    {
      id: 3,
      teamA: {
        name: '龙之队',
        logo: '🐉',
        score: 3,
        players: []
      },
      teamB: {
        name: '极光战队',
        logo: '💎',
        score: 1,
        players: []
      },
      status: 'finished',
      progress: 100,
      stage: '四分之一决赛',
      startTime: '昨天 19:00',
      currentRound: ''
    }
  ];

  progressValue = 0;
  isLive = true;

  ngOnInit(): void {
    this.animateProgress();
    
    interval(3000).pipe(
      startWith(0)
    ).subscribe(() => {
      this.updateLiveMatch();
    });
  }

  animateProgress(): void {
    this.progressValue = 0;
    const target = this.currentMatch.progress;
    const step = target / 50;
    
    const interval = setInterval(() => {
      this.progressValue += step;
      if (this.progressValue >= target) {
        this.progressValue = target;
        clearInterval(interval);
      }
    }, 30);
  }

  updateLiveMatch(): void {
    if (this.currentMatch.status === 'live') {
      const random = Math.random();
      if (random > 0.85) {
        const teamToScore = Math.random() > 0.5 ? 'A' : 'B';
        if (teamToScore === 'A') {
          this.currentMatch.teamA.score++;
        } else {
          this.currentMatch.teamB.score++;
        }
      }

      if (this.currentMatch.progress < 100) {
        this.currentMatch.progress = Math.min(100, this.currentMatch.progress + Math.random() * 3);
        this.animateProgress();
      }

      const rounds = ['第一回合', '第二回合', '第三回合', '第四回合', '决胜回合'];
      const roundIndex = Math.floor(this.currentMatch.progress / 20);
      this.currentMatch.currentRound = rounds[Math.min(roundIndex, rounds.length - 1)];
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'live': return 'text-red-500';
      case 'upcoming': return 'text-accent';
      case 'finished': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'live': return '进行中';
      case 'upcoming': return '即将开始';
      case 'finished': return '已结束';
      default: return '';
    }
  }

  getProgressColor(): string {
    if (this.progressValue >= 80) return 'accent';
    if (this.progressValue >= 50) return 'primary';
    return 'secondary';
  }

  getWinner(match: Match): string {
    if (match.teamA.score > match.teamB.score) {
      return match.teamA.name;
    } else if (match.teamB.score > match.teamA.score) {
      return match.teamB.name;
    }
    return '平局';
  }
}
