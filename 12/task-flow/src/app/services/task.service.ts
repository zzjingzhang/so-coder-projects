import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Task, TaskStatus, TaskPriority } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.getInitialTasks());
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  private getInitialTasks(): Task[] {
    const stored = localStorage.getItem('taskflow_tasks');
    if (stored) {
      return JSON.parse(stored).map((t: Task) => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : null,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt)
      }));
    }
    return [
      {
        id: 't1',
        projectId: 'p1',
        title: '首页设计稿评审',
        description: '组织设计团队评审首页设计方案',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        assigneeId: 'm1',
        dueDate: new Date('2026-01-20'),
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date()
      },
      {
        id: 't2',
        projectId: 'p1',
        title: '前端页面开发',
        description: '根据设计稿实现首页和产品页面',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assigneeId: 'm2',
        dueDate: new Date('2026-02-15'),
        createdAt: new Date('2026-01-18'),
        updatedAt: new Date()
      },
      {
        id: 't3',
        projectId: 'p1',
        title: '后端 API 开发',
        description: '开发首页数据获取接口',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assigneeId: 'm3',
        dueDate: new Date('2026-02-10'),
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date()
      },
      {
        id: 't4',
        projectId: 'p1',
        title: '性能优化',
        description: '优化页面加载速度和用户体验',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assigneeId: null,
        dueDate: null,
        createdAt: new Date('2026-01-25'),
        updatedAt: new Date()
      },
      {
        id: 't5',
        projectId: 'p2',
        title: '需求文档编写',
        description: '整理移动应用功能需求文档',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        assigneeId: 'm1',
        dueDate: new Date('2026-02-05'),
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date()
      },
      {
        id: 't6',
        projectId: 'p2',
        title: 'UI 设计',
        description: '设计移动应用界面',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assigneeId: 'm4',
        dueDate: new Date('2026-02-20'),
        createdAt: new Date('2026-02-03'),
        updatedAt: new Date()
      },
      {
        id: 't7',
        projectId: 'p2',
        title: '技术选型',
        description: '确定移动应用开发技术栈',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assigneeId: null,
        dueDate: null,
        createdAt: new Date('2026-02-05'),
        updatedAt: new Date()
      }
    ];
  }

  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t => t.projectId === projectId))
    );
  }

  getTaskById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map(tasks => tasks.find(t => t.id === id))
    );
  }

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    const tasks = this.tasksSubject.value;
    const newTask: Task = {
      ...task,
      id: `t${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updated = [...tasks, newTask];
    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      const updated = [...tasks];
      updated[index] = {
        ...updated[index],
        ...updates,
        updatedAt: new Date()
      };
      this.tasksSubject.next(updated);
      this.saveToStorage(updated);
    }
  }

  deleteTask(id: string): void {
    const tasks = this.tasksSubject.value;
    const updated = tasks.filter(t => t.id !== id);
    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  deleteTasksByProject(projectId: string): void {
    const tasks = this.tasksSubject.value;
    const updated = tasks.filter(t => t.projectId !== projectId);
    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }
}
