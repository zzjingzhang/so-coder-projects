<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="font-weight-bold">
      <v-icon icon="mdi-table" class="mr-2"></v-icon>
      表格虚拟滚动演示
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn-toggle v-model="currentRoute" mandatory variant="outlined" divided>
        <v-btn value="home" to="/" class="text-white">
          <v-icon icon="mdi-home" class="mr-1"></v-icon>
          首页
        </v-btn>
        <v-btn value="demo" to="/demo" class="text-white">
          <v-icon icon="mdi-presentation" class="mr-1"></v-icon>
          演示
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-app-bar>

  <v-main class="bg-grey-lighten-4">
    <v-container fluid class="pa-6">
      <router-view />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.name as string)
</script>

<style scoped>
:deep(.v-btn-toggle) {
  border-color: rgba(255, 255, 255, 0.5);
}

:deep(.v-btn--variant-outlined) {
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
