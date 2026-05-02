import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pixel-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './pixel-board.component.html',
  styleUrl: './pixel-board.component.css'
})
export class PixelBoardComponent implements OnInit {
  @ViewChild('pixelCanvas') pixelCanvas!: ElementRef<HTMLDivElement>;
  
  gridSize: number = 16;
  pixelSize: number = 20;
  selectedColor: string = '#000000';
  isDrawing: boolean = false;
  isErasing: boolean = false;
  pixels: string[][] = [];
  
  recentColors: string[] = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FF8800'
  ];
  
  paletteColors: string[] = [
    '#FFFFFF', '#C0C0C0', '#808080', '#404040', '#000000',
    '#FFCCCC', '#FF8080', '#FF0000', '#800000', '#400000',
    '#CCFFCC', '#80FF80', '#00FF00', '#008000', '#004000',
    '#CCCCFF', '#8080FF', '#0000FF', '#000080', '#000040',
    '#FFFFCC', '#FFFF80', '#FFFF00', '#808000', '#404000',
    '#FFCCFF', '#FF80FF', '#FF00FF', '#800080', '#400040',
    '#CCFFFF', '#80FFFF', '#00FFFF', '#008080', '#004040',
  ];

  constructor() {}

  ngOnInit(): void {
    this.initializeGrid();
  }

  initializeGrid(): void {
    this.pixels = [];
    for (let i = 0; i < this.gridSize; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        this.pixels[i][j] = '#FFFFFF';
      }
    }
  }

  resizeGrid(): void {
    if (this.gridSize < 4) this.gridSize = 4;
    if (this.gridSize > 64) this.gridSize = 64;
    this.initializeGrid();
  }

  getPixelSize(): number {
    const maxCanvasSize = 600;
    return Math.floor(maxCanvasSize / this.gridSize);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDrawing = false;
  }

  onMouseDown(row: number, col: number, event: MouseEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    this.paintPixel(row, col);
  }

  onMouseEnter(row: number, col: number): void {
    if (this.isDrawing) {
      this.paintPixel(row, col);
    }
  }

  paintPixel(row: number, col: number): void {
    if (this.isErasing) {
      this.pixels[row][col] = '#FFFFFF';
    } else {
      this.pixels[row][col] = this.selectedColor;
      this.addToRecentColors(this.selectedColor);
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.isErasing = false;
  }

  toggleEraser(): void {
    this.isErasing = !this.isErasing;
  }

  clearCanvas(): void {
    this.initializeGrid();
  }

  private addToRecentColors(color: string): void {
    const index = this.recentColors.indexOf(color);
    if (index > -1) {
      this.recentColors.splice(index, 1);
    }
    this.recentColors.unshift(color);
    if (this.recentColors.length > 8) {
      this.recentColors.pop();
    }
  }

  fillCanvas(): void {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.pixels[i][j] = this.selectedColor;
      }
    }
  }
}
