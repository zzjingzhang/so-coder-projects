import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Project, Task, TaskStatus, Member } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];
  members: Member[] = [];
  loading = true;

  stats = {
    totalProjects: 0,
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
    totalMembers: 0
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.projectService.getProjects(),
      this.taskService.getTasks(),
      this.memberService.getMembers()
    ]).subscribe(([projects, tasks, members]) => {
      this.projects = projects;
      this.tasks = tasks;
      this.members = members;
      this.calculateStats();
      this.loading = false;
    });
  }

  private calculateStats(): void {
    this.stats = {
      totalProjects: this.projects.length,
      totalTasks: this.tasks.length,
      todoTasks: this.tasks.filter(t => t.status === TaskStatus.TODO).length,
      inProgressTasks: this.tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      doneTasks: this.tasks.filter(t => t.status === TaskStatus.DONE).length,
      totalMembers: this.members.length
    };
  }

  getProgressPercentage(): number {
    if (this.stats.totalTasks === 0) return 0;
    return Math.round((this.stats.doneTasks / this.stats.totalTasks) * 100);
  }

  getRecentTasks(): Task[] {
    return this.tasks
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }

  getMemberById(id: string | null): Member | undefined {
    return this.members.find(m => m.id === id);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}
