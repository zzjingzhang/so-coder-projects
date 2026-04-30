import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor() {
    this.initTodos();
  }

  private initTodos(): void {
    const savedTodos = localStorage.getItem('lofi-todos');
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        const todos = parsed.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt)
        }));
        this.todosSubject.next(todos);
      } catch (e) {
        this.todosSubject.next([]);
      }
    }
  }

  getTodos(): TodoItem[] {
    return this.todosSubject.value;
  }

  addTodo(text: string): void {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    const todos = [newTodo, ...this.todosSubject.value];
    this.todosSubject.next(todos);
    this.saveTodos();
  }

  toggleTodo(id: string): void {
    const todos = this.todosSubject.value.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.todosSubject.next(todos);
    this.saveTodos();
  }

  deleteTodo(id: string): void {
    const todos = this.todosSubject.value.filter(t => t.id !== id);
    this.todosSubject.next(todos);
    this.saveTodos();
  }

  clearCompleted(): void {
    const todos = this.todosSubject.value.filter(t => !t.completed);
    this.todosSubject.next(todos);
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem('lofi-todos', JSON.stringify(this.todosSubject.value));
  }
}
