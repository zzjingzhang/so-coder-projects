import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css'
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>;
  
  pdfUrl: string = '';
  isDarkMode: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onFileUpload(event: any): void {
    const file: File = event.files[0];
    if (file && file.type === 'application/pdf') {
      this.loadPdfFromFile(file);
    } else {
      this.errorMessage = '请选择有效的PDF文件';
    }
  }

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const file = files[0];
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        this.loadPdfFromFile(file);
      } else {
        this.errorMessage = '请选择有效的PDF文件';
      }
    }
  }

  async loadPdfFromFile(file: File): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.pdfService.loadPdfFromFile(file);
      await this.renderCurrentPage();
    } catch (error) {
      this.errorMessage = '加载PDF文件失败，请重试';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadPdfFromUrl(): Promise<void> {
    if (!this.pdfUrl) {
      this.errorMessage = '请输入PDF URL';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.pdfService.loadPdfFromUrl(this.pdfUrl);
      await this.renderCurrentPage();
    } catch (error) {
      this.errorMessage = '加载PDF URL失败，请检查URL是否正确';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async renderCurrentPage(): Promise<void> {
    if (this.pdfCanvas && this.pdfService.hasPdfLoaded()) {
      await this.pdfService.renderPage(this.pdfCanvas.nativeElement);
    }
  }

  async goToPreviousPage(): Promise<void> {
    if (this.pdfService.getCurrentPage() > 1) {
      this.pdfService.goToPreviousPage();
      await this.renderCurrentPage();
    }
  }

  async goToNextPage(): Promise<void> {
    if (this.pdfService.getCurrentPage() < this.pdfService.getTotalPages()) {
      this.pdfService.goToNextPage();
      await this.renderCurrentPage();
    }
  }

  async zoomIn(): Promise<void> {
    this.pdfService.zoomIn();
    await this.renderCurrentPage();
  }

  async zoomOut(): Promise<void> {
    this.pdfService.zoomOut();
    await this.renderCurrentPage();
  }

  getCurrentPage(): number {
    return this.pdfService.getCurrentPage();
  }

  getTotalPages(): number {
    return this.pdfService.getTotalPages();
  }

  getScale(): number {
    return this.pdfService.getScale();
  }

  hasPdfLoaded(): boolean {
    return this.pdfService.hasPdfLoaded();
  }
}