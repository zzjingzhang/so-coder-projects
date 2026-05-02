import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project, PROJECT_COLORS } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>(this.getInitialProjects());
  projects$ = this.projectsSubject.asObservable();

  constructor() {}

  private getInitialProjects(): Project[] {
    const stored = localStorage.getItem('taskflow_projects');
    if (stored) {
      return JSON.parse(stored).map((p: Project) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }));
    }
    return [
      {
        id: 'p1',
        name: '网站重构项目',
        description: '公司官网全新改版升级，提升用户体验',
        color: PROJECT_COLORS[0],
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date(),
        memberIds: ['m1', 'm2', 'm3']
      },
      {
        id: 'p2',
        name: '移动应用开发',
        description: '开发 iOS 和 Android 移动应用',
        color: PROJECT_COLORS[1],
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date(),
        memberIds: ['m1', 'm4']
      }
    ];
  }

  private saveToStorage(projects: Project[]): void {
    localStorage.setItem('taskflow_projects', JSON.stringify(projects));
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map(projects => projects.find(p => p.id === id))
    );
  }

  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'memberIds'>): void {
    const projects = this.projectsSubject.value;
    const newProject: Project = {
      ...project,
      id: `p${Date.now()}`,
      memberIds: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updated = [...projects, newProject];
    this.projectsSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateProject(id: string, updates: Partial<Project>): void {
    const projects = this.projectsSubject.value;
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      const updated = [...projects];
      updated[index] = {
        ...updated[index],
        ...updates,
        updatedAt: new Date()
      };
      this.projectsSubject.next(updated);
      this.saveToStorage(updated);
    }
  }

  deleteProject(id: string): void {
    const projects = this.projectsSubject.value;
    const updated = projects.filter(p => p.id !== id);
    this.projectsSubject.next(updated);
    this.saveToStorage(updated);
  }

  addMemberToProject(projectId: string, memberId: string): void {
    const projects = this.projectsSubject.value;
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1 && !projects[index].memberIds.includes(memberId)) {
      const updated = [...projects];
      updated[index] = {
        ...updated[index],
        memberIds: [...updated[index].memberIds, memberId],
        updatedAt: new Date()
      };
      this.projectsSubject.next(updated);
      this.saveToStorage(updated);
    }
  }

  removeMemberFromProject(projectId: string, memberId: string): void {
    const projects = this.projectsSubject.value;
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      const updated = [...projects];
      updated[index] = {
        ...updated[index],
        memberIds: updated[index].memberIds.filter(id => id !== memberId),
        updatedAt: new Date()
      };
      this.projectsSubject.next(updated);
      this.saveToStorage(updated);
    }
  }
}
