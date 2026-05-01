<template>
  <div class="commits-view min-h-screen bg-gray-900">
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <n-button @click="goBack" quaternary>
              Back
            </n-button>
            <div>
              <h1 class="text-xl font-bold text-white">{{ repoName }}</h1>
              <p class="text-gray-400 text-sm">{{ ownerName }} / {{ repoName }}</p>
            </div>
          </div>
          <n-button @click="handleLogout" quaternary>Logout</n-button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6">
      <div class="flex items-center gap-4 mb-6">
        <n-select
          v-model:value="selectedBranch"
          :options="branchOptions"
          placeholder="Select branch"
          class="branch-select"
          :loading="commitsStore.branchesLoading"
          @update:value="handleBranchChange"
        />

        <a
          v-if="commitsStore.links?.next || commitsStore.links?.prev"
          :href="getGitHubLink('next')"
          target="_blank"
          class="text-sm text-blue-400 hover:underline"
        >
          View on GitHub
        </a>
      </div>

      <div v-if="commitsStore.loading" class="py-8">
        <GridProgress />
      </div>

      <div v-else-if="commitsStore.error" class="text-center py-8">
        <n-result status="error" title="Error loading commits" :description="commitsStore.error">
          <template #footer>
            <n-button @click="commitsStore.fetchCommits">Retry</n-button>
          </template>
        </n-result>
      </div>

      <template v-else>
        <div class="space-y-6">
          <div
            v-for="(commits, date) in groupedCommits"
            :key="date"
            class="date-group"
          >
            <h2 class="text-lg font-semibold text-gray-300 mb-3 sticky top-0 bg-gray-900 py-2">
              {{ date }}
            </h2>

            <div class="space-y-3">
              <CommitCard
                v-for="commit in commits"
                :key="commit.sha"
                :commit="commit"
                @click="showCommitDetails(commit)"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center items-center gap-4 mt-8">
          <n-button
            :disabled="!commitsStore.pagination?.has_prev"
            @click="commitsStore.prevPage()"
          >
            Older
          </n-button>

          <span class="text-gray-400">
            Page {{ commitsStore.currentPage }} of {{ commitsStore.pagination?.total_pages || 1 }}
          </span>

          <n-button
            :disabled="!commitsStore.pagination?.has_next"
            @click="commitsStore.nextPage()"
          >
            Newer
          </n-button>
        </div>

        <div class="text-center mt-4">
          <a
            v-if="commitsStore.links?.next"
            :href="getGitHubCommitsUrl('next')"
            target="_blank"
            class="text-sm text-blue-400 hover:underline"
          >
            View older commits on GitHub
          </a>
        </div>
      </template>
    </main>

    <n-modal v-model:show="showModal" preset="card" title="Commit Details" style="max-width: 600px;">
      <div v-if="selectedCommit" class="space-y-4">
        <div class="flex items-center gap-3">
          <img :src="selectedCommit.author?.avatar_url" class="w-10 h-10 rounded-full" />
          <div>
            <p class="font-semibold text-white">{{ selectedCommit.author?.login }}</p>
            <p class="text-sm text-gray-400">{{ formatFullDate(selectedCommit.commit.author.date) }}</p>
          </div>
        </div>

        <n-divider />

        <p class="text-gray-200 whitespace-pre-wrap">{{ selectedCommit.commit.message }}</p>

        <n-divider />

        <div class="flex items-center justify-between text-sm text-gray-400">
          <span>SHA: {{ selectedCommit.sha.substring(0, 7) }}</span>
          <a
            :href="selectedCommit.html_url"
            target="_blank"
            class="text-blue-400 hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </n-modal>

    <FullscreenProgress v-if="initialLoading" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  NButton, NSelect, NResult, NModal, NDivider
} from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { useCommitsStore } from '@/stores/commits'
import CommitCard from '@/components/CommitCard.vue'
import GridProgress from '@/components/GridProgress.vue'
import FullscreenProgress from '@/components/FullscreenProgress.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const commitsStore = useCommitsStore()

const initialLoading = ref(true)
const showModal = ref(false)
const selectedCommit = ref(null)

const ownerName = computed(() => route.params.owner)
const repoName = computed(() => route.params.repo)

const branchOptions = computed(() => {
  return commitsStore.branches.map(branch => ({
    label: branch.name,
    value: branch.name
  }))
})

const selectedBranch = computed({
  get: () => commitsStore.currentBranch,
  set: (value) => commitsStore.setBranch(value)
})

const groupedCommits = computed(() => {
  return commitsStore.groupCommitsByDate()
})

const handleBranchChange = (branch) => {
  commitsStore.setBranch(branch)
}

const showCommitDetails = (commit) => {
  selectedCommit.value = commit
  showModal.value = true
}

const formatFullDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getGitHubLink = (type) => {
  return `https://github.com/${ownerName.value}/${repoName.value}/commits/${commitsStore.currentBranch}`
}

const getGitHubCommitsUrl = (type) => {
  const baseUrl = `https://github.com/${ownerName.value}/${repoName.value}/commits/${commitsStore.currentBranch}`
  if (type === 'next' && commitsStore.links?.next) {
    return baseUrl
  }
  return baseUrl
}

const goBack = () => {
  router.push('/dashboard')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(async () => {
  authStore.initializeAuth()
  await commitsStore.fetchBranches(ownerName.value, repoName.value)
  await commitsStore.fetchCommits()
  initialLoading.value = false
})
</script>

<style scoped>
.branch-select {
  width: 200px;
}

.date-group {
  position: relative;
}
</style>
