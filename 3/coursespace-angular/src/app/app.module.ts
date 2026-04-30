import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeatureComponent } from './components/feature/feature.component';
import { CoursesCarouselComponent } from './components/courses-carousel/courses-carousel.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { MentorsComponent } from './components/mentors/mentors.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    FeatureComponent,
    CoursesCarouselComponent,
    TestimonialsComponent,
    MentorsComponent,
    NewsletterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([]),
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzToolTipModule
  ],
  providers: [
    provideClientHydration(),
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
