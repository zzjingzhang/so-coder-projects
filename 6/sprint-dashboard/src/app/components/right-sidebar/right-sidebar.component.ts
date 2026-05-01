import { Component, OnInit } from '@angular/core';
import { DashboardService, Epic, ProgressData } from '../../services/dashboard.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
  standalone: false
})
export class RightSidebarComponent implements OnInit {
  epics: Epic[] = [];
  progressData: ProgressData[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getEpics().subscribe(epics => {
      this.epics = epics;
    });
    this.dashboardService.getProgressData().subscribe(data => {
      this.progressData = data;
    });
  }

  onProjectDetailsClick(): void {
    console.log('Project Details clicked');
  }
}
