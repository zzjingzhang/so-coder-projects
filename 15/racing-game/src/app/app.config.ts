import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { 
  PlayCircleOutline, 
  PauseCircleOutline, 
  LeftOutline, 
  RightOutline, 
  HomeOutline,
  InfoCircleOutline,
  HeartOutline,
  HeartFill
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';

const icons: IconDefinition[] = [
  PlayCircleOutline, 
  PauseCircleOutline, 
  LeftOutline, 
  RightOutline, 
  HomeOutline,
  InfoCircleOutline,
  HeartOutline,
  HeartFill
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    importProvidersFrom(NzIconModule.forRoot(icons))
  ]
};
