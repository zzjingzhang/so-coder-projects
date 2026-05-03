import { Component, computed, effect, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';
import { marked } from 'marked';

import { NoteService } from './services/note.service';
import { FolderService } from './services/folder.service';
import { TagService } from './services/tag.service';
import { ThemeService } from './services/theme.service';
import { ExportService } from './services/export.service';
import { Note } from './models/note.model';
import { Folder } from './models/folder.model';
import { Tag } from './models/tag.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzModalModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzSelectModule,
    NzToolTipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild('editor') editorRef!: ElementRef<HTMLTextAreaElement>;

  readonly isDark = computed(() => this.themeService.theme() === 'dark');
  readonly isSidebarCollapsed = signal(false);
  readonly searchQuery = signal('');
  readonly selectedFolderId = signal<string | null>(null);
  readonly selectedTagId = signal<string | null>(null);
  readonly showFavorites = signal(false);
  readonly currentNoteId = signal<string | null>(null);
  readonly isPreviewMode = signal(false);
  readonly newFolderName = signal('');
  readonly showNewFolderInput = signal(false);
  readonly newTagName = signal('');
  readonly newTagColor = signal('#1890ff');
  readonly showNewTagInput = signal(false);
  readonly noteTitle = signal('');
  readonly noteContent = signal('');
  readonly noteTags = signal<string[]>([]);
  readonly noteFolderId = signal('');

  readonly tagColors = [
    '#1890ff', '#52c41a', '#faad14', '#f5222d',
    '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'
  ];

  readonly filteredNotes = computed(() => {
    let notes = this.noteService.notes();
    
    if (this.searchQuery()) {
      notes = this.noteService.searchNotes(this.searchQuery());
    }
    
    if (this.showFavorites()) {
      notes = notes.filter(n => n.isFavorite);
    } else if (this.selectedFolderId()) {
      notes = notes.filter(n => n.folderId === this.selectedFolderId());
    }
    
    if (this.selectedTagId()) {
      notes = notes.filter(n => n.tags.some(t => t.id === this.selectedTagId()));
    }
    
    return notes.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  });

  readonly currentNote = computed(() => {
    const id = this.currentNoteId();
    return id ? this.noteService.getNoteById(id) : null;
  });

  readonly renderedContent = computed(() => {
    try {
      return marked(this.noteContent()) as string;
    } catch {
      return this.noteContent();
    }
  });

  constructor(
    public noteService: NoteService,
    public folderService: FolderService,
    public tagService: TagService,
    public themeService: ThemeService,
    private exportService: ExportService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {
    effect(() => {
      const note = this.currentNote();
      if (note) {
        this.noteTitle.set(note.title);
        this.noteContent.set(note.content);
        this.noteTags.set(note.tags.map(t => t.id));
        this.noteFolderId.set(note.folderId);
      }
    });
  }

  ngOnInit(): void {
    const notes = this.noteService.notes();
    if (notes.length > 0) {
      this.currentNoteId.set(notes[0].id);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }

  selectAllNotes(): void {
    this.selectedFolderId.set(null);
    this.selectedTagId.set(null);
    this.showFavorites.set(false);
  }

  selectFolder(folderId: string): void {
    this.selectedFolderId.set(folderId);
    this.selectedTagId.set(null);
    this.showFavorites.set(false);
  }

  selectTag(tagId: string): void {
    this.selectedTagId.set(tagId);
    this.selectedFolderId.set(null);
    this.showFavorites.set(false);
  }

  selectFavorites(): void {
    this.showFavorites.set(true);
    this.selectedFolderId.set(null);
    this.selectedTagId.set(null);
  }

  selectNote(noteId: string): void {
    this.currentNoteId.set(noteId);
  }

  createNewNote(): void {
    const folders = this.folderService.folders();
    const folderId = this.selectedFolderId() || (folders.length > 0 ? folders[0].id : '');
    
    if (!folderId) {
      this.message.warning('请先创建一个文件夹');
      return;
    }

    const newNote = this.noteService.createNote({
      title: '新建笔记',
      content: '# 新建笔记\n\n开始编写你的内容...',
      folderId,
      tags: [],
      isFavorite: false
    });
    
    this.currentNoteId.set(newNote.id);
    this.selectFolder(folderId);
    this.message.success('笔记创建成功');
  }

  saveCurrentNote(): void {
    const noteId = this.currentNoteId();
    if (!noteId) return;

    this.noteService.updateNote(noteId, {
      title: this.noteTitle(),
      content: this.noteContent(),
      folderId: this.noteFolderId(),
      tags: this.noteTags().map(id => {
        const tag = this.tagService.getTagById(id);
        return tag ? { id: tag.id, name: tag.name, color: tag.color, createdAt: tag.createdAt, updatedAt: tag.updatedAt } : null;
      }).filter((t): t is Tag => t !== null)
    });
    
    this.message.success('保存成功');
  }

  deleteNote(noteId: string): void {
    this.modalService.confirm({
      nzTitle: '确认删除',
      nzContent: '确定要删除这个笔记吗？此操作无法撤销。',
      nzOkText: '删除',
      nzOkDanger: true,
      nzOnOk: () => {
        if (this.currentNoteId() === noteId) {
          const notes = this.filteredNotes();
          const currentIndex = notes.findIndex(n => n.id === noteId);
          if (notes.length > 1) {
            const nextIndex = currentIndex === notes.length - 1 ? currentIndex - 1 : currentIndex + 1;
            this.currentNoteId.set(notes[nextIndex].id);
          } else {
            this.currentNoteId.set(null);
          }
        }
        this.noteService.deleteNote(noteId);
        this.message.success('笔记已删除');
      }
    });
  }

  toggleNoteFavorite(noteId: string, event: Event): void {
    event.stopPropagation();
    this.noteService.toggleFavorite(noteId);
  }

  createNewFolder(): void {
    const name = this.newFolderName().trim();
    if (!name) {
      this.message.warning('请输入文件夹名称');
      return;
    }
    
    this.folderService.createFolder(name);
    this.newFolderName.set('');
    this.showNewFolderInput.set(false);
    this.message.success('文件夹创建成功');
  }

  deleteFolder(folderId: string): void {
    if (this.folderService.folders().length <= 1) {
      this.message.warning('至少保留一个文件夹');
      return;
    }
    
    this.modalService.confirm({
      nzTitle: '确认删除',
      nzContent: '确定要删除这个文件夹吗？文件夹内的笔记将移到默认文件夹。',
      nzOkText: '删除',
      nzOkDanger: true,
      nzOnOk: () => {
        if (this.selectedFolderId() === folderId) {
          this.selectAllNotes();
        }
        this.folderService.deleteFolder(folderId);
        this.message.success('文件夹已删除');
      }
    });
  }

  createNewTag(): void {
    const name = this.newTagName().trim();
    if (!name) {
      this.message.warning('请输入标签名称');
      return;
    }
    
    this.tagService.createTag(name, this.newTagColor());
    this.newTagName.set('');
    this.showNewTagInput.set(false);
    this.message.success('标签创建成功');
  }

  deleteTag(tagId: string): void {
    this.modalService.confirm({
      nzTitle: '确认删除',
      nzContent: '确定要删除这个标签吗？',
      nzOkText: '删除',
      nzOkDanger: true,
      nzOnOk: () => {
        if (this.selectedTagId() === tagId) {
          this.selectAllNotes();
        }
        this.tagService.deleteTag(tagId);
        this.message.success('标签已删除');
      }
    });
  }

  exportCurrentNote(format: 'md' | 'html'): void {
    const note = this.currentNote();
    if (!note) {
      this.message.warning('请先选择一个笔记');
      return;
    }

    if (format === 'md') {
      this.exportService.exportAsMarkdown(note);
    } else {
      this.exportService.exportAsHTML(note);
    }
    this.message.success(`导出 ${format.toUpperCase()} 成功`);
  }

  togglePreviewMode(): void {
    this.isPreviewMode.set(!this.isPreviewMode());
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays} 天前`;
    } else {
      return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    }
  }

  getNotePreview(content: string): string {
    const plainText = content
      .replace(/[#*`\[\]()>\-_]/g, '')
      .replace(/\n/g, ' ')
      .trim();
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  }
}