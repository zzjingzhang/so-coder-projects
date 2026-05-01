<template>
  <n-card
    class="repo-card cursor-pointer transition-all duration-300"
    :class="{ 'hovered': isHovered }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="$emit('click')"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-lg font-semibold text-blue-400 truncate">{{ repo.name }}</h3>
        <n-tag :type="repo.visibility === 'public' ? 'success' : 'warning'" size="small">
          {{ repo.visibility }}
        </n-tag>
      </div>

      <p class="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
        {{ repo.description || 'No description available' }}
      </p>

      <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span v-if="repo.language" class="flex items-center gap-1">
          <span class="language-dot" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
          {{ repo.language }}
        </span>
        <span class="flex items-center gap-1">
          <span>★</span>
          {{ formatNumber(repo.stargazers_count) }}
        </span>
        <span class="flex items-center gap-1">
          <span>⑂</span>
          {{ formatNumber(repo.forks_count) }}
        </span>
      </div>

      <div class="text-xs text-gray-500">
        Updated {{ formatDate(repo.updated_at) }}
      </div>

      <div v-if="isHovered && prefetchedData" class="mt-3 pt-3 border-t border-gray-700">
        <div v-if="prefetchedData.branches" class="mb-2">
          <span class="text-xs text-gray-500">Branches:</span>
          <div class="flex flex-wrap gap-1 mt-1">
            <n-tag v-for="branch in prefetchedData.branches.slice(0, 3)" :key="branch.name" size="tiny">
              {{ branch.name }}
            </n-tag>
            <span v-if="prefetchedData.branches.length > 3" class="text-xs text-gray-500">
              +{{ prefetchedData.branches.length - 3 }} more
            </span>
          </div>
        </div>
        <div v-if="prefetchedData.recentCommits" class="text-xs text-gray-500">
          <span>Recent commits:</span>
          <ul class="mt-1 space-y-1">
            <li v-for="commit in prefetchedData.recentCommits.slice(0, 2)" :key="commit.sha" class="truncate">
              {{ commit.commit.message.split('\n')[0] }}
            </li>
          </ul>
        </div>
      </div>

      <div v-if="isHovered && prefetchLoading" class="mt-3">
        <n-progress type="line" :show-indicator="false" :percentage="100" status="success" />
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { NCard, NTag, NProgress } from 'naive-ui'
import { githubApi } from '@/api/github'

const props = defineProps({
  repo: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const isHovered = ref(false)
const prefetchedData = ref(null)
const prefetchLoading = ref(false)

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Vue: '#41b883',
  Rust: '#dea584',
  Go: '#00ADD8',
  Swift: '#F05138',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B'
}

const getLanguageColor = (language) => {
  return languageColors[language] || '#858585'
}

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

const prefetchData = async () => {
  if (prefetchedData.value) return

  prefetchLoading.value = true

  try {
    const [branches, commits] = await Promise.all([
      githubApi.getRepoBranches(props.repo.owner.login, props.repo.name),
      githubApi.getCommits(props.repo.owner.login, props.repo.name, { per_page: 3 })
    ])

    prefetchedData.value = {
      branches: branches.data,
      recentCommits: commits.data
    }
  } catch (err) {
    console.error('Failed to prefetch repo data:', err)
  } finally {
    prefetchLoading.value = false
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  prefetchData()
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.repo-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.repo-card:hover,
.repo-card.hovered {
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.language-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
