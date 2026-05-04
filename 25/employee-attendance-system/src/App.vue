<script setup>
import { NMessageProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
</script>

<template>
  <NMessageProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <RouterView />
      </NNotificationProvider>
    </NDialogProvider>
  </NMessageProvider>
</template>
