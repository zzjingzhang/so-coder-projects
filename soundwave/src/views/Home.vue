<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Discover Amazing Music</h1>
          <p class="hero-subtitle">Explore millions of tracks from artists around the world</p>
          <div class="hero-actions flex gap-3">
            <RouterLink to="/search" class="btn btn-primary">Start Exploring</RouterLink>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container main-content">
      <section class="section">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">Featured Playlists</h2>
          <RouterLink to="/search" class="text-secondary text-sm hover:text-primary transition-colors">
            View All →
          </RouterLink>
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
          <h2 class="section-title">Trending Tracks</h2>
          <RouterLink to="/search" class="text-secondary text-sm hover:text-primary transition-colors">
            View All →
          </RouterLink>
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
          <h2 class="section-title">New Releases</h2>
          <RouterLink to="/search" class="text-secondary text-sm hover:text-primary transition-colors">
            View All →
          </RouterLink>
        </div>
        <div class="grid grid-4">
          <TrackCard 
            v-for="track in mockTracks.slice(4, 8)" 
            :key="track.id" 
            :track="track"
            :playlist="mockTracks.slice(4, 8)"
          />
        </div>
      </section>
      
      <section class="section">
        <div class="genres-section">
          <h2 class="section-title">Browse by Genre</h2>
          <div class="grid grid-5 genres-grid">
            <div 
              v-for="genre in genres" 
              :key="genre.name"
              class="genre-card"
              :style="{ background: `linear-gradient(135deg, ${genre.color})` }"
            >
              <h3 class="genre-name">{{ genre.name }}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mockTracks, mockPlaylists } from '../mock'
import PlaylistCard from '../components/PlaylistCard.vue'
import TrackCard from '../components/TrackCard.vue'

const genres = [
  { name: 'Electronic', color: '#667eea, #764ba2' },
  { name: 'Hip Hop', color: '#f093fb, #f5576c' },
  { name: 'Rock', color: '#4facfe, #00f2fe' },
  { name: 'Jazz', color: '#43e97b, #38f9d7' },
  { name: 'Chill', color: '#fa709a, #fee140' }
]
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, #ff7733 50%, #ff9933 100%);
  padding: 60px 0;
  margin-bottom: 32px;
}

.hero-content {
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: white;
}

.hero-subtitle {
  font-size: 1.125rem;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.9);
}

.hero-actions {
  justify-content: center;
}

.genres-section {
  margin-bottom: 40px;
}

.genres-grid {
  gap: 20px;
}

.genre-card {
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.genre-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

.genre-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}

.genre-name {
  position: relative;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }
  
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .genres-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .genre-name {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .genres-grid {
    grid-template-columns: 1fr;
  }
}
</style>
