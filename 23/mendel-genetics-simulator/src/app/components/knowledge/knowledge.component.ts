import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  standalone: false,
  styleUrl: './knowledge.component.css'
})
export class KnowledgeComponent {
  @Output() nextStep = new EventEmitter<void>();

  activeTab = 0;

  tabs = [
    { title: '基本概念', icon: '📚' },
    { title: '分离定律', icon: '🧪' },
    { title: '实验步骤', icon: '📋' }
  ];

  selectTab(index: number): void {
    this.activeTab = index;
  }

  onNext(): void {
    this.nextStep.emit();
  }
}
