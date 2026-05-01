import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Epic {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

export interface ProgressData {
  label: string;
  percentage: number;
  color: string;
}

export interface Metric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  iconLibrary: 'fa' | 'mdi';
}

export interface BurnChartData {
  name: string;
  value: number;
  color: string;
}

export interface Story {
  id: string;
  title: string;
  status: 'to-do' | 'in-progress' | 'done';
  count: number;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  storyPoints: number;
  isOnline: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  iconLibrary: 'fa' | 'mdi';
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private epics: Epic[] = [
    { id: '1', title: 'User Authentication', subtitle: 'Login & Registration', color: '#49D9A0', icon: 'fa-lock' },
    { id: '2', title: 'Dashboard UI', subtitle: 'Analytics & Reports', color: '#FF6B6B', icon: 'fa-chart-line' },
    { id: '3', title: 'Payment System', subtitle: 'Stripe Integration', color: '#4ECDC4', icon: 'fa-credit-card' },
    { id: '4', title: 'Notification Hub', subtitle: 'Real-time Alerts', color: '#FFE66D', icon: 'fa-bell' },
    { id: '5', title: 'API Gateway', subtitle: 'Microservices', color: '#95E1D3', icon: 'fa-server' },
  ];

  private progressData: ProgressData[] = [
    { label: 'Project Progress', percentage: 68, color: '#49D9A0' },
    { label: 'Business Goals', percentage: 45, color: '#FF6B6B' },
    { label: 'Budget Usage', percentage: 82, color: '#4ECDC4' },
  ];

  private metrics: Metric[] = [
    { id: '1', title: 'Team Velocity', value: '42', subtitle: 'Story Points', icon: 'fa-tachometer-alt', iconLibrary: 'fa' },
    { id: '2', title: 'Team Members', value: '8', subtitle: 'Active Members', icon: 'fa-users', iconLibrary: 'fa' },
    { id: '3', title: 'Tasks Delivered', value: '156', subtitle: 'This Sprint', icon: 'fa-check-circle', iconLibrary: 'fa' },
    { id: '4', title: 'Spikes Delivered', value: '12', subtitle: 'Research Items', icon: 'fa-bolt', iconLibrary: 'fa' },
    { id: '5', title: 'News & Events', value: '3', subtitle: 'Updates', icon: 'fa-newspaper', iconLibrary: 'fa' },
  ];

  private burnChartData: BurnChartData[] = [
    { name: 'Organic', value: 40, color: '#49D9A0' },
    { name: 'Direct', value: 25, color: '#FF6B6B' },
    { name: 'Referral', value: 20, color: '#4ECDC4' },
    { name: 'Social', value: 15, color: '#FFE66D' },
  ];

  private stories: Story[] = [
    { id: 'US-001', title: 'User registration with email verification', status: 'done', count: 5 },
    { id: 'US-002', title: 'Implement OAuth2 login with Google', status: 'in-progress', count: 8 },
    { id: 'US-003', title: 'Password reset functionality', status: 'to-do', count: 3 },
    { id: 'US-004', title: 'User profile page UI', status: 'in-progress', count: 5 },
    { id: 'US-005', title: 'Profile image upload feature', status: 'to-do', count: 3 },
    { id: 'US-006', title: 'Dashboard analytics widgets', status: 'done', count: 13 },
    { id: 'US-007', title: 'Real-time data streaming', status: 'in-progress', count: 8 },
  ];

  private teamMembers: TeamMember[] = [
    { id: '1', name: 'Alex Johnson', avatar: 'AJ', storyPoints: 24, isOnline: true },
    { id: '2', name: 'Sarah Chen', avatar: 'SC', storyPoints: 18, isOnline: true },
    { id: '3', name: 'Mike Wilson', avatar: 'MW', storyPoints: 21, isOnline: false },
    { id: '4', name: 'Emily Davis', avatar: 'ED', storyPoints: 15, isOnline: true },
    { id: '5', name: 'James Brown', avatar: 'JB', storyPoints: 12, isOnline: false },
    { id: '6', name: 'Lisa Wang', avatar: 'LW', storyPoints: 19, isOnline: true },
    { id: '7', name: 'David Kim', avatar: 'DK', storyPoints: 16, isOnline: true },
    { id: '8', name: 'Emma Taylor', avatar: 'ET', storyPoints: 14, isOnline: false },
  ];

  private navItems: NavItem[] = [
    { id: '1', label: 'Dashboard', icon: 'fa-home', iconLibrary: 'fa', route: '/dashboard' },
    { id: '2', label: 'Projects', icon: 'fa-folder', iconLibrary: 'fa', route: '/dashboard' },
    { id: '3', label: 'Tasks', icon: 'fa-tasks', iconLibrary: 'fa', route: '/dashboard' },
    { id: '4', label: 'Calendar', icon: 'fa-calendar', iconLibrary: 'fa', route: '/dashboard' },
    { id: '5', label: 'Reports', icon: 'fa-chart-bar', iconLibrary: 'fa', route: '/dashboard' },
    { id: '6', label: 'Team', icon: 'fa-users', iconLibrary: 'fa', route: '/dashboard' },
    { id: '7', label: 'Settings', icon: 'fa-cog', iconLibrary: 'fa', route: '/dashboard' },
    { id: '8', label: 'About', icon: 'fa-info-circle', iconLibrary: 'fa', route: '/about' },
  ];

  constructor() { }

  getEpics(): Observable<Epic[]> {
    return of(this.epics);
  }

  getProgressData(): Observable<ProgressData[]> {
    return of(this.progressData);
  }

  getMetrics(): Observable<Metric[]> {
    return of(this.metrics);
  }

  getBurnChartData(): Observable<BurnChartData[]> {
    return of(this.burnChartData);
  }

  getStories(): Observable<Story[]> {
    return of(this.stories);
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(this.teamMembers);
  }

  getNavItems(): Observable<NavItem[]> {
    return of(this.navItems);
  }
}
