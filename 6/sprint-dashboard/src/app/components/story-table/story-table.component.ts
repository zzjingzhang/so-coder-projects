import { Component, OnInit } from '@angular/core';
import { DashboardService, Story } from '../../services/dashboard.service';

@Component({
  selector: 'app-story-table',
  templateUrl: './story-table.component.html',
  styleUrls: ['./story-table.component.css'],
  standalone: false
})
export class StoryTableComponent implements OnInit {
  stories: Story[] = [];
  displayedColumns: string[] = ['id', 'title', 'status', 'count', 'actions'];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getStories().subscribe(stories => {
      this.stories = stories;
    });
  }

  getStatusChipClass(status: string): string {
    switch (status) {
      case 'done':
        return 'bg-green-500/20 text-green-400';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'done':
        return 'Done';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'To Do';
    }
  }

  onEdit(story: Story): void {
    console.log('Edit story:', story);
  }

  onDelete(story: Story): void {
    console.log('Delete story:', story);
  }

  onView(story: Story): void {
    console.log('View story:', story);
  }
}
