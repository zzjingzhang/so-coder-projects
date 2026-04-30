import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface FFmpegSettings {
  videoCodec: string;
  videoBitrate: number;
  videoResolution: string;
  videoFPS: number;
  videoQuality: string;
  videoPreset: string;
  audioCodec: string;
  audioBitrate: number;
  audioSampleRate: number;
  audioChannels: number;
  outputFormat: string;
  outputPath: string;
  segmentDuration: number;
  hlsEnabled: boolean;
  rtmpEnabled: boolean;
  videoFilters: string[];
  audioFilters: string[];
  deinterlace: boolean;
  denoise: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
  volume: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: false
})
export class SettingsComponent implements OnInit {
  activeTabIndex: number = 0;
  loading: boolean = true;
  saving: boolean = false;

  videoCodecs = [
    { label: 'H.264 / AVC', value: 'h264' },
    { label: 'H.265 / HEVC', value: 'hevc' },
    { label: 'VP8', value: 'vp8' },
    { label: 'VP9', value: 'vp9' },
    { label: 'AV1', value: 'av1' }
  ];

  audioCodecs = [
    { label: 'AAC', value: 'aac' },
    { label: 'MP3', value: 'mp3' },
    { label: 'Opus', value: 'opus' },
    { label: 'Vorbis', value: 'vorbis' }
  ];

  resolutions = [
    { label: '4K (3840x2160)', value: '3840x2160' },
    { label: '1080p (1920x1080)', value: '1920x1080' },
    { label: '720p (1280x720)', value: '1280x720' },
    { label: '480p (854x480)', value: '854x480' },
    { label: '360p (640x360)', value: '640x360' }
  ];

  presets = [
    { label: 'ultrafast', value: 'ultrafast' },
    { label: 'superfast', value: 'superfast' },
    { label: 'veryfast', value: 'veryfast' },
    { label: 'faster', value: 'faster' },
    { label: 'fast', value: 'fast' },
    { label: 'medium', value: 'medium' },
    { label: 'slow', value: 'slow' },
    { label: 'slower', value: 'slower' },
    { label: 'veryslow', value: 'veryslow' }
  ];

  outputFormats = [
    { label: 'HLS (HTTP Live Streaming)', value: 'hls' },
    { label: 'RTMP', value: 'rtmp' },
    { label: 'MPEG-TS', value: 'mpegts' },
    { label: 'MP4', value: 'mp4' },
    { label: 'WebM', value: 'webm' }
  ];

  videoFilterOptions = [
    { label: 'Deinterlace', value: 'yadif' },
    { label: 'Denoise', value: 'nlmeans' },
    { label: 'Sharpen', value: 'unsharp' },
    { label: 'Scale', value: 'scale' },
    { label: 'Crop', value: 'crop' },
    { label: 'Pad', value: 'pad' },
    { label: 'Fade', value: 'fade' }
  ];

  audioFilterOptions = [
    { label: 'Volume', value: 'volume' },
    { label: 'Equalizer', value: 'equalizer' },
    { label: 'Compressor', value: 'compand' },
    { label: 'Normalizer', value: 'dynaudnorm' },
    { label: 'Echo', value: 'aecho' },
    { label: 'Reverb', value: 'afftdn' }
  ];

  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.settingsForm = this.fb.group({
      videoCodec: ['h264', Validators.required],
      videoBitrate: [4000, [Validators.required, Validators.min(100), Validators.max(50000)]],
      videoResolution: ['1920x1080', Validators.required],
      videoFPS: [30, [Validators.required, Validators.min(1), Validators.max(120)]],
      videoQuality: ['medium'],
      videoPreset: ['medium'],
      audioCodec: ['aac', Validators.required],
      audioBitrate: [128, [Validators.required, Validators.min(32), Validators.max(512)]],
      audioSampleRate: [44100, Validators.required],
      audioChannels: [2, [Validators.required, Validators.min(1), Validators.max(8)]],
      outputFormat: ['hls', Validators.required],
      outputPath: ['/output/stream.m3u8', Validators.required],
      segmentDuration: [4, [Validators.required, Validators.min(1), Validators.max(10)]],
      hlsEnabled: [true],
      rtmpEnabled: [false],
      videoFilters: [[]],
      audioFilters: [[]],
      deinterlace: [false],
      denoise: [false],
      brightness: [0, [Validators.min(-100), Validators.max(100)]],
      contrast: [0, [Validators.min(-100), Validators.max(100)]],
      saturation: [0, [Validators.min(-100), Validators.max(100)]],
      volume: [100, [Validators.min(0), Validators.max(200)]]
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  saveSettings(): void {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    setTimeout(() => {
      this.saving = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Settings saved successfully'
      });
    }, 800);
  }

  resetSettings(): void {
    this.settingsForm.reset({
      videoCodec: 'h264',
      videoBitrate: 4000,
      videoResolution: '1920x1080',
      videoFPS: 30,
      videoQuality: 'medium',
      videoPreset: 'medium',
      audioCodec: 'aac',
      audioBitrate: 128,
      audioSampleRate: 44100,
      audioChannels: 2,
      outputFormat: 'hls',
      outputPath: '/output/stream.m3u8',
      segmentDuration: 4,
      hlsEnabled: true,
      rtmpEnabled: false,
      videoFilters: [],
      audioFilters: [],
      deinterlace: false,
      denoise: false,
      brightness: 0,
      contrast: 0,
      saturation: 0,
      volume: 100
    });

    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Settings reset to defaults'
    });
  }

  get f() {
    return this.settingsForm.controls;
  }
}
