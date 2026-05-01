<template>
  <div class="dashboard-view min-h-screen bg-gray-900">
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-bold text-white">GitHub Repo Explorer</h1>
            <span v-if="authStore.user" class="text-gray-400">
              | Welcome, {{ authStore.user.name || authStore.user.login }}
            </span>
          </div>
          <n-button @click="handleLogout" quaternary>Logout</n-button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6">
      <div class="flex flex-col gap-6">
        <n-card class="filters-card">
          <div class="flex flex-wrap gap-4 items-center">
            <n-input
              v-model:value="searchInput"
              placeholder="Search repositories by name..."
              clearable
              class="search-input"
              @keyup.enter="handleSearch"
            />

            <n-select
              v-model:value="visibility"
              :options="visibilityOptions"
              placeholder="Visibility"
              class="filter-select"
              @update:value="handleVisibilityChange"
            />

            <n-select
              v-model:value="sortOption"
              :options="sortOptions"
              placeholder="Sort by"
              class="filter-select"
              @update:value="handleSortChange"
            />

            <n-button @click="handleSearch" type="primary">Search</n-button>
          </div>
        </n-card>

        <div v-if="repoStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="skeleton-card">
            <GridProgress />
          </div>
        </div>

        <div v-else-if="repoStore.error" class="text-center py-8">
          <n-result status="error" title="Error loading repositories" :description="repoStore.error">
            <template #footer>
              <n-button @click="repoStore.fetchRepos">Retry</n-button>
            </template>
          </n-result>
        </div>

        <div v-else-if="repoStore.repos.length === 0" class="text-center py-8">
          <n-result status="info" title="No repositories found" description="Try adjusting your search or filters." />
        </div>

        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RepoCard
              v-for="repo in repoStore.repos"
              :key="repo.id"
              :repo="repo"
              @click="navigateToCommits(repo)"
            />
          </div>

          <div class="flex justify-center mt-6">
            <n-pagination
              v-model:page="currentPage"
              :page-count="repoStore.pagination?.total_pages || 1"
              :page-slot="7"
              @update:page="handlePageChange"
            />
          </div>
        </template>
      </div>
    </main>

    <FullscreenProgress v-if="initialLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NInput, NSelect, NButton, NPagination, NResult } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { useRepoStore } from '@/stores/repo'
import RepoCard from '@/components/RepoCard.vue'
import GridProgress from '@/components/GridProgress.vue'
import FullscreenProgress from '@/components/FullscreenProgress.vue'

const router = useRouter()
const authStore = useAuthStore()
const repoStore = useRepoStore()

const initialLoading = ref(true)
const searchInput = ref('')
const visibility = ref('all')
const sortOption = ref('updated')
const currentPage = ref(1)

const visibilityOptions = [
  { label: 'All', value: 'all' },
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' }
]

const sortOptions = [
  { label: 'Best Match', value: 'updated' },
  { label: 'Stars', value: 'stars' },
  { label: 'Forks', value: 'forks' },
  { label: 'Help Wanted Issues', value: 'help-wanted-issues' },
  { label: 'Recently Updated', value: 'updated' }
]

const handleSearch = () => {
  repoStore.setSearch(searchInput.value)
  repoStore.fetchRepos()
}

const handleVisibilityChange = (value) => {
  repoStore.setVisibility(value)
  repoStore.fetchRepos()
}

const handleSortChange = (value) => {
  repoStore.setSort(value)
  repoStore.fetchRepos()
}

const handlePageChange = (page) => {
  repoStore.goToPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToCommits = (repo) => {
  router.push(`/repo/${repo.owner.login}/${repo.name}/commits`)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(async () => {
  authStore.initializeAuth()
  await repoStore.fetchRepos()
  initialLoading.value = false
})

watch(() => repoStore.filters, () => {
  currentPage.value = repoStore.currentPage
}, { deep: true })
</script>

<style scoped>
.filters-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-input {
  width: 300px;
}

.filter-select {
  width: 180px;
}

.skeleton-card {
  background: rgba(30, 41, 59, 0.6);
  border-radius: 8px;
  height: 180px;
}
</style>
