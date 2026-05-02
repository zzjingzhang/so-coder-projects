import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Member, MemberRole, AVATAR_COLORS } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersSubject = new BehaviorSubject<Member[]>(this.getInitialMembers());
  members$ = this.membersSubject.asObservable();

  constructor() {}

  private getInitialMembers(): Member[] {
    const stored = localStorage.getItem('taskflow_members');
    if (stored) {
      return JSON.parse(stored);
    }
    return [
      {
        id: 'm1',
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: '',
        color: AVATAR_COLORS[0],
        role: MemberRole.ADMIN
      },
      {
        id: 'm2',
        name: '李四',
        email: 'lisi@example.com',
        avatar: '',
        color: AVATAR_COLORS[1],
        role: MemberRole.MEMBER
      },
      {
        id: 'm3',
        name: '王五',
        email: 'wangwu@example.com',
        avatar: '',
        color: AVATAR_COLORS[2],
        role: MemberRole.MEMBER
      },
      {
        id: 'm4',
        name: '赵六',
        email: 'zhaoliu@example.com',
        avatar: '',
        color: AVATAR_COLORS[3],
        role: MemberRole.GUEST
      }
    ];
  }

  private saveToStorage(members: Member[]): void {
    localStorage.setItem('taskflow_members', JSON.stringify(members));
  }

  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  getMemberById(id: string): Observable<Member | undefined> {
    return this.members$.pipe(
      map(members => members.find(m => m.id === id))
    );
  }

  getMembersByIds(ids: string[]): Observable<Member[]> {
    return this.members$.pipe(
      map(members => members.filter(m => ids.includes(m.id)))
    );
  }

  createMember(member: Omit<Member, 'id'>): void {
    const members = this.membersSubject.value;
    const newMember: Member = {
      ...member,
      id: `m${Date.now()}`
    };
    const updated = [...members, newMember];
    this.membersSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateMember(id: string, updates: Partial<Member>): void {
    const members = this.membersSubject.value;
    const index = members.findIndex(m => m.id === id);
    if (index !== -1) {
      const updated = [...members];
      updated[index] = {
        ...updated[index],
        ...updates
      };
      this.membersSubject.next(updated);
      this.saveToStorage(updated);
    }
  }

  deleteMember(id: string): void {
    const members = this.membersSubject.value;
    const updated = members.filter(m => m.id !== id);
    this.membersSubject.next(updated);
    this.saveToStorage(updated);
  }
}
