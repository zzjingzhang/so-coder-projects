import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/api/github', () => ({
  githubApi: {
    getRepoBranches: vi.fn().mockResolvedValue({
      data: [
        { name: 'main', commit: { sha: 'abc123' } },
        { name: 'develop', commit: { sha: 'def456' } }
      ]
    }),
    getCommits: vi.fn().mockResolvedValue({
      data: [
        { sha: 'commit1', commit: { message: 'Test commit' } }
      ]
    })
  }
}))

import RepoCard from '@/components/RepoCard.vue'

const mockRepo = {
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

describe('RepoCard Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render repo name', () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    expect(wrapper.text()).toContain('test-repo')
  })

  it('should render repo description', () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    expect(wrapper.text()).toContain('A test repository')
  })

  it('should render language', () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    expect(wrapper.text()).toContain('JavaScript')
  })

  it('should render star count', () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    expect(wrapper.text()).toContain('100')
  })

  it('should render visibility tag', () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    expect(wrapper.text()).toContain('public')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should prefetch data on mouse enter', async () => {
    const wrapper = mount(RepoCard, {
      props: { repo: mockRepo }
    })

    await wrapper.trigger('mouseenter')

    expect(wrapper.vm.isHovered).toBe(true)
  })

  it('should format large numbers correctly', () => {
    const repoWithLargeNumbers = {
      ...mockRepo,
      stargazers_count: 1500,
      forks_count: 2000
    }

    const wrapper = mount(RepoCard, {
      props: { repo: repoWithLargeNumbers }
    })

    expect(wrapper.text()).toContain('1.5k')
    expect(wrapper.text()).toContain('2.0k')
  })
})
