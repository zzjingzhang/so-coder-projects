import { Component, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatingMenuComponent } from './components/floating-menu/floating-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('浮窗菜单演示');

  ngOnInit(): void {
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--themeColor', savedColor);
      const hexToRgba = (hex: string, alpha: number): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      document.documentElement.style.setProperty('--shadowColor', hexToRgba(savedColor, 0.4));
    }
  }
}
