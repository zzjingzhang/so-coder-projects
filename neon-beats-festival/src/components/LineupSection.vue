<script setup lang="ts">
import { ref } from 'vue'

interface Artist {
  id: number
  name: string
  genre: string
  day: string
  image: string
  featured?: boolean
}

const artists = ref<Artist[]>([
  {
    id: 1,
    name: 'Skrillex',
    genre: 'Dubstep / EDM',
    day: 'Day 1',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=electronic%20music%20DJ%20Skrillex%20performing%20on%20stage%20with%20neon%20lights%20dubstep%20EDM%20concert&image_size=square',
    featured: true,
  },
  {
    id: 2,
    name: 'Martin Garrix',
    genre: 'Progressive House',
    day: 'Day 1',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=young%20Dutch%20DJ%20Martin%20Garrix%20electronic%20dance%20music%20producer%20concert%20stage%20neon&image_size=square',
    featured: true,
  },
  {
    id: 3,
    name: 'Charlotte de Witte',
    genre: 'Techno',
    day: 'Day 1',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Belgian%20techno%20DJ%20Charlotte%20de%20Witte%20dark%20industrial%20techno%20performance%20purple%20lights&image_size=square',
    featured: true,
  },
  {
    id: 4,
    name: 'Calvin Harris',
    genre: 'Pop EDM',
    day: 'Day 2',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Scottish%20DJ%20Calvin%20Harris%20pop%20electronic%20dance%20music%20festival%20performance%20colorful%20stage&image_size=square',
    featured: true,
  },
  {
    id: 5,
    name: 'Amelie Lens',
    genre: 'Techno',
    day: 'Day 2',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Belgian%20techno%20artist%20Amelie%20Lens%20underground%20rave%20dark%20techno%20blue%20neon%20lights&image_size=square',
    featured: true,
  },
  {
    id: 6,
    name: 'Tiësto',
    genre: 'Trance / EDM',
    day: 'Day 2',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=legendary%20Dutch%20DJ%20Tiesto%20trance%20music%20godfather%20electronic%20dance%20festival%20epic%20stage&image_size=square',
    featured: true,
  },
  {
    id: 7,
    name: 'Armin van Buuren',
    genre: 'Trance',
    day: 'Day 3',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dutch%20trance%20DJ%20Armin%20van%20Buuren%20A%20State%20of%20Trance%20uplifting%20electronic%20music%20blue%20stage&image_size=square',
    featured: true,
  },
  {
    id: 8,
    name: 'Eric Prydz',
    genre: 'Progressive House',
    day: 'Day 3',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Swedish%20DJ%20Eric%20Prydz%20progressive%20house%20Pryda%20epic%20electronic%20music%20visuals%20purple%20pink&image_size=square',
    featured: true,
  },
  {
    id: 9,
    name: 'Carl Cox',
    genre: 'Techno / House',
    day: 'Day 3',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=legendary%20British%20DJ%20Carl%20Cox%20techno%20house%20music%20icon%20Ibiza%20style%20performance%20warm%20lights&image_size=square',
    featured: true,
  },
])

const selectedDay = ref('all')

const filteredArtists = ref<Artist[]>([])

const filterArtists = (day: string) => {
  selectedDay.value = day
  if (day === 'all') {
    filteredArtists.value = artists.value
  } else {
    filteredArtists.value = artists.value.filter((artist) => artist.day === day)
  }
}

filterArtists('all')

const days = [
  { value: 'all', label: '全部阵容' },
  { value: 'Day 1', label: 'Day 1 - 8.15' },
  { value: 'Day 2', label: 'Day 2 - 8.16' },
  { value: 'Day 3', label: 'Day 3 - 8.17' },
]
</script>

