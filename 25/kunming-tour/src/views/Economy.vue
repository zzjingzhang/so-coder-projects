<script setup lang="ts">
import { Statistic, Progress } from 'ant-design-vue'
import { ArrowUpOutlined } from '@ant-design/icons-vue'

const keyIndustries = [
  {
    name: '花卉产业',
    desc: '亚洲最大的鲜切花交易中心，斗南花卉市场年交易额超百亿元，鲜花销往全球50多个国家和地区。',
    icon: '🌸',
    color: 'from-pink-400 to-rose-500'
  },
  {
    name: '生物医药',
    desc: '云南白药集团、沃森生物等龙头企业聚集，形成了以中药、生物制药为核心的产业集群。',
    icon: '💊',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    name: '信息产业',
    desc: '呈贡信息产业园、高新区数字经济园区快速发展，大力发展人工智能、大数据、云计算等新兴产业。',
    icon: '💻',
    color: 'from-sky-400 to-blue-500'
  },
  {
    name: '现代物流',
    desc: '面向南亚东南亚的区域性国际物流枢纽，长水国际机场旅客吞吐量跻身全国前十，中老铁路开通运营。',
    icon: '🚚',
    color: 'from-amber-400 to-orange-500'
  },
  {
    name: '旅游服务',
    desc: '年接待游客超2亿人次，旅游总收入超2500亿元，形成了食住行游购娱完整的旅游产业链。',
    icon: '✈️',
    color: 'from-cyan-400 to-teal-500'
  },
  {
    name: '高原特色农业',
    desc: '云烟、云茶、云花、云菜、云果五大品牌享誉全国，有机农业、绿色食品产业蓬勃发展。',
    icon: '🌿',
    color: 'from-green-400 to-emerald-500'
  }
]

const economicData = [
  { label: 'GDP总量', value: '8300', unit: '亿元', growth: '+5.8%' },
  { label: '常住人口', value: '860', unit: '万人', growth: '+1.2%' },
  { label: '人均GDP', value: '9.6', unit: '万元', growth: '+4.5%' },
  { label: '财政收入', value: '750', unit: '亿元', growth: '+3.2%' }
]

const developmentGoals = [
  { name: '区域性国际中心城市', progress: 75, desc: '面向南亚东南亚辐射中心核心区' },
  { name: '中国春城', progress: 85, desc: '世界知名旅游目的地' },
  { name: '历史文化名城', progress: 90, desc: '古滇文化保护与传承' },
  { name: '国际大健康名城', progress: 70, desc: '中国健康之城建设' }
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
          backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunming%20modern%20city%20skyline%20business%20district%20panoramic%20view%20Yunnan%20China&image_size=landscape_16_9')`
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4">
        <p class="text-lg opacity-80 mb-2 tracking-widest">ECONOMY</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-4">经济昆明</h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          蓬勃发展的春城经济，面向南亚东南亚的区域性国际中心城市
        </p>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            经济概览
          </span>
          <h2 class="text-3xl font-bold text-gray-800">2025年经济数据</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(data, index) in economicData"
            :key="index"
            class="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100"
          >
            <Statistic
              :value="data.value"
              :suffix="data.unit"
              :value-style="{ color: '#1e40af', fontSize: '28px', fontWeight: 'bold' }"
            >
              <template #prefix>
                <span class="text-lg font-medium text-gray-600">{{ data.label }}</span>
              </template>
              <template #suffix>
                <span class="text-base text-gray-600">{{ data.unit }}</span>
              </template>
            </Statistic>
            <div class="mt-2 flex items-center justify-center text-emerald-600 text-sm font-medium">
              <ArrowUpOutlined />
              <span class="ml-1">{{ data.growth }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1 bg-sky-50 text-sky-600 rounded-full text-sm font-medium mb-4">
            支柱产业
          </span>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">六大产业集群</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            昆明形成了以六大产业为支柱的现代产业体系，产业结构不断优化升级
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(industry, index) in keyIndustries"
            :key="index"
            class="group cursor-pointer"
          >
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div
                :class="[
                  'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br',
                  industry.color
                ]"
              >
                <span class="text-2xl">{{ industry.icon }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">{{ industry.name }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ industry.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-4 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4">
              发展战略
            </span>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">城市发展定位</h2>
            <div class="space-y-6">
              <div
                v-for="(goal, index) in developmentGoals"
                :key="index"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold text-gray-800">{{ goal.name }}</span>
                  <span class="text-sm text-teal-600 font-medium">{{ goal.progress }}%</span>
                </div>
                <Progress
                  :percent="goal.progress"
                  :show-info="false"
                  stroke-color="'#14b8a6'"
                  stroke-width="12"
                  :trail-color="'#e0f2fe'"
                />
                <p class="text-sm text-gray-500 mt-1">{{ goal.desc }}</p>
              </div>
            </div>
          </div>
          <div
            class="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            :style="{
              backgroundImage: `url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunming%20Changshui%20International%20Airport%20modern%20architecture%20aerial%20view%20Yunnan%20China&image_size=portrait_4_3')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"
          ></div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">区位优势</h2>
        <p class="text-lg opacity-90 max-w-3xl mx-auto mb-10 leading-relaxed">
          昆明地处中国西南边陲，是连接中国与南亚东南亚的重要门户。
          长水国际机场旅客吞吐量位居全国前列，中老铁路开通运营，
          "八出省、五出境"铁路网络正在形成。
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">45+</div>
            <p class="text-sm opacity-90">国际通航城市</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">5条</div>
            <p class="text-sm opacity-90">出境铁路通道</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">1891m</div>
            <p class="text-sm opacity-90">海拔高度</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div class="text-3xl font-bold mb-2">2.1万</div>
            <p class="text-sm opacity-90">平方公里面积</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
