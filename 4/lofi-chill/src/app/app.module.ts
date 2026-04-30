import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FocusModeComponent } from './pages/focus-mode/focus-mode.component';
import { SoundBoardComponent } from './components/sound-board/sound-board.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MoodSelectorComponent } from './components/mood-selector/mood-selector.component';
import { VideoBackgroundComponent } from './components/video-background/video-background.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';

import { ThemeService } from './services/theme.service';
import { PlayerService } from './services/player.service';
import { AmbientSoundsService } from './services/ambient-sounds.service';
import { TodoService } from './services/todo.service';
import { TimerService } from './services/timer.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FocusModeComponent,
    SoundBoardComponent,
    MusicPlayerComponent,
    MoodSelectorComponent,
    VideoBackgroundComponent,
    TodoListComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzSliderModule,
    NzSwitchModule,
    NzTabsModule,
    NzInputModule,
    NzCheckboxModule,
    NzTagModule,
    NzBadgeModule,
    NzToolTipModule,
    NzDropDownModule,
    NzCardModule,
    NzListModule,
    NzEmptyModule,
    NzModalModule,
    NzRadioModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    ThemeService,
    PlayerService,
    AmbientSoundsService,
    TodoService,
    TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
