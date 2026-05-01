import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRepoStore } from '@/stores/repo'

const mockRepos = [
  {
    id: 1,
    name: 'test-repo',
    full_name: 'octocat/test-repo',
    description: 'A test repository',
    language: 'JavaScript',
    stargazers_count: 100,
    forks_count: 50,
    open_issues_count: 10,
    visibility: 'public',
    updated_at: '2024-03-15T10:00:00Z',
    owner: { login: 'octocat', avatar_url: 'https://example.com/avatar.png' }
  }
]

vi.mock('@/api/github', () => ({
  githubApi: {
    getRepos: vi.fn(),
    setToken: vi.fn()
  }
}))

describe('Repo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have empty repos initially', () => {
      const repoStore = useRepoStore()
      expect(repoStore.repos).toEqual([])
    })

    it('should not be loading initially', () => {
      const repoStore = useRepoStore()
      expect(repoStore.loading).toBe(false)
    })

    it('should have default filter values', () => {
      const repoStore = useRepoStore()
      expect(repoStore.searchQuery).toBe('')
      expect(repoStore.visibilityFilter).toBe('all')
      expect(repoStore.sortBy).toBe('updated')
      expect(repoStore.currentPage).toBe(1)
    })
  })

  describe('fetchRepos', () => {
    it('should fetch repos successfully', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepos.mockResolvedValue({
        data: mockRepos,
        pagination: { total: 1, page: 1, total_pages: 1 },
        links: {}
      })

      const repoStore = useRepoStore()
      await repoStore.fetchRepos()

      expect(repoStore.repos).toEqual(mockRepos)
      expect(repoStore.loading).toBe(false)
      expect(repoStore.error).toBeNull()
    })

    it('should set error on failed fetch', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepos.mockRejectedValue(new Error('Network error'))

      const repoStore = useRepoStore()
      await repoStore.fetchRepos()

      expect(repoStore.repos).toEqual([])
      expect(repoStore.error).toBe('Network error')
    })
  })

  describe('filters', () => {
    it('should set search query and reset page', () => {
      const repoStore = useRepoStore()
      repoStore.currentPage = 5

      repoStore.setSearch('test')

      expect(repoStore.searchQuery).toBe('test')
      expect(repoStore.currentPage).toBe(1)
    })

    it('should set visibility filter and reset page', () => {
      const repoStore = useRepoStore()
      repoStore.currentPage = 5

      repoStore.setVisibility('public')

      expect(repoStore.visibilityFilter).toBe('public')
      expect(repoStore.currentPage).toBe(1)
    })

    it('should set sort options and reset page', () => {
      const repoStore = useRepoStore()
      repoStore.currentPage = 5

      repoStore.setSort('stars')

      expect(repoStore.sortBy).toBe('stars')
      expect(repoStore.currentPage).toBe(1)
    })
  })

  describe('pagination', () => {
    it('should go to specific page', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepos.mockResolvedValue({
        data: mockRepos,
        pagination: { total: 10, page: 2, total_pages: 5 },
        links: {}
      })

      const repoStore = useRepoStore()
      repoStore.goToPage(2)

      expect(repoStore.currentPage).toBe(2)
    })

    it('should go to next page', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepos.mockResolvedValue({
        data: mockRepos,
        pagination: { total: 10, page: 2, total_pages: 5, has_next: true },
        links: {}
      })

      const repoStore = useRepoStore()
      repoStore.currentPage = 1
      repoStore.pagination = { has_next: true }

      await repoStore.nextPage()

      expect(repoStore.currentPage).toBe(2)
    })

    it('should go to previous page', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepos.mockResolvedValue({
        data: mockRepos,
        pagination: { total: 10, page: 1, total_pages: 5, has_prev: false },
        links: {}
      })

      const repoStore = useRepoStore()
      repoStore.currentPage = 2
      repoStore.pagination = { has_prev: true }

      await repoStore.prevPage()

      expect(repoStore.currentPage).toBe(1)
    })
  })
})
