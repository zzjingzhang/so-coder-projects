import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  Project,
  Task,
  TaskStatus,
  TaskPriority,
  Member,
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS
} from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  projectId: string = '';
  project: Project | null = null;
  tasks: Task[] = [];
  allMembers: Member[] = [];
  loading = true;
  isTaskModalVisible = false;
  isMemberModalVisible = false;
  isEditProjectModalVisible = false;
  selectedTask: Task | null = null;
  isCreating = false;

  taskForm = {
    title: '',
    description: '',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    assigneeId: null as string | null,
    dueDate: null as Date | null
  };

  editProjectForm = {
    name: '',
    description: '',
    color: ''
  };

  selectedMemberId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private memberService: MemberService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    combineLatest([
      this.projectService.getProjectById(this.projectId),
      this.taskService.getTasksByProject(this.projectId),
      this.memberService.getMembers()
    ]).subscribe(([project, tasks, members]) => {
      this.project = project || null;
      this.tasks = tasks;
      this.allMembers = members;
      this.loading = false;
      if (!project) {
        this.messageService.error('项目不存在');
        this.router.navigate(['/projects']);
      }
    });
  }

  getProjectMembers(): Member[] {
    if (!this.project) return [];
    return this.allMembers.filter(m => this.project?.memberIds.includes(m.id));
  }

  getAvailableMembers(): Member[] {
    if (!this.project) return this.allMembers;
    return this.allMembers.filter(m => !this.project?.memberIds.includes(m.id));
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  getTaskStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'status-todo';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }

  getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.HIGH:
        return '#ff4d4f';
      case TaskPriority.MEDIUM:
        return '#faad14';
      case TaskPriority.LOW:
        return '#52c41a';
      default:
        return '#d9d9d9';
    }
  }

  getMemberById(id: string | null): Member | undefined {
    if (!id) return undefined;
    return this.allMembers.find(m => m.id === id);
  }

  openCreateTaskModal(): void {
    this.isCreating = true;
    this.selectedTask = null;
    this.taskForm = {
      title: '',
      description: '',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      assigneeId: null,
      dueDate: null
    };
    this.isTaskModalVisible = true;
  }

  openEditTaskModal(task: Task): void {
    this.isCreating = false;
    this.selectedTask = task;
    this.taskForm = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      dueDate: task.dueDate
    };
    this.isTaskModalVisible = true;
  }

  handleTaskModalCancel(): void {
    this.isTaskModalVisible = false;
  }

  handleTaskModalOk(): void {
    if (!this.taskForm.title.trim()) {
      this.messageService.warning('请输入任务标题');
      return;
    }

    if (this.isCreating) {
      this.taskService.createTask({
        projectId: this.projectId,
        title: this.taskForm.title,
        description: this.taskForm.description,
        status: this.taskForm.status,
        priority: this.taskForm.priority,
        assigneeId: this.taskForm.assigneeId,
        dueDate: this.taskForm.dueDate
      });
      this.messageService.success('任务创建成功');
    } else if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, {
        title: this.taskForm.title,
        description: this.taskForm.description,
        status: this.taskForm.status,
        priority: this.taskForm.priority,
        assigneeId: this.taskForm.assigneeId,
        dueDate: this.taskForm.dueDate
      });
      this.messageService.success('任务更新成功');
    }

    this.isTaskModalVisible = false;
  }

  updateTaskStatus(task: Task, status: TaskStatus): void {
    this.taskService.updateTask(task.id, { status });
    this.messageService.success('状态已更新');
  }

  confirmDeleteTask(task: Task): void {
    this.modalService.confirm({
      nzTitle: '确认删除',
      nzContent: `确定要删除任务「${task.title}」吗？此操作无法恢复。`,
      nzOkText: '删除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.taskService.deleteTask(task.id);
        this.messageService.success('任务已删除');
      },
      nzCancelText: '取消'
    });
  }

  openAddMemberModal(): void {
    this.selectedMemberId = null;
    this.isMemberModalVisible = true;
  }

  handleMemberModalCancel(): void {
    this.isMemberModalVisible = false;
  }

  handleMemberModalOk(): void {
    if (!this.selectedMemberId) {
      this.messageService.warning('请选择成员');
      return;
    }
    this.projectService.addMemberToProject(this.projectId, this.selectedMemberId);
    this.messageService.success('成员已添加');
    this.isMemberModalVisible = false;
  }

  removeMemberFromProject(memberId: string): void {
    this.modalService.confirm({
      nzTitle: '确认移除',
      nzContent: '确定要从项目中移除此成员吗？',
      nzOkText: '移除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projectService.removeMemberFromProject(this.projectId, memberId);
        this.messageService.success('成员已移除');
      },
      nzCancelText: '取消'
    });
  }

  openEditProjectModal(): void {
    if (!this.project) return;
    this.editProjectForm = {
      name: this.project.name,
      description: this.project.description,
      color: this.project.color
    };
    this.isEditProjectModalVisible = true;
  }

  handleEditProjectModalCancel(): void {
    this.isEditProjectModalVisible = false;
  }

  handleEditProjectModalOk(): void {
    if (!this.editProjectForm.name.trim()) {
      this.messageService.warning('请输入项目名称');
      return;
    }
    this.projectService.updateProject(this.projectId, {
      name: this.editProjectForm.name,
      description: this.editProjectForm.description,
      color: this.editProjectForm.color
    });
    this.messageService.success('项目信息已更新');
    this.isEditProjectModalVisible = false;
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
