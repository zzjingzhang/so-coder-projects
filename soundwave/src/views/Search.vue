<template>
  <div class="search-page">
    <div class="container">
      <div class="search-header mb-6">
        <h1 class="page-title mb-4">Search</h1>
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 12.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search for songs, artists, albums..."
            class="search-input"
            @input="handleSearch"
          />
          <button v-if="searchQuery" class="clear-btn" @click="clearSearch">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div v-if="!searchQuery" class="browse-section">
        <h2 class="section-title mb-4">Browse Categories</h2>
        <div class="grid grid-3 categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.name"
            class="category-card"
            :style="{ background: `linear-gradient(135deg, ${category.color})` }"
            @click="selectCategory(category.name)"
          >
            <h3 class="category-name">{{ category.name }}</h3>
          </div>
        </div>
        
        <section class="section mt-8">
          <h2 class="section-title mb-4">All Tracks</h2>
          <div class="grid grid-4">
            <TrackCard 
              v-for="track in mockTracks" 
              :key="track.id" 
              :track="track"
              :playlist="mockTracks"
            />
          </div>
        </section>
        
        <section class="section">
          <h2 class="section-title mb-4">All Playlists</h2>
          <div class="grid grid-4">
            <PlaylistCard 
              v-for="playlist in mockPlaylists" 
              :key="playlist.id" 
              :playlist="playlist"
            />
          </div>
        </section>
      </div>
      
      <div v-else class="search-results">
        <div v-if="filteredTracks.length > 0" class="results-section mb-8">
          <h2 class="section-title mb-4">Tracks ({{ filteredTracks.length }})</h2>
          <div class="grid grid-4">
            <TrackCard 
              v-for="track in filteredTracks" 
              :key="track.id" 
              :track="track"
              :playlist="filteredTracks"
            />
          </div>
        </div>
        
        <div v-if="filteredPlaylists.length > 0" class="results-section">
          <h2 class="section-title mb-4">Playlists ({{ filteredPlaylists.length }})</h2>
          <div class="grid grid-4">
            <PlaylistCard 
              v-for="playlist in filteredPlaylists" 
              :key="playlist.id" 
              :playlist="playlist"
            />
          </div>
        </div>
        
        <div v-if="filteredTracks.length === 0 && filteredPlaylists.length === 0" class="no-results">
          <svg class="no-results-icon" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 12.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <h3 class="no-results-title">No results found</h3>
          <p class="no-results-text text-secondary">Try searching for something else</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockTracks, mockPlaylists } from '../mock'
import TrackCard from '../components/TrackCard.vue'
import PlaylistCard from '../components/PlaylistCard.vue'

const searchQuery = ref('')

const categories = [
  { name: 'Electronic', color: '#667eea, #764ba2' },
  { name: 'Hip Hop', color: '#f093fb, #f5576c' },
  { name: 'Rock', color: '#4facfe, #00f2fe' },
  { name: 'Jazz', color: '#43e97b, #38f9d7' },
  { name: 'Chill', color: '#fa709a, #fee140' },
  { name: 'Deep House', color: '#a8edea, #fed6e3' }
]

const filteredTracks = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return mockTracks.filter(track => 
    track.title.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query) ||
    track.album.toLowerCase().includes(query) ||
    track.genre.toLowerCase().includes(query)
  )
})

const filteredPlaylists = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return mockPlaylists.filter(playlist => 
    playlist.title.toLowerCase().includes(query) ||
    playlist.description.toLowerCase().includes(query) ||
    playlist.owner.toLowerCase().includes(query)
  )
})

const handleSearch = () => {
  // Search is handled by computed properties
}

const clearSearch = () => {
  searchQuery.value = ''
}

const selectCategory = (category: string) => {
  searchQuery.value = category
}
</script>

<style scoped>
.search-page {
  padding: 32px 0;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
}

.search-input-wrapper {
  position: relative;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 52px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 1rem;
  outline: none;
  transition: all var(--transition-fast);
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.2);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.clear-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  padding: 4px;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.clear-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-tertiary);
}

.browse-section {
  margin-top: 32px;
}

.categories-grid {
  gap: 20px;
}

.category-card {
  aspect-ratio: 16/9;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
}

.category-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}

.category-name {
  position: relative;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.search-results {
  margin-top: 32px;
}

.results-section {
  margin-bottom: 40px;
}

.no-results {
  text-align: center;
  padding: 80px 0;
}

.no-results-icon {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.no-results-text {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .search-page {
    padding: 24px 0;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .category-name {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
