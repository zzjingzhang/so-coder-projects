import { Component } from '@angular/core';
import { FooterColumn, SocialLink, CompanyInfo } from '../../models/types';
import { FOOTER_COLUMNS, SOCIAL_LINKS, COMPANY_INFO } from '../../data/mock-data';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  columns: FooterColumn[] = FOOTER_COLUMNS;
  socialLinks: SocialLink[] = SOCIAL_LINKS;
  companyInfo: CompanyInfo = COMPANY_INFO;
  currentYear = new Date().getFullYear();

  getSocialIcon(icon: string): string {
    const iconMap: { [key: string]: string } = {
      'instagram': 'instagram',
      'youtube': 'youtube',
      'twitter': 'twitter',
      'dribbble': 'dribbble',
      'github': 'github'
    };
    return iconMap[icon] || 'global';
  }
}
