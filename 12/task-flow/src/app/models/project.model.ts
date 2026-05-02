export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  memberIds: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  role: MemberRole;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum MemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest'
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: '待办',
  [TaskStatus.IN_PROGRESS]: '进行中',
  [TaskStatus.DONE]: '已完成'
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: '低',
  [TaskPriority.MEDIUM]: '中',
  [TaskPriority.HIGH]: '高'
};

export const MEMBER_ROLE_LABELS: Record<MemberRole, string> = {
  [MemberRole.ADMIN]: '管理员',
  [MemberRole.MEMBER]: '成员',
  [MemberRole.GUEST]: '访客'
};

export const PROJECT_COLORS = [
  '#1890ff',
  '#52c41a',
  '#faad14',
  '#ff4d4f',
  '#722ed1',
  '#13c2c2',
  '#eb2f96',
  '#fa8c16'
];

export const AVATAR_COLORS = [
  '#f56a00',
  '#7265e6',
  '#ffbf00',
  '#00a2ae',
  '#1890ff',
  '#52c41a',
  '#ff4d4f',
  '#722ed1'
];
