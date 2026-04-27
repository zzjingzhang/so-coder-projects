import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { Skill, SkillCategory } from '../../types';
import { skills, skillCategories } from '../../data/skills';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    <section id="skills" class="py-20 md:py-32 bg-gradient-to-b from-secondary-50 to-white">
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="tag mb-4 inline-block">What I Know</span>
          <h2 class="section-title">My Skills</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (category of categories; track category.value) {
            <button
              class="category-btn"
              [class.active]="selectedCategory === category.value"
              (click)="selectCategory(category.value)"
            >
              {{ category.label }}
            </button>
          }
        </div>

        <!-- Skills Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (skill of filteredSkills; track skill.id; let i = $index) {
            <div 
              class="skill-card animate-fade-in"
              [style.animation-delay]="i * 50 + 'ms'"
            >
              <!-- Icon -->
              <div class="flex items-center mb-4">
                <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <i [class]="skill.icon" class="text-white text-2xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg text-secondary-800">{{ skill.name }}</h3>
                  <span class="text-sm text-secondary-500 capitalize">{{ skill.category }}</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mt-4">
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-secondary-600">Proficiency</span>
                  <span class="font-semibold text-primary-600">{{ skill.level }}%</span>
                </div>
                <p-progressBar 
                  [value]="skill.level" 
                  [showValue]="false"
                  styleClass="h-2"
                ></p-progressBar>
              </div>
            </div>
          }
        </div>

        <!-- No Skills Message -->
        @if (filteredSkills.length === 0) {
          <div class="text-center py-16">
            <i class="pi pi-inbox text-6xl text-secondary-300 mb-4"></i>
            <p class="text-secondary-500 text-lg">No skills found in this category.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    ::ng-deep .p-progressbar {
      background: #e2e8f0 !important;
      border-radius: 1rem !important;
    }
    
    ::ng-deep .p-progressbar-value {
      background: linear-gradient(90deg, #3b82f6, #8b5cf6) !important;
      border-radius: 1rem !important;
    }
  `]
})
export class SkillsComponent implements OnInit {
  allSkills: Skill[] = skills;
  categories = skillCategories;
  selectedCategory: SkillCategory | 'all' = 'all';
  filteredSkills: Skill[] = [];

  ngOnInit(): void {
    this.filterSkills();
  }

  selectCategory(category: SkillCategory | 'all'): void {
    this.selectedCategory = category;
    this.filterSkills();
  }

  filterSkills(): void {
    if (this.selectedCategory === 'all') {
      this.filteredSkills = [...this.allSkills];
    } else {
      this.filteredSkills = this.allSkills.filter(
        skill => skill.category === this.selectedCategory
      );
    }
  }
}
