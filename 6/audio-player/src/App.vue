<template>
  <div class="min-h-screen bg-slate-900">
    <n-config-provider :theme="darkTheme">
      <n-global-style />
      <router-view />
    </n-config-provider>
  </div>
</template>

<script setup>
import { darkTheme } from 'naive-ui'
</script>
