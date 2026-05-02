export class Ball {
  constructor(id, x, y, vx, vy, mass, radius, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.radius = radius;
    this.color = color;
  }

  get velocity() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  get momentum() {
    return this.mass * this.velocity;
  }

  get kineticEnergy() {
    return 0.5 * this.mass * this.velocity * this.velocity;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
}

export function checkCollision(ball1, ball2) {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= ball1.radius + ball2.radius;
}

export function handleCollision(ball1, ball2) {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) return;

  const nx = dx / distance;
  const ny = dy / distance;

  const dvx = ball1.vx - ball2.vx;
  const dvy = ball1.vy - ball2.vy;

  const dvn = dvx * nx + dvy * ny;

  if (dvn > 0) return;

  const impulse = (2 * dvn) / (ball1.mass + ball2.mass);

  ball1.vx -= impulse * ball2.mass * nx;
  ball1.vy -= impulse * ball2.mass * ny;
  ball2.vx += impulse * ball1.mass * nx;
  ball2.vy += impulse * ball1.mass * ny;

  const overlap = ball1.radius + ball2.radius - distance;
  if (overlap > 0) {
    const separationX = (overlap / 2) * nx;
    const separationY = (overlap / 2) * ny;
    ball1.x -= separationX;
    ball1.y -= separationY;
    ball2.x += separationX;
    ball2.y += separationY;
  }
}

export function handleWallCollision(ball, width, height) {
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.vx = Math.abs(ball.vx);
  } else if (ball.x + ball.radius > width) {
    ball.x = width - ball.radius;
    ball.vx = -Math.abs(ball.vx);
  }

  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.vy = Math.abs(ball.vy);
  } else if (ball.y + ball.radius > height) {
    ball.y = height - ball.radius;
    ball.vy = -Math.abs(ball.vy);
  }
}

export function calculateTotalMomentum(balls) {
  let totalMomentumX = 0;
  let totalMomentumY = 0;
  
  balls.forEach(ball => {
    totalMomentumX += ball.mass * ball.vx;
    totalMomentumY += ball.mass * ball.vy;
  });
  
  return Math.sqrt(totalMomentumX * totalMomentumX + totalMomentumY * totalMomentumY);
}

export function calculateTotalKineticEnergy(balls) {
  return balls.reduce((total, ball) => total + ball.kineticEnergy, 0);
}

export function createSimulationState(width, height) {
  const ball1 = new Ball(
    1,
    width * 0.25,
    height / 2,
    100,
    0,
    1,
    30,
    '#3B82F6'
  );
  
  const ball2 = new Ball(
    2,
    width * 0.75,
    height / 2,
    -50,
    0,
    2,
    40,
    '#EF4444'
  );
  
  return {
    balls: [ball1, ball2],
    time: 0,
    isRunning: false,
    isPaused: false,
    width,
    height
  };
}

export function updateSimulation(state, dt) {
  if (!state.isRunning || state.isPaused) {
    return state;
  }

  const newState = {
    ...state,
    time: state.time + dt,
    balls: state.balls.map(ball => {
      const newBall = new Ball(
        ball.id,
        ball.x,
        ball.y,
        ball.vx,
        ball.vy,
        ball.mass,
        ball.radius,
        ball.color
      );
      newBall.update(dt);
      return newBall;
    })
  };

  for (let i = 0; i < newState.balls.length; i++) {
    handleWallCollision(newState.balls[i], newState.width, newState.height);
  }

  for (let i = 0; i < newState.balls.length; i++) {
    for (let j = i + 1; j < newState.balls.length; j++) {
      if (checkCollision(newState.balls[i], newState.balls[j])) {
        handleCollision(newState.balls[i], newState.balls[j]);
      }
    }
  }

  return newState;
}
