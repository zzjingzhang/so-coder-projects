<script setup lang="ts">
import { Timeline } from 'ant-design-vue'

const timelineEvents = [
  {
    period: '先秦时期',
    year: '约公元前278年',
    title: '滇国建立',
    description: '古滇国在滇池周围建立，创造了灿烂的青铜文化。滇王金印的出土，印证了司马迁《史记》中关于滇国的记载。',
    color: 'amber'
  },
  {
    period: '汉代',
    year: '公元前109年',
    title: '设益州郡',
    description: '汉武帝开西南夷，设益州郡，昆明地区正式纳入中原王朝版图。云南开始与内地有了更密切的政治、经济、文化联系。',
    color: 'orange'
  },
  {
    period: '唐代',
    year: '公元765年',
    title: '南诏筑拓东城',
    description: '南诏国王阁罗凤筑拓东城，昆明正式建城。拓东城成为南诏国的东都，是昆明城市发展的重要起点。',
    color: 'yellow'
  },
  {
    period: '元代',
    year: '公元1274年',
    title: '设中庆路',
    description: '元世祖忽必烈派赛典赤·赡思丁治理云南，设中庆路，改善阐为中庆城。昆明从此成为云南政治、经济、文化中心。',
    color: 'emerald'
  },
  {
    period: '明代',
    year: '公元1382年',
    title: '筑昆明砖城',
    description: '明军平定云南，改中庆路为云南府，沐英主持修筑昆明砖城。城市格局奠定了近现代昆明城的基础。',
    color: 'teal'
  },
  {
    period: '清代',
    year: '1659年',
    title: '吴三桂据滇',
    description: '吴三桂引清兵入关后，被封为平西王，镇守云南。后举兵反清，在昆明称帝，国号大周。',
    color: 'cyan'
  },
  {
    period: '民国',
    year: '1937-1945年',
    title: '西南联大时期',
    description: '抗日战争爆发，北大、清华、南开三校南迁，在昆明成立西南联合大学。这一时期成为中国教育史上的辉煌篇章。',
    color: 'sky'
  },
  {
    period: '当代',
    year: '1999年至今',
    title: '现代昆明',
    description: '1999年昆明成功举办世界园艺博览会，城市发展进入新纪元。如今昆明正建设成为面向南亚东南亚的区域性国际中心城市。',
    color: 'blue'
  }
]

const historicSites = [
  {
    name: '西南联大旧址',
    desc: '抗战时期北大、清华、南开三校南迁的办学旧址，保存有教室、图书馆等遗迹，是中国教育史上的圣地。',
    image: 'Southwest Associated University former site Kunming historic building campus Yunnan China'
  },
  {
    name: '官渡金刚塔',
    desc: '建于明代的藏式佛塔，是中国现存最早的金刚宝座塔之一，全国重点文物保护单位。',
    image: 'Guandu Diamond Pagoda Kunming historic Buddhist architecture Ming Dynasty Yunnan'
  },
  {
    name: '圆通寺',
    desc: '昆明最古老的佛教寺院之一，始建于唐代，建筑独特，景色清幽，香火鼎盛。',
    image: 'Yuantong Temple Kunming ancient Buddhist monastery traditional architecture Yunnan China'
  }
]
</script>

<template>
  <div>
    <section
      class="relative h-[50vh] flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Southwest%20Associated%20University%20Kunming%20historic%20campus%20beautiful%20architecture%20Yunnan%20China&image_size=landscape_16_9')`
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <p class="text-lg opacity-80 mb-2 tracking-widest">HISTORY</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-4">历史昆明</h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          两千余年建城史，见证古滇文明的辉煌与现代春城的崛起
        </p>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-b from-amber-50 to-white">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-4">
            历史沿革
          </span>
          <h2 class="text-3xl font-bold text-gray-800">昆明的历史足迹</h2>
        </div>

        <Timeline mode="left" class="history-timeline">
          <Timeline.Item
            v-for="(event, index) in timelineEvents"
            :key="index"
            :color="event.color"
          >
            <div class="bg-white rounded-xl p-6 shadow-md mb-4">
              <div class="flex items-center gap-3 mb-2">
                <span class="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  {{ event.period }}
                </span>
                <span class="text-sm text-gray-500">{{ event.year }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ event.title }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ event.description }}</p>
            </div>
          </Timeline.Item>
        </Timeline>
      </div>
    </section>

    <section class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
            历史印记
          </span>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">寻访历史古迹</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            这些历史遗迹，是昆明千年历史的见证者
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(site, index) in historicSites"
            :key="index"
            class="group cursor-pointer"
          >
            <div
              class="h-56 rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all"
              :style="{
                backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(site.image)}&image_size=square_hd')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
            ></div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ site.name }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ site.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">西南联大：教育史上的奇迹</h2>
          <p class="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            1937年，抗日战争全面爆发，北京大学、清华大学、南开大学被迫南迁，
            在昆明组成了"国立西南联合大学"。在极其艰苦的条件下，
            西南联大培养出了杨振宁、李政道、邓稼先等一大批杰出人才，
            创造了中国乃至世界教育史上的奇迹。
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-amber-400 mb-2">8年</div>
            <p class="text-gray-300 text-sm">办学时间</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-amber-400 mb-2">3882</div>
            <p class="text-gray-300 text-sm">毕业学生</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-amber-400 mb-2">174</div>
            <p class="text-gray-300 text-sm">两院院士</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl md:text-4xl font-bold text-amber-400 mb-2">2位</div>
            <p class="text-gray-300 text-sm">诺贝尔奖得主</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.history-timeline {
  :deep(.ant-timeline-item-content) {
    left: 40px;
    width: calc(100% - 40px);
  }
}
</style>
