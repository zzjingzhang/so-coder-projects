<template>
  <v-app>
    <app-header @toggle-sidebar="drawer = !drawer" />
    <app-sidebar v-model="drawer" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

const drawer = ref(true)
</script>
