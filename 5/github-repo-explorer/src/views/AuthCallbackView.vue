<template>
  <div class="auth-callback-view min-h-screen bg-gray-900 flex items-center justify-center">
    <n-card class="callback-card max-w-md w-full">
      <div class="text-center">
        <n-spin size="large" class="mb-4" />
        <h2 class="text-xl font-semibold text-gray-200 mb-2">Authenticating...</h2>
        <p class="text-gray-400">Please wait while we complete the sign-in process.</p>

        <n-alert v-if="error" type="error" class="mt-4">
          {{ error }}
        </n-alert>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NCard, NSpin, NAlert } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const error = ref(null)

onMounted(async () => {
  const code = route.query.code
  const state = route.query.state
  const savedState = sessionStorage.getItem('github_oauth_state')

  if (!code) {
    error.value = 'No authorization code received'
    setTimeout(() => router.push('/login'), 2000)
    return
  }

  if (state && savedState && state !== savedState) {
    error.value = 'State mismatch - possible CSRF attack'
    setTimeout(() => router.push('/login'), 2000)
    return
  }

  const success = await authStore.handleCallback(code)

  if (success) {
    sessionStorage.removeItem('github_oauth_state')
    router.push('/dashboard')
  } else {
    error.value = authStore.error || 'Authentication failed'
    setTimeout(() => router.push('/login'), 2000)
  }
})
</script>

<style scoped>
.callback-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-callback-view {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
</style>
