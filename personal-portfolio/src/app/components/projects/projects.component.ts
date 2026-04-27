import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Project } from '../../types';
import { projects } from '../../data/projects';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    <section id="projects" class="py-20 md:py-32 bg-white">
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="tag mb-4 inline-block">My Work</span>
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of projects; track project.id; let i = $index) {
            <div 
              class="project-card group animate-fade-in"
              [style.animation-delay]="i * 100 + 'ms'"
            >
              <!-- Project Image -->
              <div class="relative overflow-hidden h-56">
                <img 
                  [src]="project.image" 
                  [alt]="project.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                >
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div class="flex items-center space-x-4">
                    <a 
                      [href]="project.demoUrl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                    >
                      <i class="pi pi-external-link"></i>
                      <span>Live Demo</span>
                    </a>
                    <a 
                      [href]="project.githubUrl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="flex items-center space-x-2 bg-secondary-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary-700 transition-colors"
                    >
                      <i class="pi pi-github"></i>
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Project Info -->
              <div class="p-6">
                <!-- Type Badge -->
                <div class="flex items-center justify-between mb-3">
                  <p-tag 
                    [value]="project.type" 
                    severity="primary"
                    [rounded]="true"
                  ></p-tag>
                </div>

                <!-- Title -->
                <h3 class="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors">
                  {{ project.title }}
                </h3>

                <!-- Description -->
                <p class="text-secondary-600 mb-4 line-clamp-2">
                  {{ project.description }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-default">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <!-- View More Button -->
        <div class="text-center mt-16">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors"
          >
            <span>View More Projects on GitHub</span>
            <i class="pi pi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = projects;

  ngOnInit(): void {}
}
