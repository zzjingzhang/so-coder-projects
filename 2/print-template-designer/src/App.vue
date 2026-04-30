<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title class="font-bold">打印模板设计器</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text" color="white">
        <v-icon left>mdi-draw</v-icon>
        设计器
      </v-btn>
      <v-btn to="/examples" variant="text" color="white">
        <v-icon left>mdi-file-document-outline</v-icon>
        示例
      </v-btn>
    </v-app-bar>
    <v-main class="bg-grey-100">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>

<style scoped></style>
