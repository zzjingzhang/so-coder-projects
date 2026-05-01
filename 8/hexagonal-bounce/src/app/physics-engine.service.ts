import { Injectable } from '@angular/core';

export interface Vector2D {
  x: number;
  y: number;
}

export interface Ball {
  position: Vector2D;
  velocity: Vector2D;
  radius: number;
  mass: number;
}

export interface Hexagon {
  center: Vector2D;
  radius: number;
  rotation: number;
  angularVelocity: number;
}

export interface CollisionResult {
  collided: boolean;
  edge: { start: Vector2D; end: Vector2D; normal: Vector2D } | null;
  penetration: number;
  contactPoint: Vector2D;
  normal: Vector2D;
  isVertexCollision: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PhysicsEngineService {
  gravity: number = 980;
  friction: number = 0.98;
  restitution: number = 0.7;
  airResistance: number = 0.999;

  constructor() {}

  updateBall(ball: Ball, deltaTime: number): void {
    ball.velocity.y += this.gravity * deltaTime;
    ball.velocity.x *= this.airResistance;
    ball.velocity.y *= this.airResistance;
    ball.position.x += ball.velocity.x * deltaTime;
    ball.position.y += ball.velocity.y * deltaTime;
  }

  updateHexagon(hexagon: Hexagon, deltaTime: number): void {
    hexagon.rotation += hexagon.angularVelocity * deltaTime;
  }

  getHexagonVertices(hexagon: Hexagon): Vector2D[] {
    const vertices: Vector2D[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = hexagon.rotation + (Math.PI / 3) * i - Math.PI / 2;
      vertices.push({
        x: hexagon.center.x + hexagon.radius * Math.cos(angle),
        y: hexagon.center.y + hexagon.radius * Math.sin(angle)
      });
    }
    return vertices;
  }

  getHexagonEdges(hexagon: Hexagon): { start: Vector2D; end: Vector2D; normal: Vector2D }[] {
    const vertices = this.getHexagonVertices(hexagon);
    const edges: { start: Vector2D; end: Vector2D; normal: Vector2D }[] = [];

    for (let i = 0; i < 6; i++) {
      const start = vertices[i];
      const end = vertices[(i + 1) % 6];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const normal: Vector2D = {
        x: -dy / length,
        y: dx / length
      };

      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const toCenterX = hexagon.center.x - midX;
      const toCenterY = hexagon.center.y - midY;
      if (normal.x * toCenterX + normal.y * toCenterY < 0) {
        normal.x = -normal.x;
        normal.y = -normal.y;
      }

      edges.push({ start, end, normal });
    }
    return edges;
  }

  pointToSegmentDistance(point: Vector2D, start: Vector2D, end: Vector2D): { distance: number; closestPoint: Vector2D; t: number } {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSq = dx * dx + dy * dy;

    if (lengthSq === 0) {
      const distX = point.x - start.x;
      const distY = point.y - start.y;
      return {
        distance: Math.sqrt(distX * distX + distY * distY),
        closestPoint: { x: start.x, y: start.y },
        t: 0
      };
    }

    let t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));

    const closestPoint: Vector2D = {
      x: start.x + t * dx,
      y: start.y + t * dy
    };

    const distX = point.x - closestPoint.x;
    const distY = point.y - closestPoint.y;

