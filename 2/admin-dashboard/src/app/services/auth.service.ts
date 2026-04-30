import { Injectable } from '@angular/core';

export interface User {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private currentUser: User | null = null;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.currentUser = { username, password };
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUsername(): string {
    return this.currentUser?.username || localStorage.getItem('username') || '';
  }
}
