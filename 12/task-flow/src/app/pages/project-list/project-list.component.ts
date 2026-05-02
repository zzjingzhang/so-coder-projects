import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Project, PROJECT_COLORS, Member, Task } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  members: Member[] = [];
  tasks: Task[] = [];
  loading = true;
  isCreateModalVisible = false;
  newProject = {
    name: '',
    description: '',
    color: PROJECT_COLORS[0]
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private memberService: MemberService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.loading = false;
    });
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  getMemberById(id: string): Member | undefined {
    return this.members.find(m => m.id === id);
  }

  getTaskCount(projectId: string): { total: number; done: number } {
    const projectTasks = this.tasks.filter(t => t.projectId === projectId);
    return {
      total: projectTasks.length,
      done: projectTasks.filter(t => t.status === 'done').length
    };
  }

  openCreateModal(): void {
    this.isCreateModalVisible = true;
    this.newProject = {
      name: '',
      description: '',
      color: PROJECT_COLORS[0]
    };
  }

  handleCreateCancel(): void {
    this.isCreateModalVisible = false;
  }

  handleCreateOk(): void {
    if (!this.newProject.name.trim()) {
      this.messageService.warning('请输入项目名称');
      return;
    }
    this.projectService.createProject({
      name: this.newProject.name,
      description: this.newProject.description,
      color: this.newProject.color
    });
    this.messageService.success('项目创建成功');
    this.isCreateModalVisible = false;
  }

  confirmDelete(project: Project): void {
    this.modalService.confirm({
      nzTitle: '确认删除',
      nzContent: `确定要删除项目「${project.name}」吗？此操作将同时删除该项目下的所有任务，且无法恢复。`,
      nzOkText: '删除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.taskService.deleteTasksByProject(project.id);
        this.projectService.deleteProject(project.id);
        this.messageService.success('项目已删除');
      },
      nzCancelText: '取消'
    });
  }
}
