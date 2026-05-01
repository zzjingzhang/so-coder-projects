import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import {
  HomeOutline,
  ReloadOutline,
  PlayCircleOutline,
  TrophyOutline,
  ClockCircleOutline,
  SwapOutline,
  PictureOutline,
  PlusOutline,
  MinusOutline,
  CheckOutline,
  CloseOutline,
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

const icons = [
  HomeOutline,
  ReloadOutline,
  PlayCircleOutline,
  TrophyOutline,
  ClockCircleOutline,
  SwapOutline,
  PictureOutline,
  PlusOutline,
  MinusOutline,
  CheckOutline,
  CloseOutline,
];

const ngZorroConfig = {
  theme: {
    primaryColor: '#667eea',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzConfig(ngZorroConfig),
  ],
};
