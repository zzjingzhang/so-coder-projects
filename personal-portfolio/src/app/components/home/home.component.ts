import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen">
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-about></app-about>
        <app-skills></app-skills>
        <app-projects></app-projects>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {
  private cvDownloadListener!: EventListenerOrEventListenerObject;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.setupCVDownloadListener();
  }

  ngOnDestroy(): void {
    if (this.cvDownloadListener) {
      window.removeEventListener('cvDownload', this.cvDownloadListener);
    }
  }

  private setupCVDownloadListener(): void {
    this.cvDownloadListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      this.showToast(customEvent.detail?.message || 'CV download started!');
    };
    
    window.addEventListener('cvDownload', this.cvDownloadListener);
  }

  private showToast(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
      icon: 'pi pi-check-circle'
    });
  }
}
