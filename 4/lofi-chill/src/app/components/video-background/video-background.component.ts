import { Component, OnInit } from '@angular/core';
import { ThemeService, Mood, DayNight } from '../../services/theme.service';

interface VideoConfig {
  url: string;
  color: string;
}

@Component({
  selector: 'app-video-background',
  standalone: false,
  templateUrl: './video-background.component.html',
  styleUrls: ['./video-background.component.css']
})
export class VideoBackgroundComponent implements OnInit {
  currentMood: Mood = 'chill';
  currentDayNight: DayNight = 'night';
  rainMode: boolean = false;
  isDark: boolean = true;

  private videoConfigs: Record<Mood, Record<DayNight, VideoConfig>> = {
    chill: {
      day: { url: 'https://images.unsplash.com/video-1559817000046-124393723725', color: '#4a90a4' },
      night: { url: 'https://images.unsplash.com/video-1549326496338-596713173833', color: '#1a1a2e' }
    },
    jazz: {
      day: { url: 'https://images.unsplash.com/video-1518695466959-41e5e922c3c7', color: '#9b59b6' },
      night: { url: 'https://images.unsplash.com/video-1492684690869-566a4f6e9b0e', color: '#16213e' }
    },
    sleep: {
      day: { url: 'https://images.unsplash.com/video-1500530855694-b088d8465eaa', color: '#34495e' },
      night: { url: 'https://images.unsplash.com/video-1418875593910-a08935eda318', color: '#0f0f23' }
    }
  };

  raindrops: Array<{ id: number; left: string; duration: string; delay: string; width: string }> = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.mood$.subscribe(mood => this.currentMood = mood);
    this.themeService.dayNight$.subscribe(dayNight => this.currentDayNight = dayNight);
    this.themeService.rainMode$.subscribe(rainMode => {
      this.rainMode = rainMode;
      if (rainMode) {
        this.generateRaindrops();
      } else {
        this.raindrops = [];
      }
    });
    this.themeService.darkMode$.subscribe(dark => this.isDark = dark);
  }

  getCurrentConfig(): VideoConfig {
    return this.videoConfigs[this.currentMood][this.currentDayNight];
  }

  private generateRaindrops(): void {
    this.raindrops = [];
    for (let i = 0; i < 100; i++) {
      this.raindrops.push({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${0.5 + Math.random() * 1}s`,
        delay: `${Math.random() * 2}s`,
        width: `${1 + Math.random() * 2}px`
      });
    }
  }
}
