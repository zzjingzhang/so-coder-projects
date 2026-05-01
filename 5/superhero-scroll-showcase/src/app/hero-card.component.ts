import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Hero } from './hero.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  template: `
    <mat-card class="hero-card scroll-animate" [class]="'scroll-animate-delay-' + delay">
      <div class="hero-image-container" [style.background-color]="hero.color">
        <img [src]="hero.image" [alt]="hero.name" class="hero-image">
        <div class="hero-overlay">
          <span class="hero-alias">{{ hero.alias }}</span>
        </div>
      </div>
      <mat-card-header>
        <mat-card-title class="text-2xl font-bold">{{ hero.name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="text-gray-600 mb-4">{{ hero.description }}</p>
        <div class="flex flex-wrap gap-2">
          <mat-chip 
            *ngFor="let power of hero.powers" 
            class="power-chip"
            [ngClass]="getChipClass(hero.color)"
          >
            {{ power }}
          </mat-chip>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" class="w-full">
          了解更多
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .hero-card {
      max-width: 400px;
      margin: 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .hero-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    }
    .hero-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .hero-card:hover .hero-image {
      transform: scale(1.1);
    }
    .hero-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.7));
      padding: 2rem 1rem 1rem;
    }
    .hero-alias {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    .power-chip {
      font-weight: 600;
    }
    
    .chip-red {
      background-color: #991b1b !important;
      color: #fef2f2 !important;
    }
    
    .chip-blue {
      background-color: #1e3a8a !important;
      color: #eff6ff !important;
    }
    
    .chip-yellow {
      background-color: #422006 !important;
      color: #fefce8 !important;
    }
    
    .chip-purple {
      background-color: #3b0764 !important;
      color: #faf5ff !important;
    }
    
    .chip-green {
      background-color: #052e16 !important;
      color: #f0fdf4 !important;
    }
  `]
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
  @Input() delay: '100' | '200' | '300' = '100';

  getChipClass(colorName: string): string {
    const classMap: Record<string, string> = {
      'hero-red': 'chip-red',
      'hero-blue': 'chip-blue',
      'hero-yellow': 'chip-yellow',
      'hero-purple': 'chip-purple',
      'hero-green': 'chip-green'
    };
    return classMap[colorName] || 'chip-blue';
  }
}
