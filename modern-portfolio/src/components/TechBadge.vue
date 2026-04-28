<template>
  <span 
    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
    :class="techConfig.bgColor"
  >
    <svg 
      v-if="techConfig.svg" 
      class="w-5 h-5 flex-shrink-0" 
      viewBox="0 0 128 128"
    >
      <template v-if="isSvgArray(techConfig.svg)">
        <component v-for="(item, idx) in techConfig.svg()" :key="idx" :is="item" />
      </template>
      <component v-else :is="techConfig.svg()" />
    </svg>
    <span v-else class="w-5 h-5 rounded flex items-center justify-center text-xs font-bold" :class="techConfig.bg">
      {{ techConfig.letter }}
    </span>
    <span :class="techConfig.textColor">{{ techName }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'

interface TechConfig {
  bgColor: string
  textColor: string
  bg?: string
  letter?: string
  svg?: () => ReturnType<typeof h> | ReturnType<typeof h>[]
}

const props = defineProps<{
  techName: string
}>()

const techMap: Record<string, TechConfig> = {
  'Vue.js': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    svg: () => h('path', { d: 'M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z M64,88.4L36,40.4h22.4l5.6,9.7l5.6-9.7H92L64,88.4z', fill: '#42B883' })
  },
  'Vue 3': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    svg: () => h('path', { d: 'M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z M64,88.4L36,40.4h22.4l5.6,9.7l5.6-9.7H92L64,88.4z', fill: '#42B883' })
  },
  'Vue': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    svg: () => h('path', { d: 'M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z M64,88.4L36,40.4h22.4l5.6,9.7l5.6-9.7H92L64,88.4z', fill: '#42B883' })
  },
  
  'React': {
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    svg: () => [
      h('circle', { cx: '64', cy: '64', r: '11.4', fill: '#61DAFB' }),
      h('path', { d: 'M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.2 13.9-8.3-8.7-17.2-13.9-24.2-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.2-13.9 8.3 8.7 17.2 13.9 24.2 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z', fill: '#61DAFB' })
    ]
  },
  'React Native': {
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    svg: () => [
      h('circle', { cx: '64', cy: '64', r: '11.4', fill: '#61DAFB' }),
      h('path', { d: 'M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.2 13.9-8.3-8.7-17.2-13.9-24.2-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.2-13.9 8.3 8.7 17.2 13.9 24.2 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z', fill: '#61DAFB' })
    ]
  },
  
  'TypeScript': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-600 text-white',
    letter: 'TS'
  },
  'TS': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-600 text-white',
    letter: 'TS'
  },
  
  'JavaScript': {
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-500 text-black',
    letter: 'JS'
  },
  'JS': {
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-500 text-black',
    letter: 'JS'
  },
  
  'Node.js': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-600 text-white',
    letter: 'N'
  },
  'Node': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-600 text-white',
    letter: 'N'
  },
  
  'Tailwind': {
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    svg: () => h('path', { d: 'M64 25.6c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7 6.3 6.3 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.7-12.2-8.7-6.3-6.3-13.5-13.7-29.4-13.7zM32 64c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7 6.3 6.3 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.7-12.2-8.7-6.3-6.3-13.5-13.7-29.4-13.7z', fill: '#38BDF8' })
  },
  'Tailwind CSS': {
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    svg: () => h('path', { d: 'M64 25.6c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7 6.3 6.3 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.7-12.2-8.7-6.3-6.3-13.5-13.7-29.4-13.7zM32 64c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7 6.3 6.3 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.7-12.2-8.7-6.3-6.3-13.5-13.7-29.4-13.7z', fill: '#38BDF8' })
  },
  
  'CSS': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-600 text-white',
    letter: 'C'
  },
  
  'Next.js': {
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    textColor: 'text-gray-800 dark:text-gray-200',
    bg: 'bg-black text-white',
    letter: 'N'
  },
  'Next': {
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    textColor: 'text-gray-800 dark:text-gray-200',
    bg: 'bg-black text-white',
    letter: 'N'
  },
  
  'Nuxt.js': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    svg: () => h('path', { d: 'M126.1 81.1v-.1l-.1-.1-25.6-44.3c-.3-.5-.7-1-1.2-1.4-.6-.4-1.3-.6-2.1-.6h-2c-1.1 0-2.1.5-2.7 1.3L39.3 81.1v.1c0 .2 0 .3-.1.5 0 .1 0 .2-.1.3-.1.3-.2.6-.2.8 0 .3 0 .6.1.7 0 .1.1.2.1.3.1.2.1.4.2.6.1.1.2.2.2.3.1.1.2.1.3.2.1.1.2.2.3.2.1.1.2.1.3.2.1 0 .1.1.2.1h51.2c.1 0 .2 0 .4 0 .1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2 0 .2-.1.1 0 .1 0 .2-.1.1 0 .1 0 .1-.1.1 0 .1 0 .1-.1.1 0 .1 0 .1-.1.1 0 .1 0 .1-.1 0 0 0 0 0 0v-.1zm-30.3-2.3L60.7 51.7 45 78.8h31.5z', fill: '#00DC82' })
  },
  'Nuxt': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    svg: () => h('path', { d: 'M126.1 81.1v-.1l-.1-.1-25.6-44.3c-.3-.5-.7-1-1.2-1.4-.6-.4-1.3-.6-2.1-.6h-2c-1.1 0-2.1.5-2.7 1.3L39.3 81.1v.1c0 .2 0 .3-.1.5 0 .1 0 .2-.1.3-.1.3-.2.6-.2.8 0 .3 0 .6.1.7 0 .1.1.2.1.3.1.2.1.4.2.6.1.1.2.2.2.3.1.1.2.1.3.2.1.1.2.2.3.2.1.1.2.1.3.2.1 0 .1.1.2.1h51.2c.1 0 .2 0 .4 0 .1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2 0 .2-.1.1 0 .1 0 .2-.1.1 0 .1 0 .1-.1.1 0 .1 0 .1-.1.1 0 .1 0 .1-.1 0 0 0 0 0 0v-.1zm-30.3-2.3L60.7 51.7 45 78.8h31.5z', fill: '#00DC82' })
  },
  
  'Express': {
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    textColor: 'text-gray-600 dark:text-gray-300',
    bg: 'bg-gray-600 text-white',
    letter: 'E'
  },
  
  'Python': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500 text-white',
    letter: 'Py'
  },
  
  'Go': {
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500 text-white',
    letter: 'Go'
  },
  'Golang': {
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500 text-white',
    letter: 'Go'
  },
  
  'PostgreSQL': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-700 text-white',
    letter: 'Pg'
  },
  'Postgres': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-700 text-white',
    letter: 'Pg'
  },
  'Pg': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-700 text-white',
    letter: 'Pg'
  },
  
  'MongoDB': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-600 text-white',
    letter: 'M'
  },
  'Mongo': {
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-600 text-white',
    letter: 'M'
  },
  
  'Redis': {
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-600 text-white',
    letter: 'R'
  },
  
  'Docker': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-500 dark:text-blue-300',
    bg: 'bg-blue-500 text-white',
    letter: 'D'
  },
  
  'Kubernetes': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-600 text-white',
    letter: 'K8'
  },
  'K8s': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-600 text-white',
    letter: 'K8'
  },
  
  'Git': {
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-600 dark:text-orange-400',
    svg: () => h('path', { d: 'M124.7 58.4L69.6 3.3c-3.2-3.2-8.3-3.2-11.5 0L46.7 14.7l14.5 14.5c3.4-1.1 7.2-.4 9.9 2.3 2.7 2.7 3.5 6.6 2.3 10l14 14c3.4-1.2 7.3-.4 10 2.3 3.8 3.8 3.8 9.9 0 13.7a9.7 9.7 0 01-13.7 0 9.7 9.7 0 01-2.1-10.5L68.6 67.6v34.3a9.7 9.7 0 012.6 1.8c3.8 3.8 3.8 9.9 0 13.7-3.8 3.8-9.9 3.8-13.7 0-3.8-3.8-3.8-9.9 0-13.7a9.6 9.6 0 013.2-2.1V67.3a9.6 9.6 0 01-3.2-2.1c-2.9-2.9-3.6-7.1-2.1-10.6L41.1 29.3 3.2 67.2c-3.2 3.2-3.2 8.3 0 11.5l55.1 55.1c3.2 3.2 8.3 3.2 11.5 0l54.9-54.9c3.2-3.2 3.2-8.3 0-11.5z', fill: '#F05032' })
  },
  
  'ECharts': {
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-500 dark:text-orange-400',
    bg: 'bg-orange-500 text-white',
    letter: 'E'
  },
  
  'Element Plus': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500 text-white',
    letter: 'El'
  },
  'Element': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500 text-white',
    letter: 'El'
  },
  
  'Socket.io': {
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    textColor: 'text-gray-600 dark:text-gray-300',
    bg: 'bg-gray-600 text-white',
    letter: 'S'
  },
  'Socket': {
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    textColor: 'text-gray-600 dark:text-gray-300',
    bg: 'bg-gray-600 text-white',
    letter: 'S'
  },
  
  'Firebase': {
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-500 dark:text-orange-400',
    bg: 'bg-orange-500 text-white',
    letter: 'F'
  },
  
  'Web3.js': {
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-600 text-white',
    letter: 'W3'
  },
  'Web3': {
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-600 text-white',
    letter: 'W3'
  },
  
  'WebRTC': {
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-500 dark:text-blue-300',
    bg: 'bg-blue-500 text-white',
    letter: 'W'
  }
}

const defaultConfig: TechConfig = {
  bgColor: 'bg-gray-100 dark:bg-gray-700',
  textColor: 'text-gray-500 dark:text-gray-400',
  bg: 'bg-gray-500 text-white',
  letter: '?'
}

const isSvgArray = (
  svg: () => ReturnType<typeof h> | ReturnType<typeof h>[]
): svg is () => ReturnType<typeof h>[] => {
  return Array.isArray(svg())
}

const techConfig = computed(() => {
  return techMap[props.techName] || defaultConfig
})
</script>
