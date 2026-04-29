import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { 
  FileEntity, 
  UploadPrivateFileResponse, 
  ExpirationOption,
  EXPIRATION_OPTIONS
} from '../../types';
import { FileService } from '../../services/file.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzProgressModule,
    NzModalModule
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropZone') dropZone!: ElementRef<HTMLDivElement>;

  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isDragging = false;
  isUploading = false;
  uploadProgress = 0;
  shareLink: string | null = null;
  fileEntity: FileEntity | null = null;
  
  expirationOptions = EXPIRATION_OPTIONS;
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    private notificationService: NotificationService,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      password: [''],
      expiration: ['24h', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isDragging) {
      this.isDragging = true;
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const rect = this.dropZone.nativeElement.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.isDragging = false;
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFileSelection(file);
    }
  }

  onFileClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileSelection(file);
    }
  }

  private handleFileSelection(file: File): void {
    if (file.size === 0) {
      this.notificationService.error('文件不能为空');
      return;
    }

    this.selectedFile = file;
    this.shareLink = null;
    this.fileEntity = null;
    this.uploadProgress = 0;
  }

  clearFile(): void {
    this.selectedFile = null;
    this.shareLink = null;
    this.fileEntity = null;
    this.uploadProgress = 0;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.notificationService.warning('请先选择要上传的文件');
      return;
    }

    if (this.uploadForm.invalid) {
      Object.values(this.uploadForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    const uploadSub = this.fileService.uploadPrivateFile(this.selectedFile).subscribe({
      next: (event: HttpEvent<UploadPrivateFileResponse>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          }
        } else if (event instanceof HttpResponse) {
          const response = event.body;
          if (response?.file_uri) {
            this.createFileEntity(response.file_uri);
          } else {
            this.handleUploadError('上传失败，未获取到文件URI');
          }
        }
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.handleUploadError('上传过程中发生错误');
      }
    });

    this.subscriptions.add(uploadSub);
  }

  private createFileEntity(fileUri: string): void {
    if (!this.selectedFile) return;

    const formValue = this.uploadForm.value;
    const expirationOption = formValue.expiration as ExpirationOption;
    const password = formValue.password || undefined;

    const createSub = this.fileService.createFileEntity(
      this.selectedFile.name,
      fileUri,
      this.selectedFile.size,
      expirationOption,
      password
    ).subscribe({
      next: (fileEntity: FileEntity) => {
        this.fileEntity = fileEntity;
        this.generateShareLink(fileEntity.id);
        this.isUploading = false;
        this.uploadProgress = 100;
        this.notificationService.success('文件上传成功！');
      },
      error: (error) => {
        console.error('Create file entity error:', error);
        this.handleUploadError('保存文件信息失败');
      }
    });

    this.subscriptions.add(createSub);
  }

  private generateShareLink(fileId: string): void {
    this.shareLink = this.fileService.createPageUrl('Download', { id: fileId });
  }

  private handleUploadError(message: string): void {
    this.isUploading = false;
    this.uploadProgress = 0;
    this.notificationService.error(message);
  }

  copyShareLink(): void {
    if (!this.shareLink) return;

    navigator.clipboard.writeText(this.shareLink).then(() => {
      this.messageService.success('链接已复制到剪贴板！');
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = this.shareLink!;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.messageService.success('链接已复制到剪贴板！');
    });
  }

  uploadNewFile(): void {
    this.clearFile();
    this.uploadForm.reset({
      password: '',
      expiration: '24h'
    });
  }

  get formattedFileSize(): string {
    if (!this.selectedFile) return '';
    return this.fileService.formatFileSize(this.selectedFile.size);
  }

  get fileIcon(): string {
    if (!this.selectedFile) return '📁';
    
    const name = this.selectedFile.name.toLowerCase();
    
    if (name.match(/\.(pdf)$/)) return '📄';
    if (name.match(/\.(doc|docx|txt|md)$/)) return '📝';
    if (name.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/)) return '🖼️';
    if (name.match(/\.(mp3|wav|ogg|flac|aac)$/)) return '🎵';
    if (name.match(/\.(mp4|avi|mkv|mov|webm)$/)) return '🎬';
    if (name.match(/\.(zip|rar|7z|tar|gz)$/)) return '📦';
    if (name.match(/\.(xls|xlsx|csv)$/)) return '📊';
    if (name.match(/\.(ppt|pptx)$/)) return '📽️';
    if (name.match(/\.(html|css|js|ts|json|xml)$/)) return '💻';
    
    return '📁';
  }
}
