<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="container">
        <div class="header-content flex items-center gap-6">
          <img 
            :src="mockUser.avatar" 
            :alt="mockUser.name"
            class="profile-avatar"
          />
          <div class="profile-info">
            <span class="profile-label text-secondary text-sm uppercase tracking-wider">Profile</span>
            <h1 class="profile-name">{{ mockUser.name }}</h1>
            <div class="profile-stats flex items-center gap-4 mt-3 text-sm">
              <div class="stat">
                <span class="stat-value">{{ formatNumber(mockUser.followers) }}</span>
                <span class="stat-label text-secondary">Followers</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ formatNumber(mockUser.following) }}</span>
                <span class="stat-label text-secondary">Following</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ mockTracks.length }}</span>
                <span class="stat-label text-secondary">Liked</span>
              </div>
            </div>
            <div class="profile-actions flex items-center gap-3 mt-6">
              <button class="btn btn-primary">Edit Profile</button>
              <button class="btn btn-outline">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <section class="section">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">Liked Tracks</h2>
        </div>
        <div class="grid grid-4">
          <TrackCard 
            v-for="track in mockTracks.slice(0, 4)" 
            :key="track.id" 
            :track="track"
            :playlist="mockTracks"
          />
        </div>
      </section>
      
      <section class="section">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">My Playlists</h2>
        </div>
        <div class="grid grid-4">
          <PlaylistCard 
            v-for="playlist in mockPlaylists" 
            :key="playlist.id" 
            :playlist="playlist"
          />
        </div>
      </section>
      
      <section class="section">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">Recently Played</h2>
        </div>
        <div class="recent-tracks">
          <div 
            v-for="(track, index) in mockTracks.slice(0, 5)" 
            :key="track.id"
            class="recent-track flex items-center gap-4 py-3 px-4 hover:bg-bg-tertiary rounded-md transition-colors cursor-pointer"
            @click="playTrack(track)"
          >
            <span class="track-number text-secondary w-8">{{ index + 1 }}</span>
            <img 
              :src="track.cover" 
              :alt="track.title"
              class="track-cover-small"
            />
            <div class="track-info flex-1 min-w-0">
              <h4 class="track-name">{{ track.title }}</h4>
              <p class="track-artist text-secondary text-sm">{{ track.artist }}</p>
            </div>
            <span class="track-album text-secondary hidden md:block">{{ track.album }}</span>
            <span class="track-duration text-secondary">{{ formatTime(track.duration) }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockTracks, mockPlaylists, mockUser } from '../mock'
import { usePlayerStore } from '../stores/playerStore'
import TrackCard from '../components/TrackCard.vue'
import PlaylistCard from '../components/PlaylistCard.vue'
import type { Track } from '../types'

const playerStore = usePlayerStore()

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const playTrack = (track: Track) => {
  playerStore.playTrack(track, mockTracks)
}
</script>

<style scoped>
.profile-page {
  padding-bottom: 32px;
}

.profile-header {
  background: linear-gradient(to bottom, var(--bg-tertiary), var(--bg-color));
  padding: 40px 0;
  margin-bottom: 32px;
}

.header-content {
  align-items: flex-end;
}

.profile-avatar {
  width: 192px;
  height: 192px;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-lg);
  object-fit: cover;
  border: 4px solid var(--bg-secondary);
}

.profile-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.profile-name {
  font-size: 3rem;
  font-weight: 800;
  margin: 8px 0;
  line-height: 1.2;
}

.profile-stats {
  gap: 24px;
}

.stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-value {
  font-weight: 700;
  font-size: 1.125rem;
}

.profile-actions button {
  gap: 8px;
}

.recent-tracks {
  margin-top: 8px;
}

.recent-track {
  margin-bottom: 4px;
}

.track-cover-small {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.track-info {
  min-width: 0;
}

.track-name {
  font-weight: 500;
  margin-bottom: 2px;
}

@media (max-width: 768px) {
  .profile-header {
    padding: 24px 0;
  }
  
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-avatar {
    width: 140px;
    height: 140px;
  }
  
  .profile-name {
    font-size: 2rem;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .profile-actions {
    justify-content: center;
  }
  
  .track-album {
    display: none;
  }
}

@media (max-width: 480px) {
  .profile-avatar {
    width: 120px;
    height: 120px;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
}
</style>
