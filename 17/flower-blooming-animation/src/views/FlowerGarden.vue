<script setup lang="ts">
import { ref, onMounted } from "vue";
import RoseFlower from "../components/RoseFlower.vue";
import Sunflower from "../components/Sunflower.vue";
import TulipFlower from "../components/TulipFlower.vue";
import LotusFlower from "../components/LotusFlower.vue";

const flowers = ref([
  { id: 1, type: "rose", delay: 0 },
  { id: 2, type: "sunflower", delay: 2000 },
  { id: 3, type: "tulip", delay: 4000 },
  { id: 4, type: "lotus", delay: 6000 },
]);

const isPlaying = ref(true);
const speed = ref(1);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

const restartAnimation = () => {
  isPlaying.value = false;
  setTimeout(() => {
    isPlaying.value = true;
  }, 100);
};

const getFlowerComponent = (type: string) => {
  switch (type) {
    case "rose":
      return RoseFlower;
    case "sunflower":
      return Sunflower;
    case "tulip":
      return TulipFlower;
    case "lotus":
      return LotusFlower;
    default:
      return RoseFlower;
  }
};

const getFlowerName = (type: string) => {
  switch (type) {
    case "rose":
      return "玫瑰";
    case "sunflower":
      return "向日葵";
    case "tulip":
      return "郁金香";
    case "lotus":
      return "莲花";
    default:
      return "花朵";
  }
};
</script>

<template>
  <div
    class="flower-garden min-h-screen bg-gradient-to-b from-pink-50 via-blue-50 to-green-50"
  >
    <!-- 标题区域 -->
    <div class="text-center py-8 px-4">
      <h1
        class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4"
      >
        🌺 花朵盛开动画
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        观赏四种不同花朵的盛开过程，体验花瓣展开、雄蕊显露和颜色变化的美丽动画
      </p>
    </div>

    <!-- 控制按钮 -->
    <div class="flex justify-center items-center gap-6 mb-8 px-4">
      <v-btn
        color="primary"
        size="large"
        class="px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mx-2"
        @click="togglePlay"
      >
        <v-icon class="mr-2">
          {{ isPlaying ? "mdi-pause" : "mdi-play" }}
        </v-icon>
        <span>{{ isPlaying ? "暂停" : "播放" }}</span>
      </v-btn>
      <v-btn
        color="secondary"
        size="large"
        class="px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mx-2"
        @click="restartAnimation"
      >
        <v-icon class="mr-2"> mdi-refresh </v-icon>
        <span>重新开始</span>
      </v-btn>
    </div>

    <!-- 花朵展示区域 -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-12 pb-12"
    >
      <div
        v-for="flower in flowers"
        :key="flower.id"
        class="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
      >
        <div class="text-center mb-4">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">
            {{ getFlowerName(flower.type) }}
          </h3>
          <p class="text-sm text-gray-500">
            延时 {{ flower.delay / 1000 }} 秒后开始
          </p>
        </div>

        <div
          class="flower-container w-64 h-64 flex items-center justify-center"
        >
          <component
            :is="getFlowerComponent(flower.type)"
            :is-playing="isPlaying"
            :delay="flower.delay"
            :speed="speed"
          />
        </div>
      </div>
    </div>

    <!-- 底部说明 -->
    <div class="text-center py-6 px-4 bg-white/50">
      <p class="text-gray-600">
        动画包括：花瓣展开、雄蕊显露、颜色过渡、呼吸效果
      </p>
    </div>
  </div>
</template>

<style scoped>
.flower-garden {
  overflow-x: hidden;
}

.flower-container {
  position: relative;
}
</style>
