import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole, LoginCredentials, RegisterCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'survey_app_users';
  private readonly CURRENT_USER_KEY = 'survey_app_current_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadCurrentUser();
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers(): void {
    const users = this.getUsersFromStorage();
    if (users.length === 0) {
      const defaultCoordinator: User = {
        id: this.generateId(),
        username: 'admin',
        password: 'admin123',
        role: UserRole.COORDINATOR,
        createdAt: new Date()
      };
      users.push(defaultCoordinator);
      this.saveUsersToStorage(users);
    }
  }

  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  private getUsersFromStorage(): User[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  login(credentials: LoginCredentials): Observable<User | null> {
    const users = this.getUsersFromStorage();
    const user = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user);
    }
    
    return of(null);
  }

  register(credentials: RegisterCredentials): Observable<User | null> {
    const users = this.getUsersFromStorage();
    
    if (users.find(u => u.username === credentials.username)) {
      return of(null);
    }
    
    if (credentials.password !== credentials.confirmPassword) {
      return of(null);
    }
    
    const newUser: User = {
      id: this.generateId(),
      username: credentials.username,
      password: credentials.password,
      role: credentials.role,
      createdAt: new Date()
    };
    
    users.push(newUser);
    this.saveUsersToStorage(users);
    
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));
    this.currentUserSubject.next(newUser);
    
    return of(newUser);
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isCoordinator(): boolean {
    return this.currentUserSubject.value?.role === UserRole.COORDINATOR;
  }

  isRespondent(): boolean {
    return this.currentUserSubject.value?.role === UserRole.RESPONDENT;
  }
}
