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

  if (Math.random() < 0.03) {
    newParticles.push(generateParticle('H2', 30, 200 + Math.random() * 100))
  }
  if (Math.random() < 0.02) {
    newParticles.push(generateParticle('O2', 970, 200 + Math.random() * 100))
  }

  particles.value = [...particles.value, ...newParticles].map(p => {
    const newP = { ...p }
    newP.phase += newP.speed * 0.02

    switch (newP.type) {
      case 'H2':
        newP.x += newP.speed * 1.5
        if (newP.x > 180) {
          newP.opacity = Math.max(0, newP.opacity - 0.05)
          if (newP.opacity <= 0 && Math.random() < 0.1) {
            newParticles.push(generateParticle('H+', 200, newP.y))
            newParticles.push(generateParticle('H+', 200, newP.y + 20))
            newParticles.push(generateParticle('e-', 200, newP.y))
            newParticles.push(generateParticle('e-', 200, newP.y + 20))
          }
        }
        break

      case 'H+':
        newP.x += newP.speed * 1.2
        newP.y += Math.sin(newP.phase * 5) * 0.5
        if (newP.x > 800) {
          newP.opacity = Math.max(0, newP.opacity - 0.03)
        }
        break

      case 'e-':
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
        newP.x -= newP.speed * 1.5
        if (newP.x < 820) {
          newP.opacity = Math.max(0, newP.opacity - 0.05)
          if (newP.opacity <= 0.3 && Math.random() < 0.05) {
            newParticles.push(generateParticle('H2O', 800, newP.y))
            newParticles.push(generateParticle('H2O', 800, newP.y + 20))
          }
        }
        break

      case 'H2O':
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
  <div class="min-h-screen py-8 px-4 md:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 mb-6">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span class="text-indigo-300 text-sm font-medium">交互式教学演示</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 via-indigo-200 to-slate-100 bg-clip-text text-transparent mb-4">
          酸性氢氧燃料电池工作原理
        </h1>
        <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          可视化展示氢气氧化、氧气还原及离子迁移的完整过程
        </p>
      </div>

      <div class="card-glass rounded-3xl p-6 md:p-10 mb-8 shadow-2xl card-hover">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span class="text-white text-lg">⚡</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-100">燃料电池工作演示</h2>
              <p class="text-slate-500 text-sm">点击开始观察反应过程</p>
            </div>
          </div>
          <span 
            class="status-badge"
            :class="isPlaying ? 'running' : 'paused'"
          >
            <span class="pulse-dot" :style="{ backgroundColor: isPlaying ? '#4ade80' : '#fbbf24' }"></span>
            {{ isPlaying ? '运行中' : '已暂停' }}
          </span>
        </div>

        <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50">
          <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
          <svg viewBox="0 0 1000 520" class="w-full h-auto relative z-10">
            <defs>
              <linearGradient id="electrodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="isPlaying ? '#64748b' : '#475569'" />
                <stop offset="100%" :stop-color="isPlaying ? '#94a3b8' : '#64748b'" />
              </linearGradient>
              <linearGradient id="electrolyteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#818cf8" stop-opacity="0.1" />
                <stop offset="50%" stop-color="#6366f1" stop-opacity="0.15" />
                <stop offset="100%" stop-color="#818cf8" stop-opacity="0.1" />
              </linearGradient>
              <linearGradient id="outerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#818cf8" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#6366f1" stop-opacity="0.1" />
                <stop offset="100%" stop-color="#818cf8" stop-opacity="0.3" />
              </linearGradient>
              <linearGradient id="wireActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#fbbf24" />
                <stop offset="50%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#fbbf24" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,8 L10,4 z" fill="#64748b" />
              </marker>
              <radialGradient id="meterGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#0f172a" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="520" fill="#0f172a" />
            <rect x="2" y="2" width="996" height="516" fill="none" stroke="url(#outerGlow)" stroke-width="4" rx="12" />

            <rect x="80" y="100" width="840" height="320" fill="none" stroke="#475569" stroke-width="2" rx="12" />
            <rect x="82" y="102" width="836" height="316" fill="#0f172a" fill-opacity="0.5" rx="10" />

            <rect x="140" y="110" width="50" height="300" fill="url(#electrodeGradient)" rx="6" :class="isPlaying ? 'animate-pulse-glow' : ''" style="color: #94a3b8;" />
            <rect x="142" y="112" width="4" height="296" fill="#e2e8f0" fill-opacity="0.3" rx="2" />
            <g transform="translate(165, 435)">
              <rect x="-35" y="-20" width="70" height="35" fill="rgba(249, 115, 22, 0.1)" rx="8" />
              <text x="0" y="2" text-anchor="middle" fill="#fb923c" font-size="14" font-weight="700">负极 (−)</text>
              <text x="0" y="18" text-anchor="middle" fill="#64748b" font-size="11">阳极</text>
            </g>

            <rect x="810" y="110" width="50" height="300" fill="url(#electrodeGradient)" rx="6" :class="isPlaying ? 'animate-pulse-glow' : ''" style="color: #94a3b8;" />
            <rect x="812" y="112" width="4" height="296" fill="#e2e8f0" fill-opacity="0.3" rx="2" />
            <g transform="translate(835, 435)">
              <rect x="-35" y="-20" width="70" height="35" fill="rgba(14, 165, 233, 0.1)" rx="8" />
              <text x="0" y="2" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="700">正极 (+)</text>
              <text x="0" y="18" text-anchor="middle" fill="#64748b" font-size="11">阴极</text>
            </g>

            <rect x="200" y="110" width="600" height="300" fill="url(#electrolyteGradient)" />
            
            <rect x="188" y="110" width="12" height="300" fill="#a78bfa" fill-opacity="0.4" />
            <rect x="800" y="110" width="12" height="300" fill="#a78bfa" fill-opacity="0.4" />
            <g transform="translate(194, 95)">
              <rect x="-20" y="-15" width="40" height="18" fill="rgba(167, 139, 250, 0.15)" rx="4" />
              <text x="0" y="-2" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="600">催化剂</text>
            </g>
            <g transform="translate(806, 95)">
              <rect x="-20" y="-15" width="40" height="18" fill="rgba(167, 139, 250, 0.15)" rx="4" />
              <text x="0" y="-2" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="600">催化剂</text>
            </g>

            <path 
              d="M 200 110 L 200 70 Q 200 50 220 50 L 780 50 Q 800 50 800 70 L 800 110" 
              fill="none" 
              :stroke="isPlaying ? 'url(#wireActive)' : '#475569'" 
              stroke-width="8" 
              stroke-linecap="round"
              :class="isPlaying ? 'flow-line' : ''"
              :filter="isPlaying ? 'url(#glow)' : ''"
            />
            <path 
              d="M 200 110 L 200 70 Q 200 50 220 50 L 780 50 Q 800 50 800 70 L 800 110" 
              fill="none" 
              :stroke="isPlaying ? '#fbbf24' : '#475569'" 
              stroke-width="4" 
              stroke-linecap="round"
              :opacity="isPlaying ? 0.8 : 0.3"
            />

            <g transform="translate(500, 50)">
              <circle cx="0" cy="0" r="38" fill="url(#meterGradient)" stroke="#475569" stroke-width="3" />
              <circle cx="0" cy="0" r="34" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="2,3" opacity="0.5" />
              <text x="0" y="-12" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="500">电流表</text>
              <path d="M -28,5 L -22,-10 M 0,-12 L 0,-18 M 28,5 L 22,-10" stroke="#64748b" stroke-width="2" stroke-linecap="round" />
              <text x="-28" y="18" text-anchor="middle" fill="#64748b" font-size="8">0</text>
              <text x="28" y="18" text-anchor="middle" fill="#64748b" font-size="8">A</text>
              <g :transform="`rotate(${meterAngle})`" :class="isPlaying ? 'transition-transform duration-200' : ''">
                <line x1="0" y1="8" x2="0" y2="-28" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
                <line x1="0" y1="8" x2="0" y2="-28" stroke="#fca5a5" stroke-width="1" stroke-linecap="round" />
                <circle cx="0" cy="0" r="6" fill="#ef4444" />
                <circle cx="0" cy="0" r="3" fill="#fecaca" />
              </g>
            </g>

            <g transform="translate(45, 260)">
              <rect x="-20" y="-35" width="40" height="50" fill="rgba(74, 222, 128, 0.08)" rx="8" stroke="rgba(74, 222, 128, 0.3)" stroke-width="1" />
              <text x="0" y="-12" text-anchor="middle" fill="#4ade80" font-size="15" font-weight="700">H₂</text>
              <text x="0" y="6" text-anchor="middle" fill="#94a3b8" font-size="11">氢气</text>
              <path d="M 25,0 L 90,0" stroke="#4ade80" stroke-width="2.5" marker-end="url(#arrow)" opacity="0.7" />
            </g>

            <g transform="translate(955, 260)">
              <rect x="-20" y="-35" width="40" height="50" fill="rgba(244, 114, 182, 0.08)" rx="8" stroke="rgba(244, 114, 182, 0.3)" stroke-width="1" />
              <text x="0" y="-12" text-anchor="middle" fill="#f472b6" font-size="15" font-weight="700">O₂</text>
              <text x="0" y="6" text-anchor="middle" fill="#94a3b8" font-size="11">氧气</text>
              <path d="M -25,0 L -90,0" stroke="#f472b6" stroke-width="2.5" marker-end="url(#arrow)" opacity="0.7" />
            </g>

            <g transform="translate(750, 500)">
              <rect x="-25" y="-30" width="50" height="35" fill="rgba(34, 211, 238, 0.08)" rx="8" stroke="rgba(34, 211, 238, 0.3)" stroke-width="1" />
              <text x="0" y="-12" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="700">H₂O</text>
              <text x="0" y="2" text-anchor="middle" fill="#94a3b8" font-size="10">水</text>
              <path d="M 0,-35 L 0,-95" stroke="#22d3ee" stroke-width="2.5" marker-end="url(#arrow)" opacity="0.7" />
            </g>

            <g transform="translate(500, 270)">
              <rect x="-60" y="-25" width="120" height="50" fill="rgba(249, 115, 22, 0.05)" rx="8" />
              <text x="0" y="-2" text-anchor="middle" fill="#fb923c" font-size="13" font-weight="600">H⁺ →</text>
              <text x="0" y="15" text-anchor="middle" fill="#64748b" font-size="11">质子迁移</text>
            </g>

            <g transform="translate(500, 90)">
              <rect x="-60" y="-22" width="120" height="44" fill="rgba(251, 191, 36, 0.05)" rx="8" />
              <text x="0" y="-2" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="600">e⁻ ←</text>
              <text x="0" y="14" text-anchor="middle" fill="#64748b" font-size="11">电子流动</text>
            </g>

            <g v-for="particle in particles" :key="particle.id" :transform="`translate(${particle.x}, ${particle.y})`" :opacity="particle.opacity">
              <g v-if="particle.type === 'H2'" filter="url(#strongGlow)">
                <circle cx="-8" cy="0" r="10" fill="#4ade80" />
                <circle cx="8" cy="0" r="10" fill="#4ade80" />
                <circle cx="-8" cy="0" r="4" fill="#86efac" />
                <circle cx="8" cy="0" r="4" fill="#86efac" />
                <line x1="-2" y1="0" x2="2" y2="0" stroke="#fff" stroke-width="3" stroke-linecap="round" />
              </g>

              <g v-else-if="particle.type === 'O2'" filter="url(#strongGlow)">
                <circle cx="-10" cy="0" r="12" fill="#f472b6" />
                <circle cx="10" cy="0" r="12" fill="#f472b6" />
                <circle cx="-10" cy="0" r="5" fill="#f9a8d4" />
                <circle cx="10" cy="0" r="5" fill="#f9a8d4" />
                <line x1="-5" y1="-4" x2="5" y2="-4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
                <line x1="-5" y1="4" x2="5" y2="4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
              </g>

              <g v-else-if="particle.type === 'H+'" filter="url(#glow)">
                <circle cx="0" cy="0" r="8" fill="#f97316" />
                <circle cx="0" cy="0" r="3" fill="#fdba74" />
                <text x="0" y="3" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">+</text>
              </g>

              <g v-else-if="particle.type === 'e-'" filter="url(#strongGlow)">
                <circle cx="0" cy="0" r="6" fill="#fbbf24" />
                <circle cx="0" cy="0" r="2" fill="#fef3c7" />
                <text x="0" y="3" text-anchor="middle" fill="#000" font-size="8" font-weight="bold">−</text>
              </g>

              <g v-else-if="particle.type === 'H2O'" filter="url(#glow)">
                <circle cx="0" cy="0" r="12" fill="#22d3ee" />
                <circle cx="-10" cy="-7" r="6" fill="#4ade80" />
                <circle cx="10" cy="-7" r="6" fill="#4ade80" />
                <circle cx="0" cy="0" r="4" fill="#67e8f9" />
              </g>
            </g>
          </svg>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            @click="togglePlay"
            class="btn-primary px-10 py-4 rounded-2xl text-white font-semibold text-lg flex items-center gap-3 shadow-lg"
          >
            <span v-if="isPlaying" class="text-xl">⏸</span>
            <span v-else class="text-xl">▶</span>
            <span v-if="isPlaying">暂停演示</span>
            <span v-else>开始演示</span>
          </button>
          <button
            @click="resetAnimation"
            class="btn-secondary px-10 py-4 rounded-2xl text-slate-200 font-semibold text-lg flex items-center gap-3 shadow-lg"
          >
            <span class="text-xl">↺</span>
            <span>重置</span>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="card-glass rounded-2xl p-6 card-hover">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center border border-orange-500/20">
              <span class="text-orange-400 text-xl font-bold">−</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-100">负极反应</h3>
              <p class="text-orange-400 text-sm">氧化反应</p>
            </div>
          </div>
          <div class="bg-slate-900/60 rounded-xl p-5 text-center border border-slate-700/50">
            <p class="text-2xl font-mono text-white mb-3 tracking-wide">
              H₂ − 2e⁻ → 2H⁺
            </p>
            <p class="text-slate-400 text-sm leading-relaxed">
              氢气在负极失去电子，被氧化成氢离子
            </p>
          </div>
        </div>

        <div class="card-glass rounded-2xl p-6 card-hover">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-sky-600/10 flex items-center justify-center border border-sky-500/20">
              <span class="text-sky-400 text-xl font-bold">+</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-100">正极反应</h3>
              <p class="text-sky-400 text-sm">还原反应</p>
            </div>
          </div>
          <div class="bg-slate-900/60 rounded-xl p-5 text-center border border-slate-700/50">
            <p class="text-xl font-mono text-white mb-3 tracking-wide">
              O₂ + 4H⁺ + 4e⁻ → 2H₂O
            </p>
            <p class="text-slate-400 text-sm leading-relaxed">
              氧气在正极得到电子，被还原生成水
            </p>
          </div>
        </div>

        <div class="card-glass rounded-2xl p-6 card-hover">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center border border-indigo-500/20">
              <span class="text-indigo-400 text-xl">⚡</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-100">总反应</h3>
              <p class="text-indigo-400 text-sm">能量转换</p>
            </div>
          </div>
          <div class="bg-slate-900/60 rounded-xl p-5 text-center border border-slate-700/50">
            <p class="text-2xl font-mono text-white mb-3 tracking-wide">
              2H₂ + O₂ → 2H₂O
            </p>
            <p class="text-slate-400 text-sm leading-relaxed">
              氢气和氧气反应生成水，释放电能
            </p>
          </div>
        </div>
      </div>

      <div class="card-glass rounded-2xl p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
            <span class="text-emerald-400">📋</span>
          </div>
          <h3 class="text-xl font-bold text-slate-100">粒子图例说明</h3>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div class="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 hover:border-green-500/30 transition-colors">
            <div class="flex items-center gap-1">
              <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-green-300"></div>
              </div>
              <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-green-300"></div>
              </div>
            </div>
            <div class="text-center">
              <p class="text-green-400 font-bold text-lg">H₂</p>
              <p class="text-slate-500 text-sm">氢分子</p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 hover:border-pink-500/30 transition-colors">
            <div class="flex items-center gap-1">
              <div class="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-pink-300"></div>
              </div>
              <div class="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-pink-300"></div>
              </div>
            </div>
            <div class="text-center">
              <p class="text-pink-400 font-bold text-lg">O₂</p>
              <p class="text-slate-500 text-sm">氧分子</p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 hover:border-orange-500/30 transition-colors">
            <div class="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
              <span class="text-white text-xs font-bold">+</span>
            </div>
            <div class="text-center">
              <p class="text-orange-400 font-bold text-lg">H⁺</p>
              <p class="text-slate-500 text-sm">氢离子(质子)</p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 hover:border-yellow-500/30 transition-colors">
            <div class="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
              <span class="text-black text-xs font-bold">−</span>
            </div>
            <div class="text-center">
              <p class="text-yellow-400 font-bold text-lg">e⁻</p>
              <p class="text-slate-500 text-sm">电子</p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 hover:border-cyan-500/30 transition-colors">
            <div class="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
              <div class="w-3 h-3 rounded-full bg-cyan-300"></div>
            </div>
            <div class="text-center">
              <p class="text-cyan-400 font-bold text-lg">H₂O</p>
              <p class="text-slate-500 text-sm">水分子</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-glass rounded-2xl p-8">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center">
            <span class="text-blue-400">📖</span>
          </div>
          <h3 class="text-xl font-bold text-slate-100">工作原理说明</h3>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="group flex items-start gap-5 p-5 rounded-xl bg-slate-900/30 border border-slate-700/30 hover:border-orange-500/30 transition-all">
            <span class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center text-orange-400 font-bold text-lg border border-orange-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">1</span>
            <div>
              <h4 class="font-semibold text-orange-400 mb-2">负极（阳极）反应</h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                氢气（H₂）在催化剂作用下被氧化，失去电子变成氢离子（H⁺）。电子通过外电路流向正极，形成电流。
              </p>
            </div>
          </div>

          <div class="group flex items-start gap-5 p-5 rounded-xl bg-slate-900/30 border border-slate-700/30 hover:border-sky-500/30 transition-all">
            <span class="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-600/10 flex items-center justify-center text-sky-400 font-bold text-lg border border-sky-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">2</span>
            <div>
              <h4 class="font-semibold text-sky-400 mb-2">正极（阴极）反应</h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                氧气（O₂）在催化剂作用下与通过电解质迁移过来的氢离子（H⁺）以及外电路传来的电子（e⁻）结合，生成水（H₂O）。
              </p>
            </div>
          </div>

          <div class="group flex items-start gap-5 p-5 rounded-xl bg-slate-900/30 border border-slate-700/30 hover:border-indigo-500/30 transition-all">
            <span class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 flex items-center justify-center text-indigo-400 font-bold text-lg border border-indigo-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">3</span>
            <div>
              <h4 class="font-semibold text-indigo-400 mb-2">电解质的作用</h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                在酸性燃料电池中，电解质允许氢离子（H⁺）通过，但阻止电子通过，迫使电子走外电路从而产生电流。
              </p>
            </div>
          </div>

          <div class="group flex items-start gap-5 p-5 rounded-xl bg-slate-900/30 border border-slate-700/30 hover:border-emerald-500/30 transition-all">
            <span class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center text-emerald-400 font-bold text-lg border border-emerald-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">4</span>
            <div>
              <h4 class="font-semibold text-emerald-400 mb-2">能量转换优势</h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                燃料电池将化学能直接转换为电能，效率高于传统热机，且产物只有水，非常环保。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12 pb-8">
        <div class="inline-flex items-center gap-2 text-slate-600">
          <span class="text-xl">💡</span>
          <span class="text-sm">点击"开始演示"按钮观看动画，课堂讲解时可随时暂停</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
svg {
  display: block;
}
</style>
