import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  standalone: false
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() isLoggedIn: boolean = false;
  @Input() username: string = '';
  @Input() avatarUrl: string = '';
  
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() changeLanguage = new EventEmitter<string>();
  
  currentLang: string = 'en';
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];
  userMenuVisible: boolean = false;
  languageMenuVisible: boolean = false;

  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang || this.translateService.getDefaultLang() || 'en';
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onLogout(): void {
    this.userMenuVisible = false;
    this.logout.emit();
  }

  onLanguageChange(lang: string): void {
    this.currentLang = lang;
    this.languageMenuVisible = false;
    this.translateService.use(lang);
    this.changeLanguage.emit(lang);
  }

  toggleUserMenu(): void {
    this.userMenuVisible = !this.userMenuVisible;
  }

  toggleLanguageMenu(): void {
    this.languageMenuVisible = !this.languageMenuVisible;
  }

  closeMenus(): void {
    this.userMenuVisible = false;
    this.languageMenuVisible = false;
  }

  get currentLanguage() {
    return this.languages.find(l => l.code === this.currentLang) || this.languages[0];
  }
}
