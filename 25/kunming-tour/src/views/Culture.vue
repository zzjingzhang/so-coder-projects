<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from 'ant-design-vue'

const activeTab = ref('ethnic')

const ethnicGroups = [
  {
    name: '彝族',
    feature: '火把节是彝族最盛大的节日，每年农历六月二十四日，人们点燃火把，载歌载舞，祈求平安丰收。',
    icon: '🔥',
    color: 'from-red-400 to-orange-500'
  },
  {
    name: '白族',
    feature: '白族以"三道茶"闻名，一苦二甜三回味，是白族待客的最高礼仪。白族建筑、扎染工艺独具特色。',
    icon: '🍵',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    name: '傣族',
    feature: '泼水节是傣族最隆重的节日，人们用纯净的清水相互泼洒，祈求洗去过去一年的不顺，迎接新的一年。',
    icon: '💦',
    color: 'from-sky-400 to-blue-500'
  },
  {
    name: '纳西族',
    feature: '纳西族拥有独特的东巴文化，东巴文是世界上唯一活着的象形文字，《纳西古乐》被誉为"音乐活化石"。',
    icon: '📜',
    color: 'from-amber-400 to-yellow-500'
  },
  {
    name: '藏族',
    feature: '藏族信仰藏传佛教，酥油茶、青稞酒是日常饮食，藏历新年是最重要的节日，锅庄舞热情奔放。',
    icon: '🏔️',
    color: 'from-sky-400 to-teal-500'
  },
  {
    name: '哈尼族',
    feature: '哈尼族创造了举世闻名的元阳梯田，十月年是哈尼族最盛大的节日，长街宴展示了独特的饮食文化。',
    icon: '🌾',
    color: 'from-green-400 to-emerald-500'
  }
]

const festivals = [
  {
    name: '石林火把节',
    time: '农历六月二十四',
    desc: '彝族最盛大的传统节日，人们点燃火把，举行斗牛、摔跤、歌舞等活动，场面热烈壮观。',
    image: 'Shilin Torch Festival Kunming Yi ethnic group fire celebration night Yunnan China'
  },
  {
    name: '泼水节',
    time: '公历4月中旬',
    desc: '傣族新年，人们用清水相互泼洒，寓意洗去污秽、迎接新年，还有划龙舟、放高升等活动。',
    image: 'Water Splashing Festival Kunming Dai ethnic group celebration water Yunnan China'
  },
  {
    name: '昆明国际花卉展',
    time: '每年9月',
    desc: '亚洲最大的花卉专业展会，汇聚全球精品花卉，展示花卉科技与花艺设计，是"花都"昆明的年度盛会。',
    image: 'Kunming International Flower Exhibition colorful flowers display Yunnan China'
  }
]

