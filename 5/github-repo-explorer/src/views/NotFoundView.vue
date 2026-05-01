<template>
  <div class="not-found-view min-h-screen bg-gray-900 flex items-center justify-center">
    <n-result status="404" title="Page Not Found" description="The page you are looking for does not exist.">
      <template #footer>
        <n-button @click="goHome">Go Home</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
