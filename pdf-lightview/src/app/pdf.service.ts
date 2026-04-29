import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdfDoc: any;
  private currentPage: number = 1;
  private scale: number = 1.0;

  constructor() {}

  async loadPdfFromFile(file: File): Promise<void> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      this.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.currentPage = 1;
      this.scale = 1.0;
    } catch (error) {
      console.error('Error loading PDF from file:', error);
      throw error;
    }
  }

  async loadPdfFromUrl(url: string): Promise<void> {
    try {
      this.pdfDoc = await pdfjsLib.getDocument(url).promise;
      this.currentPage = 1;
      this.scale = 1.0;
    } catch (error) {
      console.error('Error loading PDF from URL:', error);
      throw error;
    }
  }

  async renderPage(canvas: HTMLCanvasElement): Promise<void> {
    if (!this.pdfDoc || !canvas) return;

    const page = await this.pdfDoc.getPage(this.currentPage);
    const viewport = page.getViewport({ scale: this.scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const context = canvas.getContext('2d');
    if (!context) return;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
      this.currentPage = pageNumber;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  zoomIn(): void {
    this.scale = Math.min(this.scale + 0.25, 3.0);
  }

  zoomOut(): void {
    this.scale = Math.max(this.scale - 0.25, 0.25);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getTotalPages(): number {
    return this.pdfDoc ? this.pdfDoc.numPages : 0;
  }

  getScale(): number {
    return this.scale;
  }

  hasPdfLoaded(): boolean {
    return !!this.pdfDoc;
  }
}