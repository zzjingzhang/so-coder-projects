<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isPlaying = ref(false)
const animationFrame = ref<number>()
const particles = ref<any[]>([])
const currentTime = ref(0)

interface Particle {
  id: number
  type: 'H2' | 'O2' | 'H+' | 'e-' | 'H2O'
  x: number
  y: number
  phase: number
  speed: number
  opacity: number
}

const meterAngle = computed(() => {
  if (!isPlaying.value) return -90
  return -90 + Math.sin(currentTime.value * 0.05) * 10 + 60
})

const generateParticle = (type: Particle['type'], startX: number, startY: number): Particle => {
  return {
    id: Date.now() + Math.random(),
    type,
    x: startX,
    y: startY,
    phase: 0,
    speed: 0.5 + Math.random() * 0.5,
    opacity: 1
  }
}

const updateParticles = () => {
  const newParticles: Particle[] = []

  // 定期生成新粒子
  if (Math.random() < 0.03) {
    newParticles.push(generateParticle('H2', 30, 200 + Math.random() * 100))
  }
  if (Math.random() < 0.02) {
    newParticles.push(generateParticle('O2', 970, 200 + Math.random() * 100))
  }

  // 更新现有粒子
  particles.value = [...particles.value, ...newParticles].map(p => {
    const newP = { ...p }
    newP.phase += newP.speed * 0.02

    switch (newP.type) {
      case 'H2':
        // 氢分子从左侧进入，向负极移动
        newP.x += newP.speed * 1.5
        if (newP.x > 180) {
          newP.opacity = Math.max(0, newP.opacity - 0.05)
          if (newP.opacity <= 0 && Math.random() < 0.1) {
            // 氢分子分解为质子和电子
            newParticles.push(generateParticle('H+', 200, newP.y))
            newParticles.push(generateParticle('H+', 200, newP.y + 20))
            newParticles.push(generateParticle('e-', 200, newP.y))
            newParticles.push(generateParticle('e-', 200, newP.y + 20))
          }
        }
        break

      case 'H+':
        // 质子通过电解质向正极移动
        newP.x += newP.speed * 1.2
        newP.y += Math.sin(newP.phase * 5) * 0.5
        if (newP.x > 800) {
          newP.opacity = Math.max(0, newP.opacity - 0.03)
        }
        break

      case 'e-':
        // 电子通过外电路移动
        if (newP.x < 220) {
          newP.x += newP.speed * 2
        } else if (newP.y > 80) {
          newP.y -= newP.speed * 2
        } else if (newP.x < 780) {
          newP.x += newP.speed * 2
        } else if (newP.y < 150) {
          newP.y += newP.speed * 1.5
        } else if (newP.x < 820) {
          newP.x += newP.speed * 1.5
        } else {
          newP.opacity = Math.max(0, newP.opacity - 0.03)
        }
        break

      case 'O2':
        // 氧分子从右侧进入，向正极移动
        newP.x -= newP.speed * 1.5
        if (newP.x < 820) {
          newP.opacity = Math.max(0, newP.opacity - 0.05)
          if (newP.opacity <= 0.3 && Math.random() < 0.05) {
            // 生成水分子
            newParticles.push(generateParticle('H2O', 800, newP.y))
            newParticles.push(generateParticle('H2O', 800, newP.y + 20))
          }
        }
        break

      case 'H2O':
        // 水分子向下流出
        newP.y += newP.speed * 1.5
        newP.x += Math.sin(newP.phase * 3) * 0.3
        if (newP.y > 450) {
          newP.opacity = Math.max(0, newP.opacity - 0.03)
        }
        break
    }

    return newP
  }).filter(p => p.opacity > 0)
}

const animate = () => {
  if (isPlaying.value) {
    currentTime.value++
    updateParticles()
    animationFrame.value = requestAnimationFrame(animate)
  }
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    animate()
  }
}

const resetAnimation = () => {
  isPlaying.value = false
  particles.value = []
  currentTime.value = 0
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
}

