import { Injectable } from '@angular/core';
import { TransformValues } from './scroll-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationCalculatorService {
  constructor() {}

  lerp(start: number, end: number, progress: number): number {
    return start + (end - start) * progress;
  }

  easeInOutQuad(progress: number): number {
    return progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  }

  easeOutCubic(progress: number): number {
    return 1 - Math.pow(1 - progress, 3);
  }

  easeInCubic(progress: number): number {
    return progress * progress * progress;
  }

  calculateTransform(
    progress: number,
    config: {
      startY?: number;
      endY?: number;
      startScale?: number;
      endScale?: number;
      startOpacity?: number;
      endOpacity?: number;
      startRotate?: number;
      endRotate?: number;
      easing?: (p: number) => number;
    }
  ): TransformValues {
    const easing = config.easing || this.easeInOutQuad;
    const easedProgress = easing(progress);

    return {
      translateY: this.lerp(config.startY || 0, config.endY || 0, easedProgress),
      scale: this.lerp(config.startScale || 1, config.endScale || 1, easedProgress),
      opacity: this.lerp(config.startOpacity || 1, config.endOpacity || 1, easedProgress),
      rotate: this.lerp(config.startRotate || 0, config.endRotate || 0, easedProgress)
    };
  }

  calculateSnapOffset(
    scrollTop: number,
    snapPoints: number[],
    threshold: number = 50
  ): number {
    if (snapPoints.length === 0) return scrollTop;

    let closestPoint = snapPoints[0];
    let minDistance = Math.abs(scrollTop - closestPoint);

    for (const point of snapPoints) {
      const distance = Math.abs(scrollTop - point);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }

    if (minDistance <= threshold) {
      return closestPoint;
    }

    return scrollTop;
  }

  getSnapPoints(
    itemCount: number,
    itemHeight: number,
    headerHeight: number = 0
  ): number[] {
    const points: number[] = [0];
    
    for (let i = 0; i < itemCount; i++) {
      const snapPoint = headerHeight + (i * itemHeight);
      if (!points.includes(snapPoint)) {
        points.push(snapPoint);
      }
    }

    return points;
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
