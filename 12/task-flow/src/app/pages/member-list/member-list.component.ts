import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Member, MemberRole, MEMBER_ROLE_LABELS, AVATAR_COLORS, Project } from '../../models/project.model';
import { MemberService } from '../../services/member.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-member-list',
  standalone: false,
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  projects: Project[] = [];
  loading = true;
  isCreateModalVisible = false;
  isEditModalVisible = false;
  selectedMember: Member | null = null;

  memberForm = {
    name: '',
    email: '',
    role: MemberRole.MEMBER,
    color: AVATAR_COLORS[0]
  };

  constructor(
    private memberService: MemberService,
    private projectService: ProjectService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.loading = false;
    });
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  getRoleTagColor(role: MemberRole): string {
    switch (role) {
      case MemberRole.ADMIN:
        return 'red';
      case MemberRole.MEMBER:
        return 'blue';
      case MemberRole.GUEST:
        return 'default';
      default:
        return 'default';
    }
  }

  openCreateModal(): void {
    this.isCreateModalVisible = true;
    this.memberForm = {
      name: '',
      email: '',
      role: MemberRole.MEMBER,
      color: AVATAR_COLORS[0]
    };
  }

  handleCreateCancel(): void {
    this.isCreateModalVisible = false;
  }

  handleCreateOk(): void {
    if (!this.memberForm.name.trim()) {
      this.messageService.warning('请输入成员名称');
      return;
    }
    if (!this.memberForm.email.trim()) {
      this.messageService.warning('请输入邮箱');
      return;
    }
    this.memberService.createMember({
      name: this.memberForm.name,
      email: this.memberForm.email,
      role: this.memberForm.role,
      color: this.memberForm.color,
      avatar: ''
    });
    this.messageService.success('成员创建成功');
    this.isCreateModalVisible = false;
  }

  openEditModal(member: Member): void {
    this.selectedMember = member;
    this.memberForm = {
      name: member.name,
      email: member.email,
      role: member.role,
      color: member.color
    };
    this.isEditModalVisible = true;
  }

  handleEditCancel(): void {
    this.isEditModalVisible = false;
  }

  handleEditOk(): void {
    if (!this.selectedMember) return;
    if (!this.memberForm.name.trim()) {
      this.messageService.warning('请输入成员名称');
      return;
    }
    if (!this.memberForm.email.trim()) {
      this.messageService.warning('请输入邮箱');
      return;
    }
    this.memberService.updateMember(this.selectedMember.id, {
      name: this.memberForm.name,
      email: this.memberForm.email,
      role: this.memberForm.role,
      color: this.memberForm.color
    });
    this.messageService.success('成员信息已更新');
    this.isEditModalVisible = false;
  }

  confirmDelete(member: Member): void {
    this.modalService.confirm({
      nzTitle: '确认删除',
      nzContent: `确定要删除成员「${member.name}」吗？此操作将同时移除该成员在所有项目中的参与，且无法恢复。`,
      nzOkText: '删除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.forEach(p => {
          if (p.memberIds.includes(member.id)) {
            this.projectService.removeMemberFromProject(p.id, member.id);
          }
        });
        this.memberService.deleteMember(member.id);
        this.messageService.success('成员已删除');
      },
      nzCancelText: '取消'
    });
  }
}
