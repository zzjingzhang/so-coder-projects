import { Component } from '@angular/core';
import { TodoService, TodoItem } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTodoText: string = '';

  constructor(public todoService: TodoService) {}

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todoService.addTodo(this.newTodoText.trim());
      this.newTodoText = '';
    }
  }

  toggleTodo(todo: TodoItem): void {
    this.todoService.toggleTodo(todo.id);
  }

  deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodo(todo.id);
  }

  getCompletedCount(): number {
    return this.todoService.getTodos().filter(t => t.completed).length;
  }
}