const cuisines = [
  { name: '过桥米线', desc: '昆明最具代表性的美食，滚烫的鸡汤配以各种配料和米线，吃法独特，滋味鲜美。', icon: '🍜' },
  { name: '汽锅鸡', desc: '云南名菜，用建水紫陶汽锅蒸制，汤汁清亮，鸡肉鲜嫩，滋补养生。', icon: '🍗' },
  { name: '野生菌火锅', desc: '云南特色美食，各种珍贵野生菌菇配以高汤，鲜香无比，是雨季必尝的美味。', icon: '🍄' },
  { name: '鲜花饼', desc: '以玫瑰花瓣入馅的酥饼，香甜酥脆，花香浓郁，是昆明最受欢迎的伴手礼。', icon: '🌹' },
  { name: '宜良烤鸭', desc: '昆明传统名菜，皮脆肉嫩，风味独特，历史悠久，是当地人宴请宾客的必备佳肴。', icon: '🦆' },
  { name: '官渡粑粑', desc: '官渡古镇特色小吃，外酥里软，有甜咸两种口味，是昆明人喜爱的早餐和点心。', icon: '🫓' }
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
          backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yunnan%20ethnic%20minorities%20colorful%20traditional%20costumes%20culture%20festival%20Kunming%20China&image_size=landscape_16_9')`
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <p class="text-lg opacity-80 mb-2 tracking-widest">CULTURE</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-4">文化昆明</h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          多元文化交融的春城，26个民族共同谱写的绚丽华章
        </p>
      </div>
    </section>

    <section class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <Tabs
          v-model:activeKey="activeTab"
          size="large"
          :tab-bar-style="{ borderBottom: 'none' }"
          class="culture-tabs"
        >
          <Tabs.TabPane key="ethnic" tab="民族风情">
            <div class="pt-8">
              <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">26个民族的多彩文化</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                  昆明是一个多民族聚居的城市，各民族和睦相处，共同创造了丰富多彩的民族文化
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="(group, index) in ethnicGroups"
                  :key="index"
                  class="group cursor-pointer"
                >
                  <div
                    :class="[
                      'bg-gradient-to-br',
                      group.color,
                      'rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                    ]"
                  >
                    <span class="text-4xl block mb-4">{{ group.icon }}</span>
                    <h3 class="text-xl font-bold mb-2">{{ group.name }}</h3>
                    <p class="text-sm leading-relaxed opacity-90">{{ group.feature }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane key="festivals" tab="传统节日">
            <div class="pt-8">
              <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">精彩纷呈的节庆活动</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                  从传统民俗到现代盛会，昆明的节日庆典一年四季不断
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                  v-for="(festival, index) in festivals"
                  :key="index"
                  class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div
                    class="h-48 bg-cover bg-center"
                    :style="{
                      backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(festival.image)}&image_size=square_hd')`
                    }"
                  ></div>
                  <div class="p-6">
                    <div class="flex items-center gap-2 mb-3">
                      <svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-sm text-pink-600 font-medium">{{ festival.time }}</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ festival.name }}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ festival.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane key="cuisine" tab="美食文化">
            <div class="pt-8">
              <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">舌尖上的昆明</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                  融合各民族特色的滇味美食，是昆明不可错过的味觉盛宴
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="(food, index) in cuisines"
                  :key="index"
                  class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span class="text-5xl block mb-4">{{ food.icon }}</span>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ food.name }}</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">{{ food.desc }}</p>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-4 py-1 bg-rose-50 text-rose-600 rounded-full text-sm font-medium mb-4">
              艺术传承
            </span>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">传统艺术瑰宝</h2>
            <div class="space-y-6">
              <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-2">🎭 滇剧</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  云南地方戏曲剧种，融合了多种艺术形式，唱腔优美，表演细腻，是云南文化的重要组成部分。
                </p>
              </div>
              <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-2">💃 花灯戏</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  云南民间传统戏曲，载歌载舞，活泼欢快，具有浓郁的乡土气息和地方特色。
                </p>
              </div>
              <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-2">🎨 昆明斑铜</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  昆明独有的传统工艺，以其独特的金属色彩和精湛的铸造技艺闻名于世，是国家级非物质文化遗产。
                </p>
              </div>
            </div>
          </div>
          <div
            class="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            :style="{
              backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yunnan%20traditional%20art%20crafts%20colorful%20ethnic%20textiles%20culture%20Kunming%20China&image_size=portrait_4_3')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"
          ></div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">文化昆明，魅力无限</h2>
        <p class="text-lg opacity-90 max-w-3xl mx-auto mb-10 leading-relaxed">
          在这里，传统与现代交融，民族与世界对话。昆明正以开放包容的姿态，
          向世界展示着这座历史文化名城的独特魅力。
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">26+</div>
            <p class="text-sm opacity-90">世居民族</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">100+</div>
            <p class="text-sm opacity-90">传统节日</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">50+</div>
            <p class="text-sm opacity-90">非遗项目</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">2000+</div>
            <p class="text-sm opacity-90">年建城史</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.culture-tabs {
  :deep(.ant-tabs-nav-list) {
    background: linear-gradient(135deg, #fdf2f8 0%, #fff7ed 100%);
    border-radius: 12px;
    padding: 4px;
  }
  :deep(.ant-tabs-tab) {
    border-radius: 8px;
    transition: all 0.3s ease;
    padding: 12px 24px;
  }
  :deep(.ant-tabs-tab-active) {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}
</style>
