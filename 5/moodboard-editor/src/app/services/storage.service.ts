import { Injectable } from '@angular/core';
import { CanvasState } from './canvas.service';

const STORAGE_KEY = 'moodboard_data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  save(state: CanvasState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  load(): CanvasState | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
    return null;
  }

  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  }
}
