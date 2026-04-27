import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="tag mb-4 inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">About Me</span>
          <h2 class="section-title text-gray-900 dark:text-white">Get To Know Me</h2>
          <p class="section-subtitle max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Learn more about my background, experience, and what drives me as a developer.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Side - Image -->
          <div class="relative animate-fade-in inline-block">
            <!-- Image Container -->
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=700" 
                alt="About Me" 
                class="rounded-2xl shadow-2xl w-full max-w-full h-auto object-cover relative z-20"
              >
              <!-- Decorative Elements -->
              <div class="absolute -top-4 -left-4 w-full h-full border-4 border-blue-500 rounded-2xl z-0"></div>
              <div class="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl z-0 opacity-20"></div>
            </div>
          </div>

          <!-- Right Side - Content -->
          <div class="space-y-8 animate-fade-in delay-200">
            <!-- Intro -->
            <div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                A Passionate Developer Based in San Francisco
              </h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                With over 5 years of experience in web development, I specialize in creating 
                beautiful, functional, and user-centered digital experiences. I am passionate 
                about turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open-source projects, or enjoying a good cup of coffee while reading about 
                the latest trends in web development.
              </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              @for (stat of stats; track stat.label) {
                <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {{ stat.value }}+
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {{ stat.label }}
                  </div>
                </div>
              }
            </div>

            <!-- Experience Highlights -->
            <div class="space-y-4">
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">What I Do</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @for (item of highlights; track item.title) {
                  <div class="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i [class]="item.icon" class="text-blue-600 dark:text-blue-400 text-xl"></i>
                    </div>
                    <div>
                      <h5 class="font-semibold text-gray-900 dark:text-white mb-1">{{ item.title }}</h5>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Download CV Button -->
            <div class="pt-4">
              <button 
                class="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
                (click)="downloadCV()"
              >
                <i class="pi pi-download"></i>
                <span>Download My Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  stats = [
    { value: '5', label: 'Years Experience' },
    { value: '50', label: 'Projects Completed' },
    { value: '30', label: 'Happy Clients' },
    { value: '100', label: 'GitHub Stars' }
  ];

  highlights = [
    {
      icon: 'pi pi-code',
      title: 'Web Development',
      description: 'Building responsive and performant web applications'
    },
    {
      icon: 'pi pi-palette',
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces'
    },
    {
      icon: 'pi pi-mobile',
      title: 'Mobile First',
      description: 'Ensuring seamless experience across all devices'
    },
    {
      icon: 'pi pi-rocket',
      title: 'Performance',
      description: 'Optimizing applications for speed and scalability'
    }
  ];

  ngOnInit(): void {}

  downloadCV(): void {
    const cvDownloadEvent = new CustomEvent('cvDownload', {
      detail: { message: 'Resume download started!' }
    });
    window.dispatchEvent(cvDownloadEvent);
  }
}
