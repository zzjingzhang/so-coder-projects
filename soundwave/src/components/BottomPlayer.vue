<template>
  <div v-if="hasCurrentTrack" class="bottom-player">
    <audio 
      ref="audioRef"
      :src="currentTrack?.audioUrl"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
    />
    
    <div class="player-content container flex items-center">
      <div class="player-info flex items-center gap-3">
        <img 
          :src="currentTrack?.cover" 
          :alt="currentTrack?.title"
          class="track-cover"
        />
        <div class="track-details">
          <h4 class="track-title text-truncate">{{ currentTrack?.title }}</h4>
          <p class="track-artist text-secondary text-sm text-truncate">{{ currentTrack?.artist }}</p>
        </div>
        <button class="like-btn btn-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      
      <div class="player-controls flex flex-col items-center justify-center">
        <div class="control-buttons flex items-center gap-3">
          <button class="shuffle-btn btn-icon" @click="toggleShuffle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" :class="{ active: isShuffle }">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </button>
          <button class="prev-btn btn-icon" @click="handlePrev">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button class="play-btn btn-icon" @click="handlePlayPause">
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button class="next-btn btn-icon" @click="handleNext">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
          <button class="repeat-btn btn-icon" @click="toggleRepeat">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" :class="{ active: isRepeat }">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </button>
        </div>
        
        <div class="progress-container flex items-center gap-3 w-full">
          <span class="time-text text-sm text-secondary">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar flex-1" @click="handleProgressClick">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="time-text text-sm text-secondary">{{ formatTime(duration) }}</span>
        </div>
      </div>
      
      <div class="player-right flex items-center gap-3">
        <div class="volume-control flex items-center gap-2">
          <button class="volume-btn" @click="toggleMute">
            <svg v-if="volume === 0" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            <svg v-else-if="volume < 0.5" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <div class="volume-slider" @click="handleVolumeClick">
            <div class="volume-fill" :style="{ width: (volume * 100) + '%' }"></div>
          </div>
        </div>
        
        <button class="queue-btn btn-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { usePlayerStore } from '../stores/playerStore'

const audioRef = ref<HTMLAudioElement | null>(null)
const isShuffle = ref(false)
const isRepeat = ref(false)
const previousVolume = ref(0.8)

const {
  currentTrack,
  currentTime,
  duration,
  volume,
  isPlaying,
  hasCurrentTrack,
  progress,
  playlist,
  formatTime,
  playTrack,
  togglePlay,
  nextTrack,
  prevTrack,
  setVolume,
  setCurrentTime,
  setDuration
} = usePlayerStore()

const currentTrackId = computed(() => currentTrack.value?.id)

const handlePlayPause = () => {
  if (!audioRef.value) return
  
  togglePlay()
}

const handlePrev = () => {
  if (audioRef.value && audioRef.value.currentTime > 3) {
    audioRef.value.currentTime = 0
    setCurrentTime(0)
  } else {
    if (isShuffle.value && playlist.value.length > 0) {
      const randomIndex = Math.floor(Math.random() * playlist.value.length)
      const track = playlist.value[randomIndex]
      if (track) {
        playTrack(track, playlist.value)
      }
    } else {
      prevTrack()
    }
  }
}

const handleNext = () => {
  if (isShuffle.value && playlist.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * playlist.value.length)
    const track = playlist.value[randomIndex]
    if (track) {
      playTrack(track, playlist.value)
    }
  } else {
    nextTrack()
  }
}

const handleTimeUpdate = () => {
  if (audioRef.value) {
    setCurrentTime(audioRef.value.currentTime)
  }
}

const handleLoadedMetadata = () => {
  if (audioRef.value) {
    setDuration(audioRef.value.duration)
  }
}

const handleEnded = () => {
  if (isRepeat.value) {
    if (audioRef.value) {
      audioRef.value.currentTime = 0
      audioRef.value.play().catch(() => {})
    }
  } else {
    handleNext()
  }
}

const handleProgressClick = (event: MouseEvent) => {
  if (!audioRef.value || duration.value === 0) return
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  const newTime = percent * duration.value
  
  audioRef.value.currentTime = newTime
  setCurrentTime(newTime)
}

const handleVolumeClick = (event: MouseEvent) => {
  const slider = event.currentTarget as HTMLElement
  const rect = slider.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  const newVolume = Math.max(0, Math.min(1, percent))
  
  setVolume(newVolume)
  if (audioRef.value) {
    audioRef.value.volume = newVolume
  }
}

const toggleMute = () => {
  if (volume.value > 0) {
    previousVolume.value = volume.value
    setVolume(0)
  } else {
    setVolume(previousVolume.value)
  }
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
}

const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

const toggleRepeat = () => {
  isRepeat.value = !isRepeat.value
}

watch(
  currentTrackId,
  (newTrackId, oldTrackId) => {
    if (newTrackId && newTrackId !== oldTrackId && audioRef.value) {
      audioRef.value.load()
      if (isPlaying.value) {
        audioRef.value.play().catch((e) => {
          console.log('Auto play failed:', e)
        })
      }
    }
  }
)

watch(
  isPlaying,
  (playing) => {
    if (!audioRef.value) return
    
    if (playing) {
      audioRef.value.play().catch((e) => {
        console.log('Play failed:', e)
      })
    } else {
      audioRef.value.pause()
    }
  }
)

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
})
</script>

<style scoped>
.bottom-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  height: var(--player-height);
}

.player-content {
  height: 100%;
  padding: 12px 16px;
}

.player-info {
  width: 30%;
  min-width: 180px;
}

.track-cover {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.track-details {
  max-width: 150px;
}

.track-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.track-artist {
  font-size: 0.75rem;
}

.like-btn {
  background: transparent;
}

.like-btn:hover {
  background: transparent;
  color: var(--primary-color);
}

.player-controls {
  flex: 1;
  max-width: 720px;
}

.control-buttons {
  margin-bottom: 8px;
}

.shuffle-btn,
.repeat-btn {
  background: transparent;
}

.shuffle-btn:hover,
.repeat-btn:hover {
  background: transparent;
  color: var(--primary-color);
}

.shuffle-btn svg.active,
.repeat-btn svg.active {
  color: var(--primary-color);
}

.play-btn {
  width: 44px;
  height: 44px;
  background-color: var(--text-primary);
  color: var(--bg-color);
}

.play-btn:hover {
  background-color: white;
  transform: scale(1.05);
}

.progress-container {
  max-width: 500px;
}

.time-text {
  min-width: 40px;
  text-align: center;
}

.player-right {
  width: 20%;
  min-width: 120px;
  justify-content: flex-end;
}

.volume-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
}

.volume-btn:hover {
  color: var(--primary-color);
}

.queue-btn {
  background: transparent;
}

.queue-btn:hover {
  background: transparent;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .player-info .like-btn,
  .player-right,
  .shuffle-btn,
  .repeat-btn {
    display: none;
  }
  
  .player-info {
    width: 40%;
    min-width: 140px;
  }
  
  .track-cover {
    width: 44px;
    height: 44px;
  }
  
  .track-details {
    max-width: 100px;
  }
  
  .time-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .player-info {
    width: 50%;
  }
  
  .track-details {
    max-width: 80px;
  }
}
</style>
