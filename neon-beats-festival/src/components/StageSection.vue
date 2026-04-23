<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Stage {
  id: number
  name: string
  description: string
  capacity: string
  image: string
  color: string
  features: string[]
}

const stages = ref<Stage[]>([
  {
    id: 1,
    name: 'NEON 主舞台',
    description: '最大的主舞台，配备最先进的音响系统和震撼的灯光效果，是音乐节的核心区域',
    capacity: '容纳 50,000+ 观众',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=massive%20electronic%20music%20festival%20main%20stage%20with%20neon%20purple%20and%20blue%20lights%20laser%20show%20pyrotechnics%20huge%20LED%20screens&image_size=landscape_16_9',
    color: 'electric-blue',
    features: ['360度环绕音响', 'LED大屏', '激光特效', '烟火表演'],
  },
  {
    id: 2,
    name: 'TECHNO 地下舞台',
    description: '专为地下电子音乐爱好者打造，暗黑工业风格，沉浸式的Techno体验',
    capacity: '容纳 15,000+ 观众',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=underground%20techno%20music%20stage%20dark%20industrial%20style%20minimal%20lighting%20purple%20neon%20strobes%20warehouse%20rave%20atmosphere&image_size=landscape_16_9',
    color: 'purple-light',
    features: ['4D声场系统', '烟雾效果', '频闪灯效', '工业风设计'],
  },
  {
    id: 3,
    name: 'HOUSE 海滩舞台',
    description: '轻松愉悦的House音乐区域，模拟海滩氛围，让你在音乐中感受夏日风情',
    capacity: '容纳 10,000+ 观众',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tropical%20house%20music%20beach%20stage%20palm%20trees%20neon%20pink%20and%20blue%20lights%20summer%20vibes%20pool%20party%20atmosphere&image_size=landscape_16_9',
    color: 'neon-pink',
    features: ['沙滩区域', '泳池酒吧', '遮阳休息区', '日落派对'],
  },
  {
    id: 4,
    name: 'BASS 低音舞台',
    description: '重型低音爱好者的天堂，Dubstep、Trap、Drum & Bass，让你的身体随低音震动',
    capacity: '容纳 12,000+ 观众',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dubstep%20bass%20music%20stage%20heavy%20subwoofers%20neon%20cyan%20and%20purple%20lights%20energy%20mosh%20pit%20electronic%20concert&image_size=landscape_16_9',
    color: 'electric-cyan',
    features: ['超重低音系统', '舞池区域', 'Bass Cannon', '头部 banging 区'],
  },
  {
    id: 5,
    name: 'ELECTRONIC 实验舞台',
    description: '探索电子音乐的边界，实验电子、氛围音乐、IDM，发现最前沿的电子声音',
    capacity: '容纳 8,000+ 观众',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=experimental%20electronic%20music%20stage%20futuristic%20design%20minimalist%20neon%20purple%20glow%20ambient%20lighting%20art%20installation&image_size=landscape_16_9',
    color: 'purple-medium',
    features: ['艺术装置', '视觉投影', '沉浸式体验', '先锋音乐'],
  },
])

const activeStage = ref(0)
let stageInterval: ReturnType<typeof setInterval>

const nextStage = () => {
  activeStage.value = (activeStage.value + 1) % stages.value.length
}

const prevStage = () => {
  activeStage.value = (activeStage.value - 1 + stages.value.length) % stages.value.length
}

const setActiveStage = (index: number) => {
  activeStage.value = index
}

onMounted(() => {
  stageInterval = setInterval(nextStage, 5000)
})

onUnmounted(() => {
  if (stageInterval) {
    clearInterval(stageInterval)
  }
})
</script>

