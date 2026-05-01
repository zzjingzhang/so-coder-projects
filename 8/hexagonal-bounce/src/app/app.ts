import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
import { PhysicsEngineService, Ball, Hexagon } from './physics-engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('hexagonal-bounce');

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private lastTime: number = 0;

  ball: Ball = {
    position: { x: 400, y: 300 },
    velocity: { x: 100, y: 0 },
    radius: 15,
    mass: 1
  };

  hexagon: Hexagon = {
    center: { x: 400, y: 300 },
    radius: 250,
    rotation: 0,
    angularVelocity: 0.5
  };

  gravity = signal(980);
  friction = signal(0.98);
  restitution = signal(0.7);
  rotationSpeed = signal(0.5);
  isRunning = signal(true);

  constructor(private physicsEngine: PhysicsEngineService) {}

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.lastTime = performance.now();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas(): void {
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      this.hexagon.center = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      };
      const minDimension = Math.min(this.canvas.width, this.canvas.height);
      this.hexagon.radius = minDimension * 0.4;
      if (this.ball.position.x === 400 && this.ball.position.y === 300) {
        this.ball.position = {
          x: this.canvas.width / 2,
          y: this.canvas.height / 2 - 50
        };
      }
    }
  }

  startAnimation(): void {
    this.isRunning.set(true);
    this.lastTime = performance.now();
    this.animate();
  }

  stopAnimation(): void {
    this.isRunning.set(false);
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate(): void {
    if (!this.isRunning()) return;

    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.016);
    this.lastTime = currentTime;

    this.physicsEngine.gravity = this.gravity();
    this.physicsEngine.friction = this.friction();
    this.physicsEngine.restitution = this.restitution();
    this.hexagon.angularVelocity = this.rotationSpeed();

    this.physicsEngine.updateHexagon(this.hexagon, deltaTime);
    
    const maxSpeed = 1500;
    const speed = Math.sqrt(this.ball.velocity.x * this.ball.velocity.x + this.ball.velocity.y * this.ball.velocity.y);
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      this.ball.velocity.x *= scale;
      this.ball.velocity.y *= scale;
    }

    const subSteps = 4;
    const subDeltaTime = deltaTime / subSteps;
    
    for (let i = 0; i < subSteps; i++) {
      this.physicsEngine.updateBall(this.ball, subDeltaTime);
      this.physicsEngine.checkAndResolveAllCollisions(this.ball, this.hexagon, 8);
    }

    const isInside = this.physicsEngine.isPointInsideHexagon(this.ball.position, this.hexagon);
    if (!isInside) {
      const toCenter: { x: number; y: number } = {
        x: this.hexagon.center.x - this.ball.position.x,
        y: this.hexagon.center.y - this.ball.position.y
      };
      const dist = Math.sqrt(toCenter.x * toCenter.x + toCenter.y * toCenter.y);
      if (dist > 0) {
        toCenter.x /= dist;
        toCenter.y /= dist;
        this.ball.position.x += toCenter.x * 10;
        this.ball.position.y += toCenter.y * 10;
        
        const dot = this.ball.velocity.x * toCenter.x + this.ball.velocity.y * toCenter.y;
        if (dot < 0) {
          this.ball.velocity.x -= 2 * dot * toCenter.x;
          this.ball.velocity.y -= 2 * dot * toCenter.y;
          this.ball.velocity.x *= 0.7;
          this.ball.velocity.y *= 0.7;
        }
      }
    }

    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private draw(): void {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const vertices = this.physicsEngine.getHexagonVertices(this.hexagon);
    this.ctx.beginPath();
    this.ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      this.ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = '#00d4ff';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    for (let i = 0; i < vertices.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(vertices[i].x, vertices[i].y, 6, 0, Math.PI * 2);
      this.ctx.fillStyle = '#00d4ff';
      this.ctx.fill();
    }

    const ballGradient = this.ctx.createRadialGradient(
      this.ball.position.x - 5,
      this.ball.position.y - 5,
      0,
      this.ball.position.x,
      this.ball.position.y,
      this.ball.radius
    );
    ballGradient.addColorStop(0, '#ff6b6b');
    ballGradient.addColorStop(0.7, '#ee5a5a');
    ballGradient.addColorStop(1, '#c92a2a');

    this.ctx.beginPath();
    this.ctx.arc(this.ball.position.x, this.ball.position.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = ballGradient;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(
      this.ball.position.x - this.ball.radius * 0.3,
      this.ball.position.y - this.ball.radius * 0.3,
      this.ball.radius * 0.3,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.fill();
  }

  resetSimulation(): void {
    this.ball.position = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2 - 50
    };
    this.ball.velocity = { x: 100, y: 0 };
    this.hexagon.rotation = 0;
  }

  toggleRunning(): void {
    if (this.isRunning()) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }
}
