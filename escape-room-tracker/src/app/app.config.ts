import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzI18n, zh_CN } from 'ng-zorro-antd/i18n';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  FileTextOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  TrophyOutline,
  CheckCircleOutline,
  CloseCircleOutline,
  ClockCircleOutline,
  CameraOutline,
  EyeOutline
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

const icons = [
  HomeOutline,
  FileTextOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  TrophyOutline,
  CheckCircleOutline,
  CloseCircleOutline,
  ClockCircleOutline,
  CameraOutline,
  EyeOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(zh_CN),
    provideAnimationsAsync(),
    provideNzIcons(icons)
  ]
};
