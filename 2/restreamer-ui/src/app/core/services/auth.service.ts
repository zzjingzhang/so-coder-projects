import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { 
  User, 
  UserRole, 
  AuthProvider, 
  LoginCredentials, 
  Auth0Config, 
  AuthState 
} from '../models/user.model';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';
const AUTH_PROVIDER_KEY = 'auth_provider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    authProvider: null,
    loading: false,
    error: null
  };

  private readonly authStateSubject = new BehaviorSubject<AuthState>(this.initialState);
  readonly authState$: Observable<AuthState> = this.authStateSubject.asObservable();

  private mockUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@restreamer.local',
      displayName: 'Administrator',
      role: UserRole.ADMIN,
      authProvider: AuthProvider.LOCAL,
      createdAt: new Date('2024-01-01'),
      lastLoginAt: new Date()
    },
    {
      id: '2',
      username: 'user',
      email: 'user@restreamer.local',
      displayName: 'Regular User',
      role: UserRole.USER,
      authProvider: AuthProvider.LOCAL,
      createdAt: new Date('2024-02-01'),
      lastLoginAt: new Date()
    }
  ];

  private auth0Config: Auth0Config = {
    domain: 'dev-xxx.auth0.com',
    clientId: 'your-client-id',
    redirectUri: window.location.origin + '/callback',
    audience: 'https://restreamer-api',
    scope: 'openid profile email'
  };

  constructor(private router: Router) {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    const authProviderStr = localStorage.getItem(AUTH_PROVIDER_KEY);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        const authProvider = authProviderStr as AuthProvider;
        
        this.authStateSubject.next({
          isAuthenticated: true,
          user,
          token,
          refreshToken,
          authProvider,
          loading: false,
          error: null
        });
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  private setAuth(user: User, token: string, refreshToken: string | null, provider: AuthProvider): void {
    const authState: AuthState = {
      isAuthenticated: true,
      user,
      token,
      refreshToken,
      authProvider: provider,
      loading: false,
      error: null
    };

    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_PROVIDER_KEY, provider);

    this.authStateSubject.next(authState);
  }

  private clearAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_PROVIDER_KEY);

    this.authStateSubject.next(this.initialState);
  }

  get isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  get currentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  get currentToken(): string | null {
    return this.authStateSubject.value.token;
  }

  login(credentials: LoginCredentials): Observable<User> {
    this.authStateSubject.next({
      ...this.authStateSubject.value,
      loading: true,
      error: null
    });

    return of(null).pipe(
      delay(800),
      map(() => {
        const user = this.mockUsers.find(
          u => u.username.toLowerCase() === credentials.username.toLowerCase()
        );

        if (!user || credentials.password !== 'password') {
          throw new Error('Invalid credentials');
        }

        const token = 'jwt_token_' + Math.random().toString(36).substring(2, 15);
        const refreshToken = 'refresh_' + Math.random().toString(36).substring(2, 15);

        this.setAuth(user, token, refreshToken, AuthProvider.LOCAL);

        return user;
      }),
      catchError((error) => {
        this.authStateSubject.next({
          ...this.authStateSubject.value,
          loading: false,
          error: error.message
        });
        return throwError(() => error);
      })
    );
  }

  loginWithAuth0(): void {
    this.authStateSubject.next({
      ...this.authStateSubject.value,
      loading: true,
      error: null
    });

    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('auth0_state', state);

    const authUrl = this.buildAuth0AuthorizeUrl(state);
    window.location.href = authUrl;
  }

  private buildAuth0AuthorizeUrl(state: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.auth0Config.clientId,
      redirect_uri: this.auth0Config.redirectUri,
      scope: this.auth0Config.scope || 'openid profile email',
      state: state
    });

    if (this.auth0Config.audience) {
      params.set('audience', this.auth0Config.audience);
    }

    return `https://${this.auth0Config.domain}/authorize?${params.toString()}`;
  }

  handleAuth0Callback(code: string, state: string): Observable<User> {
    const savedState = localStorage.getItem('auth0_state');
    localStorage.removeItem('auth0_state');

    if (state !== savedState) {
      return throwError(() => new Error('Invalid state parameter'));
    }

    return of(null).pipe(
      delay(500),
      map(() => {
        const user: User = {
          id: 'auth0_' + Math.random().toString(36).substring(2, 10),
          username: 'auth0_user',
          email: 'user@auth0.com',
          displayName: 'Auth0 User',
          role: UserRole.USER,
          authProvider: AuthProvider.AUTH0,
          createdAt: new Date(),
          lastLoginAt: new Date()
        };

        const token = 'auth0_jwt_' + Math.random().toString(36).substring(2, 15);
        this.setAuth(user, token, null, AuthProvider.AUTH0);

        return user;
      })
    );
  }

  logout(): void {
    const currentState = this.authStateSubject.value;
    
    if (currentState.authProvider === AuthProvider.AUTH0) {
      const logoutUrl = `https://${this.auth0Config.domain}/v2/logout?client_id=${this.auth0Config.clientId}&returnTo=${encodeURIComponent(window.location.origin)}`;
      this.clearAuth();
      window.location.href = logoutUrl;
    } else {
      this.clearAuth();
      this.router.navigate(['/login']);
    }
  }

  refreshToken(): Observable<string> {
    const currentRefreshToken = this.authStateSubject.value.refreshToken;
    
    if (!currentRefreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return of(null).pipe(
      delay(300),
      map(() => {
        const newToken = 'new_jwt_' + Math.random().toString(36).substring(2, 15);
        
        const currentState = this.authStateSubject.value;
        localStorage.setItem(TOKEN_KEY, newToken);
        
        this.authStateSubject.next({
          ...currentState,
          token: newToken
        });

        return newToken;
      })
    );
  }

  updateAuth0Config(config: Partial<Auth0Config>): void {
    this.auth0Config = { ...this.auth0Config, ...config };
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUser;
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      [UserRole.VIEWER]: 1,
      [UserRole.USER]: 2,
      [UserRole.ADMIN]: 3
    };

    return roleHierarchy[user.role] >= roleHierarchy[role];
  }
}
