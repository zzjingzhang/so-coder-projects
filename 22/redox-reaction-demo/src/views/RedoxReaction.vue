<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <n-card class="max-w-6xl mx-auto">
      <template #header>
        <div class="text-center">
          <n-h1 class="text-3xl font-bold text-indigo-800 m-0">硫酸铜溶液与铁的氧化还原反应</n-h1>
          <n-p class="text-gray-600 mt-2">CuSO₄ + Fe → FeSO₄ + Cu</n-p>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧控制面板 -->
        <div class="lg:col-span-1">
          <n-card title="反应控制" size="small" class="mb-4">
            <div class="space-y-4">
              <!-- 反应状态控制 -->
              <div>
                <n-space justify="center" class="w-full">
                  <n-button 
                    type="primary" 
                    size="large"
                    :disabled="isReacting"
                    @click="startReaction"
                    class="w-24 h-12"
                  >
                    开始反应
                  </n-button>
                  <n-button 
                    type="error" 
                    size="large"
                    :disabled="!isReacting"
                    @click="stopReaction"
                    class="w-24 h-12"
                  >
                    停止反应
                  </n-button>
                  <n-button 
                    type="warning" 
                    size="large"
                    @click="resetReaction"
                    class="w-24 h-12"
                  >
                    重置
                  </n-button>
                </n-space>
              </div>

              <!-- 硫酸铜浓度控制 -->
              <div>
                <n-space vertical class="w-full">
                  <n-text class="font-medium">硫酸铜溶液浓度</n-text>
                  <n-slider 
                    v-model:value="concentration" 
                    :min="0.1" 
                    :max="2.0" 
                    :step="0.1"
                    :disabled="isReacting"
                    @update:value="updateReactionSpeed"
                  />
                  <n-text class="text-center text-indigo-600 font-bold">
                    {{ concentration.toFixed(1) }} mol/L
                  </n-text>
                </n-space>
              </div>

              <!-- 电子移动速度控制 -->
              <div>
                <n-space vertical class="w-full">
                  <n-text class="font-medium">电子移动速度</n-text>
                  <n-slider 
                    v-model:value="electronSpeed" 
                    :min="1" 
                    :max="10" 
                    :step="1"
                  />
                  <n-text class="text-center text-indigo-600 font-bold">
                    {{ electronSpeed }}x 速度
                  </n-text>
                </n-space>
              </div>
            </div>
          </n-card>

          <!-- 反应信息 -->
          <n-card title="反应信息" size="small">
            <div class="space-y-4">
              <!-- 反应状态 -->
              <div class="flex items-center justify-between">
                <n-text class="text-gray-600 font-medium">反应状态</n-text>
                <n-tag :type="isReacting ? 'success' : 'default'">
                  {{ isReacting ? '反应进行中' : '反应未开始' }}
                </n-tag>
              </div>
              
              <!-- 铁的消耗 -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <n-text class="text-gray-600 font-medium">铁的消耗</n-text>
                  <n-text class="text-sm text-gray-500">{{ ironConsumed.toFixed(1) }}%</n-text>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    :style="{ width: `${ironConsumed}%` }"
                  ></div>
                </div>
              </div>
              
              <!-- 铜的生成 -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <n-text class="text-gray-600 font-medium">铜的生成</n-text>
                  <n-text class="text-sm text-gray-500">{{ copperProduced.toFixed(1) }}%</n-text>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
                    :style="{ width: `${copperProduced}%` }"
                  ></div>
                </div>
              </div>
              
              <!-- 电子转移数量 -->
              <div class="flex items-center justify-between">
                <n-text class="text-gray-600 font-medium">电子转移数量</n-text>
                <n-text class="font-bold text-orange-600">{{ electronCount }} 个</n-text>
              </div>
            </div>
          </n-card>
        </div>

        <!-- 中间动画展示区 -->
        <div class="lg:col-span-2">
          <n-card title="反应动画展示" size="small">
            <div class="relative h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden border-2 border-indigo-300">
              <!-- 溶液背景，根据浓度变化颜色深度 -->
              <div 
                class="absolute inset-0 transition-all duration-500"
                :style="{
                  background: `linear-gradient(to bottom, rgba(0, 150, 255, ${0.1 + concentration * 0.2}), rgba(0, 100, 200, ${0.15 + concentration * 0.25}))`
                }"
              />

              <!-- 硫酸铜离子 -->
              <div class="absolute inset-0">
                <div 
                  v-for="ion in copperIons" 
                  :key="ion.id"
                  class="absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg transition-all"
                  :style="{
                    left: `${ion.x}%`,
                    top: `${ion.y}%`,
                    background: ion.isConsumed ? 'transparent' : '#1e40af',
                    opacity: ion.isConsumed ? 0 : 1,
                    transform: `scale(${ion.isConsumed ? 0 : 1})`
                  }"
                >
                  Cu²⁺
                </div>
              </div>

              <!-- 铁片/铁钉 -->
              <div class="absolute left-8 bottom-8 w-16 h-48 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg border-2 border-gray-700 shadow-lg transition-all duration-1000">
                <!-- 铁表面生成的铜 -->
                <div 
                  class="absolute inset-0 rounded-lg transition-all duration-1000"
                  :style="{
                    background: `linear-gradient(to bottom, rgba(139, 69, 19, ${copperProduced / 100}), rgba(101, 67, 33, ${copperProduced / 100}))`,
                    opacity: copperProduced > 0 ? 1 : 0
                  }"
                />
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700">Fe</div>
              </div>

              <!-- 电子移动动画 -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="electronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
                  </linearGradient>
                </defs>
                
                <!-- 电子路径 -->
                <path 
                  v-for="electron in electrons" 
                  :key="electron.id"
                  d="M 64 200 Q 150 150 300 200"
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.3)"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />
                
                <!-- 移动的电子 -->
                <circle 
                  v-for="electron in activeElectrons" 
                  :key="electron.id"
                  :cx="electron.x"
                  :cy="electron.y"
                  r="8"
                  fill="url(#electronGradient)"
                  class="shadow-lg"
                >
                  <animate
                    :id="`electron-${electron.id}`"
                    attributeName="cx"
                    :from="64 + (electron.id % 3) * 20"
                    :to="350 + (electron.id % 5) * 30"
                    :dur="`${3 / electronSpeed}s`"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    :values="`200; ${150 + (electron.id % 4) * 20}; 200`"
                    :dur="`${3 / electronSpeed}s`"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              <!-- 电子数量显示 -->
              <div class="absolute top-4 right-4 bg-white/80 rounded-lg p-3 shadow">
                <n-text class="font-bold text-orange-600">e⁻ 转移: {{ electronCount }}</n-text>
              </div>

              <!-- 反应方向指示 -->
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-lg p-3 shadow">
                <n-space align="center">
                  <n-text class="text-gray-700 font-medium">Fe</n-text>
                  <span class="text-2xl text-orange-500 font-bold">→</span>
                  <n-text class="text-orange-600 font-bold">e⁻</n-text>
                  <span class="text-2xl text-orange-500 font-bold">→</span>
                  <n-text class="text-gray-700 font-medium">Cu²⁺</n-text>
                </n-space>
              </div>
            </div>
          </n-card>

          <!-- 反应原理说明 -->
          <n-card title="反应原理" size="small" class="mt-4">
            <n-tabs type="line" animated>
              <n-tab-pane name="oxidation" tab="氧化反应">
                <n-card size="small">
                  <n-text class="text-lg font-bold text-red-600">Fe - 2e⁻ → Fe²⁺</n-text>
                  <n-p class="mt-2 text-gray-700">
                    铁失去电子，被氧化，铁元素的化合价从0价升高到+2价。
                    铁是还原剂，发生氧化反应。
                  </n-p>
                  <n-p class="mt-2 text-gray-600">
                    现象：铁钉逐渐溶解，质量减少。
                  </n-p>
                </n-card>
              </n-tab-pane>
              
              <n-tab-pane name="reduction" tab="还原反应">
                <n-card size="small">
                  <n-text class="text-lg font-bold text-blue-600">Cu²⁺ + 2e⁻ → Cu</n-text>
                  <n-p class="mt-2 text-gray-700">
                    铜离子得到电子，被还原，铜元素的化合价从+2价降低到0价。
                    铜离子是氧化剂，发生还原反应。
                  </n-p>
                  <n-p class="mt-2 text-gray-600">
                    现象：铁钉表面出现红色的铜单质。
                  </n-p>
                </n-card>
              </n-tab-pane>
              
              <n-tab-pane name="total" tab="总反应">
                <n-card size="small">
                  <n-text class="text-lg font-bold text-indigo-600">Fe + CuSO₄ → FeSO₄ + Cu</n-text>
                  <n-p class="mt-2 text-gray-700">
                    这是一个典型的置换反应，也是一个氧化还原反应。
                    活泼金属铁将不活泼金属铜从其盐溶液中置换出来。
                  </n-p>
                  <n-p class="mt-2 text-gray-600">
                    金属活动性顺序：K > Ca > Na > Mg > Al > Zn > <strong>Fe</strong> > Ni > Sn > Pb > H > <strong>Cu</strong> > Hg > Ag > Pt > Au
                  </n-p>
                </n-card>
              </n-tab-pane>
              
              <n-tab-pane name="concentration" tab="浓度影响">
                <n-card size="small">
                  <n-text class="text-lg font-bold text-purple-600">浓度对反应速率的影响</n-text>
                  <n-p class="mt-2 text-gray-700">
                    根据碰撞理论，反应物浓度越大，单位体积内活化分子数越多，
                    有效碰撞频率越高，反应速率越快。
                  </n-p>
                  <n-p class="mt-2 text-gray-600">
                    在本实验中，硫酸铜溶液浓度越高：
                    <n-ul>
                      <n-li>溶液颜色越深（蓝色更浓）</n-li>
                      <n-li>反应速率越快</n-li>
                      <n-li>电子转移速度越快</n-li>
                      <n-li>铁钉表面铜的生成速度越快</n-li>
                    </n-ul>
                  </n-p>
                </n-card>
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// 反应状态
const isReacting = ref(false)

