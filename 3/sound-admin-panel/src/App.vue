<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useCategoriesStore } from '@/stores/categories'
import { useSoundsStore } from '@/stores/sounds'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const soundsStore = useSoundsStore()

onMounted(async () => {
  themeStore.initTheme()
  await authStore.checkAuthStatus()
  
  if (authStore.isAuthenticated) {
    await Promise.all([
      categoriesStore.fetchCategories(),
      soundsStore.fetchSounds()
    ])
  }
})
</script>

<template>
  <div id="app" class="h-full">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
