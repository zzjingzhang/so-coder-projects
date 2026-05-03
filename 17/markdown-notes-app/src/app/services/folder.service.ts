import { Injectable, signal } from '@angular/core';
import { Folder } from '../models/folder.model';
import { StorageService } from './storage.service';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private readonly _folders = signal<Folder[]>([]);
  public readonly folders = this._folders.asReadonly();

  constructor(
    private storageService: StorageService,
    private noteService: NoteService
  ) {
    this.loadFolders();
  }

  private loadFolders(): void {
    const data = this.storageService.getData();
    this._folders.set(data.folders);
  }

  private saveFolders(): void {
    const data = this.storageService.getData();
    data.folders = this._folders();
    this.storageService.saveData(data);
  }

  getFolderById(id: string): Folder | undefined {
    return this._folders().find(folder => folder.id === id);
  }

  getRootFolders(): Folder[] {
    return this._folders().filter(folder => folder.parentId === null);
  }

  getChildFolders(parentId: string): Folder[] {
    return this._folders().filter(folder => folder.parentId === parentId);
  }

  createFolder(name: string, parentId: string | null = null): Folder {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
      noteCount: 0
    };
    this._folders.update(folders => [...folders, newFolder]);
    this.saveFolders();
    return newFolder;
  }

  updateFolder(id: string, updates: Partial<Folder>): Folder | undefined {
    let updatedFolder: Folder | undefined;
    this._folders.update(folders => 
      folders.map(folder => {
        if (folder.id === id) {
          updatedFolder = {
            ...folder,
            ...updates,
            updatedAt: new Date()
          };
          return updatedFolder;
        }
        return folder;
      })
    );
    if (updatedFolder) {
      this.saveFolders();
    }
    return updatedFolder;
  }

  deleteFolder(id: string): boolean {
    const folder = this.getFolderById(id);
    if (!folder) return false;
    
    const notes = this.noteService.getNotesByFolder(id);
    const defaultFolder = this.getRootFolders()[0];
    if (defaultFolder && defaultFolder.id !== id) {
      notes.forEach(note => {
        this.noteService.updateNote(note.id, { folderId: defaultFolder.id });
      });
    }
    
    this._folders.update(folders => folders.filter(f => f.id !== id));
    this.saveFolders();
    return true;
  }

  updateNoteCount(): void {
    const folders = this._folders().map(folder => ({
      ...folder,
      noteCount: this.noteService.getNotesByFolder(folder.id).length
    }));
    this._folders.set(folders);
    this.saveFolders();
  }
}