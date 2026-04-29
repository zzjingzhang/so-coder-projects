import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { ToastMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$: Observable<ToastMessage[]> = this.toastsSubject.asObservable();

  private defaultDuration = 3000;

  showToast(type: ToastMessage['type'], message: string, duration?: number): string {
    const toast: ToastMessage = {
      id: uuidv4(),
      type,
      message,
      duration: duration ?? this.defaultDuration
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (toast.duration && toast.duration > 0) {
      timer(toast.duration).subscribe(() => {
        this.removeToast(toast.id);
      });
    }

    return toast.id;
  }

  success(message: string, duration?: number): string {
    return this.showToast('success', message, duration);
  }

  error(message: string, duration?: number): string {
    return this.showToast('error', message, duration);
  }

  warning(message: string, duration?: number): string {
    return this.showToast('warning', message, duration);
  }

  info(message: string, duration?: number): string {
    return this.showToast('info', message, duration);
  }

  removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(updatedToasts);
  }

  clearAll(): void {
    this.toastsSubject.next([]);
  }
}
