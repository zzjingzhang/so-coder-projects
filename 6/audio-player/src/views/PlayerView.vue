<template>
  <div class="flex h-screen bg-slate-900 overflow-hidden">
    <aside class="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
      <PlaylistSidebar 
        :playlist="playlist"
        :currentIndex="currentTrackIndex"
        @select-track="handleSelectTrack"
        @add-track="handleAddTrack"
        @remove-track="handleRemoveTrack"
      />
    </aside>

    <main class="flex-1 flex flex-col">
      <header class="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <h1 class="text-xl font-bold text-white">音频播放器</h1>
        </div>
        <div class="flex items-center gap-4">
          <n-button text @click="goToAbout" class="text-slate-400 hover:text-white">
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              关于
            </span>
          </n-button>
        </div>
      </header>

      <div class="flex-1 flex items-center justify-center p-8">
        <AudioPlayer
          :track="currentTrack"
          :is-playing="isPlaying"
          :progress="progress"
          :duration="duration"
          :current-time="currentTime"
          :volume="volume"
          :is-muted="isMuted"
          :is-shuffle="isShuffle"
          :repeat-mode="repeatMode"
          @toggle-play="togglePlay"
          @seek="handleSeek"
          @volume-change="handleVolumeChange"
          @toggle-mute="toggleMute"
          @toggle-shuffle="toggleShuffle"
          @change-repeat="changeRepeatMode"
        />
      </div>

      <footer class="h-20 bg-slate-800 border-t border-slate-700 flex items-center px-6">
        <div class="flex items-center gap-4 w-64">
          <div v-if="currentTrack" class="w-14 h-14 rounded-lg overflow-hidden bg-slate-700">
            <img :src="currentTrack.cover" :alt="currentTrack.title" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-14 h-14 rounded-lg bg-slate-700 flex items-center justify-center">
            <svg class="w-6 h-6 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ currentTrack ? currentTrack.title : '未选择曲目' }}</p>
            <p class="text-xs text-slate-400 truncate">{{ currentTrack ? currentTrack.artist : '--' }}</p>
          </div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center gap-2">
          <div class="flex items-center gap-4">
            <n-button 
              quaternary 
              circle 
              size="small"
              :class="{ 'text-primary-500': isShuffle }"
              @click="toggleShuffle"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
              </svg>
            </n-button>

            <n-button quaternary circle size="medium" @click="previousTrack">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </n-button>

            <n-button 
              type="primary" 
              circle 
              size="large"
              class="!w-14 !h-14"
              @click="togglePlay"
            >
              <svg v-if="!isPlaying" class="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <svg v-else class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </n-button>

            <n-button quaternary circle size="medium" @click="nextTrack">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </n-button>

            <n-button 
              quaternary 
              circle 
              size="small"
              :class="{ 'text-primary-500': repeatMode !== 'none' }"
              @click="changeRepeatMode"
            >
              <svg v-if="repeatMode === 'none' || repeatMode === 'all'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </n-button>
          </div>

          <div class="flex items-center gap-3 w-full max-w-2xl">
            <span class="text-xs text-slate-400 w-12 text-right">{{ formatTime(currentTime) }}</span>
            <n-slider
              v-model:value="progress"
              :max="100"
              :tooltip="false"
              @update:value="handleSeek"
              class="flex-1"
            />
            <span class="text-xs text-slate-400 w-12">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3 w-64 justify-end">
          <n-button quaternary circle size="small" @click="toggleMute">
            <svg v-if="isMuted || volume === 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            <svg v-else-if="volume < 0.5" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </n-button>
          <n-slider
            v-model:value="volume"
            :min="0"
            :max="1"
            :step="0.01"
            :tooltip="false"
            class="w-24"
          />
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AudioPlayer from '../components/AudioPlayer.vue'
import PlaylistSidebar from '../components/PlaylistSidebar.vue'
import { samplePlaylist } from '../data/playlist'

const router = useRouter()

const playlist = ref([...samplePlaylist])
const currentTrackIndex = ref(0)
const isPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const currentTime = ref(0)
const volume = ref(0.7)
const isMuted = ref(false)
const isShuffle = ref(false)
const repeatMode = ref('none')

const audio = ref(null)

