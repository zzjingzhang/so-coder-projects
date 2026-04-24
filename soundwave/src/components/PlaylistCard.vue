<template>
  <RouterLink :to="`/playlist/${playlist.id}`" class="playlist-card card">
    <div class="playlist-cover-wrapper">
      <img 
        :src="playlist.cover" 
        :alt="playlist.title"
        class="playlist-cover-img"
      />
      <div class="playlist-overlay">
        <button class="play-overlay-btn btn-icon" @click.prevent="handlePlay">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      <div class="playlist-badge">
        <span class="track-count">{{ playlist.tracks.length }} tracks</span>
      </div>
    </div>
    
    <div class="playlist-info mt-3">
      <h4 class="playlist-title text-truncate">{{ playlist.title }}</h4>
      <p class="playlist-owner text-secondary text-sm text-truncate">By {{ playlist.owner }}</p>
      <p class="playlist-description text-secondary text-sm mt-2">{{ playlist.description }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Playlist } from '../types'
import { usePlayerStore } from '../stores/playerStore'

const props = defineProps<{
  playlist: Playlist
}>()

const playerStore = usePlayerStore()

const handlePlay = () => {
  if (props.playlist.tracks.length > 0) {
    playerStore.playTrack(props.playlist.tracks[0], props.playlist.tracks)
  }
}
</script>

<style scoped>
.playlist-card {
  padding: 16px;
  text-decoration: none;
  display: block;
}

.playlist-cover-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.playlist-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.playlist-card:hover .playlist-cover-img {
  transform: scale(1.05);
}

.playlist-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-normal);
}

.playlist-card:hover .playlist-overlay {
  opacity: 1;
}

.play-overlay-btn {
  background-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(10px);
  opacity: 0;
  transition: all var(--transition-normal);
}

.playlist-card:hover .play-overlay-btn {
  transform: translateY(0);
  opacity: 1;
}

.play-overlay-btn:hover {
  background-color: var(--primary-hover);
  transform: scale(1.1);
}

.playlist-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}

.track-count {
  font-size: 0.75rem;
  font-weight: 500;
}

.playlist-title {
  font-weight: 600;
  font-size: 1rem;
}

.playlist-owner {
  margin-top: 2px;
}

.playlist-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0.8;
}
</style>
