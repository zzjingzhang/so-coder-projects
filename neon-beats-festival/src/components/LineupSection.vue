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
  <section id="lineup" class="py-20 bg-gradient-to-b from-deep-purple to-purple-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span
          class="inline-block px-6 py-2 bg-gradient-to-r from-purple-light/20 to-neon-pink/20 border border-purple-light/50 rounded-full text-purple-light text-sm font-semibold tracking-wider uppercase mb-6"
        >
          顶级艺人阵容
        </span>
        <h2
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink text-gradient glow-text"
        >
          演出阵容
        </h2>
        <p class="text-lg text-glow-white/70 max-w-2xl mx-auto">
          来自全球的顶级电子音乐艺人，3天不间断的音乐盛宴，让你沉浸在最纯粹的电子音乐世界中
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="day in days"
          :key="day.value"
          @click="filterArtists(day.value)"
          :class="[
            'px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105',
            selectedDay === day.value
              ? 'bg-gradient-to-r from-electric-blue to-purple-light text-glow-white shadow-lg shadow-electric-blue/30'
              : 'bg-purple-dark/50 text-glow-white/70 border border-purple-medium/30 hover:border-electric-blue/50',
          ]"
        >
          {{ day.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="artist in filteredArtists"
          :key="artist.id"
          class="group relative bg-purple-dark/50 rounded-2xl overflow-hidden border border-purple-medium/30 hover:border-electric-blue/50 transition-all duration-500 transform hover:-translate-y-2"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              :src="artist.image"
              :alt="artist.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-purple-dark via-purple-dark/50 to-transparent"
            ></div>
            <div
              class="absolute top-4 right-4 px-3 py-1 bg-electric-blue/80 backdrop-blur-sm rounded-full text-xs font-bold text-glow-white"
            >
              {{ artist.day }}
            </div>
          </div>

          <div class="p-6">
            <h3
              class="text-2xl font-bold text-glow-white mb-2 group-hover:text-electric-blue transition-colors duration-300"
            >
              {{ artist.name }}
            </h3>
            <p class="text-electric-cyan text-sm mb-4">{{ artist.genre }}</p>
            <div
              class="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                class="flex items-center gap-2 text-electric-blue hover:text-purple-light transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8 5v14l11-7z"
                  />
                </svg>
                <span class="text-sm font-medium">查看演出</span>
              </button>
              <button
                class="p-2 rounded-full bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            class="absolute inset-0 border-2 border-transparent group-hover:border-electric-blue/30 rounded-2xl transition-all duration-500 pointer-events-none"
          ></div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button
          class="px-8 py-4 border-2 border-electric-blue/50 rounded-full text-lg font-bold text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue transition-all duration-300 transform hover:scale-105"
        >
          查看完整阵容
        </button>
      </div>
    </div>
  </section>
</template>
