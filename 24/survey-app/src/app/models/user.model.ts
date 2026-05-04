export enum UserRole {
  COORDINATOR = 'coordinator',
  RESPONDENT = 'respondent'
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}
