<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const speed = ref(10);
const gravity = ref(10);
const direction = ref<"up" | "down" | "stop">("stop");
const weightPosition = ref(200);
const animationFrameId = ref<number | null>(null);
const containerHeight = ref(0);
const containerWidth = ref(0);

const displaySpeed = computed(() => (speed.value / 10).toFixed(1));

const forceArrowLength = computed(() => gravity.value * 2);

const moveWeight = () => {
  const speedFactor = speed.value * 0.5;
  if (direction.value === "up") {
    weightPosition.value = Math.max(80, weightPosition.value - speedFactor);
  } else if (direction.value === "down") {
    weightPosition.value = Math.min(
      containerHeight.value - 120,
      weightPosition.value + speedFactor,
    );
  }
  animationFrameId.value = requestAnimationFrame(moveWeight);
};

const startMoving = (dir: "up" | "down") => {
  if (direction.value !== dir) {
    direction.value = dir;
    if (animationFrameId.value === null) {
      animationFrameId.value = requestAnimationFrame(moveWeight);
    }
  }
};

const stopMoving = () => {
  direction.value = "stop";
  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }
};

const updateContainerSize = () => {
  const demoContainer = document.getElementById("demo-container");
  if (demoContainer) {
    containerHeight.value = demoContainer.clientHeight;
    containerWidth.value = demoContainer.clientWidth;
  }
};

onMounted(() => {
  updateContainerSize();
  window.addEventListener("resize", updateContainerSize);
});

onUnmounted(() => {
  stopMoving();
  window.removeEventListener("resize", updateContainerSize);
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-200 font-sans flex items-center justify-center p-4"
  >
    <div class="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
      <!-- 左侧控制面板 -->
      <div
        class="w-full lg:w-64 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6"
      >
        <h2 class="text-xl font-bold text-gray-800 text-center border-b pb-3">
          控制面板
        </h2>

        <!-- 运动控制按钮 -->
        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-semibold text-gray-700 mb-1">运动控制</h3>

          <v-btn
            color="green"
            size="large"
            class="h-16 text-white flex items-center justify-center"
            @click="startMoving('up')"
            :class="{ 'opacity-75': direction === 'up' }"
          >
            <span class="text-2xl">↑</span>
            <span class="ml-2">向上移动</span>
          </v-btn>

          <v-btn
            color="red"
            size="large"
            class="h-16 text-white flex items-center justify-center"
            @click="startMoving('down')"
            :class="{ 'opacity-75': direction === 'down' }"
          >
            <span class="text-2xl">↓</span>
            <span class="ml-2">向下移动</span>
          </v-btn>

          <v-btn
            color="grey-darken-2"
            size="large"
            class="h-16 flex items-center justify-center"
            @click="stopMoving"
            :class="{ 'opacity-75': direction === 'stop' }"
          >
            <span class="text-2xl">■</span>
            <span class="ml-2">停止</span>
          </v-btn>
        </div>

        <!-- 速度控制滑块 -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-semibold text-gray-700">运动速度</h3>
            <span class="text-sm font-bold text-blue-600"
              >{{ displaySpeed }} m/s</span
            >
          </div>
          <v-slider
            v-model="speed"
            min="1"
            max="20"
            step="1"
            color="blue"
            show-ticks
            tick-size="2"
          />
        </div>

        <!-- 重力控制滑块 -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-semibold text-gray-700">重力大小</h3>
            <span class="text-sm font-bold text-red-600">{{ gravity }} N</span>
          </div>
          <v-slider
            v-model="gravity"
            min="5"
            max="30"
            step="1"
            color="red"
            show-ticks
            tick-size="2"
          />
        </div>

        <!-- 状态显示 -->
        <div class="mt-auto bg-gray-50 rounded p-3 text-center">
          <h3 class="text-sm font-semibold text-gray-700 mb-1">当前状态</h3>
          <div
            class="text-lg font-bold"
            :class="{
              'text-green-600': direction === 'up',
              'text-red-600': direction === 'down',
              'text-gray-600': direction === 'stop',
            }"
          >
            {{
              direction === "up"
                ? "向上运动中"
                : direction === "down"
                  ? "向下运动中"
                  : "静止状态"
            }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            二力平衡状态下物体可以静止或匀速直线运动
          </div>
        </div>
      </div>

      <!-- 右侧演示区域 -->
      <div class="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <h2
          class="text-xl font-bold text-gray-800 text-center border-b pb-3 mb-4"
        >
          物理力学演示 - 二力平衡与运动状态
        </h2>

        <!-- 演示容器 -->
        <div
          id="demo-container"
          class="flex-1 relative bg-white border-4 border-gray-800 rounded-lg overflow-hidden min-h-[500px]"
        >
          <!-- 顶部电动机 -->
          <div
            class="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <div
              class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-900"
            >
              <div
                class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
              >
                <span class="text-xs font-bold text-gray-900">M</span>
              </div>
            </div>
            <div class="text-xs text-gray-600 mt-1 font-semibold">电动机</div>
          </div>

          <!-- 绳索 -->
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-700"
            :style="{
              top: '80px',
              height: weightPosition - 80 + 'px',
            }"
          ></div>

          <!-- 重物容器 -->
          <div
            class="absolute left-1/2 transform -translate-x-1/2"
            :style="{
              top: weightPosition + 'px',
            }"
          >
            <!-- 向上的拉力 F (红色) -->
            <div
              class="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              :style="{ bottom: '60px' }"
            >
              <div
                class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-red-500"
              ></div>
              <div
                class="w-1 bg-red-500"
                :style="{ height: forceArrowLength + 'px' }"
              ></div>
              <div
                class="absolute -right-16 top-0 text-xs font-bold text-red-600 whitespace-nowrap"
              >
                F = {{ gravity }} N
              </div>
            </div>

            <!-- 圆形重物 -->
            <div
              class="w-20 h-20 bg-blue-500 rounded-full border-4 border-blue-700 flex items-center justify-center shadow-lg relative"
            >
              <span class="text-white font-bold text-sm">重物</span>
            </div>

            <!-- 向下的重力 G (蓝色) -->
            <div
              class="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              :style="{ top: '80px' }"
            >
              <div
                class="w-1 bg-blue-500"
                :style="{ height: forceArrowLength + 'px' }"
              ></div>
              <div
                class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-blue-500"
              ></div>
              <div
                class="absolute -right-16 bottom-0 text-xs font-bold text-blue-600 whitespace-nowrap"
              >
                G = {{ gravity }} N
              </div>
            </div>
          </div>

          <!-- 说明文字 -->
          <div
            class="absolute bottom-4 left-4 right-4 bg-gray-100 rounded-lg p-3"
          >
            <h3 class="text-sm font-bold text-gray-700 mb-1">二力平衡原理：</h3>
            <p class="text-xs text-gray-600">
              当物体受到的拉力 F 和重力 G
              大小相等、方向相反时，物体处于平衡状态。
              <span class="font-semibold"
                >此时物体可以保持静止，也可以做匀速直线运动。</span
              >
            </p>
            <div class="flex gap-4 mt-2 text-xs">
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 bg-red-500"></span>
                <span class="text-red-600 font-semibold">F：拉力 (向上)</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 bg-blue-500"></span>
                <span class="text-blue-600 font-semibold">G：重力 (向下)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-btn {
  text-transform: none !important;
}

.v-slider__track {
  height: 6px !important;
}
</style>
