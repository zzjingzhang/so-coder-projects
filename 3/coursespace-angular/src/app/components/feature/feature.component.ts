import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Feature } from '../../models/types';
import { FEATURES } from '../../data/mock-data';

@Component({
  selector: 'app-feature',
  standalone: false,
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  features: Feature[] = FEATURES;
  circularProgress = 75;
  circumference = 0;
  offset = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    const radius = 60;
    this.circumference = 2 * Math.PI * radius;
    this.offset = this.circumference - (this.circularProgress / 100) * this.circumference;
  }

  getIconName(icon: string): string {
    const iconMap: { [key: string]: string } = {
      'book': 'book',
      'user-check': 'user',
      'clock': 'clock-circle',
      'certificate': 'trophy'
    };
    return iconMap[icon] || 'check-circle';
  }
}
