import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../models/types';
import { NAV_ITEMS } from '../../data/mock-data';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navItems: NavItem[] = NAV_ITEMS;
  isDrawerOpen = false;
  currentTheme: Theme = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollToSection(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeDrawer();
  }
}
