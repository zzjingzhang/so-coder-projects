import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coursespace';
  
  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.themeService.initTheme();
    }
  }
}
