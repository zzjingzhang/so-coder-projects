import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [],
  standalone: false
})
export class FooterComponent {
  @Input() version: string = '1.0.0';
  @Input() showLinks: boolean = true;
  
  currentYear: number = new Date().getFullYear();
  links = [
    { label: 'Documentation', url: '#' },
    { label: 'GitHub', url: '#' },
    { label: 'Support', url: '#' },
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' }
  ];
}
