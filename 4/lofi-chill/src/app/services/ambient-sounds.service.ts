import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  volume: number;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AmbientSoundsService {
  private soundsSubject = new BehaviorSubject<AmbientSound[]>([]);
  private globalVolumeSubject = new BehaviorSubject<number>(80);

  sounds$ = this.soundsSubject.asObservable();
  globalVolume$ = this.globalVolumeSubject.asObservable();

  private defaultSounds: AmbientSound[] = [
    { id: 'city-traffic', name: '城市交通', icon: 'car', volume: 50, enabled: false },
    { id: 'rain', name: '雨', icon: 'cloud-rain', volume: 50, enabled: false },
    { id: 'fireplace', name: '壁炉', icon: 'fire', volume: 50, enabled: false },
    { id: 'snow', name: '雪', icon: 'cloud-snow', volume: 50, enabled: false },
    { id: 'summer-storm', name: '夏季风暴', icon: 'thunderbolt', volume: 50, enabled: false },
    { id: 'fan', name: '风扇', icon: 'swap', volume: 50, enabled: false },
    { id: 'forest-night', name: '森林之夜', icon: 'tree', volume: 50, enabled: false },
    { id: 'waves', name: '波浪', icon: 'rise', volume: 50, enabled: false },
    { id: 'wind', name: '风', icon: 'rise', volume: 50, enabled: false },
    { id: 'people', name: '人群', icon: 'team', volume: 50, enabled: false },
    { id: 'river', name: '河流', icon: 'apartment', volume: 50, enabled: false },
    { id: 'rainforest', name: '雨林', icon: 'environment', volume: 50, enabled: false }
  ];

  constructor() {
    this.initSounds();
  }

  private initSounds(): void {
    const savedSounds = localStorage.getItem('lofi-ambient-sounds');
    const savedGlobalVolume = localStorage.getItem('lofi-global-volume');

    if (savedSounds) {
      try {
        this.soundsSubject.next(JSON.parse(savedSounds));
      } catch (e) {
        this.soundsSubject.next([...this.defaultSounds]);
      }
    } else {
      this.soundsSubject.next([...this.defaultSounds]);
    }

    if (savedGlobalVolume !== null) {
      this.globalVolumeSubject.next(Number(savedGlobalVolume));
    }
  }

  getSounds(): AmbientSound[] {
    return this.soundsSubject.value;
  }

  toggleSound(id: string): void {
    const sounds = this.soundsSubject.value.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    this.soundsSubject.next(sounds);
    this.saveSounds();
  }

  setSoundVolume(id: string, volume: number): void {
    const sounds = this.soundsSubject.value.map(s => 
      s.id === id ? { ...s, volume: Math.max(0, Math.min(100, volume)) } : s
    );
    this.soundsSubject.next(sounds);
    this.saveSounds();
  }

  setGlobalVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(100, volume));
    this.globalVolumeSubject.next(clampedVolume);
    localStorage.setItem('lofi-global-volume', String(clampedVolume));
  }

  getGlobalVolume(): number {
    return this.globalVolumeSubject.value;
  }

  private saveSounds(): void {
    localStorage.setItem('lofi-ambient-sounds', JSON.stringify(this.soundsSubject.value));
  }

  resetToDefaults(): void {
    this.soundsSubject.next([...this.defaultSounds]);
    this.globalVolumeSubject.next(80);
    localStorage.removeItem('lofi-ambient-sounds');
    localStorage.removeItem('lofi-global-volume');
  }
}
