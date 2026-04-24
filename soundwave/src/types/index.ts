export interface Track {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  audioUrl: string
  duration: number
  likes: number
  plays: number
  genre: string
}

export interface Playlist {
  id: string
  title: string
  cover: string
  tracks: Track[]
  description: string
  owner: string
}

export interface User {
  id: string
  name: string
  avatar: string
  followers: number
  following: number
}

export type PlayerState = 'playing' | 'paused' | 'stopped'

export interface PlayerStore {
  currentTrack: Track | null
  playlist: Track[]
  currentIndex: number
  playerState: PlayerState
  volume: number
  currentTime: number
  duration: number
}
