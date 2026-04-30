<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="grey-lighten-4"
    :width="256"
    :rail="rail"
    permanent
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      :title="rail ? '' : 'Vue Task App'"
      :subtitle="rail ? '' : '任务管理系统'"
      nav
    ></v-list-item>

    <v-divider></v-divider>

    <v-list nav density="comfortable">
      <v-list-group
        v-model="group"
        prepend-icon="mdi-view-dashboard"
        title="导航"
        :value="'navigation'"
      >
        <v-list-item
          v-for="route in navRoutes"
          :key="route.path"
          :to="route.path"
          :prepend-icon="route.meta?.icon as string"
          :title="route.meta?.title as string"
          link
        >
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-spacer></v-spacer>

    <v-divider></v-divider>

    <v-list nav density="comfortable">
      <v-list-item
        prepend-icon="mdi-cog"
        title="设置"
        link
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-help-circle"
        title="帮助"
        link
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '@/router'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const drawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const rail = ref(false)
const group = ref(['navigation'])

const navRoutes = router.options.routes.filter(
  (route) => route.meta && route.meta.title && route.path !== '/'
)
</script>
