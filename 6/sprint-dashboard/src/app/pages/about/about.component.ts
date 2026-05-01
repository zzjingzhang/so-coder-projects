import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent {
  @Output() toggleLeftSidebar = new EventEmitter<void>();
  @Output() toggleRightSidebar = new EventEmitter<void>();

  features = [
    {
      icon: 'fa-tachometer-alt',
      title: 'Real-time Dashboard',
      description: 'Monitor your sprint progress with live metrics and visualizations.'
    },
    {
      icon: 'fa-users',
      title: 'Team Management',
      description: 'Track team members, their availability, and story point contributions.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Analytics & Reports',
      description: 'Comprehensive charts and reports to analyze sprint performance.'
    },
    {
      icon: 'fa-bolt',
      title: 'Spike Tracking',
      description: 'Manage and track research spikes alongside regular user stories.'
    },
    {
      icon: 'fa-bell',
      title: 'Smart Notifications',
      description: 'Stay updated with real-time alerts and notifications.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with data encryption and backups.'
    }
  ];

  techStack = [
    { name: 'Angular', version: '17+' },
    { name: 'TypeScript', version: '5.0+' },
    { name: 'Tailwind CSS', version: '3.0+' },
    { name: 'Angular Material', version: '17+' },
    { name: 'FontAwesome', version: '6.0+' },
    { name: 'Material Design Icons', version: '7.0+' }
  ];
}
