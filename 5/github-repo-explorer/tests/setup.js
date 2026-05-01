import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, vi } from 'vitest'

global.fetch = vi.fn()

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  sessionStorage.clear()
  vi.clearAllMocks()
})
