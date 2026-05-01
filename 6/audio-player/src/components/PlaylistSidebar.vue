<template>
  <div class="h-full flex flex-col">
    <div class="p-4 border-b border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-white">播放列表</h2>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400">{{ playlist.length }} 首歌曲</span>
          <n-button 
            quaternary 
            circle 
            size="small"
            @click="showAddModal = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </n-button>
        </div>
      </div>

      <div class="relative">
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <n-input
          v-model:value="searchQuery"
          placeholder="搜索歌曲..."
          class="pl-10"
          :bordered="false"
        />
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-2">
      <div 
        v-for="(track, index) in filteredPlaylist" 
        :key="track.id"
        class="group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
        :class="{
          'bg-primary-500/20 border border-primary-500/30': currentIndex === track.originalIndex,
          'hover:bg-slate-700/50': currentIndex !== track.originalIndex
        }"
        @click="$emit('select-track', track.originalIndex)"
      >
        <div class="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          <img 
            v-if="track.cover" 
            :src="track.cover" 
            :alt="track.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          
          <div 
            v-if="currentIndex === track.originalIndex" 
            class="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div v-if="isPlaying" class="flex items-end gap-0.5 h-5">
              <span class="w-1 bg-primary-500 rounded-sm animate-bounce" style="animation-delay: 0ms; height: 40%"></span>
              <span class="w-1 bg-primary-500 rounded-sm animate-bounce" style="animation-delay: 150ms; height: 70%"></span>
              <span class="w-1 bg-primary-500 rounded-sm animate-bounce" style="animation-delay: 300ms; height: 50%"></span>
              <span class="w-1 bg-primary-500 rounded-sm animate-bounce" style="animation-delay: 450ms; height: 80%"></span>
            </div>
            <svg v-else class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate" :class="{ 'text-primary-400': currentIndex === track.originalIndex }">
            {{ track.title }}
          </p>
          <p class="text-xs text-slate-400 truncate">{{ track.artist }}</p>
        </div>

        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-xs text-slate-500">{{ formatDuration(track.duration) }}</span>
          <n-button 
            quaternary 
            circle 
            size="tiny"
            class="text-slate-400 hover:text-red-400"
            @click.stop="$emit('remove-track', track.originalIndex)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </n-button>
        </div>
      </div>

      <div v-if="filteredPlaylist.length === 0" class="flex flex-col items-center justify-center py-12 text-slate-500">
        <svg class="w-12 h-12 mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <p class="text-sm">{{ playlist.length === 0 ? '播放列表为空' : '没有找到匹配的歌曲' }}</p>
      </div>
    </div>

    <n-modal
      v-model:show="showAddModal"
      preset="dialog"
      title="添加新歌曲"
      :show-icon="false"
      positive-text="添加"
      negative-text="取消"
      @positive-click="handleAddTrack"
      @negative-click="resetNewTrack"
    >
      <div class="space-y-4 pt-2">
        <n-form-item label="歌曲标题" label-placement="top">
          <n-input v-model:value="newTrack.title" placeholder="输入歌曲标题" />
        </n-form-item>
        <n-form-item label="艺术家" label-placement="top">
          <n-input v-model:value="newTrack.artist" placeholder="输入艺术家名称" />
        </n-form-item>
        <n-form-item label="专辑" label-placement="top">
          <n-input v-model:value="newTrack.album" placeholder="输入专辑名称（可选）" />
        </n-form-item>
        <n-form-item label="时长（秒）" label-placement="top">
          <n-input-number v-model:value="newTrack.duration" :min="0" :default-value="180" class="w-full" />
        </n-form-item>
        <n-form-item label="封面图片 URL" label-placement="top">
          <n-input v-model:value="newTrack.cover" placeholder="输入封面图片 URL（可选）" />
        </n-form-item>
        <n-form-item label="音频 URL" label-placement="top">
          <n-input v-model:value="newTrack.src" placeholder="输入音频文件 URL" />
        </n-form-item>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  playlist: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: -1
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select-track', 'add-track', 'remove-track'])

const searchQuery = ref('')
const showAddModal = ref(false)

const newTrack = ref({
  title: '',
  artist: '',
  album: '',
  duration: 180,
  cover: '',
  src: ''
})

const filteredPlaylist = computed(() => {
  let list = props.playlist.map((track, index) => ({
    ...track,
    originalIndex: index
  }))
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    list = list.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      (track.album && track.album.toLowerCase().includes(query))
    )
  }
  
  return list
})

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '--:--'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleAddTrack = () => {
  if (!newTrack.value.title || !newTrack.value.artist) {
    return
  }
  
  const trackToAdd = {
    id: Date.now().toString(),
    title: newTrack.value.title,
    artist: newTrack.value.artist,
    album: newTrack.value.album || '',
    duration: newTrack.value.duration || 180,
    cover: newTrack.value.cover || '',
    src: newTrack.value.src || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }
  
  emit('add-track', trackToAdd)
  resetNewTrack()
}

const resetNewTrack = () => {
  newTrack.value = {
    title: '',
    artist: '',
    album: '',
    duration: 180,
    cover: '',
    src: ''
  }
}
</script>
