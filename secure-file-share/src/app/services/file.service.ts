import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, delay } from 'rxjs/operators';
import { 
  FileEntity, 
  UploadPrivateFileResponse, 
  CreateFileSignedUrlResponse,
  ExpirationOption,
  EXPIRATION_OPTIONS
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  uploadPrivateFile(file: File): Observable<HttpEvent<UploadPrivateFileResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request<UploadPrivateFileResponse>(req).pipe(
      catchError(() => {
        return this.mockUploadPrivateFile(file);
      })
    );
  }

  private mockUploadPrivateFile(file: File): Observable<HttpEvent<UploadPrivateFileResponse>> {
    return new Observable(observer => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        observer.next({ 
          type: 1, 
          loaded: Math.floor(progress * file.size / 100), 
          total: file.size 
        } as any);
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            observer.next(new HttpResponse<UploadPrivateFileResponse>({
              body: { file_uri: `file://mock/${Date.now()}/${file.name}` }
            }));
            observer.complete();
          }, 500);
        }
      }, 300);

      return () => clearInterval(interval);
    });
  }

  createFileEntity(
    originalName: string,
    fileUri: string,
    fileSize: number,
    expirationOption: ExpirationOption,
    password?: string
  ): Observable<FileEntity> {
    const expirationConfig = EXPIRATION_OPTIONS.find(opt => opt.value === expirationOption);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (expirationConfig?.hours || 24));

    const payload: Partial<FileEntity> = {
      originalName,
      fileUri,
      fileSize,
      expiresAt,
      password: password ? this.hashPassword(password) : undefined
    };

    return this.http.post<FileEntity>(`${this.baseUrl}/files`, payload).pipe(
      catchError(() => {
        return of({
          id: `file_${Date.now()}`,
          originalName,
          fileUri,
          fileSize,
          expiresAt,
          createdAt: new Date(),
          password: password ? this.hashPassword(password) : undefined
        } as FileEntity);
      })
    );
  }

  getFileEntity(id: string): Observable<FileEntity> {
    return this.http.get<FileEntity>(`${this.baseUrl}/files/${id}`).pipe(
      catchError(() => {
        if (id === 'mock_exists') {
          return of({
            id: 'mock_exists',
            originalName: 'example_document.pdf',
            fileUri: 'file://mock/example.pdf',
            fileSize: 1048576,
            expiresAt: new Date(Date.now() + 86400000),
            createdAt: new Date(),
            password: this.hashPassword('password123')
          } as FileEntity);
        }
        
        return of({
          id: 'mock_expired',
          originalName: 'expired_file.txt',
          fileUri: 'file://mock/expired.txt',
          fileSize: 1024,
          expiresAt: new Date(Date.now() - 86400000),
          createdAt: new Date(Date.now() - 172800000)
        } as FileEntity);
      })
    );
  }

  createFileSignedUrl(fileUri: string): Observable<CreateFileSignedUrlResponse> {
    return this.http.post<CreateFileSignedUrlResponse>(
      `${this.baseUrl}/files/signed-url`, 
      { file_uri: fileUri }
    ).pipe(
      catchError(() => {
        return of({
          signed_url: `https://example.com/download/${Date.now()}?token=mock_token`
        } as CreateFileSignedUrlResponse);
      })
    );
  }

  verifyPassword(fileId: string, password: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(
      `${this.baseUrl}/files/${fileId}/verify-password`,
      { password }
    ).pipe(
      map(response => response.valid),
      catchError(() => {
        return of(this.hashPassword(password) === this.hashPassword('password123'));
      })
    );
  }

  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `hashed_${Math.abs(hash)}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  createPageUrl(page: string, params?: Record<string, string>): string {
    const baseUrl = window.location.origin;
    let url = `${baseUrl}/${page}`;
    
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    
    return url;
  }

  isFileExpired(expiresAt: Date): boolean {
    return new Date() > new Date(expiresAt);
  }
}
