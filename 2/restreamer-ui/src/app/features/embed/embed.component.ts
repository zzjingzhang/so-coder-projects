import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css'],
  standalone: false
})
export class EmbedComponent implements OnInit {
  channelId: string | null = null;
  streamUrl: string = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  isPlaying: boolean = false;
  isMuted: boolean = true;
  showControls: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channelId = params['channelId'] || '1';
    });
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  toggleFullscreen(): void {
    const player = document.getElementById('embed-player');
    if (player) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
    }
  }

  showControlsOverlay(): void {
    this.showControls = true;
  }

  hideControlsOverlay(): void {
    setTimeout(() => {
      if (this.isPlaying) {
        this.showControls = false;
      }
    }, 3000);
  }
}
