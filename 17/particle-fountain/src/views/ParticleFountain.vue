<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const gravity = ref(9.8);
const emissionRate = ref(5);
const isRunning = ref(true);
const particleCount = ref(0);

let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number | null = null;
let particles: Particle[] = [];
let lastTime: number = 0;
let emissionAccumulator: number = 0;

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
];

const gravityDisplay = computed(() => gravity.value.toFixed(1));
const emissionRateDisplay = computed(() => emissionRate.value.toFixed(0));

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  const angle = -Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 4;
  const speed = 150 + Math.random() * 100;
  const startX = canvasWidth / 2;
  const startY = canvasHeight - 50;

  return {
    x: startX,
    y: startY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    maxLife: 3 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 3 + Math.random() * 4,
  };
}

function updateParticles(
  deltaTime: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  if (isRunning.value) {
    emissionAccumulator += emissionRate.value * deltaTime;
    while (emissionAccumulator >= 1) {
      particles.push(createParticle(canvasWidth, canvasHeight));
      emissionAccumulator -= 1;
    }
  }

  const g = gravity.value * 50;

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.vy += g * deltaTime;

    p.x += p.vx * deltaTime;
    p.y += p.vy * deltaTime;

    p.life -= deltaTime / p.maxLife;

    if (
      p.life <= 0 ||
      p.y > canvasHeight + 50 ||
      p.x < -50 ||
      p.x > canvasWidth + 50
    ) {
      particles.splice(i, 1);
    }
  }

  particleCount.value = particles.length;
}

function renderParticles(canvasWidth: number, canvasHeight: number) {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "rgba(15, 23, 42, 1)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.beginPath();
  ctx.arc(canvasWidth / 2, canvasHeight - 50, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#475569";
  ctx.fill();
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2 - 20, canvasHeight - 35);
  ctx.lineTo(canvasWidth / 2 + 20, canvasHeight - 35);
  ctx.lineTo(canvasWidth / 2 + 30, canvasHeight);
  ctx.lineTo(canvasWidth / 2 - 30, canvasHeight);
  ctx.closePath();
  ctx.fillStyle = "#334155";
  ctx.fill();
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.stroke();

  for (const p of particles) {
    const alpha = Math.max(0, p.life);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
    gradient.addColorStop(0, p.color);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.restore();
  }

  if (!isRunning.value && particles.length > 0) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("已暂停", canvasWidth / 2, 40);
  }
}

function animate(currentTime: number) {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) {
    animationFrameId = requestAnimationFrame(animate);
    return;
  }

  const deltaTime = lastTime ? (currentTime - lastTime) / 1000 : 0.016;
  lastTime = currentTime;

  const maxDelta = 0.05;
  const clampedDelta = Math.min(deltaTime, maxDelta);

  updateParticles(clampedDelta, canvas.width, canvas.height);
  renderParticles(canvas.width, canvas.height);

  animationFrameId = requestAnimationFrame(animate);
}

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const container = canvas.parentElement;
  if (container) {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
}

function toggleSimulation() {
  console.log("toggleSimulation called, isRunning before:", isRunning.value);
  isRunning.value = !isRunning.value;
  console.log("isRunning after:", isRunning.value);
}

