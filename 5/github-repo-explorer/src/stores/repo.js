import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { githubApi } from '@/api/github'

export const useRepoStore = defineStore('repo', () => {
  const repos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref(null)
  const links = ref(null)

  const searchQuery = ref('')
  const visibilityFilter = ref('all')
  const sortBy = ref('updated')
  const sortDirection = ref('desc')
  const currentPage = ref(1)
  const perPage = ref(12)

  const filters = computed(() => ({
    search: searchQuery.value,
    visibility: visibilityFilter.value,
    sort: sortBy.value,
    direction: sortDirection.value,
    page: currentPage.value,
    per_page: perPage.value
  }))

  const fetchRepos = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await githubApi.getRepos(filters.value)
      repos.value = response.data
      pagination.value = response.pagination
      links.value = response.links
    } catch (err) {
      error.value = err.message
      repos.value = []
    } finally {
      loading.value = false
    }
  }

  const setSearch = (query) => {
    searchQuery.value = query
    currentPage.value = 1
  }

  const setVisibility = (visibility) => {
    visibilityFilter.value = visibility
    currentPage.value = 1
  }

  const setSort = (sort, direction = 'desc') => {
    sortBy.value = sort
    sortDirection.value = direction
    currentPage.value = 1
  }

  const goToPage = (page) => {
    currentPage.value = page
    fetchRepos()
  }

  const nextPage = () => {
    if (pagination.value?.has_next) {
      currentPage.value++
      fetchRepos()
    }
  }

  const prevPage = () => {
    if (pagination.value?.has_prev) {
      currentPage.value--
      fetchRepos()
    }
  }

  return {
    repos,
    loading,
    error,
    pagination,
    links,
    searchQuery,
    visibilityFilter,
    sortBy,
    sortDirection,
    currentPage,
    perPage,
    filters,
    fetchRepos,
    setSearch,
    setVisibility,
    setSort,
    goToPage,
    nextPage,
    prevPage
  }
})
