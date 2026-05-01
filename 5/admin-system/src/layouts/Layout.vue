<template>
  <v-app>
    <Sidebar
      :drawer="drawer"
      :rail="rail"
      @update:drawer="val => drawer = val"
      @update:rail="val => rail = val"
    />
    <Header
      :user-name="userStore.userName"
      :avatar="userStore.avatar"
      @toggle-drawer="toggleDrawer"
    />
    
    <v-main>
      <v-container fluid class="pt-6">
        <Breadcrumb />
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Breadcrumb from './Breadcrumb.vue'

const userStore = useUserStore()
const drawer = ref(true)
const rail = ref(false)

const toggleDrawer = () => {
  if (drawer.value) {
    drawer.value = false
    rail.value = false
  } else {
    drawer.value = true
    rail.value = false
  }
}
</script>

<style scoped>
</style>