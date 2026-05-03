import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { Folder } from '../models/folder.model';
import { Tag } from '../models/tag.model';

export interface AppData {
  notes: Note[];
  folders: Folder[];
  tags: Tag[];
}

const STORAGE_KEY = 'markdown-notes-data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const welcomeContent = `# Welcome to Markdown Notes

This is a powerful Markdown note application with the following features:

- **Folder Organization**: Create folders to organize your notes
- **Search Functionality**: Quickly find the notes you need
- **Tag System**: Use tags to categorize and filter notes
- **Export Options**: Support exporting to Markdown files
- **Dark/Light Theme**: Protect your eyes
- **Live Preview**: See the results as you write

## Example

This is **bold** text, and this is *italic* text.

### Code Example

\`\`\`javascript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

> This is a blockquote

### List

1. First item
2. Second item
3. Third item

### Table

| Feature | Status |
|---------|--------|
| Folders | ✅ |
| Search | ✅ |
| Tags | ✅ |
| Export | ✅ |`;

      const initialData: AppData = {
        notes: [
          {
            id: 'note-1',
            title: 'Welcome to Markdown Notes',
            content: welcomeContent,
            folderId: 'folder-1',
            tags: [
              { id: 'tag-1', name: 'Welcome', color: '#1890ff', createdAt: new Date(), updatedAt: new Date() },
              { id: 'tag-2', name: 'Tutorial', color: '#52c41a', createdAt: new Date(), updatedAt: new Date() }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            isFavorite: true
          }
        ],
        folders: [
          {
            id: 'folder-1',
            name: 'My Notes',
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            noteCount: 1
          }
        ],
        tags: [
          { id: 'tag-1', name: 'Welcome', color: '#1890ff', createdAt: new Date(), updatedAt: new Date() },
          { id: 'tag-2', name: 'Tutorial', color: '#52c41a', createdAt: new Date(), updatedAt: new Date() },
          { id: 'tag-3', name: 'Work', color: '#faad14', createdAt: new Date(), updatedAt: new Date() },
          { id: 'tag-4', name: 'Personal', color: '#f5222d', createdAt: new Date(), updatedAt: new Date() }
        ]
      };
      this.saveData(initialData);
    }
  }

  getData(): AppData {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { notes: [], folders: [], tags: [] };
  }

  saveData(data: AppData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  clearData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}