import { defineStore } from 'pinia'
import { ref } from 'vue'
import { githubApi } from '@/api/github'

export const useCommitsStore = defineStore('commits', () => {
  const commits = ref([])
  const branches = ref([])
  const loading = ref(false)
  const branchesLoading = ref(false)
  const error = ref(null)
  const pagination = ref(null)
  const links = ref(null)

  const currentOwner = ref('')
  const currentRepo = ref('')
  const currentBranch = ref('main')
  const currentPage = ref(1)
  const perPage = ref(30)

  const fetchBranches = async (owner, repo) => {
    branchesLoading.value = true
    currentOwner.value = owner
    currentRepo.value = repo

    try {
      const response = await githubApi.getRepoBranches(owner, repo)
      branches.value = response.data
      if (response.data.length > 0 && !response.data.find(b => b.name === currentBranch.value)) {
        currentBranch.value = response.data[0].name
      }
    } catch (err) {
      error.value = err.message
      branches.value = []
    } finally {
      branchesLoading.value = false
    }
  }

  const fetchCommits = async () => {
    if (!currentOwner.value || !currentRepo.value) return

    loading.value = true
    error.value = null

    try {
      const response = await githubApi.getCommits(
        currentOwner.value,
        currentRepo.value,
        {
          branch: currentBranch.value,
          page: currentPage.value,
          per_page: perPage.value
        }
      )
      commits.value = response.data
      pagination.value = response.pagination
      links.value = response.links
    } catch (err) {
      error.value = err.message
      commits.value = []
    } finally {
      loading.value = false
    }
  }

  const setBranch = (branch) => {
    currentBranch.value = branch
    currentPage.value = 1
    fetchCommits()
  }

  const goToPage = (page) => {
    currentPage.value = page
    fetchCommits()
  }

  const nextPage = () => {
    if (pagination.value?.has_next) {
      currentPage.value++
      fetchCommits()
    }
  }

  const prevPage = () => {
    if (pagination.value?.has_prev) {
      currentPage.value--
      fetchCommits()
    }
  }

  const groupCommitsByDate = () => {
    const grouped = {}
    commits.value.forEach(commit => {
      const date = new Date(commit.commit.author.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(commit)
    })
    return grouped
  }

  return {
    commits,
    branches,
    loading,
    branchesLoading,
    error,
    pagination,
    links,
    currentOwner,
    currentRepo,
    currentBranch,
    currentPage,
    fetchBranches,
    fetchCommits,
    setBranch,
    goToPage,
    nextPage,
    prevPage,
    groupCommitsByDate
  }
})
