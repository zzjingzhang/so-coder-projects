<template>
  <div class="h-full w-full">
    <RouterView />
    <ToastContainer />
    <Spin v-if="state.loading" :tip="'加载中...'" class="fixed inset-0 z-50 flex items-center justify-center" :spinning="state.loading">
      <div class="w-full h-full"></div>
    </Spin>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import ToastContainer from '@/components/ToastContainer.vue'
import { Spin } from 'ant-design-vue'

const { state } = useStore()
</script>