    return {
      distance: Math.sqrt(distX * distX + distY * distY),
      closestPoint,
      t
    };
  }

  isPointInsideHexagon(point: Vector2D, hexagon: Hexagon): boolean {
    const vertices = this.getHexagonVertices(hexagon);
    
    for (let i = 0; i < 6; i++) {
      const start = vertices[i];
      const end = vertices[(i + 1) % 6];
      
      const edgeX = end.x - start.x;
      const edgeY = end.y - start.y;
      const toPointX = point.x - start.x;
      const toPointY = point.y - start.y;
      
      const cross = edgeX * toPointY - edgeY * toPointX;
      
      if (cross < 0) {
        return false;
      }
    }
    
    return true;
  }

  checkCollisionWithHexagon(ball: Ball, hexagon: Hexagon): CollisionResult {
    const edges = this.getHexagonEdges(hexagon);
    const vertices = this.getHexagonVertices(hexagon);
    
    let minPenetration = -Infinity;
    let bestCollision: CollisionResult = {
      collided: false,
      edge: null,
      penetration: 0,
      contactPoint: { x: 0, y: 0 },
      normal: { x: 0, y: 0 },
      isVertexCollision: false
    };

    const isInside = this.isPointInsideHexagon(ball.position, hexagon);

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const result = this.pointToSegmentDistance(ball.position, edge.start, edge.end);
      
      const toCenter: Vector2D = {
        x: hexagon.center.x - result.closestPoint.x,
        y: hexagon.center.y - result.closestPoint.y
      };
      const toCenterLength = Math.sqrt(toCenter.x * toCenter.x + toCenter.y * toCenter.y);
      toCenter.x /= toCenterLength;
      toCenter.y /= toCenterLength;

      const edgeDirection: Vector2D = {
        x: edge.end.x - edge.start.x,
        y: edge.end.y - edge.start.y
      };
      const edgeLength = Math.sqrt(edgeDirection.x * edgeDirection.x + edgeDirection.y * edgeDirection.y);
      edgeDirection.x /= edgeLength;
      edgeDirection.y /= edgeLength;

      let collisionNormal: Vector2D;
      let penetration: number;

      if (result.t > 0.01 && result.t < 0.99) {
        collisionNormal = { ...edge.normal };
        
        const toBall: Vector2D = {
          x: ball.position.x - result.closestPoint.x,
          y: ball.position.y - result.closestPoint.y
        };
        const dot = toBall.x * collisionNormal.x + toBall.y * collisionNormal.y;
        
        if (dot < 0) {
          collisionNormal = { x: -collisionNormal.x, y: -collisionNormal.y };
        }
        
        penetration = ball.radius - result.distance;
      } else {
        const vertexIndex = result.t <= 0.5 ? i : (i + 1) % 6;
        const vertex = vertices[vertexIndex];
        
        const toVertex: Vector2D = {
          x: ball.position.x - vertex.x,
          y: ball.position.y - vertex.y
        };
        const distToVertex = Math.sqrt(toVertex.x * toVertex.x + toVertex.y * toVertex.y);
        
        if (distToVertex < ball.radius) {
          collisionNormal = {
            x: toVertex.x / distToVertex,
            y: toVertex.y / distToVertex
          };
          penetration = ball.radius - distToVertex;
          result.closestPoint = { ...vertex };
        } else {
          continue;
        }
      }

      if (penetration > minPenetration) {
        minPenetration = penetration;
        bestCollision = {
          collided: true,
          edge: edge,
          penetration: penetration,
          contactPoint: result.closestPoint,
          normal: collisionNormal,
          isVertexCollision: result.t <= 0.01 || result.t >= 0.99
        };
      }
    }

    if (!isInside && bestCollision.collided) {
      bestCollision.normal = {
        x: -bestCollision.normal.x,
        y: -bestCollision.normal.y
      };
    }

    return bestCollision;
  }

  resolveCollision(ball: Ball, hexagon: Hexagon, collision: CollisionResult): void {
    if (!collision.collided) return;

    const isInside = this.isPointInsideHexagon(ball.position, hexagon);
    
    let inwardNormal: Vector2D;
    if (isInside) {
      inwardNormal = {
        x: hexagon.center.x - ball.position.x,
        y: hexagon.center.y - ball.position.y
      };
    } else {
      inwardNormal = {
        x: ball.position.x - hexagon.center.x,
        y: ball.position.y - hexagon.center.y
      };
    }
    
    const normalLength = Math.sqrt(inwardNormal.x * inwardNormal.x + inwardNormal.y * inwardNormal.y);
    if (normalLength > 0) {
      inwardNormal.x /= normalLength;
      inwardNormal.y /= normalLength;
    } else {
      inwardNormal = { x: 0, y: -1 };
    }

    const correction: Vector2D = {
      x: inwardNormal.x * (collision.penetration + 0.5),
      y: inwardNormal.y * (collision.penetration + 0.5)
    };
    
    if (isInside) {
      ball.position.x += correction.x;
      ball.position.y += correction.y;
    } else {
      ball.position.x -= correction.x;
      ball.position.y -= correction.y;
    }

    const velocityDotNormal = ball.velocity.x * inwardNormal.x + ball.velocity.y * inwardNormal.y;

    if ((isInside && velocityDotNormal < 0) || (!isInside && velocityDotNormal > 0)) {
      const tangent: Vector2D = {
        x: -inwardNormal.y,
        y: inwardNormal.x
      };

      const normalVelocity = velocityDotNormal * inwardNormal.x;
      const normalVelocityY = velocityDotNormal * inwardNormal.y;

      const tangentVelocity = (ball.velocity.x * tangent.x + ball.velocity.y * tangent.y) * tangent.x;
      const tangentVelocityY = (ball.velocity.x * tangent.x + ball.velocity.y * tangent.y) * tangent.y;

      if (isInside) {
        ball.velocity.x = -normalVelocity * this.restitution + tangentVelocity * this.friction;
        ball.velocity.y = -normalVelocityY * this.restitution + tangentVelocityY * this.friction;
      } else {
        ball.velocity.x = normalVelocity * this.restitution + tangentVelocity * this.friction;
        ball.velocity.y = normalVelocityY * this.restitution + tangentVelocityY * this.friction;
      }

      const contactPointToCenter: Vector2D = {
        x: collision.contactPoint.x - hexagon.center.x,
        y: collision.contactPoint.y - hexagon.center.y
      };
      const contactSpeed: Vector2D = {
        x: -hexagon.angularVelocity * contactPointToCenter.y,
        y: hexagon.angularVelocity * contactPointToCenter.x
      };

      const contactNormalDot = contactSpeed.x * inwardNormal.x + contactSpeed.y * inwardNormal.y;
      if (isInside) {
        ball.velocity.x += contactNormalDot * inwardNormal.x * 0.5;
        ball.velocity.y += contactNormalDot * inwardNormal.y * 0.5;
      } else {
        ball.velocity.x -= contactNormalDot * inwardNormal.x * 0.5;
        ball.velocity.y -= contactNormalDot * inwardNormal.y * 0.5;
      }
    }
  }

  checkAndResolveAllCollisions(ball: Ball, hexagon: Hexagon, maxIterations: number = 5): void {
    for (let i = 0; i < maxIterations; i++) {
      const collision = this.checkCollisionWithHexagon(ball, hexagon);
      if (!collision.collided) {
        break;
      }
      this.resolveCollision(ball, hexagon, collision);
    }
  }
}
