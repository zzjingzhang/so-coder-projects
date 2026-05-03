import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FolderOutline,
  FileOutline,
  PlusOutline,
  SearchOutline,
  TagOutline,
  StarOutline,
  StarFill,
  DeleteOutline,
  EditOutline,
  DownloadOutline,
  SunOutline,
  MoonOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  SaveOutline,
  EyeOutline,
  CodeOutline,
  FolderOpenOutline,
  HomeOutline,
  InboxOutline
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

const icons: IconDefinition[] = [
  FolderOutline,
  FileOutline,
  PlusOutline,
  SearchOutline,
  TagOutline,
  StarOutline,
  StarFill,
  DeleteOutline,
  EditOutline,
  DownloadOutline,
  SunOutline,
  MoonOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  SaveOutline,
  EyeOutline,
  CodeOutline,
  FolderOpenOutline,
  HomeOutline,
  InboxOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(zh_CN),
    provideAnimations()
  ]
};