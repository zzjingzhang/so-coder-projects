<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const particles = ref<
  {
    id: number
    x: number
    y: number
    size: number
    speed: number
    delay: number
    color: string
  }[]
>([])

const festivalDate = new Date()
festivalDate.setDate(festivalDate.getDate() + 120)

const colors = [
  'rgba(0, 212, 255, 0.8)',
  'rgba(139, 92, 246, 0.8)',
  'rgba(236, 72, 153, 0.8)',
]

let countdownInterval: ReturnType<typeof setInterval>

const updateCountdown = () => {
  const now = new Date()
  const distance = festivalDate.getTime() - now.getTime()

  if (distance > 0) {
    countdown.value.days = Math.floor(distance / (1000 * 60 * 60 * 24))
    countdown.value.hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    countdown.value.minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    )
    countdown.value.seconds = Math.floor((distance % (1000 * 60)) / 1000)
  }
}

const generateParticles = () => {
  const newParticles = []
  for (let i = 0; i < 50; i++) {
    newParticles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }
  particles.value = newParticles
}

const scrollToTickets = () => {
  const element = document.querySelector('#tickets')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
  generateParticles()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-deep-purple via-purple-dark to-deep-purple"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-light/30 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-pink/20 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute rounded-full animate-float"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          backgroundColor: particle.color,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.speed + 4}s`,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        }"
      ></div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
      <svg
        class="w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="stageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: rgba(0, 212, 255, 0.3)" />
            <stop offset="50%" style="stop-color: rgba(139, 92, 246, 0.5)" />
            <stop offset="100%" style="stop-color: rgba(236, 72, 153, 0.3)" />
          </linearGradient>
          <linearGradient id="lightBeam1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(0, 212, 255, 0.8)" />
            <stop offset="100%" style="stop-color: rgba(0, 212, 255, 0)" />
          </linearGradient>
          <linearGradient id="lightBeam2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" style="stop-color: rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="lightBeam3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(236, 72, 153, 0.8)" />
            <stop offset="100%" style="stop-color: rgba(236, 72, 153, 0)" />
          </linearGradient>
        </defs>

        <polygon
          fill="url(#stageGradient)"
          points="0,320 720,200 1440,320"
          class="animate-pulse"
          style="animation-duration: 3s"
        />
        <polygon
          fill="url(#stageGradient)"
          points="0,320 720,220 1440,320"
          fill-opacity="0.5"
        />

        <polygon
          fill="url(#lightBeam1)"
          points="200,0 180,320 220,320"
          class="animate-pulse"
          style="animation-duration: 2s; opacity: 0.4"
        />
        <polygon
          fill="url(#lightBeam2)"
          points="720,0 680,320 760,320"
          class="animate-pulse"
          style="animation-duration: 2.5s; opacity: 0.4; animation-delay: 0.5s"
        />
        <polygon
          fill="url(#lightBeam3)"
          points="1240,0 1220,320 1260,320"
          class="animate-pulse"
          style="animation-duration: 3s; opacity: 0.4; animation-delay: 1s"
        />
      </svg>
    </div>

    <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <div class="mb-6">
        <span
          class="inline-block px-6 py-2 bg-gradient-to-r from-electric-blue/20 to-purple-light/20 border border-electric-blue/50 rounded-full text-electric-cyan text-sm font-semibold tracking-wider uppercase"
        >
          2026 年度最大音乐节
        </span>
      </div>

      <h1
        class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
      >
        <span
          class="block bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink text-gradient glow-text"
        >
          NEON
        </span>
        <span
          class="block bg-gradient-to-r from-neon-pink via-purple-light to-electric-blue text-gradient glow-text"
        >
          BEATS
        </span>
        <span class="block text-3xl sm:text-4xl md:text-5xl mt-4 text-glow-white/90">
          音乐节 2026
        </span>
      </h1>

      <p
        class="text-lg sm:text-xl md:text-2xl text-glow-white/70 mb-10 max-w-3xl mx-auto leading-relaxed"
      >
        8月15日-17日 · 上海世博公园
        <br class="hidden sm:block" />
        3天狂欢 · 5大舞台 · 100+顶级艺人
      </p>

      <div class="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-12">
        <div
          class="flex flex-col items-center bg-purple-dark/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-medium/30 min-w-[70px] sm:min-w-[90px]"
        >
          <span
            class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-electric-blue to-purple-light text-gradient"
          >
            {{ String(countdown.days).padStart(2, '0') }}
          </span>
          <span class="text-xs sm:text-sm text-glow-white/60 mt-2 uppercase tracking-wider">
            天
          </span>
        </div>
        <div class="flex items-center text-electric-blue text-2xl md:text-4xl font-bold">
          :
        </div>
        <div
          class="flex flex-col items-center bg-purple-dark/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-medium/30 min-w-[70px] sm:min-w-[90px]"
        >
          <span
            class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-electric-blue to-purple-light text-gradient"
          >
            {{ String(countdown.hours).padStart(2, '0') }}
          </span>
          <span class="text-xs sm:text-sm text-glow-white/60 mt-2 uppercase tracking-wider">
            时
          </span>
        </div>
        <div class="flex items-center text-purple-light text-2xl md:text-4xl font-bold">
          :
        </div>
        <div
          class="flex flex-col items-center bg-purple-dark/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-medium/30 min-w-[70px] sm:min-w-[90px]"
        >
          <span
            class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-purple-light to-neon-pink text-gradient"
          >
            {{ String(countdown.minutes).padStart(2, '0') }}
          </span>
          <span class="text-xs sm:text-sm text-glow-white/60 mt-2 uppercase tracking-wider">
            分
          </span>
        </div>
        <div class="flex items-center text-neon-pink text-2xl md:text-4xl font-bold">
          :
        </div>
        <div
          class="flex flex-col items-center bg-purple-dark/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-medium/30 min-w-[70px] sm:min-w-[90px]"
        >
          <span
            class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-neon-pink to-electric-cyan text-gradient"
          >
            {{ String(countdown.seconds).padStart(2, '0') }}
          </span>
          <span class="text-xs sm:text-sm text-glow-white/60 mt-2 uppercase tracking-wider">
            秒
          </span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="scrollToTickets"
          class="px-8 py-4 bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink rounded-full text-lg font-bold text-glow-white hover:shadow-xl hover:shadow-electric-blue/50 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
        >
          立即抢购门票
        </button>
        <button
          class="px-8 py-4 border-2 border-electric-blue/50 rounded-full text-lg font-bold text-electric-blue hover:bg-electric-blue/10 transition-all duration-300 transform hover:scale-105"
        >
          查看演出阵容
        </button>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div
        class="flex flex-col items-center text-glow-white/50 animate-bounce cursor-pointer"
        @click="scrollToTickets"
      >
        <span class="text-sm mb-2">向下滚动</span>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
