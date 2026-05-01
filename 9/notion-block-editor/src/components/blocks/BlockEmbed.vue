<template>
  <div class="block-embed">
    <template v-if="config.url && isConfigured">
      <div class="rounded-lg overflow-hidden border border-gray-200">
        <template v-if="config.embedType === 'iframe'">
          <iframe 
            :src="config.url" 
            class="w-full min-h-80 border-0"
            :title="config.url"
            allowfullscreen
          />
        </template>
        
        <template v-else-if="config.embedType === 'youtube'">
          <iframe 
            :src="youtubeEmbedUrl" 
            class="w-full min-h-80 border-0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </template>
        
        <template v-else-if="config.embedType === 'image'">
          <img 
            :src="config.url" 
            alt="Embed image"
            class="w-full h-auto object-contain"
            @error="onImageError"
          />
        </template>
        
        <div class="p-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p class="text-xs text-gray-500 truncate flex-1">{{ config.url }}</p>
          <button 
            class="text-xs text-blue-500 hover:text-blue-600 ml-2"
            @click="isConfigured = false"
          >
            编辑
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        <div class="flex items-center justify-center mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <p class="text-center text-sm text-gray-500 mb-4">嵌入网页、视频或图片</p>
        
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">嵌入类型</label>
            <Select 
              v-model="selectedEmbedType" 
              :options="embedTypeOptions" 
              optionLabel="label"
              optionValue="value"
              placeholder="选择类型"
              class="w-full"
            />
          </div>
          
          <div>
            <label class="block text-xs text-gray-500 mb-1">URL 地址</label>
            <div class="flex gap-2">
              <InputText 
                v-model="embedUrl" 
                :placeholder="urlPlaceholder"
                class="flex-1"
              />
              <Button 
                label="嵌入" 
                @click="addEmbed"
                :disabled="!embedUrl"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Block } from '@/types'

const props = defineProps<{
  modelValue: Block
}>()

const emit = defineEmits<{
  'update:modelValue': [block: Block]
  'update': [block: Block]
}>()

const config = computed(() => props.modelValue.config)
const isConfigured = ref(!!config.value.url)
const embedUrl = ref(config.value.url || '')
const selectedEmbedType = ref(config.value.embedType || 'iframe')

const embedTypeOptions = [
  { label: '网页 (iframe)', value: 'iframe' },
  { label: 'YouTube 视频', value: 'youtube' },
  { label: '图片', value: 'image' },
]

const urlPlaceholder = computed(() => {
  if (selectedEmbedType.value === 'youtube') {
    return '例如: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  } else if (selectedEmbedType.value === 'image') {
    return '例如: https://example.com/image.jpg'
  }
  return '例如: https://example.com'
})

const youtubeEmbedUrl = computed(() => {
  const url = config.value.url
  if (!url) return ''
  
  let videoId = ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (match) {
    videoId = match[1]
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
})

function addEmbed() {
  if (!embedUrl.value) return
  
  const newBlock = {
    ...props.modelValue,
    config: {
      ...props.modelValue.config,
      url: embedUrl.value,
      embedType: selectedEmbedType.value
    }
  }
  
  emit('update:modelValue', newBlock)
  emit('update', newBlock)
  isConfigured.value = true
}

function onImageError() {
  console.log('Image failed to load')
}

watch(() => config.value.url, (url) => {
  embedUrl.value = url || ''
  isConfigured.value = !!url
})

watch(() => config.value.embedType, (type) => {
  selectedEmbedType.value = type || 'iframe'
})
</script>