const currentTrack = computed(() => {
  return playlist.value[currentTrackIndex.value] || null
})

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const goToAbout = () => {
  router.push('/about')
}

const togglePlay = () => {
  if (!audio.value || !currentTrack.value) return
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const handleSeek = (value) => {
  if (!audio.value || !duration.value) return
  const newTime = (value / 100) * duration.value
  audio.value.currentTime = newTime
  currentTime.value = newTime
}

const handleVolumeChange = (value) => {
  volume.value = value
  if (audio.value) {
    audio.value.volume = value
  }
  if (value > 0) {
    isMuted.value = false
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (audio.value) {
    audio.value.muted = isMuted.value
  }
}

const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

const changeRepeatMode = () => {
  const modes = ['none', 'all', 'one']
  const currentIndex = modes.indexOf(repeatMode.value)
  repeatMode.value = modes[(currentIndex + 1) % modes.length]
}

const nextTrack = () => {
  if (playlist.value.length === 0) return
  
  if (isShuffle.value) {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * playlist.value.length)
    } while (newIndex === currentTrackIndex.value && playlist.value.length > 1)
    currentTrackIndex.value = newIndex
  } else {
    currentTrackIndex.value = (currentTrackIndex.value + 1) % playlist.value.length
  }
  
  playCurrentTrack()
}

const previousTrack = () => {
  if (playlist.value.length === 0) return
  
  if (currentTime.value > 3) {
    if (audio.value) {
      audio.value.currentTime = 0
    }
    return
  }
  
  if (isShuffle.value) {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * playlist.value.length)
    } while (newIndex === currentTrackIndex.value && playlist.value.length > 1)
    currentTrackIndex.value = newIndex
  } else {
    currentTrackIndex.value = (currentTrackIndex.value - 1 + playlist.value.length) % playlist.value.length
  }
  
  playCurrentTrack()
}

const playCurrentTrack = () => {
  if (!currentTrack.value) return
  
  if (!audio.value) {
    audio.value = new Audio()
  }
  
  audio.value.src = currentTrack.value.src
  audio.value.volume = volume.value
  audio.value.muted = isMuted.value
  
  if (isPlaying.value) {
    audio.value.play()
  }
}

const handleSelectTrack = (index) => {
  currentTrackIndex.value = index
  isPlaying.value = true
  playCurrentTrack()
  if (audio.value) {
    audio.value.play()
  }
}

const handleAddTrack = (track) => {
  playlist.value.push(track)
}

const handleRemoveTrack = (index) => {
  if (index === currentTrackIndex.value) {
    if (isPlaying.value && audio.value) {
      audio.value.pause()
      isPlaying.value = false
    }
    if (playlist.value.length > 1) {
      if (index === playlist.value.length - 1) {
        currentTrackIndex.value = 0
      }
    }
  } else if (index < currentTrackIndex.value) {
    currentTrackIndex.value--
  }
  playlist.value.splice(index, 1)
}

const handleTrackEnd = () => {
  if (repeatMode.value === 'one') {
    if (audio.value) {
      audio.value.currentTime = 0
      audio.value.play()
    }
  } else if (repeatMode.value === 'all' || currentTrackIndex.value < playlist.value.length - 1) {
    nextTrack()
  } else {
    isPlaying.value = false
  }
}

const handleTimeUpdate = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
    if (audio.value.duration) {
      progress.value = (audio.value.currentTime / audio.value.duration) * 100
    }
  }
}

const handleLoadedMetadata = () => {
  if (audio.value) {
    duration.value = audio.value.duration
  }
}

watch(currentTrackIndex, () => {
  playCurrentTrack()
})

onMounted(() => {
  audio.value = new Audio()
  
  audio.value.addEventListener('ended', handleTrackEnd)
  audio.value.addEventListener('timeupdate', handleTimeUpdate)
  audio.value.addEventListener('loadedmetadata', handleLoadedMetadata)
  
  if (playlist.value.length > 0 && currentTrack.value) {
    audio.value.src = currentTrack.value.src
    audio.value.volume = volume.value
  }
})

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value.removeEventListener('ended', handleTrackEnd)
    audio.value.removeEventListener('timeupdate', handleTimeUpdate)
    audio.value.removeEventListener('loadedmetadata', handleLoadedMetadata)
    audio.value = null
  }
})
</script>
