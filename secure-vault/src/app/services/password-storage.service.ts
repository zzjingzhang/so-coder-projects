import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PasswordEntry, SearchFilter } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PasswordStorageService {
  private readonly STORAGE_KEY = 'secure_vault_passwords';
  private passwordsSubject: BehaviorSubject<PasswordEntry[]> = new BehaviorSubject<PasswordEntry[]>([]);
  public passwords$: Observable<PasswordEntry[]> = this.passwordsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const passwords = JSON.parse(stored).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
          lastUsed: p.lastUsed ? new Date(p.lastUsed) : undefined
        }));
        this.passwordsSubject.next(passwords);
      }
    } catch (error) {
      console.error('Failed to load passwords from storage:', error);
      this.passwordsSubject.next([]);
    }
  }

  private saveToStorage(passwords: PasswordEntry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(passwords));
    } catch (error) {
      console.error('Failed to save passwords to storage:', error);
    }
  }

  getPasswords(): Observable<PasswordEntry[]> {
    return this.passwords$;
  }

  getPasswordById(id: string): Observable<PasswordEntry | undefined> {
    return this.passwords$.pipe(
      map(passwords => passwords.find(p => p.id === id))
    );
  }

  addPassword(password: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt' | 'lastUsed'>): Observable<PasswordEntry> {
    const newPassword: PasswordEntry = {
      ...password,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentPasswords = this.passwordsSubject.value;
    const updatedPasswords = [...currentPasswords, newPassword];
    
    this.passwordsSubject.next(updatedPasswords);
    this.saveToStorage(updatedPasswords);
    
    return of(newPassword);
  }

  updatePassword(id: string, updates: Partial<PasswordEntry>): Observable<PasswordEntry | undefined> {
    const currentPasswords = this.passwordsSubject.value;
    const index = currentPasswords.findIndex(p => p.id === id);
    
    if (index === -1) {
      return of(undefined);
    }
    
    const updatedPassword: PasswordEntry = {
      ...currentPasswords[index],
      ...updates,
      updatedAt: new Date()
    };
    
    const updatedPasswords = [...currentPasswords];
    updatedPasswords[index] = updatedPassword;
    
    this.passwordsSubject.next(updatedPasswords);
    this.saveToStorage(updatedPasswords);
    
    return of(updatedPassword);
  }

  deletePassword(id: string): Observable<boolean> {
    const currentPasswords = this.passwordsSubject.value;
    const index = currentPasswords.findIndex(p => p.id === id);
    
    if (index === -1) {
      return of(false);
    }
    
    const updatedPasswords = currentPasswords.filter(p => p.id !== id);
    
    this.passwordsSubject.next(updatedPasswords);
    this.saveToStorage(updatedPasswords);
    
    return of(true);
  }

  searchPasswords(filter: SearchFilter): Observable<PasswordEntry[]> {
    return this.passwords$.pipe(
      map(passwords => {
        return passwords.filter(password => {
          if (filter.query) {
            const query = filter.query.toLowerCase();
            const matchesQuery = 
              password.title.toLowerCase().includes(query) ||
              password.username.toLowerCase().includes(query) ||
              (password.website && password.website.toLowerCase().includes(query)) ||
              (password.notes && password.notes.toLowerCase().includes(query)) ||
              password.tags.some(tag => tag.toLowerCase().includes(query));
            
            if (!matchesQuery) return false;
          }
          
          if (filter.categories.length > 0) {
            if (!filter.categories.includes(password.category)) return false;
          }
          
          if (filter.tags.length > 0) {
            const hasAllTags = filter.tags.every(tag => password.tags.includes(tag));
            if (!hasAllTags) return false;
          }
          
          return true;
        });
      })
    );
  }

  updateLastUsed(id: string): Observable<boolean> {
    return this.updatePassword(id, { lastUsed: new Date() }).pipe(
      map(password => !!password)
    );
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
