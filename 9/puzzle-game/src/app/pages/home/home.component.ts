import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PuzzleService } from '../../services/puzzle.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzRadioModule,
    FormsModule,
    NzIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly gridSize = signal(3);
  readonly selectedImage = signal(0);
  readonly gridOptions = [
    { value: 3, label: '3 x 3 (简单)' },
    { value: 4, label: '4 x 4 (中等)' },
    { value: 5, label: '5 x 5 (困难)' },
  ];

  readonly images = computed(() => this.puzzleService.getImages());

  constructor(
    private readonly router: Router,
    private readonly puzzleService: PuzzleService,
  ) {}

  selectImage(index: number): void {
    this.selectedImage.set(index);
  }

  startGame(): void {
    this.puzzleService.setCurrentImage(this.selectedImage());
    this.puzzleService.startNewGame(this.gridSize());
    this.router.navigate(['/game']);
  }
}
