<template>
  <div class="track-card card" @click="handlePlay">
    <div class="track-cover-wrapper">
      <img 
        :src="track.cover" 
        :alt="track.title"
        class="track-cover-img"
      />
      <div class="track-overlay">
        <button class="play-overlay-btn btn-icon" @click.stop="handlePlay">
          <svg v-if="!isCurrentTrack || !isPlaying" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="track-info mt-3">
      <h4 class="track-title text-truncate">{{ track.title }}</h4>
      <p class="track-artist text-secondary text-sm text-truncate">{{ track.artist }}</p>
      <div class="track-stats flex items-center gap-3 mt-2 text-secondary text-sm">
        <span class="stat-item flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          {{ formatNumber(track.likes) }}
        </span>
        <span class="stat-item flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          </svg>
          {{ formatNumber(track.plays) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Track } from '../types'
import { usePlayerStore } from '../stores/playerStore'

const props = defineProps<{
  track: Track
  playlist?: Track[]
}>()

const playerStore = usePlayerStore()

const isCurrentTrack = computed(() => 
  playerStore.state.currentTrack?.id === props.track.id
)

const isPlaying = computed(() => playerStore.isPlaying.value)

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const handlePlay = () => {
  if (isCurrentTrack.value && isPlaying.value) {
    playerStore.togglePlay()
  } else {
    playerStore.playTrack(props.track, props.playlist)
  }
}
</script>

<style scoped>
.track-card {
  padding: 16px;
}

.track-cover-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.track-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.track-card:hover .track-cover-img {
  transform: scale(1.05);
}

.track-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-normal);
}

.track-card:hover .track-overlay {
  opacity: 1;
}

.play-overlay-btn {
  background-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(10px);
  opacity: 0;
  transition: all var(--transition-normal);
}

.track-card:hover .play-overlay-btn {
  transform: translateY(0);
  opacity: 1;
}

.play-overlay-btn:hover {
  background-color: var(--primary-hover);
  transform: scale(1.1);
}

.track-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.track-artist {
  margin-top: 2px;
}

.track-stats {
  opacity: 0.8;
}
</style>
