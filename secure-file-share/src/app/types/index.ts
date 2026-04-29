export interface FileEntity {
  id: string;
  originalName: string;
  fileUri: string;
  fileSize: number;
  password?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface UploadPrivateFileResponse {
  file_uri: string;
}

export interface CreateFileSignedUrlResponse {
  signed_url: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'success' | 'error';
  message?: string;
}

export type ExpirationOption = '1h' | '24h' | '7d' | '30d';

export interface ExpirationOptionConfig {
  value: ExpirationOption;
  label: string;
  hours: number;
}

export const EXPIRATION_OPTIONS: ExpirationOptionConfig[] = [
  { value: '1h', label: '1 小时', hours: 1 },
  { value: '24h', label: '24 小时', hours: 24 },
  { value: '7d', label: '7 天', hours: 7 * 24 },
  { value: '30d', label: '30 天', hours: 30 * 24 },
];
