<template>
  <div class="playlist-page">
    <div v-if="playlist" class="playlist-header">
      <div class="container">
        <div class="header-content flex items-center gap-6">
          <img 
            :src="playlist.cover" 
            :alt="playlist.title"
            class="playlist-cover"
          />
          <div class="playlist-info">
            <span class="playlist-label text-secondary text-sm uppercase tracking-wider">Playlist</span>
            <h1 class="playlist-title">{{ playlist.title }}</h1>
            <p class="playlist-description text-secondary mt-2">{{ playlist.description }}</p>
            <div class="playlist-meta flex items-center gap-2 mt-3 text-sm">
              <span class="owner">{{ playlist.owner }}</span>
              <span class="text-secondary">·</span>
              <span class="track-count text-secondary">{{ playlist.tracks.length }} songs</span>
            </div>
            <div class="playlist-actions flex items-center gap-3 mt-6">
              <button class="btn btn-primary" @click="playAll">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play All
              </button>
              <button class="btn btn-outline">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                Shuffle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div v-if="playlist" class="tracks-section">
        <div class="tracks-header grid items-center py-3 px-4 border-b border-border-color text-secondary text-sm">
          <span class="track-number">#</span>
          <span class="track-title-header">Title</span>
          <span class="track-album">Album</span>
          <span class="track-added">Added</span>
          <span class="track-duration">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </span>
        </div>
        
        <div class="tracks-list">
          <div 
            v-for="(track, index) in playlist.tracks" 
            :key="track.id"
            class="track-row grid items-center py-3 px-4 hover:bg-bg-tertiary rounded-md transition-colors cursor-pointer"
            :class="{ 'bg-bg-tertiary': isCurrentTrack(track) }"
            @click="playTrack(track)"
          >
            <span class="track-number flex items-center justify-center">
              <span v-if="!isCurrentTrack(track) || !isPlaying">{{ index + 1 }}</span>
              <svg v-else class="playing-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </span>
            <div class="track-info flex items-center gap-3">
              <img 
                :src="track.cover" 
                :alt="track.title"
                class="track-cover-small"
              />
              <div>
                <h4 class="track-name" :class="{ 'text-primary': isCurrentTrack(track) }">{{ track.title }}</h4>
                <p class="track-artist text-secondary text-sm">{{ track.artist }}</p>
              </div>
            </div>
            <span class="track-album text-secondary">{{ track.album }}</span>
            <span class="track-added text-secondary">{{ track.genre }}</span>
            <span class="track-duration text-secondary">{{ formatTime(track.duration) }}</span>
          </div>
        </div>
      </div>
      
      <div v-else class="not-found">
        <h1>Playlist Not Found</h1>
        <RouterLink to="/" class="btn btn-primary mt-4">Go Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockPlaylists } from '../mock'
import { usePlayerStore } from '../stores/playerStore'
import type { Track, Playlist } from '../types'

const route = useRoute()
const playerStore = usePlayerStore()

const playlistId = computed(() => route.params.id as string)

const playlist = computed<Playlist | undefined>(() => {
  return mockPlaylists.find(p => p.id === playlistId.value)
})

const isCurrentTrack = (track: Track) => {
  return playerStore.state.currentTrack?.id === track.id
}

const isPlaying = computed(() => playerStore.isPlaying.value)

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const playAll = () => {
  if (playlist.value && playlist.value.tracks.length > 0) {
    playerStore.playTrack(playlist.value.tracks[0], playlist.value.tracks)
  }
}

const playTrack = (track: Track) => {
  if (playlist.value) {
    if (isCurrentTrack(track) && isPlaying.value) {
      playerStore.togglePlay()
    } else {
      playerStore.playTrack(track, playlist.value.tracks)
    }
  }
}
</script>

<style scoped>
.playlist-page {
  padding-bottom: 32px;
}

.playlist-header {
  background: linear-gradient(to bottom, var(--bg-tertiary), var(--bg-color));
  padding: 40px 0;
  margin-bottom: 32px;
}

.header-content {
  align-items: flex-end;
}

.playlist-cover {
  width: 232px;
  height: 232px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  object-fit: cover;
}

.playlist-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.playlist-title {
  font-size: 3rem;
  font-weight: 800;
  margin: 8px 0;
  line-height: 1.2;
}

.playlist-description {
  font-size: 0.95rem;
  max-width: 600px;
}

.playlist-meta {
  font-weight: 500;
}

.owner {
  font-weight: 600;
}

.playlist-actions button {
  gap: 8px;
}

.tracks-section {
  margin-top: 24px;
}

.tracks-header {
  grid-template-columns: 40px 3fr 2fr 1fr 80px;
  border-bottom: 1px solid var(--border-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tracks-list {
  margin-top: 8px;
}

.track-row {
  grid-template-columns: 40px 3fr 2fr 1fr 80px;
  margin-bottom: 4px;
}

.track-number {
  width: 40px;
  height: 40px;
}

.playing-icon {
  color: var(--primary-color);
}

.track-info {
  min-width: 0;
}

.track-cover-small {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.track-name {
  font-weight: 500;
  margin-bottom: 2px;
}

.track-name.text-primary {
  color: var(--primary-color);
}

.not-found {
  text-align: center;
  padding: 80px 0;
}

@media (max-width: 768px) {
  .playlist-header {
    padding: 24px 0;
  }
  
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .playlist-cover {
    width: 180px;
    height: 180px;
  }
  
  .playlist-title {
    font-size: 2rem;
  }
  
  .playlist-actions {
    justify-content: center;
  }
  
  .tracks-header,
  .track-row {
    grid-template-columns: 40px 1fr 80px;
  }
  
  .track-album,
  .track-added {
    display: none;
  }
}

@media (max-width: 480px) {
  .playlist-cover {
    width: 150px;
    height: 150px;
  }
  
  .playlist-title {
    font-size: 1.5rem;
  }
}
</style>
