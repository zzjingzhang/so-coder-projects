<template>
  <div class="min-h-screen flex items-center justify-center p-4" :style="{ backgroundColor: 'var(--bg-color)' }">
    <Result
      status="404"
      title="404"
      sub-title="抱歉，您访问的页面不存在"
      :extra="extraSlot"
    >
      <template #extra>
        <Button type="primary" @click="goHome">
          <HomeOutlined class="mr-2" />
          返回首页
        </Button>
      </template>
    </Result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button, Result } from 'ant-design-vue'
import { HomeOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
