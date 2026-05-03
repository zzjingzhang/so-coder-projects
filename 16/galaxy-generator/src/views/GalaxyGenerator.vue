<template>
  <div class="relative w-full h-full overflow-hidden">
    <GalaxyRenderer
      :scale="scale"
      :density="density"
      :colorScheme="colorScheme"
      :rotationSpeed="rotationSpeed"
    />

    <ControlPanel
      v-model:scale="scale"
      v-model:density="density"
      v-model:colorScheme="colorScheme"
      v-model:rotationSpeed="rotationSpeed"
    />

    <div class="absolute bottom-6 left-6 text-white">
      <h1 class="text-3xl font-bold mb-2 drop-shadow-lg">
        <span class="text-purple-400">程序化</span> 星系生成器
      </h1>
      <p class="text-slate-300 text-sm drop-shadow-md max-w-md">
        实时生成壮观的螺旋星系，支持自定义规模、密度和颜色方案
      </p>
    </div>

    <div
      class="absolute bottom-6 right-6 flex items-center gap-2 text-white/60 text-xs"
    >
      <v-icon icon="mdi-gesture-swipe" class="text-base"></v-icon>
      <span>拖动鼠标旋转视角 | 滚轮缩放</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GalaxyRenderer from "../components/GalaxyRenderer.vue";
import ControlPanel from "../components/ControlPanel.vue";

const scale = ref(50);
const density = ref(10000);
const colorScheme = ref("cosmic");
const rotationSpeed = ref(0.5);
</script>

<style scoped></style>