onMounted(() => {
  // 初始化一些粒子
  for (let i = 0; i < 3; i++) {
    particles.value.push(generateParticle('H2', 30, 200 + i * 50))
    particles.value.push(generateParticle('O2', 970, 200 + i * 50))
  }
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- 标题 -->
    <div class="text-center mb-6">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
        酸性氢氧燃料电池工作原理
      </h1>
      <p class="text-gray-400 text-lg">
        Acidic Hydrogen-Oxygen Fuel Cell Animation
      </p>
    </div>

    <!-- 主要动画区域 -->
    <div class="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6 border border-slate-700">
      <svg viewBox="0 0 1000 500" class="w-full h-auto">
        <defs>
          <linearGradient id="electrodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" :stop-color="isPlaying ? '#4b5563' : '#374151'" />
            <stop offset="100%" :stop-color="isPlaying ? '#6b7280' : '#4b5563'" />
          </linearGradient>
          <linearGradient id="electrolyteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e40af" stop-opacity="0.3" />
            <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#1e40af" stop-opacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        <!-- 背景 -->
        <rect x="0" y="0" width="1000" height="500" fill="#0f172a" rx="16" />

        <!-- 外壳 -->
        <rect x="100" y="120" width="800" height="280" fill="none" stroke="#475569" stroke-width="3" rx="8" />

        <!-- 负极（阳极） -->
        <rect x="150" y="130" width="40" height="260" fill="url(#electrodeGradient)" rx="4" :class="isPlaying ? 'animate-pulse-glow' : ''" />
        <text x="170" y="410" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="bold">负极(−)</text>
        <text x="170" y="430" text-anchor="middle" fill="#94a3b8" font-size="12">阳极</text>

        <!-- 正极（阴极） -->
        <rect x="810" y="130" width="40" height="260" fill="url(#electrodeGradient)" rx="4" :class="isPlaying ? 'animate-pulse-glow' : ''" />
        <text x="830" y="410" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="bold">正极(+)</text>
        <text x="830" y="430" text-anchor="middle" fill="#94a3b8" font-size="12">阴极</text>

        <!-- 电解质 -->
        <rect x="200" y="130" width="600" height="260" fill="url(#electrolyteGradient)" />
        <text x="500" y="430" text-anchor="middle" fill="#60a5fa" font-size="12">电解质溶液(酸性)</text>

        <!-- 催化剂标签 -->
        <rect x="190" y="130" width="10" height="260" fill="#a855f7" opacity="0.6" />
        <rect x="800" y="130" width="10" height="260" fill="#a855f7" opacity="0.6" />
        <text x="195" y="120" text-anchor="middle" fill="#a855f7" font-size="10">催化剂</text>
        <text x="805" y="120" text-anchor="middle" fill="#a855f7" font-size="10">催化剂</text>

        <!-- 外电路（电线） -->
        <path 
          d="M 200 130 L 200 80 L 800 80 L 800 130" 
          fill="none" 
          :stroke="isPlaying ? '#fbbf24' : '#64748b'" 
          stroke-width="6" 
          stroke-linecap="round"
          :class="isPlaying ? 'flow-line' : ''"
        />

        <!-- 电流表 -->
        <g transform="translate(500, 60)">
          <circle cx="0" cy="0" r="35" fill="#1e293b" stroke="#475569" stroke-width="3" />
          <text x="0" y="-15" text-anchor="middle" fill="#94a3b8" font-size="10">电流表</text>
          <!-- 刻度 -->
          <path d="M -25,5 L -20,-8 M 0,-10 L 0,-15 M 25,5 L 20,-8" stroke="#64748b" stroke-width="2" />
          <!-- 指针 -->
          <g :transform="`rotate(${meterAngle})`" :class="isPlaying ? 'transition-transform duration-200' : ''">
            <line x1="0" y1="5" x2="0" y2="-25" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
            <circle cx="0" cy="0" r="5" fill="#ef4444" />
          </g>
        </g>

        <!-- 氢气入口标签 -->
        <g transform="translate(50, 260)">
          <text x="0" y="-10" text-anchor="middle" fill="#22c55e" font-size="14" font-weight="bold">H₂</text>
          <text x="0" y="10" text-anchor="middle" fill="#94a3b8" font-size="11">氢气</text>
          <path d="M 30,0 L 100,0" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)" />
        </g>

        <!-- 氧气入口标签 -->
        <g transform="translate(950, 260)">
          <text x="0" y="-10" text-anchor="middle" fill="#ec4899" font-size="14" font-weight="bold">O₂</text>
          <text x="0" y="10" text-anchor="middle" fill="#94a3b8" font-size="11">氧气</text>
          <path d="M -30,0 L -100,0" stroke="#ec4899" stroke-width="2" marker-end="url(#arrow)" />
        </g>

        <!-- 水出口标签 -->
        <g transform="translate(750, 480)">
          <text x="0" y="-5" text-anchor="middle" fill="#06b6d4" font-size="14" font-weight="bold">H₂O</text>
          <text x="0" y="12" text-anchor="middle" fill="#94a3b8" font-size="11">水</text>
          <path d="M 0,-20 L 0,-50" stroke="#06b6d4" stroke-width="2" marker-end="url(#arrow)" />
        </g>

        <!-- 质子迁移方向 -->
        <g transform="translate(500, 260)">
          <text x="0" y="0" text-anchor="middle" fill="#f97316" font-size="12">H⁺ →</text>
          <text x="0" y="18" text-anchor="middle" fill="#94a3b8" font-size="10">质子迁移</text>
        </g>

        <!-- 电子流动方向 -->
        <g transform="translate(500, 100)">
          <text x="0" y="0" text-anchor="middle" fill="#fbbf24" font-size="12">e⁻ ←</text>
          <text x="0" y="18" text-anchor="middle" fill="#94a3b8" font-size="10">电子流动</text>
        </g>

        <!-- 粒子动画 -->
        <g v-for="particle in particles" :key="particle.id" :transform="`translate(${particle.x}, ${particle.y})`" :opacity="particle.opacity">
          <!-- 氢分子 H2 -->
          <g v-if="particle.type === 'H2'" filter="url(#glow)">
            <circle cx="-6" cy="0" r="8" fill="#22c55e" />
            <circle cx="6" cy="0" r="8" fill="#22c55e" />
            <line x1="-2" y1="0" x2="2" y2="0" stroke="#fff" stroke-width="2" />
            <text x="0" y="20" text-anchor="middle" fill="#22c55e" font-size="8" font-weight="bold">H₂</text>
          </g>

          <!-- 氧分子 O2 -->
          <g v-else-if="particle.type === 'O2'" filter="url(#glow)">
            <circle cx="-8" cy="0" r="10" fill="#ec4899" />
            <circle cx="8" cy="0" r="10" fill="#ec4899" />
            <line x1="-4" y1="-3" x2="4" y2="-3" stroke="#fff" stroke-width="2" />
            <line x1="-4" y1="3" x2="4" y2="3" stroke="#fff" stroke-width="2" />
            <text x="0" y="22" text-anchor="middle" fill="#ec4899" font-size="8" font-weight="bold">O₂</text>
          </g>

          <!-- 质子 H+ -->
          <g v-else-if="particle.type === 'H+'" filter="url(#glow)">
            <circle cx="0" cy="0" r="6" fill="#f97316" />
            <text x="0" y="3" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">+</text>
          </g>

          <!-- 电子 e- -->
          <g v-else-if="particle.type === 'e-'" filter="url(#glow)">
            <circle cx="0" cy="0" r="5" fill="#fbbf24" />
            <text x="0" y="3" text-anchor="middle" fill="#000" font-size="6" font-weight="bold">−</text>
          </g>

          <!-- 水分子 H2O -->
          <g v-else-if="particle.type === 'H2O'" filter="url(#glow)">
            <circle cx="0" cy="0" r="10" fill="#06b6d4" />
            <circle cx="-8" cy="-6" r="5" fill="#22c55e" />
            <circle cx="8" cy="-6" r="5" fill="#22c55e" />
            <text x="0" y="22" text-anchor="middle" fill="#06b6d4" font-size="7" font-weight="bold">H₂O</text>
          </g>
        </g>
      </svg>
    </div>

    <!-- 控制按钮 -->
    <div class="flex justify-center gap-4 mb-6">
      <button
        @click="togglePlay"
        class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <span v-if="isPlaying">⏸️ 暂停</span>
        <span v-else>▶️ 开始</span>
      </button>
      <button
        @click="resetAnimation"
        class="px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        🔄 重置
      </button>
    </div>

    <!-- 状态指示 -->
    <div class="text-center mb-6">
      <span 
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
        :class="isPlaying ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'"
      >
        <span 
          class="w-2 h-2 rounded-full animate-pulse"
          :class="isPlaying ? 'bg-green-400' : 'bg-yellow-400'"
        ></span>
        {{ isPlaying ? '动画运行中' : '动画已暂停' }}
      </span>
    </div>

    <!-- 反应方程式 -->
    <div class="grid md:grid-cols-3 gap-4 mb-6">
      <!-- 负极反应 -->
      <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 class="text-red-400 font-bold mb-3 flex items-center gap-2">
          <span class="w-3 h-3 bg-red-500 rounded-full"></span>
          负极反应（氧化反应）
        </h3>
        <div class="bg-slate-900/50 rounded-lg p-3 text-center">
          <p class="text-white font-mono text-lg mb-2">
            H₂ - 2e⁻ → 2H⁺
          </p>
          <p class="text-gray-400 text-sm">
            氢气在负极失去电子，被氧化成氢离子
          </p>
        </div>
      </div>

      <!-- 正极反应 -->
      <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 class="text-blue-400 font-bold mb-3 flex items-center gap-2">
          <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
          正极反应（还原反应）
        </h3>
        <div class="bg-slate-900/50 rounded-lg p-3 text-center">
          <p class="text-white font-mono text-lg mb-2">
            O₂ + 4H⁺ + 4e⁻ → 2H₂O
          </p>
          <p class="text-gray-400 text-sm">
            氧气在正极得到电子，被还原生成水
          </p>
        </div>
      </div>

      <!-- 总反应 -->
      <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 class="text-purple-400 font-bold mb-3 flex items-center gap-2">
          <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
          总反应方程式
        </h3>
        <div class="bg-slate-900/50 rounded-lg p-3 text-center">
          <p class="text-white font-mono text-lg mb-2">
            2H₂ + O₂ → 2H₂O
          </p>
          <p class="text-gray-400 text-sm">
            氢气和氧气反应生成水，释放电能
          </p>
        </div>
      </div>
    </div>

    <!-- 图例说明 -->
    <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <h3 class="text-white font-bold mb-4">粒子图例说明</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            <div class="flex gap-0.5">
              <span class="w-4 h-4 bg-green-500 rounded-full"></span>
              <span class="w-4 h-4 bg-green-500 rounded-full"></span>
            </div>
          </div>
          <div>
            <p class="text-green-400 font-bold text-sm">H₂</p>
            <p class="text-gray-400 text-xs">氢分子</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            <div class="flex gap-0.5">
              <span class="w-5 h-5 bg-pink-500 rounded-full"></span>
              <span class="w-5 h-5 bg-pink-500 rounded-full"></span>
            </div>
          </div>
          <div>
            <p class="text-pink-400 font-bold text-sm">O₂</p>
            <p class="text-gray-400 text-xs">氧分子</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            <span class="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">+</span>
          </div>
          <div>
            <p class="text-orange-400 font-bold text-sm">H⁺</p>
            <p class="text-gray-400 text-xs">氢离子(质子)</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            <span class="w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold">−</span>
          </div>
          <div>
            <p class="text-yellow-400 font-bold text-sm">e⁻</p>
            <p class="text-gray-400 text-xs">电子</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            <span class="w-5 h-5 bg-cyan-500 rounded-full"></span>
          </div>
          <div>
            <p class="text-cyan-400 font-bold text-sm">H₂O</p>
            <p class="text-gray-400 text-xs">水分子</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作原理说明 -->
    <div class="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <h3 class="text-white font-bold mb-4">工作原理说明</h3>
      <div class="space-y-3 text-gray-300">
        <div class="flex items-start gap-3">
          <span class="bg-red-500/20 text-red-400 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
          <p><strong class="text-red-400">负极（阳极）：</strong>氢气（H₂）在催化剂作用下被氧化，失去电子变成氢离子（H⁺）。电子通过外电路流向正极，形成电流。</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="bg-blue-500/20 text-blue-400 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
          <p><strong class="text-blue-400">正极（阴极）：</strong>氧气（O₂）在催化剂作用下与通过电解质迁移过来的氢离子（H⁺）以及外电路传来的电子（e⁻）结合，生成水（H₂O）。</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="bg-orange-500/20 text-orange-400 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
          <p><strong class="text-orange-400">电解质：</strong>在酸性燃料电池中，电解质允许氢离子（H⁺）通过，但阻止电子通过，迫使电子走外电路从而产生电流。</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="bg-purple-500/20 text-purple-400 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
          <p><strong class="text-purple-400">能量转换：</strong>燃料电池将化学能直接转换为电能，效率高于传统热机，且产物只有水，非常环保。</p>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="text-center mt-8 text-gray-500 text-sm">
      <p>💡 点击"开始"按钮观看动画演示，课堂讲解时可随时暂停</p>
    </div>
  </div>
</template>

<style scoped>
svg {
  display: block;
}
</style>