function resetSimulation() {
  console.log("resetSimulation called, particles count:", particles.length);
  isRunning.value = false;
  gravity.value = 9.8;
  emissionRate.value = 5;
  particles = [];
  emissionAccumulator = 0;
  particleCount.value = 0;
  console.log(
    "reset complete: isRunning=false, gravity=9.8, emissionRate=5, particleCount=0",
  );
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId = requestAnimationFrame(animate);
  }
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex flex-col">
    <header class="bg-slate-800 shadow-lg border-b border-slate-700">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white">粒子喷泉模拟器</h1>
        </div>
        <p class="text-center text-slate-400 mt-2 text-sm">
          基于物理的粒子动画模拟
        </p>
      </div>
    </header>

    <main class="flex-1 flex flex-col lg:flex-row p-4 gap-4">
      <div
        class="flex-1 bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-700"
        style="min-height: 400px"
      >
        <canvas ref="canvasRef" class="w-full h-full block"></canvas>
      </div>

      <div class="lg:w-80 flex flex-col gap-4">
        <div
          class="bg-slate-800 rounded-xl p-5 shadow-xl border border-slate-700"
        >
          <h2
            class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
            模拟控制
          </h2>

          <div class="space-y-6">
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-slate-300 text-sm font-medium">重力</label>
                <span
                  class="text-cyan-400 font-mono text-sm bg-slate-900 px-2 py-1 rounded"
                  >{{ gravityDisplay }} m/s²</span
                >
              </div>
              <a-slider
                v-model:value="gravity"
                :min="0"
                :max="20"
                :step="0.1"
                :tooltip-open="false"
                class="custom-slider"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>失重</span>
                <span>地球 (9.8)</span>
                <span>超强</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-slate-300 text-sm font-medium">发射率</label>
                <span
                  class="text-cyan-400 font-mono text-sm bg-slate-900 px-2 py-1 rounded"
                  >{{ emissionRateDisplay }} 粒子/秒</span
                >
              </div>
              <a-slider
                v-model:value="emissionRate"
                :min="1"
                :max="30"
                :step="1"
                :tooltip-open="false"
                class="custom-slider"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>稀疏</span>
                <span>中等</span>
                <span>密集</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-slate-800 rounded-xl p-5 shadow-xl border border-slate-700"
        >
          <h2
            class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            操作按钮
          </h2>

          <div class="grid grid-cols-2 gap-3">
            <a-button
              :type="isRunning ? 'default' : 'primary'"
              @click="toggleSimulation"
              class="h-12 font-medium"
              :class="
                isRunning
                  ? 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 text-white'
              "
            >
              <span class="flex items-center justify-center gap-2">
                <span v-if="isRunning">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                  </svg>
                </span>
                <span v-else>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </span>
                {{ isRunning ? "暂停" : "开始" }}
              </span>
            </a-button>

            <a-button
              @click="resetSimulation"
              class="h-12 font-medium bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
            >
              <span class="flex items-center justify-center gap-2">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
                重置
              </span>
            </a-button>
          </div>
        </div>

        <div
          class="bg-slate-800 rounded-xl p-5 shadow-xl border border-slate-700"
        >
          <h2
            class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            实时状态
          </h2>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <span class="text-slate-400 text-sm">活动粒子数</span>
              <span class="text-2xl font-bold text-cyan-400 font-mono">{{
                particleCount
              }}</span>
            </div>
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-slate-400 text-sm">模拟状态</span>
              <span
                :class="isRunning ? 'text-green-400' : 'text-amber-400'"
                class="text-sm font-medium flex items-center gap-1"
              >
                <span
                  :class="isRunning ? 'bg-green-400' : 'bg-amber-400'"
                  class="w-2 h-2 rounded-full animate-pulse"
                ></span>
                {{ isRunning ? "运行中" : "已暂停" }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="bg-slate-800 rounded-xl p-5 shadow-xl border border-slate-700"
        >
          <h2
            class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            物理说明
          </h2>
          <ul class="text-sm text-slate-400 space-y-2">
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">•</span>
              <span>粒子遵循真实的物理运动轨迹</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">•</span>
              <span>重力影响粒子的垂直加速度</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">•</span>
              <span>发射率控制每秒产生的粒子数量</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">•</span>
              <span>粒子具有生命周期，会逐渐淡出消失</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-slider :deep(.ant-slider-rail) {
  background-color: #334155;
}

.custom-slider :deep(.ant-slider-track) {
  background: linear-gradient(to right, #06b6d4, #3b82f6);
}

.custom-slider :deep(.ant-slider-handle::after) {
  box-shadow: 0 0 0 2px #06b6d4;
}

.custom-slider :deep(.ant-slider-handle:hover::after) {
  box-shadow: 0 0 0 2px #22d3ee;
}

.custom-slider :deep(.ant-slider-dot-active) {
  border-color: #06b6d4;
}
</style>
