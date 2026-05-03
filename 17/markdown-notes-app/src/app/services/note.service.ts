import { Injectable, signal, computed } from '@angular/core';
import { Note } from '../models/note.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly _notes = signal<Note[]>([]);
  public readonly notes = this._notes.asReadonly();

  constructor(private storageService: StorageService) {
    this.loadNotes();
  }

  private loadNotes(): void {
    const data = this.storageService.getData();
    this._notes.set(data.notes);
  }

  private saveNotes(): void {
    const data = this.storageService.getData();
    data.notes = this._notes();
    this.storageService.saveData(data);
  }

  getNoteById(id: string): Note | undefined {
    return this._notes().find(note => note.id === id);
  }

  getNotesByFolder(folderId: string): Note[] {
    return this._notes().filter(note => note.folderId === folderId);
  }

  getFavoriteNotes(): Note[] {
    return this._notes().filter(note => note.isFavorite);
  }

  searchNotes(query: string): Note[] {
    if (!query.trim()) {
      return this._notes();
    }
    const lowerQuery = query.toLowerCase();
    return this._notes().filter(note => 
      note.title.toLowerCase().includes(lowerQuery) || 
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.name.toLowerCase().includes(lowerQuery))
    );
  }

  createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this._notes.update(notes => [...notes, newNote]);
    this.saveNotes();
    return newNote;
  }

  updateNote(id: string, updates: Partial<Note>): Note | undefined {
    let updatedNote: Note | undefined;
    this._notes.update(notes => 
      notes.map(note => {
        if (note.id === id) {
          updatedNote = {
            ...note,
            ...updates,
            updatedAt: new Date()
          };
          return updatedNote;
        }
        return note;
      })
    );
    if (updatedNote) {
      this.saveNotes();
    }
    return updatedNote;
  }

  deleteNote(id: string): boolean {
    const note = this.getNoteById(id);
    if (!note) return false;
    
    this._notes.update(notes => notes.filter(n => n.id !== id));
    this.saveNotes();
    return true;
  }

  toggleFavorite(id: string): Note | undefined {
    const note = this.getNoteById(id);
    if (!note) return undefined;
    return this.updateNote(id, { isFavorite: !note.isFavorite });
  }

  addTagToNote(noteId: string, tag: { id: string; name: string; color: string }): Note | undefined {
    const note = this.getNoteById(noteId);
    if (!note) return undefined;
    if (note.tags.some(t => t.id === tag.id)) return note;
    
    const newTag = {
      ...tag,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return this.updateNote(noteId, { tags: [...note.tags, newTag] });
  }

  removeTagFromNote(noteId: string, tagId: string): Note | undefined {
    const note = this.getNoteById(noteId);
    if (!note) return undefined;
    
    return this.updateNote(noteId, { 
      tags: note.tags.filter(t => t.id !== tagId) 
    });
  }
}