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
    animationType: string
    rotateDirection: number
  }[]
>([])

const lightBeams = ref<
  {
    id: number
    x: number
    width: number
    color: string
    animation: string
    delay: number
  }[]
>([])

const festivalDate = new Date()
festivalDate.setDate(festivalDate.getDate() + 120)

const colors = [
  'rgba(0, 212, 255, 0.9)',
  'rgba(139, 92, 246, 0.9)',
  'rgba(236, 72, 153, 0.9)',
  'rgba(6, 182, 212, 0.9)',
]

const particleAnimations = [
  'animate-particle-drift',
  'animate-particle-spiral',
  'animate-float-sway',
  'animate-float-sway-alt',
  'animate-sparkle',
]

let countdownInterval: ReturnType<typeof setInterval>
let rafId: number

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
  for (let i = 0; i < 80; i++) {
    newParticles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      speed: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationType: particleAnimations[Math.floor(Math.random() * particleAnimations.length)],
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
    })
  }
  particles.value = newParticles
}

const generateLightBeams = () => {
  const beams = []
  for (let i = 0; i < 8; i++) {
    beams.push({
      id: i,
      x: 10 + i * 11,
      width: Math.random() * 40 + 30,
      color: colors[i % colors.length],
      animation: i % 2 === 0 ? 'animate-swing-light' : 'animate-swing-light-reverse',
      delay: i * 0.3,
    })
  }
  lightBeams.value = beams
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
  generateLightBeams()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  if (rafId) {
    cancelAnimationFrame(rafId)
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
        class="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-electric-blue/30 rounded-full blur-3xl animate-breathe-strong"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-purple-light/40 rounded-full blur-3xl animate-breathe-strong"
        style="animation-delay: 1.5s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/25 rounded-full blur-3xl animate-breathe-strong"
        style="animation-delay: 3s"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-electric-cyan/20 rounded-full blur-3xl animate-float-sway"
      ></div>
      <div
        class="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-purple-medium/25 rounded-full blur-3xl animate-float-sway-alt"
      ></div>
    </div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="beam in lightBeams"
        :key="beam.id"
        :class="[
          'absolute bottom-0 origin-bottom',
          beam.animation
        ]"
        :style="{
          left: `${beam.x}%`,
          width: `${beam.width}px`,
          height: '80%',
          background: `linear-gradient(to top, transparent, ${beam.color.replace('0.9', '0.6')}, transparent)`,
          animationDelay: `${beam.delay}s`,
          transformOrigin: 'bottom center',
        }"
      ></div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="particle in particles"
        :key="particle.id"
        :class="[
          'absolute rounded-full',
          particle.animationType
        ]"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          backgroundColor: particle.color,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.speed + 5}s`,
          boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color.replace('0.9', '0.5')}`,
        }"
      ></div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-96 pointer-events-none">
      <svg
        class="w-full h-full"
        viewBox="0 0 1440 384"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="stageGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: rgba(0, 212, 255, 0.5)" />
            <stop offset="33%" style="stop-color: rgba(139, 92, 246, 0.7)" />
            <stop offset="66%" style="stop-color: rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" style="stop-color: rgba(6, 182, 212, 0.5)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="spotlight1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(0, 212, 255, 0.9)" />
            <stop offset="100%" style="stop-color: rgba(0, 212, 255, 0)" />
          </linearGradient>
          <linearGradient id="spotlight2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(139, 92, 246, 0.9)" />
            <stop offset="100%" style="stop-color: rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="spotlight3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(236, 72, 153, 0.9)" />
            <stop offset="100%" style="stop-color: rgba(236, 72, 153, 0)" />
          </linearGradient>
          <linearGradient id="spotlight4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(6, 182, 212, 0.9)" />
            <stop offset="100%" style="stop-color: rgba(6, 182, 212, 0)" />
          </linearGradient>
        </defs>

        <polygon
          fill="url(#stageGradientMain)"
          points="0,384 720,180 1440,384"
          filter="url(#glow)"
          class="animate-pulse-glow-strong"
        />
        <polygon
          fill="url(#stageGradientMain)"
          points="0,384 720,220 1440,384"
          fill-opacity="0.6"
        />
        <polygon
          fill="url(#stageGradientMain)"
          points="0,384 720,250 1440,384"
          fill-opacity="0.3"
        />

        <polygon
          fill="url(#spotlight1)"
          points="100,0 50,384 150,384"
          class="animate-swing-light"
          style="transform-origin: 100px 384px"
        />
        <polygon
          fill="url(#spotlight2)"
          points="400,0 320,384 480,384"
          class="animate-swing-light-reverse"
          style="transform-origin: 400px 384px; animation-delay: 0.5s"
        />
        <polygon
          fill="url(#spotlight3)"
          points="720,0 620,384 820,384"
          class="animate-light-beam"
          style="transform-origin: 720px 384px"
        />
        <polygon
          fill="url(#spotlight4)"
          points="1040,0 960,384 1120,384"
          class="animate-swing-light"
          style="transform-origin: 1040px 384px; animation-delay: 1s"
        />
        <polygon
          fill="url(#spotlight1)"
          points="1340,0 1290,384 1390,384"
          class="animate-swing-light-reverse"
          style="transform-origin: 1340px 384px; animation-delay: 1.5s"
        />

        <ellipse
          cx="720"
          cy="320"
          rx="400"
          ry="60"
          fill="rgba(0, 212, 255, 0.1)"
          class="animate-pulse-glow"
        />
        <ellipse
          cx="720"
          cy="340"
          rx="500"
          ry="40"
          fill="rgba(139, 92, 246, 0.15)"
          class="animate-pulse-glow"
          style="animation-delay: 0.5s"
        />
      </svg>
    </div>

    <div class="relative z-10 text-center px-4 max-w-6xl mx-auto">
      <div class="mb-8">
        <span
          class="inline-block px-8 py-3 bg-gradient-to-r from-electric-blue/30 to-purple-light/30 border-2 border-electric-blue/60 rounded-full text-electric-cyan text-base font-bold tracking-wider uppercase animate-flicker-slow"
        >
          <span class="animate-bounce-strong inline-block">🎵</span>
          2026 年度最大音乐节
          <span class="animate-bounce-strong inline-block" style="animation-delay: 0.3s">🎵</span>
        </span>
      </div>

      <h1
        class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
      >
        <span
          class="block bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink text-gradient glow-text-strong animate-typography"
        >
          NEON
        </span>
        <span
          class="block bg-gradient-to-r from-neon-pink via-purple-light to-electric-blue text-gradient glow-text-strong animate-typography"
          style="animation-delay: 0.5s"
        >
          BEATS
        </span>
        <span class="block text-4xl sm:text-5xl md:text-6xl mt-6 text-glow-white">
          <span class="animate-wave inline-block" style="animation-delay: 0s">音</span>
          <span class="animate-wave inline-block" style="animation-delay: 0.1s">乐</span>
          <span class="animate-wave inline-block" style="animation-delay: 0.2s">节</span>
          <span class="animate-wave inline-block" style="animation-delay: 0.3s"> </span>
          <span class="animate-wave inline-block text-electric-blue" style="animation-delay: 0.4s">2</span>
          <span class="animate-wave inline-block text-purple-light" style="animation-delay: 0.5s">0</span>
          <span class="animate-wave inline-block text-neon-pink" style="animation-delay: 0.6s">2</span>
          <span class="animate-wave inline-block text-electric-cyan" style="animation-delay: 0.7s">6</span>
        </span>
      </h1>

      <p
        class="text-xl sm:text-2xl md:text-3xl text-glow-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
      >
        <span class="text-electric-blue font-bold">8月15日-17日</span>
        <span class="mx-4 text-purple-light">·</span>
        <span class="text-white">上海世博公园</span>
        <br class="hidden sm:block" />
        <span class="text-neon-pink animate-pulse">3天狂欢</span>
        <span class="mx-3 text-purple-medium">·</span>
        <span class="text-electric-blue animate-pulse" style="animation-delay: 0.5s">5大舞台</span>
        <span class="mx-3 text-purple-medium">·</span>
        <span class="text-neon-pink animate-pulse" style="animation-delay: 1s">100+顶级艺人</span>
      </p>

      <div class="flex justify-center gap-4 sm:gap-6 md:gap-10 mb-16">
        <div
          class="flex flex-col items-center bg-purple-dark/60 backdrop-blur-md rounded-2xl p-5 sm:p-8 border-2 border-purple-medium/50 min-w-[80px] sm:min-w-[110px] animate-breathe-strong"
        >
          <span
            class="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-b from-electric-blue to-purple-light text-gradient glow-text"
          >
            {{ String(countdown.days).padStart(2, '0') }}
          </span>
          <span class="text-sm sm:text-base text-glow-white/60 mt-3 uppercase tracking-widest font-semibold">
            天
          </span>
        </div>
        <div class="flex items-center text-electric-blue text-4xl md:text-6xl font-black animate-pulse">
          :
        </div>
        <div
          class="flex flex-col items-center bg-purple-dark/60 backdrop-blur-md rounded-2xl p-5 sm:p-8 border-2 border-purple-medium/50 min-w-[80px] sm:min-w-[110px] animate-breathe-strong"
          style="animation-delay: 0.5s"
        >
          <span
            class="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-b from-electric-blue to-purple-light text-gradient glow-text"
          >
            {{ String(countdown.hours).padStart(2, '0') }}
          </span>
          <span class="text-sm sm:text-base text-glow-white/60 mt-3 uppercase tracking-widest font-semibold">
            时
          </span>
        </div>
        <div class="flex items-center text-purple-light text-4xl md:text-6xl font-black animate-pulse" style="animation-delay: 0.3s">
          :
        </div>
        <div
          class="flex flex-col items-center bg-purple-dark/60 backdrop-blur-md rounded-2xl p-5 sm:p-8 border-2 border-purple-medium/50 min-w-[80px] sm:min-w-[110px] animate-breathe-strong"
          style="animation-delay: 1s"
        >
          <span
            class="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-b from-purple-light to-neon-pink text-gradient glow-text"
          >
            {{ String(countdown.minutes).padStart(2, '0') }}
          </span>
          <span class="text-sm sm:text-base text-glow-white/60 mt-3 uppercase tracking-widest font-semibold">
            分
          </span>
        </div>
        <div class="flex items-center text-neon-pink text-4xl md:text-6xl font-black animate-pulse" style="animation-delay: 0.6s">
          :
        </div>
        <div
          class="flex flex-col items-center bg-purple-dark/60 backdrop-blur-md rounded-2xl p-5 sm:p-8 border-2 border-purple-medium/50 min-w-[80px] sm:min-w-[110px] animate-breathe-strong"
          style="animation-delay: 1.5s"
        >
          <span
            class="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-b from-neon-pink to-electric-cyan text-gradient glow-text"
          >
            {{ String(countdown.seconds).padStart(2, '0') }}
          </span>
          <span class="text-sm sm:text-base text-glow-white/60 mt-3 uppercase tracking-widest font-semibold">
            秒
          </span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          @click="scrollToTickets"
          class="relative px-10 py-5 bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink rounded-full text-xl font-bold text-glow-white hover:shadow-2xl hover:shadow-electric-blue/60 transition-all duration-300 transform hover:scale-110 animate-pulse-glow-strong overflow-hidden group"
        >
          <span class="relative z-10">🚀 立即抢购门票</span>
          <div class="absolute inset-0 bg-gradient-to-r from-neon-pink via-purple-light to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="absolute -inset-4 rounded-full bg-gradient-to-r from-electric-blue/50 to-neon-pink/50 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
        </button>
        <button
          class="relative px-10 py-5 border-2 border-electric-blue/60 rounded-full text-xl font-bold text-electric-blue hover:bg-electric-blue/20 hover:border-electric-blue hover:text-white transition-all duration-300 transform hover:scale-110 overflow-hidden group"
        >
          <span class="relative z-10">🎤 查看演出阵容</span>
          <div class="absolute inset-0 bg-gradient-to-r from-electric-blue/20 to-purple-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
      <div
        class="flex flex-col items-center text-glow-white/60 animate-bounce-strong cursor-pointer"
        @click="scrollToTickets"
      >
        <span class="text-base mb-3 font-medium tracking-wider">向下滚动探索更多</span>
        <div class="relative">
          <svg
            class="w-8 h-8 text-electric-blue animate-pulse"
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
          <svg
            class="w-8 h-8 text-purple-light animate-pulse absolute top-4 left-0"
            style="animation-delay: 0.3s"
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
    </div>
  </section>
</template>
