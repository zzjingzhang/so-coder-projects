import { reactive, computed, toRefs } from 'vue'
import type { Track, PlayerStore } from '../types'

const state = reactive<PlayerStore>({
  currentTrack: null,
  playlist: [],
  currentIndex: -1,
  playerState: 'stopped',
  volume: 0.8,
  currentTime: 0,
  duration: 0
})

const isPlaying = computed(() => state.playerState === 'playing')
const hasCurrentTrack = computed(() => state.currentTrack !== null)
const progress = computed(() => {
  if (state.duration === 0) return 0
  return (state.currentTime / state.duration) * 100
})

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const playTrack = (track: Track, playlist?: Track[]) => {
  state.currentTime = 0
  state.duration = 0
  
  if (playlist) {
    state.playlist = playlist
    state.currentIndex = playlist.findIndex(t => t.id === track.id)
  } else {
    state.playlist = [track]
    state.currentIndex = 0
  }
  
  state.currentTrack = track
  state.playerState = 'playing'
}

const togglePlay = () => {
  if (state.currentTrack) {
    state.playerState = state.playerState === 'playing' ? 'paused' : 'playing'
  }
}

const pause = () => {
  state.playerState = 'paused'
}

const stop = () => {
  state.playerState = 'stopped'
  state.currentTime = 0
  state.currentTrack = null
  state.playlist = []
  state.currentIndex = -1
  state.duration = 0
}

const nextTrack = () => {
  if (state.playlist.length === 0) return
  
  state.currentIndex = (state.currentIndex + 1) % state.playlist.length
  state.currentTrack = state.playlist[state.currentIndex]
  state.currentTime = 0
  state.playerState = 'playing'
}

const prevTrack = () => {
  if (state.playlist.length === 0) return
  
  if (state.currentIndex > 0) {
    state.currentIndex--
  } else {
    state.currentIndex = state.playlist.length - 1
  }
  state.currentTrack = state.playlist[state.currentIndex]
  state.currentTime = 0
  state.playerState = 'playing'
}

const setVolume = (volume: number) => {
  state.volume = Math.max(0, Math.min(1, volume))
}

const setCurrentTime = (time: number) => {
  state.currentTime = Math.max(0, Math.min(state.duration, time))
}

const setDuration = (duration: number) => {
  state.duration = duration
}

const setState = (newState: 'playing' | 'paused' | 'stopped') => {
  state.playerState = newState
}

export const usePlayerStore = () => {
  return {
    state,
    ...toRefs(state),
    isPlaying,
    hasCurrentTrack,
    progress,
    formatTime,
    playTrack,
    togglePlay,
    pause,
    stop,
    nextTrack,
    prevTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setState
  }
}
