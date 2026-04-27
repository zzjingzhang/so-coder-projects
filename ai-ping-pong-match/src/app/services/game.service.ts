import { Injectable, signal, computed, effect } from '@angular/core';
import { 
  Ball, 
  Paddle, 
  Player, 
  GameState, 
  GameSettings, 
  ScoreEvent,
  GameStateChangeEvent
} from '../types/game.types';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly TABLE_WIDTH = 800;
  private readonly TABLE_HEIGHT = 500;
  private readonly PADDLE_WIDTH = 12;
  private readonly PADDLE_HEIGHT = 80;
  private readonly BALL_RADIUS = 8;
  private readonly WINNING_SCORE = 11;
  
  private animationFrameId: number | null = null;
  private lastTime = 0;
  
  public ball = signal<Ball>({
    position: { x: this.TABLE_WIDTH / 2, y: this.TABLE_HEIGHT / 2 },
    velocity: { x: 5, y: 3 },
    radius: this.BALL_RADIUS
  });
  
  public player1 = signal<Player>({
    id: 1,
    name: 'AI Player 1',
    paddle: {
      position: { x: 20, y: this.TABLE_HEIGHT / 2 - this.PADDLE_HEIGHT / 2 },
      width: this.PADDLE_WIDTH,
      height: this.PADDLE_HEIGHT,
      speed: 6
    },
    score: 0,
    color: 'player-red',
    aiLevel: 'medium'
  });
  
  public player2 = signal<Player>({
    id: 2,
    name: 'AI Player 2',
    paddle: {
      position: { x: this.TABLE_WIDTH - 20 - this.PADDLE_WIDTH, y: this.TABLE_HEIGHT / 2 - this.PADDLE_HEIGHT / 2 },
      width: this.PADDLE_WIDTH,
      height: this.PADDLE_HEIGHT,
      speed: 6
    },
    score: 0,
    color: 'player-blue',
    aiLevel: 'medium'
  });
  
  public gameState = signal<GameState>(GameState.IDLE);
  public settings = signal<GameSettings>({
    winningScore: this.WINNING_SCORE,
    ballSpeed: 5,
    paddleSpeed: 6,
    aiLevel: 'medium'
  });
  
  public winner = signal<Player | null>(null);
  public lastScorer = signal<number | null>(null);
  
  public tableDimensions = computed(() => ({
    width: this.TABLE_WIDTH,
    height: this.TABLE_HEIGHT
  }));
  
  constructor() {
    effect(() => {
      if (this.gameState() === GameState.PLAYING) {
        this.startGameLoop();
      } else {
        this.stopGameLoop();
      }
    });
  }
  
  public startGame(): void {
    this.resetGame();
    this.gameState.set(GameState.PLAYING);
  }
  
  public pauseGame(): void {
    if (this.gameState() === GameState.PLAYING) {
      this.gameState.set(GameState.PAUSED);
    }
  }
  
  public resumeGame(): void {
    if (this.gameState() === GameState.PAUSED) {
      this.gameState.set(GameState.PLAYING);
    }
  }
  
  public resetGame(): void {
    this.stopGameLoop();
    
    this.ball.set({
      position: { x: this.TABLE_WIDTH / 2, y: this.TABLE_HEIGHT / 2 },
      velocity: { x: this.settings().ballSpeed, y: this.getRandomYVelocity() },
      radius: this.BALL_RADIUS
    });
    
    this.player1.update(p => ({
      ...p,
      score: 0,
      paddle: {
        ...p.paddle,
        position: { x: 20, y: this.TABLE_HEIGHT / 2 - this.PADDLE_HEIGHT / 2 }
      }
    }));
    
    this.player2.update(p => ({
      ...p,
      score: 0,
      paddle: {
        ...p.paddle,
        position: { x: this.TABLE_WIDTH - 20 - this.PADDLE_WIDTH, y: this.TABLE_HEIGHT / 2 - this.PADDLE_HEIGHT / 2 }
      }
    }));
    
    this.winner.set(null);
    this.lastScorer.set(null);
    this.gameState.set(GameState.IDLE);
  }
  
  private getRandomYVelocity(): number {
    return (Math.random() - 0.5) * 8;
  }
  
  private startGameLoop(): void {
    if (this.animationFrameId === null) {
      this.lastTime = performance.now();
      this.gameLoop(this.lastTime);
    }
  }
  
  private stopGameLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  private gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - this.lastTime) / 16.67;
    this.lastTime = currentTime;
    
    if (this.gameState() === GameState.PLAYING) {
      this.updateBall(deltaTime);
      this.updateAIPlayers(deltaTime);
      this.checkCollisions();
      this.checkScore();
    }
    
    this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  private updateBall(deltaTime: number): void {
    this.ball.update(ball => ({
      ...ball,
      position: {
        x: ball.position.x + ball.velocity.x * deltaTime,
        y: ball.position.y + ball.velocity.y * deltaTime
      }
    }));
  }
  
  private updateAIPlayers(deltaTime: number): void {
    const ball = this.ball();
    const player1 = this.player1();
    const player2 = this.player2();
    
    this.updateAIPaddle(player1, ball, deltaTime, true);
    this.updateAIPaddle(player2, ball, deltaTime, false);
  }
  
  private updateAIPaddle(player: Player, ball: Ball, deltaTime: number, isLeftPlayer: boolean): void {
    const aiLevel = this.getAILevelModifier(player.aiLevel);
    const paddleCenter = player.paddle.position.y + player.paddle.height / 2;
    
    let targetY: number;
    
    if (this.shouldMoveTowardsBall(ball, isLeftPlayer)) {
      const predictedY = this.predictBallY(ball, isLeftPlayer);
      const randomOffset = (Math.random() - 0.5) * (1 - aiLevel) * 100;
      targetY = predictedY + randomOffset;
    } else {
      targetY = this.TABLE_HEIGHT / 2;
    }
    
    const diff = targetY - paddleCenter;
    const moveAmount = Math.min(Math.abs(diff), player.paddle.speed * deltaTime * aiLevel);
    const direction = diff > 0 ? 1 : -1;
    
    const playerUpdate = isLeftPlayer ? this.player1 : this.player2;
    playerUpdate.update(p => ({
      ...p,
      paddle: {
        ...p.paddle,
        position: {
          ...p.paddle.position,
          y: Math.max(0, Math.min(this.TABLE_HEIGHT - p.paddle.height, p.paddle.position.y + direction * moveAmount))
        }
      }
    }));
  }
  
  private getAILevelModifier(level: 'easy' | 'medium' | 'hard'): number {
    switch (level) {
      case 'easy': return 0.6;
      case 'medium': return 0.8;
      case 'hard': return 1.0;
    }
  }
  
  private shouldMoveTowardsBall(ball: Ball, isLeftPlayer: boolean): boolean {
    if (isLeftPlayer) {
      return ball.velocity.x < 0;
    } else {
      return ball.velocity.x > 0;
    }
  }
  
  private predictBallY(ball: Ball, isLeftPlayer: boolean): number {
    const targetX = isLeftPlayer ? 30 : this.TABLE_WIDTH - 30;
    const distanceX = Math.abs(targetX - ball.position.x);
    const timeToReach = distanceX / Math.abs(ball.velocity.x);
    let predictedY = ball.position.y + ball.velocity.y * timeToReach;
    
    while (predictedY < 0 || predictedY > this.TABLE_HEIGHT) {
      if (predictedY < 0) {
        predictedY = -predictedY;
      } else if (predictedY > this.TABLE_HEIGHT) {
        predictedY = 2 * this.TABLE_HEIGHT - predictedY;
      }
    }
    
    return predictedY;
  }
  
  private checkCollisions(): void {
    const ball = this.ball();
    const player1 = this.player1();
    const player2 = this.player2();
    
    if (ball.position.y - ball.radius <= 0 || ball.position.y + ball.radius >= this.TABLE_HEIGHT) {
      this.ball.update(b => ({
        ...b,
        velocity: { ...b.velocity, y: -b.velocity.y }
      }));
    }
    
    if (this.checkPaddleCollision(ball, player1.paddle, true)) {
      this.handlePaddleHit(player1);
    }
    
    if (this.checkPaddleCollision(ball, player2.paddle, false)) {
      this.handlePaddleHit(player2);
    }
  }
  
  private checkPaddleCollision(ball: Ball, paddle: Paddle, isLeftPaddle: boolean): boolean {
    const ballLeft = ball.position.x - ball.radius;
    const ballRight = ball.position.x + ball.radius;
    const ballTop = ball.position.y - ball.radius;
    const ballBottom = ball.position.y + ball.radius;
    
    const paddleLeft = paddle.position.x;
    const paddleRight = paddle.position.x + paddle.width;
    const paddleTop = paddle.position.y;
    const paddleBottom = paddle.position.y + paddle.height;
    
    const horizontalCollision = isLeftPaddle 
      ? ballLeft <= paddleRight && ballLeft >= paddleLeft
      : ballRight >= paddleLeft && ballRight <= paddleRight;
    
    const verticalCollision = ballBottom >= paddleTop && ballTop <= paddleBottom;
    
    return horizontalCollision && verticalCollision;
  }
  
  private handlePaddleHit(player: Player): void {
    const ball = this.ball();
    const paddleCenter = player.paddle.position.y + player.paddle.height / 2;
    const hitPosition = (ball.position.y - paddleCenter) / (player.paddle.height / 2);
    
    const speedMultiplier = 1.05;
    const newSpeedX = -ball.velocity.x * speedMultiplier;
    const newSpeedY = hitPosition * 6 + (Math.random() - 0.5) * 2;
    
    this.ball.update(b => ({
      ...b,
      velocity: { x: newSpeedX, y: newSpeedY }
    }));
  }
  
  private checkScore(): void {
    const ball = this.ball();
    
    if (ball.position.x - ball.radius <= 0) {
      this.scorePoint(2);
    } else if (ball.position.x + ball.radius >= this.TABLE_WIDTH) {
      this.scorePoint(1);
    }
  }
  
  private scorePoint(playerId: number): void {
    const playerUpdate = playerId === 1 ? this.player1 : this.player2;
    const newScore = playerUpdate().score + 1;
    
    playerUpdate.update(p => ({ ...p, score: newScore }));
    this.lastScorer.set(playerId);
    
    if (newScore >= this.settings().winningScore) {
      this.winner.set(playerId === 1 ? this.player1() : this.player2());
      this.gameState.set(GameState.FINISHED);
    } else {
      this.resetBall(playerId);
    }
  }
  
  private resetBall(lastScorerId: number): void {
    const direction = lastScorerId === 1 ? 1 : -1;
    
    this.ball.set({
      position: { x: this.TABLE_WIDTH / 2, y: this.TABLE_HEIGHT / 2 },
      velocity: { x: this.settings().ballSpeed * direction, y: this.getRandomYVelocity() },
      radius: this.BALL_RADIUS
    });
  }
  
  public setAIDifficulty(level: 'easy' | 'medium' | 'hard'): void {
    this.settings.update(s => ({ ...s, aiLevel: level }));
    this.player1.update(p => ({ ...p, aiLevel: level }));
    this.player2.update(p => ({ ...p, aiLevel: level }));
  }
}
