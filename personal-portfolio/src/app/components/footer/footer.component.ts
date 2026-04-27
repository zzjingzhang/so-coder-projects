import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLink } from '../../types';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="contact" class="footer">
      <!-- Contact Section -->
      <div class="bg-gradient-to-br from-primary-900 to-secondary-900 py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <span class="tag mb-4 inline-block bg-white/10 text-white">Get In Touch</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
            <p class="text-lg text-primary-200 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div class="max-w-3xl mx-auto">
            <!-- Contact Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <!-- Email -->
              <a 
                href="mailto:hello@example.com"
                class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i class="pi pi-envelope text-3xl text-primary-400"></i>
                </div>
                <h3 class="text-white font-semibold text-lg mb-2">Email Me</h3>
                <p class="text-primary-200">{{ email }}</p>
              </a>

              <!-- Location -->
              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="pi pi-map-marker text-3xl text-primary-400"></i>
                </div>
                <h3 class="text-white font-semibold text-lg mb-2">Location</h3>
                <p class="text-primary-200">San Francisco, CA</p>
              </div>
            </div>

            <!-- Social Links -->
            <div class="text-center">
              <p class="text-primary-200 mb-6">Or find me on social media</p>
              <div class="flex items-center justify-center space-x-4">
                @for (link of socialLinks; track link.name) {
                  <a 
                    [href]="link.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="social-icon"
                    [title]="link.name"
                  >
                    <i [class]="link.icon" class="text-xl"></i>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-white/10 py-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <!-- Copyright -->
            <p class="text-primary-300 text-sm mb-4 md:mb-0">
              &copy; {{ currentYear }} John Developer. All rights reserved.
            </p>

            <!-- Quick Links -->
            <div class="flex items-center space-x-6">
              <a href="#hero" class="footer-link text-sm hover:underline">Home</a>
              <a href="#skills" class="footer-link text-sm hover:underline">Skills</a>
              <a href="#projects" class="footer-link text-sm hover:underline">Projects</a>
              <a href="#contact" class="footer-link text-sm hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  email = 'hello@example.com';
  
  socialLinks: SocialLink[] = [
    { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
    { name: 'Dribbble', icon: 'pi pi-palette', url: 'https://dribbble.com' },
    { name: 'Instagram', icon: 'pi pi-instagram', url: 'https://instagram.com' }
  ];

  ngOnInit(): void {}
}
