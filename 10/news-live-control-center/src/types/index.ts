export interface Channel {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  viewers: number;
  status: 'live' | 'offline' | 'scheduled';
  startTime: string;
  endTime: string;
}

export interface RealTimeData {
  totalViewers: number;
  activeChannels: number;
  bandwidth: number;
  bitrate: number;
  latency: number;
  frameRate: number;
  uptime: number;
  errors: number;
}

export interface LiveProgress {
  currentTime: number;
  totalTime: number;
  progress: number;
}
