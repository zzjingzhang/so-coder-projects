<template>
  <v-breadcrumbs class="mb-4" :items="items"></v-breadcrumbs>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const items = ref([])

const updateBreadcrumbs = () => {
  const matched = route.matched.filter(record => record.meta && record.meta.title)
  items.value = matched.map(record => ({
    title: record.meta.title,
    disabled: record.path === route.path
  }))
}

watch(() => route.path, updateBreadcrumbs, { immediate: true })
</script>

<style scoped>
</style>