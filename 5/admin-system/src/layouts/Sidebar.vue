<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="(val) => emit('update:drawer', val)"
    :rail="rail"
    @update:rail="(val) => emit('update:rail', val)"
    :rail-width="64"
    app
  >
    <v-list density="compact">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="handleMenuClick(item)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  drawer: {
    type: Boolean,
    default: true
  },
  rail: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:drawer', 'update:rail'])

const router = useRouter()

const menuItems = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' }
])

const handleMenuClick = (item) => {
  if (item.to) {
    router.push(item.to)
  }
}
</script>

<style scoped>
</style>