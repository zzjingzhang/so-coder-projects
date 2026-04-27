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
            class="text-2xl font-bold cursor-pointer transition-colors duration-300"
            [ngClass]="{
              'text-white': !isScrolled && !themeService.isDark(),
              'gradient-text': isScrolled || themeService.isDark()
            }"
          >
            Portfolio
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            @for (item of navItems; track item.fragment) {
              <a 
                [href]="'#' + item.fragment"
                class="font-medium transition-colors duration-300 relative group"
                [ngClass]="getNavLinkClasses()"
                (click)="scrollToSection($event, item.fragment)"
              >
                {{ item.label }}
                <span 
                  class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  [ngClass]="{
                    'bg-white': !isScrolled && !themeService.isDark(),
                    'bg-primary-500': isScrolled || themeService.isDark()
                  }"
                ></span>
              </a>
            }
            
            <!-- Theme Toggle Button -->
            <button 
              class="p-2 rounded-lg transition-all duration-300"
              [ngClass]="getThemeToggleClasses()"
              (click)="toggleTheme()"
              [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <i 
                [class]="themeService.isDark() ? 'pi pi-sun text-yellow-500 text-xl' : getMoonIconClass()"
              ></i>
            </button>
            
            <button 
              class="text-sm transition-all duration-300"
              [ngClass]="getDownloadCVClasses()"
              (click)="downloadCV()"
            >
              <i class="pi pi-download mr-2"></i>Download CV
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center space-x-2">
            <!-- Theme Toggle Button for Mobile -->
            <button 
              class="p-2 rounded-lg transition-all duration-300"
              [ngClass]="getThemeToggleClasses()"
              (click)="toggleTheme()"
            >
              <i 
                [class]="themeService.isDark() ? 'pi pi-sun text-yellow-500 text-xl' : getMoonIconClass()"
              ></i>
            </button>
            
            <button 
              class="p-2 transition-colors duration-300"
              [ngClass]="getMobileMenuButtonClasses()"
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

  getNavLinkClasses(): Record<string, boolean> {
    return {
      'text-white': !this.isScrolled && !this.themeService.isDark(),
      'text-gray-700': this.isScrolled && !this.themeService.isDark(),
      'text-gray-300': this.themeService.isDark(),
      'hover:text-primary-400': (!this.isScrolled && !this.themeService.isDark()) || this.themeService.isDark(),
      'hover:text-primary-600': this.isScrolled && !this.themeService.isDark()
    };
  }

  getThemeToggleClasses(): Record<string, boolean> {
    return {
      'bg-white/20 hover:bg-white/30': !this.isScrolled && !this.themeService.isDark(),
      'bg-gray-100 hover:bg-gray-200': this.isScrolled && !this.themeService.isDark(),
      'bg-gray-800 hover:bg-gray-700': this.themeService.isDark()
    };
  }

  getMoonIconClass(): string {
    return this.isScrolled ? 'pi pi-moon text-gray-600 text-xl' : 'pi pi-moon text-white text-xl';
  }

  getDownloadCVClasses(): Record<string, boolean> {
    return {
      'btn-primary': this.isScrolled || this.themeService.isDark(),
      'bg-white/20 hover:bg-white/30 text-white': !this.isScrolled && !this.themeService.isDark()
    };
  }

  getMobileMenuButtonClasses(): Record<string, boolean> {
    return {
      'text-white': !this.isScrolled && !this.themeService.isDark(),
      'text-gray-700': this.isScrolled && !this.themeService.isDark(),
      'text-gray-300': this.themeService.isDark()
    };
  }
}
