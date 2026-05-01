import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import CommitCard from '@/components/CommitCard.vue'

const mockCommit = {
  sha: 'abc123def456',
  commit: {
    message: 'Test commit message',
    author: {
      name: 'Test User',
      email: 'test@example.com',
      date: new Date().toISOString()
    }
  },
  author: {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.png',
    html_url: 'https://github.com/testuser'
  },
  html_url: 'https://github.com/octocat/test/commit/abc123def456'
}

describe('CommitCard Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render commit message', () => {
    const wrapper = mount(CommitCard, {
      props: { commit: mockCommit }
    })

    expect(wrapper.text()).toContain('Test commit message')
  })

  it('should render author login', () => {
    const wrapper = mount(CommitCard, {
      props: { commit: mockCommit }
    })

    expect(wrapper.text()).toContain('testuser')
  })

  it('should render short SHA', () => {
    const wrapper = mount(CommitCard, {
      props: { commit: mockCommit }
    })

    expect(wrapper.text()).toContain('abc123d')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(CommitCard, {
      props: { commit: mockCommit }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should render author avatar', () => {
    const wrapper = mount(CommitCard, {
      props: { commit: mockCommit }
    })

    const avatar = wrapper.find('img')
    expect(avatar.exists()).toBe(true)
    expect(avatar.attributes('src')).toBe('https://example.com/avatar.png')
  })
})
