<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title class="text-white font-bold">
        🎮 推箱子游戏
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        prepend-icon="mdi-home"
        @click="$router.push('/')"
        class="text-white"
      >
        首页
      </v-btn>
      <v-btn
        variant="text"
        prepend-icon="mdi-gamepad-variant"
        @click="$router.push('/game')"
        class="text-white"
      >
        开始游戏
      </v-btn>
      <v-btn
        variant="text"
        prepend-icon="mdi-pencil"
        @click="$router.push('/editor')"
        class="text-white"
      >
        创建关卡
      </v-btn>
    </v-app-bar>
    <v-main class="p-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
