import { Component } from '@angular/core';
import { AmbientSoundsService, AmbientSound } from '../../services/ambient-sounds.service';

@Component({
  selector: 'app-sound-board',
  standalone: false,
  templateUrl: './sound-board.component.html',
  styleUrls: ['./sound-board.component.css']
})
export class SoundBoardComponent {
  constructor(public ambientSoundsService: AmbientSoundsService) {}

  toggleSound(sound: AmbientSound): void {
    this.ambientSoundsService.toggleSound(sound.id);
  }

  setSoundVolume(sound: AmbientSound, volume: number): void {
    this.ambientSoundsService.setSoundVolume(sound.id, volume);
  }
}