// 硫酸铜浓度 (mol/L)
const concentration = ref(1.0)

// 电子移动速度 (1-10x)
const electronSpeed = ref(5)

// 铁的消耗百分比
const ironConsumed = ref(0)

// 铜的生成百分比
const copperProduced = ref(0)

// 电子转移数量
const electronCount = ref(0)

// 铜离子
const copperIons = ref([])

// 电子
const electrons = ref([])
const activeElectrons = ref([])

// 动画定时器
let reactionInterval = null
let electronInterval = null

// 初始化铜离子
const initCopperIons = () => {
  const ionCount = Math.floor(10 + concentration.value * 10)
  copperIons.value = []
  
  for (let i = 0; i < ionCount; i++) {
    copperIons.value.push({
      id: i,
      x: 20 + Math.random() * 60,
      y: 10 + Math.random() * 70,
      isConsumed: false
    })
  }
}

// 初始化电子
const initElectrons = () => {
  const electronCount = Math.floor(5 + concentration.value * 3)
  electrons.value = []
  activeElectrons.value = []
  
  for (let i = 0; i < electronCount; i++) {
    electrons.value.push({
      id: i,
      x: 64,
      y: 200
    })
  }
}

// 开始反应
const startReaction = () => {
  if (isReacting.value) return
  
  isReacting.value = true
  initElectrons()
  
  // 启动反应动画
  reactionInterval = setInterval(() => {
    // 铁消耗
    if (ironConsumed.value < 100) {
      ironConsumed.value += 0.5 * concentration.value
      if (ironConsumed.value > 100) ironConsumed.value = 100
    }
    
    // 铜生成
    if (copperProduced.value < 100) {
      copperProduced.value += 0.5 * concentration.value
      if (copperProduced.value > 100) copperProduced.value = 100
    }
    
    // 消耗铜离子
    const availableIons = copperIons.value.filter(ion => !ion.isConsumed)
    if (availableIons.length > 0 && Math.random() < 0.3) {
      const randomIndex = Math.floor(Math.random() * availableIons.length)
      availableIons[randomIndex].isConsumed = true
    }
    
    // 检查反应是否完成
    if (ironConsumed.value >= 100 || copperProduced.value >= 100) {
      stopReaction()
    }
  }, 100)
  
  // 启动电子动画
  electronInterval = setInterval(() => {
    electronCount.value += Math.floor(1 * concentration.value * electronSpeed.value)
    
    // 更新活跃电子
    if (activeElectrons.value.length < electrons.value.length) {
      const newElectron = {
        id: Date.now() + Math.random(),
        x: 64,
        y: 200
      }
      activeElectrons.value.push(newElectron)
    }
  }, 500 / electronSpeed.value)
}

// 停止反应
const stopReaction = () => {
  isReacting.value = false
  
  if (reactionInterval) {
    clearInterval(reactionInterval)
    reactionInterval = null
  }
  
  if (electronInterval) {
    clearInterval(electronInterval)
    electronInterval = null
  }
  
  activeElectrons.value = []
}

// 重置反应
const resetReaction = () => {
  stopReaction()
  ironConsumed.value = 0
  copperProduced.value = 0
  electronCount.value = 0
  initCopperIons()
}

// 更新反应速度
const updateReactionSpeed = () => {
  initCopperIons()
}

// 组件挂载时初始化
onMounted(() => {
  initCopperIons()
  initElectrons()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  stopReaction()
})
</script>

<style scoped>
.n-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-card {
  border-radius: 12px;
}

.n-tabs {
  margin-top: 0;
}
</style>