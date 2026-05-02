import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PipelineNode } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  private isDraggingSubject = new BehaviorSubject<boolean>(false);
  private draggedNodeSubject = new BehaviorSubject<Partial<PipelineNode> | null>(null);

  isDragging$ = this.isDraggingSubject.asObservable();
  draggedNode$ = this.draggedNodeSubject.asObservable();

  startDrag(node: Partial<PipelineNode>): void {
    this.draggedNodeSubject.next(node);
    this.isDraggingSubject.next(true);
  }

  endDrag(): Partial<PipelineNode> | null {
    const node = this.draggedNodeSubject.value;
    this.draggedNodeSubject.next(null);
    this.isDraggingSubject.next(false);
    return node;
  }

  getDraggedNode(): Partial<PipelineNode> | null {
    return this.draggedNodeSubject.value;
  }

  isDragging(): boolean {
    return this.isDraggingSubject.value;
  }
}
