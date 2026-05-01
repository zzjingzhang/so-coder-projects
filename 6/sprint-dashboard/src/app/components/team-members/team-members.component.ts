import { Component, OnInit } from '@angular/core';
import { DashboardService, TeamMember } from '../../services/dashboard.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css'],
  standalone: false
})
export class TeamMembersComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getTeamMembers().subscribe(members => {
      this.teamMembers = members;
    });
  }

  getAvatarColor(avatar: string): string {
    const colors = [
      '#49D9A0',
      '#FF6B6B',
      '#4ECDC4',
      '#FFE66D',
      '#95E1D3',
      '#DDA0DD',
      '#87CEEB',
      '#FFA07A'
    ];
    const index = avatar.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
