import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { mockUser } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User = { ...mockUser };

  constructor() { }

  getCurrentUser(): Observable<User> {
    return of(this.currentUser);
  }

  updateUser(updatedUser: Partial<User>): Observable<User> {
    this.currentUser = { ...this.currentUser, ...updatedUser };
    return of(this.currentUser);
  }
}
