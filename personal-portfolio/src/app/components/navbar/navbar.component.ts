import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavItem } from '../../types';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.navbar-sticky]="isScrolled"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <a 
            routerLink="/" 
            class="text-2xl font-bold gradient-text cursor-pointer"
          >
            Portfolio
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            @for (item of navItems; track item.fragment) {
              <a 
                [href]="'#' + item.fragment"
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-300 relative group"
                (click)="scrollToSection($event, item.fragment)"
              >
                {{ item.label }}
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            }
            
            <!-- Theme Toggle Button -->
            <button 
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              (click)="toggleTheme()"
              [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              @if (themeService.isDark()) {
                <i class="pi pi-sun text-yellow-500 text-xl"></i>
              } @else {
                <i class="pi pi-moon text-gray-600 text-xl"></i>
              }
            </button>
            
            <button 
              class="btn-primary text-sm"
              (click)="downloadCV()"
            >
              <i class="pi pi-download mr-2"></i>Download CV
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center space-x-2">
            <!-- Theme Toggle Button for Mobile -->
            <button 
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              (click)="toggleTheme()"
            >
              @if (themeService.isDark()) {
                <i class="pi pi-sun text-yellow-500 text-xl"></i>
              } @else {
                <i class="pi pi-moon text-gray-600 text-xl"></i>
              }
            </button>
            
            <button 
              class="p-2 text-gray-700 dark:text-gray-300"
              (click)="toggleMobileMenu()"
            >
              <i [class]="isMobileMenuOpen ? 'pi pi-times text-2xl' : 'pi pi-bars text-2xl'"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        class="md:hidden fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300"
        [class.translate-x-full]="!isMobileMenuOpen"
        [class.translate-x-0]="isMobileMenuOpen"
      >
        <div class="flex flex-col p-6 space-y-4">
          @for (item of navItems; track item.fragment) {
            <a 
              [href]="'#' + item.fragment"
              class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-3 border-b border-gray-100 dark:border-gray-800 transition-colors"
              (click)="scrollToSection($event, item.fragment)"
            >
              {{ item.label }}
            </a>
          }
          <button 
            class="btn-primary mt-4"
            (click)="downloadCV()"
          >
            <i class="pi pi-download mr-2"></i>Download CV
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {
  themeService = inject(ThemeService);
  
  isScrolled = false;
  isMobileMenuOpen = false;

  navItems: NavItem[] = [
    { label: 'Home', fragment: 'hero' },
    { label: 'About', fragment: 'about' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Contact', fragment: 'contact' }
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollToSection(event: Event, fragment: string): void {
    event.preventDefault();
    const element = document.getElementById(fragment);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  downloadCV(): void {
    const cvDownloadEvent = new CustomEvent('cvDownload', {
      detail: { message: 'CV download started!' }
    });
    window.dispatchEvent(cvDownloadEvent);
  }
}