<template>
  <section id="stage" class="py-20 bg-gradient-to-b from-purple-dark to-deep-purple relative overflow-hidden">
    <div class="absolute top-10 right-20 w-80 h-80 bg-electric-cyan/15 rounded-full blur-3xl animate-float-sway"></div>
    <div class="absolute bottom-40 left-10 w-64 h-64 bg-purple-light/20 rounded-full blur-3xl animate-float-sway-reverse"></div>
    <div class="absolute top-1/3 right-1/3 w-48 h-48 bg-neon-pink/10 rounded-full blur-3xl animate-breathe"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <span
          class="inline-block px-6 py-2 bg-gradient-to-r from-electric-blue/20 to-electric-cyan/20 border border-electric-blue/50 rounded-full text-electric-cyan text-sm font-semibold tracking-wider uppercase mb-6 animate-border-glow-rotate"
        >
          5大主题舞台
        </span>
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-electric-blue via-electric-cyan to-neon-pink text-gradient glow-text-strong animate-typography"
        >
          舞台体验
        </h2>
        <p class="text-lg text-glow-white/70 max-w-2xl mx-auto">
          5大主题舞台，每种音乐风格都有专属的沉浸式体验空间，让你在音乐节中找到属于自己的节奏
        </p>
      </div>

      <div class="relative rounded-3xl overflow-hidden bg-purple-dark/50 border-2 border-purple-medium/40 shadow-2xl shadow-purple-dark/50">
        <div class="relative h-80 sm:h-96 md:h-[500px] overflow-hidden">
          <transition-group name="stage-slide" tag="div">
            <div
              v-for="(stage, index) in stages"
              :key="stage.id"
              v-show="index === activeStage"
              class="absolute inset-0"
            >
              <img
                :src="stage.image"
                :alt="stage.name"
                class="w-full h-full object-cover transition-transform duration-[3000ms] animate-ken-burns"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-purple-dark via-purple-dark/60 to-transparent"
              ></div>
              <div
                :class="[
                  'absolute inset-0 opacity-40 transition-opacity duration-1000',
                  stage.color === 'electric-blue' ? 'bg-gradient-to-br from-electric-blue/30 to-transparent' :
                  stage.color === 'purple-light' ? 'bg-gradient-to-br from-purple-light/30 to-transparent' :
                  stage.color === 'neon-pink' ? 'bg-gradient-to-br from-neon-pink/30 to-transparent' :
                  stage.color === 'electric-cyan' ? 'bg-gradient-to-br from-electric-cyan/30 to-transparent' :
                  'bg-gradient-to-br from-purple-medium/30 to-transparent'
                ]"
              ></div>

              <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    :class="[
                      'w-4 h-4 rounded-full animate-pulse-glow-strong',
                      stage.color === 'electric-blue' ? 'bg-electric-blue shadow-[0_0_20px_rgba(0,212,255,0.8)]' :
                      stage.color === 'purple-light' ? 'bg-purple-light shadow-[0_0_20px_rgba(168,85,247,0.8)]' :
                      stage.color === 'neon-pink' ? 'bg-neon-pink shadow-[0_0_20px_rgba(236,72,153,0.8)]' :
                      stage.color === 'electric-cyan' ? 'bg-electric-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' :
                      'bg-purple-medium shadow-[0_0_20px_rgba(147,51,234,0.8)]'
                    ]"
                  ></div>
                  <span class="text-sm text-glow-white/70">{{ stage.capacity }}</span>
                </div>
                <h3
                  class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-glow-white mb-4 glow-text-strong animate-slide-up"
                >
                  {{ stage.name }}
                </h3>
                <p class="text-lg text-glow-white/80 max-w-2xl mb-6 animate-slide-up" style="animation-delay: 100ms">
                  {{ stage.description }}
                </p>
                <div class="flex flex-wrap gap-3" style="animation-delay: 200ms">
                  <span
                    v-for="feature in stage.features"
                    :key="feature"
                    :class="[
                      'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105',
                      stage.color === 'electric-blue' ? 'bg-electric-blue/30 text-electric-blue border border-electric-blue/50 shadow-[0_0_15px_rgba(0,212,255,0.3)]' :
                      stage.color === 'purple-light' ? 'bg-purple-light/30 text-purple-light border border-purple-light/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' :
                      stage.color === 'neon-pink' ? 'bg-neon-pink/30 text-neon-pink border border-neon-pink/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]' :
                      stage.color === 'electric-cyan' ? 'bg-electric-cyan/30 text-electric-cyan border border-electric-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' :
                      'bg-purple-medium/30 text-purple-light border border-purple-medium/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                    ]"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <button
          @click="prevStage"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-deep-purple/80 backdrop-blur-sm text-glow-white hover:bg-electric-blue/80 transition-all duration-300 flex items-center justify-center z-10 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] active:scale-95 border border-electric-blue/30"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextStage"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-deep-purple/80 backdrop-blur-sm text-glow-white hover:bg-electric-blue/80 transition-all duration-300 flex items-center justify-center z-10 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] active:scale-95 border border-electric-blue/30"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="flex justify-center gap-3 py-6 bg-purple-dark/70 backdrop-blur-sm">
          <button
            v-for="(stage, index) in stages"
            :key="stage.id"
            @click="setActiveStage(index)"
            :class="[
              'h-4 rounded-full transition-all duration-500 transform',
              index === activeStage
                ? 'w-12 bg-gradient-to-r from-electric-blue to-electric-cyan shadow-[0_0_20px_rgba(0,212,255,0.6)] animate-pulse-glow'
                : 'w-4 bg-purple-medium/50 hover:bg-purple-light/70 hover:scale-110 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]'
            ]"
          ></button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
        <div
          v-for="(stage, index) in stages"
          :key="stage.id"
          @click="setActiveStage(index)"
          :class="[
            'cursor-pointer p-6 rounded-2xl border transition-all duration-500 transform group',
            'hover:-translate-y-2 hover:scale-[1.02]',
            index === activeStage
              ? 'bg-gradient-to-br from-electric-blue/20 to-purple-light/20 border-electric-blue/60 shadow-[0_0_40px_rgba(0,212,255,0.3)] animate-border-glow-rotate'
              : 'bg-purple-dark/30 border-purple-medium/30 hover:border-electric-blue/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]'
          ]"
        >
          <div
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500',
              stage.color === 'electric-blue' ? 'bg-electric-blue/20 group-hover:bg-electric-blue/30' :
              stage.color === 'purple-light' ? 'bg-purple-light/20 group-hover:bg-purple-light/30' :
              stage.color === 'neon-pink' ? 'bg-neon-pink/20 group-hover:bg-neon-pink/30' :
              stage.color === 'electric-cyan' ? 'bg-electric-cyan/20 group-hover:bg-electric-cyan/30' :
              'bg-purple-medium/20 group-hover:bg-purple-medium/30',
              index === activeStage ? 'animate-breathe shadow-lg' : ''
            ]"
          >
            <svg
              :class="[
                'w-6 h-6 transition-transform duration-300 group-hover:scale-110',
                stage.color === 'electric-blue' ? 'text-electric-blue' :
                stage.color === 'purple-light' ? 'text-purple-light' :
                stage.color === 'neon-pink' ? 'text-neon-pink' :
                stage.color === 'electric-cyan' ? 'text-electric-cyan' :
                'text-purple-light'
              ]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <h4
            :class="[
              'font-bold mb-2 transition-all duration-300',
              index === activeStage ? 'text-electric-blue text-lg' : 'text-glow-white group-hover:text-electric-blue'
            ]"
          >
            {{ stage.name }}
          </h4>
          <p class="text-sm text-glow-white/60 group-hover:text-glow-white/80 transition-colors duration-300">{{ stage.features.length }} 大特色</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-slide-enter-active,
.stage-slide-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.stage-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(1.1);
}

.stage-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
}
</style>