<template>
  <section id="lineup" class="py-20 bg-gradient-to-b from-deep-purple to-purple-dark relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-light/15 rounded-full blur-3xl animate-float-sway"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-electric-blue/15 rounded-full blur-3xl animate-float-sway-alt"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <span
          class="inline-block px-8 py-3 bg-gradient-to-r from-purple-light/30 to-neon-pink/30 border-2 border-purple-light/60 rounded-full text-purple-light text-base font-bold tracking-wider uppercase mb-8 animate-flicker-slow"
        >
          <span class="animate-bounce-strong inline-block">🎧</span>
          顶级艺人阵容
          <span class="animate-bounce-strong inline-block" style="animation-delay: 0.3s">🎧</span>
        </span>
        <h2
          class="text-5xl sm:text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink text-gradient glow-text-strong animate-typography"
        >
          演出阵容
        </h2>
        <p class="text-xl text-glow-white/70 max-w-3xl mx-auto leading-relaxed">
          来自全球的顶级电子音乐艺人，3天不间断的音乐盛宴，让你沉浸在最纯粹的电子音乐世界中
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="day in days"
          :key="day.value"
          @click="filterArtists(day.value)"
          :class="[
            'px-8 py-4 rounded-full font-bold text-lg transition-all duration-400 transform relative overflow-hidden group',
            selectedDay === day.value
              ? 'bg-gradient-to-r from-electric-blue to-purple-light text-glow-white shadow-2xl shadow-electric-blue/40 scale-105 animate-border-glow-rotate'
              : 'bg-purple-dark/60 text-glow-white/80 border-2 border-purple-medium/40 hover:border-electric-blue/60 hover:bg-electric-blue/10 hover:scale-105 hover:shadow-lg hover:shadow-electric-blue/20',
          ]"
        >
          <span class="relative z-10">{{ day.label }}</span>
          <div
            v-if="selectedDay === day.value"
            class="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-electric-blue/20 animate-breathe"
          ></div>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(artist, index) in filteredArtists"
          :key="artist.id"
          class="group relative bg-purple-dark/60 rounded-3xl overflow-hidden border-2 border-purple-medium/40 transition-all duration-500 transform hover:-translate-y-6 hover:shadow-2xl hover:shadow-electric-blue/30"
          :style="{
            animationDelay: `${index * 0.1}s`,
          }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-electric-blue/0 via-purple-light/0 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div class="relative h-72 overflow-hidden">
            <img
              :src="artist.image"
              :alt="artist.name"
              class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-purple-dark via-purple-dark/60 to-transparent"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div
              class="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-electric-blue/90 to-purple-light/90 backdrop-blur-md rounded-full text-sm font-bold text-glow-white shadow-lg shadow-electric-blue/40 animate-pulse-glow"
            >
              <span class="animate-bounce-strong inline-block">{{ artist.day }}</span>
            </div>

            <div
              class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            ></div>
          </div>

          <div class="p-8">
            <h3
              class="text-3xl font-black text-glow-white mb-3 group-hover:text-electric-blue transition-colors duration-300 glow-text group-hover:glow-text-strong"
            >
              {{ artist.name }}
            </h3>
            <p class="text-electric-cyan text-base mb-6 font-semibold flex items-center gap-2">
              <span class="w-2 h-2 bg-electric-cyan rounded-full animate-pulse"></span>
              {{ artist.genre }}
            </p>
            <div
              class="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
            >
              <button
                class="flex items-center gap-3 text-electric-blue hover:text-purple-light transition-colors duration-300 font-bold text-base group"
              >
                <div
                  class="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center transition-all duration-300 group-hover:bg-electric-blue group-hover:text-white animate-breathe"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M8 5v14l11-7z"
                    />
                  </svg>
                </div>
                <span>查看演出</span>
              </button>
              <button
                class="w-12 h-12 rounded-full bg-electric-blue/20 text-electric-blue hover:bg-neon-pink hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-neon-pink/40"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            class="absolute inset-0 border-2 border-transparent group-hover:border-electric-blue/50 rounded-3xl transition-all duration-500 pointer-events-none"
          ></div>

          <div
            class="absolute -inset-4 bg-gradient-to-r from-electric-blue/0 via-purple-light/20 to-neon-pink/0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          ></div>
        </div>
      </div>

      <div class="text-center mt-16">
        <button
          class="relative px-12 py-5 border-2 border-electric-blue/60 rounded-full text-xl font-bold text-electric-blue hover:bg-gradient-to-r from-electric-blue to-purple-light hover:text-white hover:border-transparent hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-400 transform hover:scale-110 overflow-hidden group"
        >
          <span class="relative z-10">🎵 查看完整阵容</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-electric-blue to-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          ></div>
        </button>
      </div>
    </div>
  </section>
</template>
