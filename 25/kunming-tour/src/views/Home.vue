<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const highlights = [
  {
    title: '四季如春',
    description: '年均气温15°C，冬无严寒，夏无酷暑，鲜花常开，被誉为"春城"',
    icon: '🌸'
  },
  {
    title: '高原明珠',
    description: '海拔1891米，空气清新，阳光充足，是理想的宜居城市',
    icon: '🌄'
  },
  {
    title: '民族风情',
    description: '26个民族在此聚居，多元文化交融，民俗风情绚丽多彩',
    icon: '🎭'
  },
  {
    title: '历史名城',
    description: '建城两千余年，古滇文化发源地，西南丝绸之路的重要枢纽',
    icon: '🏛️'
  }
]

const quickLinks = [
  { path: '/tourism', title: '探索美景', desc: '石林、滇池、西山...', color: 'from-emerald-400 to-teal-500' },
  { path: '/history', title: '触摸历史', desc: '古滇王国、西南联大...', color: 'from-amber-400 to-orange-500' },
  { path: '/economy', title: '发展活力', desc: '春城经济、产业崛起...', color: 'from-sky-400 to-blue-500' },
  { path: '/culture', title: '感受文化', desc: '滇剧、花灯、民族节日...', color: 'from-pink-400 to-rose-500' }
]

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div>
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunming%20China%20spring%20city%20beautiful%20landscape%20with%20Dianchi%20Lake%20and%20mountains%20sunny%20day%20panoramic%20view&image_size=landscape_16_9')`
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p class="text-lg md:text-xl opacity-90 mb-4 tracking-widest uppercase">彩云之南</p>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-300">
            昆明
          </span>
        </h1>
        <p class="text-xl md:text-2xl font-light mb-8 opacity-90">
          这座城 · 四季如春
        </p>
        <p class="text-base md:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed mb-10">
          在云贵高原的怀抱中，有一座城，她被春风温柔地拥抱着，被滇池的碧波轻轻环绕着。
          这里的花儿永不凋谢，这里的阳光永远明媚。这就是昆明，一座让时光慢下来的城市。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a-button
            type="primary"
            size="large"
            class="!bg-emerald-500 !border-emerald-500 !hover:bg-emerald-600 !text-white !h-12 !px-8 !rounded-full !text-base"
            @click="navigateTo('/tourism')"
          >
            开始探索
          </a-button>
          <a-button
            size="large"
            class="!bg-white/10 !border-white/30 !text-white !hover:bg-white/20 !h-12 !px-8 !rounded-full !text-base !backdrop-blur-sm"
            @click="navigateTo('/history')"
          >
            了解更多
          </a-button>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-4">
            印象昆明
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            为什么是昆明？
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            昆明，这座独特的城市，拥有让人一见倾心的魅力
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(item, index) in highlights"
            :key="index"
            class="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span class="text-4xl block mb-4">{{ item.icon }}</span>
            <h3 class="text-xl font-bold text-gray-800 mb-3">{{ item.title }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 bg-gradient-to-b from-sky-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div
              class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              :style="{
                backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunming%20Dianchi%20Lake%20panorama%20with%20mountains%20beautiful%20sunset%20scenery%20China%20Yunnan&image_size=landscape_4_3')`
              }"
            ></div>
            <div class="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 hidden md:block">
              <div class="text-center">
                <span class="text-3xl font-bold text-emerald-600">2400+</span>
                <p class="text-sm text-gray-600 mt-1">年历史</p>
              </div>
            </div>
          </div>
          <div>
            <span class="inline-block px-4 py-1 bg-sky-50 text-sky-600 rounded-full text-sm font-medium mb-4">
              关于这座城
            </span>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">
              春城，一座来了就不想走的城市
            </h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                昆明，云南省省会，地处中国西南边陲、云贵高原中部。这里气候宜人，四季如春，
                因此得名"春城"。滇池如一颗璀璨的明珠镶嵌在城市南端，西山如一位沉睡的美人静静守护。
              </p>
              <p>
                这里是古滇文化的发祥地，两千多年的历史长河中，昆明见证了滇王国的辉煌，
                西南丝绸之路的繁华，西南联大的学术荣光。如今，她正以开放包容的姿态，
                成为面向南亚东南亚的区域性国际中心城市。
              </p>
              <p>
                在这里，你可以在翠湖喂红嘴鸥，在石林探秘喀斯特地貌，在滇池畔看日落，
                在斗南花市感受鲜花的海洋。昆明，用她独特的魅力，等待着每一位远道而来的客人。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-4">
            探索更多
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            发现昆明的每一面
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            点击下方卡片，深入了解昆明的旅游、历史、经济与文化
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(link, index) in quickLinks"
            :key="index"
            class="group cursor-pointer"
            @click="navigateTo(link.path)"
          >
            <div
              :class="[
                'relative h-48 rounded-2xl overflow-hidden mb-4',
                'bg-gradient-to-br',
                link.color
              ]"
            >
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center text-white">
                  <h3 class="text-xl font-bold mb-2">{{ link.title }}</h3>
                  <p class="text-sm opacity-90">{{ link.desc }}</p>
                </div>
              </div>
              <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative py-24 px-4"
      :style="{
        backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunming%20night%20view%20city%20lights%20beautiful%20skyline%20Yunnan%20China%20panoramic&image_size=landscape_16_9')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="relative z-10 max-w-4xl mx-auto text-center text-white">
        <blockquote class="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
          "昆明腊月可无裘，三伏轻棉汗不流。<br />
          梅雨知时常淅沥，芭蕉弄雨满前头。"
        </blockquote>
        <cite class="text-lg opacity-80">—— 杨慎《滇海曲》</cite>
      </div>
    </section>
  </div>
</template>
