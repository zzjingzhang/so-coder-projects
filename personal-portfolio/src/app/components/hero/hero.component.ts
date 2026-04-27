import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLink } from '../../types';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      id="hero" 
      class="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg"
    >
      <!-- Background Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-secondary-900/90 z-10"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div class="container mx-auto px-4 relative z-20 text-center">
        <div class="max-w-4xl mx-auto">
          <!-- Profile Image -->
          <div class="mb-8 animate-fade-in">
            <div class="relative inline-block">
              <div class="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Profile" 
                  class="w-full h-full object-cover"
                >
              </div>
              <!-- Status Badge -->
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 px-4 py-1 rounded-full text-white text-sm font-medium shadow-lg flex items-center space-x-2">
                <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span>Available for work</span>
              </div>
            </div>
          </div>

          <!-- Greeting -->
          <h2 class="text-primary-200 text-lg md:text-xl font-medium mb-4 animate-fade-in delay-100">
            Hello, I'm
          </h2>

          <!-- Name -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in delay-200">
            John Developer
          </h1>

          <!-- Title -->
          <div class="text-xl md:text-2xl lg:text-3xl text-primary-100 mb-8 animate-fade-in delay-300">
            <span class="font-semibold">Full Stack Developer</span>
            <span class="mx-2 text-primary-300">|</span>
            <span>UI/UX Enthusiast</span>
          </div>

          <!-- Description -->
          <p class="text-lg md:text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-400">
            I craft beautiful, performant web applications with modern technologies. 
            Passionate about creating seamless user experiences and writing clean, maintainable code.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in delay-500">
            <button 
              class="btn-primary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center space-x-2"
              (click)="scrollToSection('projects')"
            >
              <i class="pi pi-folder-open"></i>
              <span>View My Work</span>
            </button>
            <button 
              class="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 w-full sm:w-auto flex items-center justify-center space-x-2"
              (click)="scrollToSection('contact')"
            >
              <i class="pi pi-envelope"></i>
              <span>Get In Touch</span>
            </button>
          </div>

          <!-- Social Links -->
          <div class="flex items-center justify-center space-x-6 animate-fade-in delay-500">
            @for (link of socialLinks; track link.name) {
              <a 
                [href]="link.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                [title]="link.name"
              >
                <i [class]="link.icon" class="text-xl"></i>
              </a>
            }
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            class="text-white/70 hover:text-white transition-colors flex flex-col items-center"
            (click)="scrollToSection('skills')"
          >
            <span class="text-sm mb-2">Scroll Down</span>
            <i class="pi pi-chevron-down text-2xl"></i>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent implements OnInit {
  socialLinks: SocialLink[] = [
    { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
    { name: 'Email', icon: 'pi pi-envelope', url: 'mailto:hello@example.com' }
  ];

  ngOnInit(): void {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }
}
