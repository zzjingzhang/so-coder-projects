import { describe, it, expect, beforeEach, vi } from 'vitest'
import { githubApi } from '@/api/github'

describe('GitHub API Mock', () => {
  beforeEach(() => {
    githubApi.clearToken()
  })

  describe('initialization', () => {
    it('should have no token initially', () => {
      expect(githubApi.token).toBeNull()
    })
  })

  describe('setToken', () => {
    it('should set token', () => {
      githubApi.setToken('test_token')
      expect(githubApi.token).toBe('test_token')
    })

    it('should check token existence', () => {
      expect(githubApi.checkToken()).toBe(false)
      githubApi.setToken('test_token')
      expect(githubApi.checkToken()).toBe(true)
    })
  })

  describe('clearToken', () => {
    it('should clear token', () => {
      githubApi.setToken('test_token')
      githubApi.clearToken()
      expect(githubApi.token).toBeNull()
    })
  })

  describe('getUser', () => {
    it('should throw error when not authenticated', async () => {
      await expect(githubApi.getUser()).rejects.toThrow('Unauthorized')
    })

    it('should return user data when authenticated', async () => {
      githubApi.setToken('valid_token')
      const user = await githubApi.getUser()
      expect(user).toHaveProperty('login')
      expect(user).toHaveProperty('avatar_url')
    })
  })

  describe('getRepos', () => {
    it('should throw error when not authenticated', async () => {
      await expect(githubApi.getRepos()).rejects.toThrow('Unauthorized')
    })

    it('should return repos with pagination when authenticated', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getRepos({ page: 1, per_page: 12 })

      expect(response).toHaveProperty('data')
      expect(response).toHaveProperty('pagination')
      expect(response).toHaveProperty('links')
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should filter repos by visibility', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getRepos({ visibility: 'public' })

      response.data.forEach(repo => {
        if (repo.visibility) {
          expect(repo.visibility).toBe('public')
        }
      })
    })

    it('should filter repos by search query', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getRepos({ search: 'hello' })

      response.data.forEach(repo => {
        const matchesSearch = repo.name.toLowerCase().includes('hello') ||
          repo.description?.toLowerCase().includes('hello')
        expect(matchesSearch).toBe(true)
      })
    })

    it('should sort repos by stars', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getRepos({ sort: 'stars' })

      const repos = response.data
      for (let i = 0; i < repos.length - 1; i++) {
        expect(repos[i].stargazers_count).toBeGreaterThanOrEqual(repos[i + 1].stargazers_count)
      }
    })
  })

  describe('getRepoBranches', () => {
    it('should throw error when not authenticated', async () => {
      await expect(githubApi.getRepoBranches('owner', 'repo')).rejects.toThrow('Unauthorized')
    })

    it('should return branches when authenticated', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getRepoBranches('octocat', 'hello-world')

      expect(response).toHaveProperty('data')
      expect(Array.isArray(response.data)).toBe(true)
      response.data.forEach(branch => {
        expect(branch).toHaveProperty('name')
        expect(branch).toHaveProperty('commit')
      })
    })
  })

  describe('getCommits', () => {
    it('should throw error when not authenticated', async () => {
      await expect(githubApi.getCommits('owner', 'repo')).rejects.toThrow('Unauthorized')
    })

    it('should return commits with pagination when authenticated', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getCommits('octocat', 'hello-world', { page: 1 })

      expect(response).toHaveProperty('data')
      expect(response).toHaveProperty('pagination')
      expect(response).toHaveProperty('links')
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should return commits for specific branch', async () => {
      githubApi.setToken('valid_token')
      const response = await githubApi.getCommits('octocat', 'hello-world', {
        branch: 'main',
        page: 1
      })

      expect(response.data.length).toBeGreaterThan(0)
    })
  })
})
