import { Component } from '@angular/core';
import { ThemeService, Mood, DayNight } from '../../services/theme.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-mood-selector',
  standalone: false,
  templateUrl: './mood-selector.component.html',
  styleUrls: ['./mood-selector.component.css']
})
export class MoodSelectorComponent {
  constructor(
    public themeService: ThemeService,
    private playerService: PlayerService
  ) {}

  setMood(mood: Mood): void {
    this.themeService.setMood(mood);
    this.playerService.setMood(mood);
  }

  setDayNight(mode: DayNight): void {
    this.themeService.setDayNight(mode);
  }
}
