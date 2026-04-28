<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>健身追踪</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="white"
    >
      <v-list>
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          link
          @click="drawer = false"
        >
          <v-list-item-icon>
            <v-icon>{{ route.meta?.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ route.meta?.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { routes } from './router';

const drawer = ref(true);
</script>
