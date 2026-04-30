export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  role: UserRole;
  authProvider: AuthProvider;
  createdAt: Date;
  lastLoginAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer'
}

export enum AuthProvider {
  LOCAL = 'local',
  AUTH0 = 'auth0'
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience?: string;
  scope?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  authProvider: AuthProvider | null;
  loading: boolean;
  error: string | null;
}
