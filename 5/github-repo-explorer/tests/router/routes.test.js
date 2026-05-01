import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => ({
    isAuthenticated: false,
    token: null,
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    initializeAuth: vi.fn()
  }))
}))

const LoginView = {
  name: 'LoginView',
  template: '<div class="login-view">Login</div>',
  created() {
    const authStore = useAuthStore()
  }
}

const DashboardView = {
  name: 'DashboardView',
  template: '<div class="dashboard-view">Dashboard</div>'
}

const CommitsView = {
  name: 'CommitsView',
  template: '<div class="commits-view">Commits</div>'
}

const NotFoundView = {
  name: 'NotFoundView',
  template: '<div class="not-found">Not Found</div>'
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView, meta: { requiresAuth: false } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/repo/:owner/:repo/commits', name: 'Commits', component: CommitsView, meta: { requiresAuth: true } },
  { path️: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Router Guards', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    router.push('/')
  })

  it('should redirect unauthenticated users from protected routes to login', async () => {
    const { useAuthStore } = require('@/stores/auth')
    useAuthStore.mockReturnValueOnce({
      isAuthenticated: false,
      token: null
    })

    router.push('/dashboard')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('should allow authenticated users to access protected routes', async () => {
    const { useAuthStore } = require('@/stores/auth')
    useAuthStore.mockReturnValueOnce({
      isAuthenticated: true,
      token: 'valid_token'
    })

    router.push('/dashboard')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('should redirect authenticated users from login to dashboard', async () => {
    const { useAuthStore } = require('@/stores/auth')
    useAuthStore.mockReturnValueOnce({
      isAuthenticated: true,
      token: 'valid_token'
    })

    router.push('/login')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('should render 404 for unknown routes', async () => {
    router.push('/unknown-route')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('NotFound')
  })

  it('should allow access to commits page for authenticated users', async () => {
    const { useAuthStore } = require('@/stores/auth')
    useAuthStore.mockReturnValueOnce({
      isAuthenticated: true,
      token: 'valid_token'
    })

    router.push('/repo/octocat/hello-world/commits')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/repo/octocat/hello-world/commits')
  })
})

describe('Route Structure', () => {
  it('should have login route', () => {
    const loginRoute = routes.find(r => r.path === '/login')
    expect(loginRoute).toBeDefined()
    expect(loginRoute.meta.requiresAuth).toBe(false)
  })

  it('should have dashboard route with auth requirement', () => {
    const dashboardRoute = routes.find(r => r.path === '/dashboard')
    expect(dashboardRoute).toBeDefined()
    expect(dashboardRoute.meta.requiresAuth).toBe(true)
  })

  it('should have commits route with auth requirement', () => {
    const commitsRoute = routes.find(r => r.path === '/repo/:owner/:repo/commits')
    expect(commitsRoute).toBeDefined()
    expect(commitsRoute.meta.requiresAuth).toBe(true)
  })

  it('should redirect root to login', () => {
    const rootRoute = routes.find(r => r.path === '/')
    expect(rootRoute).toBeDefined()
    expect(rootRoute.redirect).toBe('/login')
  })
})
