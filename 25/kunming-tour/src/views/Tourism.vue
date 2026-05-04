<script setup lang="ts">
const attractions = [
  {
    name: '石林风景区',
    description: '世界自然遗产，被誉为"天下第一奇观"、"上帝的盆景"。亿万年前的海底世界，历经沧桑变化，形成了这片壮丽的喀斯特地貌。',
    image: 'stone-forest-landscape',
    tags: ['5A景区', '世界遗产', '必游'],
    location: '昆明市石林彝族自治县'
  },
  {
    name: '滇池',
    description: '昆明的母亲湖，中国第六大淡水湖。滇池如一颗璀璨的高原明珠，西山如美人仰卧湖畔，"睡美人"的传说令人心驰神往。',
    image: 'dianchi-lake-sunset',
    tags: ['城市地标', '日落胜地', '观鸟'],
    location: '昆明市西山区'
  },
  {
    name: '西山龙门',
    description: '龙门石窟凿于清代，历时72年完成。登临龙门，可俯瞰滇池全景，"龙门一跃"寓意金榜题名，是昆明最具代表性的人文景观。',
    image: 'west-mountain-dragon-gate',
    tags: ['历史古迹', '俯瞰全景', '徒步'],
    location: '昆明市西山区西山森林公园'
  },
  {
    name: '翠湖公园',
    description: '昆明城中心的翡翠，被誉为"城中之玉"。每年冬季，成千上万的红嘴鸥从西伯利亚飞来越冬，人鸥和谐的画面成为春城最美的风景。',
    image: 'green-lake-park',
    tags: ['城市公园', '红嘴鸥', '免费开放'],
    location: '昆明市五华区翠湖南路'
  },
  {
    name: '云南民族村',
    description: '荟萃云南26个民族的建筑、服饰、歌舞、节庆。在这里，你可以一日游遍云南，感受各民族独特的风情文化。',
    image: 'yunnan-nationalities-village',
    tags: ['民族文化', '表演', '互动体验'],
    location: '昆明市西山区滇池路'
  },
  {
    name: '金殿风景区',
    description: '太和宫金殿铸于明代，是中国现存最大的铜殿。山上茶花、杜鹃、玉兰争奇斗艳，"金殿朝晖"是昆明著名胜景。',
    image: 'golden-temple-kunming',
    tags: ['历史古迹', '道教圣地', '茶花'],
    location: '昆明市盘龙区鸣凤山麓'
  },
  {
    name: '斗南花卉市场',
    description: '亚洲最大的鲜切花交易市场，中国的"花都"。在这里，鲜花论斤卖，夜晚的拍卖市场更是一番独特的景象。',
    image: 'dounan-flower-market',
    tags: ['花卉市场', '夜游', '购物'],
    location: '昆明市呈贡区斗南街道'
  },
  {
    name: '官渡古镇',
    description: '昆明著名的历史文化古镇，保存有众多明清建筑。古镇里的金刚塔是全国重点文物保护单位，特色小吃更是不容错过。',
    image: 'guandu-ancient-town',
    tags: ['古镇', '特色小吃', '历史文化'],
    location: '昆明市官渡区官渡街道'
  }
]

const seasons = [
  { season: '春季', months: '3-5月', desc: '樱花、海棠、杜鹃盛开，春城最美的季节', icon: '🌸' },
  { season: '夏季', months: '6-8月', desc: '气温适宜，是避暑胜地，可赏荷花', icon: '☀️' },
  { season: '秋季', months: '9-11月', desc: '秋高气爽，红塔山银杏金黄，气候宜人', icon: '🍂' },
  { season: '冬季', months: '12-2月', desc: '红嘴鸥飞来越冬，可在翠湖、滇池观鸟', icon: '🦅' }
]
</script>

<template>
  <!-- 页面容器 - 确保整页居中 -->
  <div class="w-full min-h-screen bg-gray-50">
    <!-- 英雄区域 -->
    <section class="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunming%20Stone%20Forest%20scenic%20view%20sunrise%20beautiful%20karst%20landscape%20Yunnan%20China&image_size=landscape_16_9')`
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>
      <div class="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p class="text-lg opacity-80 mb-2 tracking-widest">EXPLORE</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-4">旅游昆明</h1>
        <p class="text-lg md:text-xl opacity-90">
          探索这座春城的无限风光，感受大自然的鬼斧神工
        </p>
      </div>
    </section>

    <!-- 最佳旅游时间 -->
    <section class="w-full py-16 px-4 sm:px-6 bg-white">
      <div class="w-full max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-4">
            最佳旅游时间
          </span>
          <h2 class="text-3xl font-bold text-gray-800">四季皆宜，各有精彩</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div
            v-for="(item, index) in seasons"
            :key="index"
            class="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span class="text-5xl block mb-4">{{ item.icon }}</span>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.season }}</h3>
            <p class="text-emerald-600 font-medium mb-3">{{ item.months }}</p>
            <p class="text-gray-600 text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 必游景点 -->
    <section class="w-full py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div class="w-full max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4">
            必游景点
          </span>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">昆明不可错过的风景</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            从世界自然遗产到城市公园，从历史古迹到现代花都，昆明的每一处风景都值得细细品味
          </p>
        </div>

        <!-- [AI-GEN] 使用纯 Tailwind 自定义卡片，确保间距和布局正确 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(attraction, index) in attractions"
            :key="index"
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div class="flex flex-col sm:flex-row">
              <!-- 图片区域 -->
              <div class="sm:w-2/5 h-56 sm:h-auto min-h-[200px] relative">
                <img
                  :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(attraction.name + ' Kunming Yunnan China beautiful scenery')}&image_size=square_hd`"
                  :alt="attraction.name"
                  class="w-full h-full object-cover"
                />
                <!-- 图片加载失败时的备用背景 -->
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-300 flex items-center justify-center -z-10">
                  <span class="text-4xl">🏞️</span>
                </div>
              </div>
              
              <!-- 文字区域 -->
              <div class="sm:w-3/5 p-6 sm:p-8">
                <!-- 标签 -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="(tag, tagIndex) in attraction.tags"
                    :key="tagIndex"
                    class="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <!-- 标题 -->
                <h3 class="text-xl font-bold text-gray-800 mb-3">{{ attraction.name }}</h3>
                
                <!-- 描述 -->
                <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ attraction.description }}</p>
                
                <!-- 位置 -->
                <div class="flex items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="truncate">{{ attraction.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="w-full py-16 px-4 sm:px-6 bg-white">
      <div class="w-full max-w-6xl mx-auto">
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 md:p-12 text-white">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold mb-3">200+</div>
              <p class="text-emerald-100 text-base">景点数量</p>
            </div>
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold mb-3">15°C</div>
              <p class="text-emerald-100 text-base">年均气温</p>
            </div>
            <div class="p-4">
              <div class="text-4xl md:text-5xl font-bold mb-3">4+</div>
              <p class="text-emerald-100 text-base">5A级景区</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
