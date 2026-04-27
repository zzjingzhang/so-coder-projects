import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, CommonModule],
  providers: [MessageService],
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div 
      class="scroll-progress-bar" 
      [style.width.%]="scrollProgress"
    ></div>

    <router-outlet></router-outlet>

    <button 
      class="back-to-top" 
      [class.visible]="showBackToTop"
      (click)="scrollToTop()"
    >
      <i class="pi pi-arrow-up text-lg"></i>
    </button>

    <p-toast position="top-right"></p-toast>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  messageService = inject(MessageService);
  
  isLoading = true;
  scrollProgress = 0;
  showBackToTop = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.showBackToTop = scrollTop > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
