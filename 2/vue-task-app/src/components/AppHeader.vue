<template>
  <v-app-bar color="primary" dark flat fixed>
    <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-2">
      <span class="font-bold">Vue Task App</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon variant="text">
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon variant="text">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>
