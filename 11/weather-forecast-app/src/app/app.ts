import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTabsModule, MatToolbarModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Weather Forecast App');
  protected selectedTab = signal(0);
  
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event) => {
      if (event.urlAfterRedirects === '/daily' || event.urlAfterRedirects === '/') {
        this.selectedTab.set(0);
      } else if (event.urlAfterRedirects === '/hourly') {
        this.selectedTab.set(1);
      }
    });
  }

  onTabChange(index: number): void {
    const route = index === 0 ? '/daily' : '/hourly';
    this.router.navigate([route]);
  }
}
