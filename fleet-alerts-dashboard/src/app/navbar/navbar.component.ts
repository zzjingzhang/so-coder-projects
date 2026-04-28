import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() unreadCount: number = 0;
  @Output() notificationsClick = new EventEmitter<void>();

  onNotificationsClick() {
    this.notificationsClick.emit();
  }
}
