import { Injectable, signal } from '@angular/core';
import { Tag } from '../models/tag.model';
import { StorageService } from './storage.service';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly _tags = signal<Tag[]>([]);
  public readonly tags = this._tags.asReadonly();

  constructor(
    private storageService: StorageService,
    private noteService: NoteService
  ) {
    this.loadTags();
  }

  private loadTags(): void {
    const data = this.storageService.getData();
    this._tags.set(data.tags);
  }

  private saveTags(): void {
    const data = this.storageService.getData();
    data.tags = this._tags();
    this.storageService.saveData(data);
  }

  getTagById(id: string): Tag | undefined {
    return this._tags().find(tag => tag.id === id);
  }

  getTagByName(name: string): Tag | undefined {
    return this._tags().find(tag => tag.name.toLowerCase() === name.toLowerCase());
  }

  createTag(name: string, color: string = '#1890ff'): Tag {
    const existingTag = this.getTagByName(name);
    if (existingTag) {
      return existingTag;
    }
    
    const newTag: Tag = {
      id: `tag-${Date.now()}`,
      name,
      color,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this._tags.update(tags => [...tags, newTag]);
    this.saveTags();
    return newTag;
  }

  updateTag(id: string, updates: Partial<Tag>): Tag | undefined {
    let updatedTag: Tag | undefined;
    this._tags.update(tags => 
      tags.map(tag => {
        if (tag.id === id) {
          updatedTag = {
            ...tag,
            ...updates,
            updatedAt: new Date()
          };
          return updatedTag;
        }
        return tag;
      })
    );
    if (updatedTag) {
      this.saveTags();
    }
    return updatedTag;
  }

  deleteTag(id: string): boolean {
    const tag = this.getTagById(id);
    if (!tag) return false;
    
    const notes = this.noteService.notes();
    notes.forEach(note => {
      if (note.tags.some(t => t.id === id)) {
        this.noteService.removeTagFromNote(note.id, id);
      }
    });
    
    this._tags.update(tags => tags.filter(t => t.id !== id));
    this.saveTags();
    return true;
  }
}