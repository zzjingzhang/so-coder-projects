import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCommitsStore } from '@/stores/commits'

const mockBranches = [
  { name: 'main', commit: { sha: 'abc123' } },
  { name: 'develop', commit: { sha: 'def456' } }
]

const mockCommits = [
  {
    sha: 'commit1',
    commit: {
      message: 'First commit',
      author: {
        name: 'Test User',
        email: 'test@example.com',
        date: '2024-03-15T10:00:00Z'
      }
    },
    author: {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.png',
      html_url: 'https://github.com/testuser'
    },
    html_url: 'https://github.com/octocat/test/commit/commit1'
  },
  {
    sha: 'commit2',
    commit: {
      message: 'Second commit',
      author: {
        name: 'Test User',
        email: 'test@example.com',
        date: '2024-03-14T10:00:00Z'
      }
    },
    author: {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.png',
      html_url: 'https://github.com/testuser'
    },
    html_url: 'https://github.com/octocat/test/commit/commit2'
  }
]

vi.mock('@/api/github', () => ({
  githubApi: {
    getRepoBranches: vi.fn(),
    getCommits: vi.fn()
  }
}))

describe('Commits Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have empty commits initially', () => {
      const commitsStore = useCommitsStore()
      expect(commitsStore.commits).toEqual([])
    })

    it('should have empty branches initially', () => {
      const commitsStore = useCommitsStore()
      expect(commitsStore.branches).toEqual([])
    })

    it('should have default branch as main', () => {
      const commitsStore = useCommitsStore()
      expect(commitsStore.currentBranch).toBe('main')
    })

    it('should not be loading initially', () => {
      const commitsStore = useCommitsStore()
      expect(commitsStore.loading).toBe(false)
    })
  })

  describe('fetchBranches', () => {
    it('should fetch branches successfully', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepoBranches.mockResolvedValue({ data: mockBranches })

      const commitsStore = useCommitsStore()
      await commitsStore.fetchBranches('octocat', 'test-repo')

      expect(commitsStore.branches).toEqual(mockBranches)
      expect(commitsStore.currentOwner).toBe('octocat')
      expect(commitsStore.currentRepo).toBe('test-repo')
    })

    it('should set first branch as current if main exists', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getRepoBranches.mockResolvedValue({ data: mockBranches })

      const commitsStore = useCommitsStore()
      await commitsStore.fetchBranches('octocat', 'test-repo')

      expect(commitsStore.currentBranch).toBe('main')
    })
  })

  describe('fetchCommits', () => {
    it('should fetch commits successfully', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getCommits.mockResolvedValue({
        data: mockCommits,
        pagination: { total: 2, page: 1, total_pages: 1 },
        links: {}
      })

      const commitsStore = useCommitsStore()
      commitsStore.currentOwner = 'octocat'
      commitsStore.currentRepo = 'test-repo'

      await commitsStore.fetchCommits()

      expect(commitsStore.commits).toEqual(mockCommits)
      expect(commitsStore.loading).toBe(false)
    })

    it('should set error on failed fetch', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getCommits.mockRejectedValue(new Error('Failed to fetch'))

      const commitsStore = useCommitsStore()
      commitsStore.currentOwner = 'octocat'
      commitsStore.currentRepo = 'test-repo'

      await commitsStore.fetchCommits()

      expect(commitsStore.commits).toEqual([])
      expect(commitsStore.error).toBe('Failed to fetch')
    })
  })

  describe('setBranch', () => {
    it('should set branch and reset page', async () => {
      const { githubApi } = require('@/api/github')
      githubApi.getCommits.mockResolvedValue({
        data: mockCommits,
        pagination: {},
        links: {}
      })

      const commitsStore = useCommitsStore()
      commitsStore.currentPage = 5

      commitsStore.setBranch('develop')

      expect(commitsStore.currentBranch).toBe('develop')
      expect(commitsStore.currentPage).toBe(1)
    })
  })

  describe('groupCommitsByDate', () => {
    it('should group commits by date', () => {
      const commitsStore = useCommitsStore()
      commitsStore.commits = mockCommits

      const grouped = commitsStore.groupCommitsByDate()

      expect(Object.keys(grouped).length).toBe(2)
    })
  })
})
