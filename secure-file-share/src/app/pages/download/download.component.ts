import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { 
  FileEntity, 
  CreateFileSignedUrlResponse
} from '../../types';
import { FileService } from '../../services/file.service';
import { NotificationService } from '../../services/notification.service';

type DownloadState = 'loading' | 'error' | 'expired' | 'password_required' | 'ready' | 'downloading';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzSpinModule,
    NzAlertModule
  ],
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit, OnDestroy {
  fileId: string | null = null;
  fileEntity: FileEntity | null = null;
  state: DownloadState = 'loading';
  errorMessage: string = '';
  
  passwordForm: FormGroup;
  isVerifying: boolean = false;
  isDownloading: boolean = false;
  passwordVerified: boolean = false;
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fileService: FileService,
    private notificationService: NotificationService,
    private messageService: NzMessageService
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const queryParamsSub = this.route.queryParams.subscribe(params => {
      this.fileId = params['id'] || null;
      if (this.fileId) {
        this.loadFileEntity();
      } else {
        this.state = 'error';
        this.errorMessage = '无效的分享链接，请检查链接是否正确';
      }
    });

    this.subscriptions.add(queryParamsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadFileEntity(): void {
    if (!this.fileId) return;

    this.state = 'loading';
    this.errorMessage = '';

    const getFileSub = this.fileService.getFileEntity(this.fileId).subscribe({
      next: (fileEntity: FileEntity) => {
        this.fileEntity = fileEntity;
        
        if (this.fileService.isFileExpired(fileEntity.expiresAt)) {
          this.state = 'expired';
          this.errorMessage = '该分享链接已过期';
        } else if (fileEntity.password && !this.passwordVerified) {
          this.state = 'password_required';
        } else {
          this.state = 'ready';
        }
      },
      error: (error) => {
        console.error('Get file entity error:', error);
        this.state = 'error';
        this.errorMessage = '获取文件信息失败，请稍后重试';
      }
    });

    this.subscriptions.add(getFileSub);
  }

  onVerifyPassword(): void {
    if (this.passwordForm.invalid) {
      Object.values(this.passwordForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (!this.fileId || !this.fileEntity) return;

    this.isVerifying = true;
    const password = this.passwordForm.value.password;

    const verifySub = this.fileService.verifyPassword(this.fileId, password).subscribe({
      next: (valid: boolean) => {
        this.isVerifying = false;
        
        if (valid) {
          this.passwordVerified = true;
          this.state = 'ready';
          this.messageService.success('密码验证成功！');
        } else {
          this.messageService.error('密码错误，请重新输入');
          this.passwordForm.get('password')?.setErrors({ incorrect: true });
        }
      },
      error: (error) => {
        console.error('Verify password error:', error);
        this.isVerifying = false;
        this.messageService.error('验证密码时发生错误，请稍后重试');
      }
    });

    this.subscriptions.add(verifySub);
  }

  onDownload(): void {
    if (!this.fileEntity) return;

    this.isDownloading = true;
    this.state = 'downloading';

    const signedUrlSub = this.fileService.createFileSignedUrl(this.fileEntity.fileUri).subscribe({
      next: (response: CreateFileSignedUrlResponse) => {
        if (response.signed_url) {
          this.triggerDownload(response.signed_url);
        } else {
          this.handleDownloadError('获取下载链接失败');
        }
      },
      error: (error) => {
        console.error('Create signed URL error:', error);
        this.handleDownloadError('创建下载链接时发生错误');
      }
    });

    this.subscriptions.add(signedUrlSub);
  }

  private triggerDownload(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = this.fileEntity?.originalName || 'download';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.isDownloading = false;
    this.state = 'ready';
    this.messageService.success('下载已开始！');
  }

  private handleDownloadError(message: string): void {
    this.isDownloading = false;
    this.state = 'ready';
    this.notificationService.error(message);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  get formattedFileSize(): string {
    if (!this.fileEntity) return '';
    return this.fileService.formatFileSize(this.fileEntity.fileSize);
  }

  get fileIcon(): string {
    if (!this.fileEntity) return '📁';
    
    const name = this.fileEntity.originalName.toLowerCase();
    
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

  get expiresAtFormatted(): string {
    if (!this.fileEntity) return '';
    return new Date(this.fileEntity.expiresAt).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
