import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';

interface StreamStats {
  bitrate: string;
  buffer: string;
  latency: string;
  frameRate: string;
  droppedFrames: number;
  resolution: string;
  codec: string;
}

interface Overlay {
  id: string;
  type: 'text' | 'image' | 'logo';
  content: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  enabled: boolean;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: false
})
export class PlayerComponent implements OnInit, OnDestroy {
  channelId: string | null = null;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  volume: number = 80;
  fullscreen: boolean = false;
  showControls: boolean = true;
  currentTime: number = 0;
  duration: number = 0;
  streamUrl: string = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  streamStats: StreamStats | null = null;
  overlayDialogVisible: boolean = false;
  overlayList: Overlay[] = [];
  activeOverlay: Overlay | null = null;

  private statsSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channelId = params['channelId'] || '1';
    });

    this.overlayList = [
      {
        id: '1',
        type: 'text',
        content: 'LIVE STREAM',
        position: 'top-right',
        enabled: true
      },
      {
        id: '2',
        type: 'logo',
        content: 'https://primefaces.org/cdn/primeng/images/primeng.svg',
        position: 'bottom-right',
        enabled: true
      },
      {
        id: '3',
        type: 'text',
        content: 'Restreamer',
        position: 'top-left',
        enabled: false
      }
    ];

    this.streamStats = {
      bitrate: '4.2 Mbps',
      buffer: '3.2s',
      latency: '1.5s',
      frameRate: '30 fps',
      droppedFrames: 0,
      resolution: '1920x1080',
      codec: 'H.264'
    };

    this.statsSubscription = interval(3000).subscribe(() => {
      this.updateStats();
    });
  }

  ngOnDestroy(): void {
    if (this.statsSubscription) {
      this.statsSubscription.unsubscribe();
    }
  }

  private updateStats(): void {
    if (this.streamStats && this.isPlaying) {
      this.streamStats.buffer = `${(2 + Math.random() * 3).toFixed(1)}s`;
      this.streamStats.latency = `${(1 + Math.random() * 2).toFixed(1)}s`;
      this.streamStats.droppedFrames = Math.floor(Math.random() * 10);
    }
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    
    this.messageService.add({
      severity: this.isPlaying ? 'success' : 'info',
      summary: this.isPlaying ? 'Playing' : 'Paused',
      detail: this.isPlaying ? 'Stream started' : 'Stream paused'
    });
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  toggleFullscreen(): void {
    this.fullscreen = !this.fullscreen;
    if (this.fullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
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

  openOverlayDialog(overlay?: Overlay): void {
    if (overlay) {
      this.activeOverlay = { ...overlay };
    } else {
      this.activeOverlay = {
        id: '',
        type: 'text',
        content: '',
        position: 'top-left',
        enabled: true
      };
    }
    this.overlayDialogVisible = true;
  }

  saveOverlay(): void {
    if (this.activeOverlay) {
      const index = this.overlayList.findIndex(o => o.id === this.activeOverlay!.id);
      
      if (index >= 0) {
        this.overlayList[index] = { ...this.activeOverlay };
      } else {
        this.activeOverlay.id = Date.now().toString();
        this.overlayList.push(this.activeOverlay);
      }
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Overlay saved successfully'
      });
    }
    
    this.overlayDialogVisible = false;
    this.activeOverlay = null;
  }

  deleteOverlay(overlay: Overlay): void {
    const index = this.overlayList.findIndex(o => o.id === overlay.id);
    if (index >= 0) {
      this.overlayList.splice(index, 1);
      this.messageService.add({
        severity: 'info',
        summary: 'Deleted',
        detail: 'Overlay deleted successfully'
      });
    }
  }

  toggleOverlay(overlay: Overlay): void {
    overlay.enabled = !overlay.enabled;
  }

  copyEmbedCode(): void {
    const embedCode = `<iframe src="${window.location.origin}/embed/${this.channelId}" width="800" height="450" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(embedCode).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copied',
        detail: 'Embed code copied to clipboard'
      });
    });
  }

  getEmbedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `${window.location.origin}/embed/${this.channelId}`
    );
  }

  getEmbedCode(): string {
    return `<iframe src="${window.location.origin}/embed/${this.channelId}" width="800" height="450" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }

  getOEmbedUrl(format: string): string {
    return encodeURIComponent(`${window.location.origin}/embed/${this.channelId}`);
  }
}
