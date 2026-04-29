import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { DownloadComponent } from './pages/download/download.component';

export const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    pathMatch: 'full',
    data: { title: '上传文件' }
  },
  {
    path: 'Download',
    component: DownloadComponent,
    data: { title: '下载文件' }
  },
  {
    path: 'download',
    component: DownloadComponent,
    data: { title: '下载文件' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
