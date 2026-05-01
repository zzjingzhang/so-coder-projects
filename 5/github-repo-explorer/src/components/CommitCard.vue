<template>
  <n-card class="commit-card cursor-pointer" @click="$emit('click')">
    <div class="flex items-start gap-3">
      <img :src="commit.author?.avatar_url" class="w-8 h-8 rounded-full flex-shrink-0" />
      <div class="flex-grow min-w-0">
        <p class="text-gray-200 truncate pr-4">{{ commit.commit.message.split('\n')[0] }}</p>
        <div class="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <span class="font-medium text-gray-400">{{ commit.author?.login }}</span>
          <span>-</span>
          <span class="truncate">{{ formatDate(commit.commit.author.date) }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <n-tag size="tiny" :bordered="false">{{ commit.sha.substring(0, 7) }}</n-tag>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { NCard, NTag } from 'naive-ui'

defineProps({
  commit: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24) return `${hours} hours ago`
  if (days < 7) return `${days} days ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}
</script>

<style scoped>
.commit-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.commit-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(30, 41, 59, 0.8);
}
</style>
