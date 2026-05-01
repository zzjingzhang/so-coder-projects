<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-bold text-xl">体育联赛积分榜</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app color="grey lighten-2">
      <v-spacer></v-spacer>
      <span class="text-grey-darken-2">© 2024 体育联赛积分榜</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script setup>
</script>

<style>
</style>
