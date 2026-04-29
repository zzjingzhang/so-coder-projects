export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  audioUrl: string;
  coverUrl: string;
}

export enum PlayMode {
  LIST = 'list',
  SINGLE = 'single',
  SHUFFLE = 'shuffle',
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playMode: PlayMode;
  playlist: Song[];
  currentIndex: number;
  error: string | null;
  isMobile: boolean;
  isDarkMode: boolean;
  showPlaylist: boolean;
}
