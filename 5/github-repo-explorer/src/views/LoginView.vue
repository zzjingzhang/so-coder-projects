<template>
  <div class="login-view min-h-screen bg-gray-900 flex items-center justify-center">
    <n-card class="login-card max-w-md w-full" title="GitHub Repo Explorer">
      <template #header-extra>
        <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </template>

      <div class="login-content text-center">
        <p class="text-gray-400 mb-8">
          Sign in with GitHub to explore your repositories, view commits, and more.
        </p>

        <n-button
          type="primary"
          size="large"
          block
          @click="handleMockLogin"
          :loading="authStore.loading"
        >
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </template>
          Sign in with GitHub (Mock)
        </n-button>

        <n-alert v-if="authStore.error" type="error" class="mt-4">
          {{ authStore.error }}
        </n-alert>
      </div>

      <template #footer>
        <div class="text-center text-gray-500 text-sm">
          This is a demo mode. Click the button above to simulate login.
        </div>
      </template>
    </n-card>

    <FullscreenProgress v-if="authStore.loading" />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NButton, NAlert } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import FullscreenProgress from '@/components/FullscreenProgress.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleMockLogin = () => {
  authStore.mockLogin()
}

watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
.login-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-view {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
</style>
