<template>
  <div class="glass-panel p-6">
    <h2 class="text-xl font-bold text-white mb-4 flex items-center">
      <i class="pi pi-chart-line mr-2"></i>实时数据监测
    </h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 实时数据卡片 -->
      <div class="lg:col-span-1">
        <div class="grid grid-cols-2 gap-3">
          <!-- 氧气浓度 -->
          <div class="glass-panel-dark p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/70 text-xs">O₂ 浓度</span>
              <i class="pi pi-wind text-blue-400"></i>
            </div>
            <div class="text-2xl font-bold text-white mb-2">
              {{ ecosystemData.oxygenLevel.toFixed(1) }}%
            </div>
            <ProgressBar 
              :value="ecosystemData.oxygenLevel" 
              :max="35"
              class="h-2"
              :style="{
                background: 'rgba(255,255,255,0.1)',
                '--p-progressbar-value': getOxygenColor()
              }"
            />
            <p class="text-white/50 text-xs mt-1">
              最佳: 18-25%
            </p>
          </div>
          
          <!-- 二氧化碳浓度 -->
          <div class="glass-panel-dark p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/70 text-xs">CO₂ 浓度</span>
              <i class="pi pi-cloud text-orange-400"></i>
            </div>
            <div class="text-2xl font-bold text-white mb-2">
              {{ (ecosystemData.co2Level * 100).toFixed(2) }}%
            </div>
            <ProgressBar 
              :value="ecosystemData.co2Level * 20" 
              :max="100"
              class="h-2"
              :style="{
                background: 'rgba(255,255,255,0.1)',
                '--p-progressbar-value': getCO2Color()
              }"
            />
            <p class="text-white/50 text-xs mt-1">
              最佳: 0.03-0.06%
            </p>
          </div>
          
          <!-- pH值 -->
          <div class="glass-panel-dark p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/70 text-xs">pH 值</span>
              <i class="pi pi-flask text-green-400"></i>
            </div>
            <div class="text-2xl font-bold text-white mb-2">
              {{ ecosystemData.phValue.toFixed(2) }}
            </div>
            <ProgressBar 
              :value="(ecosystemData.phValue - 5) * 20" 
              :max="80"
              class="h-2"
              :style="{
                background: 'rgba(255,255,255,0.1)',
                '--p-progressbar-value': getPHColor()
              }"
            />
            <p class="text-white/50 text-xs mt-1">
              最佳: 6.5-7.5
            </p>
          </div>
          
          <!-- 运行时间 -->
          <div class="glass-panel-dark p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/70 text-xs">运行时间</span>
              <i class="pi pi-clock text-purple-400"></i>
            </div>
            <div class="text-2xl font-bold text-white mb-2">
              {{ formatTime(runTime) }}
            </div>
            <div class="flex items-center gap-2">
              <span class="text-white/50 text-xs">模拟秒数</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 生态统计 -->
      <div class="lg:col-span-1">
        <div class="glass-panel-dark p-4 h-full">
          <h3 class="text-white/90 font-semibold mb-4 flex items-center">
            <i class="pi pi-info-circle mr-2"></i>生态系统统计
          </h3>
          
          <div class="space-y-4">
            <!-- 生物总量 -->
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-white/70 text-sm">植物总量</span>
                <span class="text-green-400 font-bold">{{ ecosystemData.plantCount }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-white/70 text-sm">动物总量</span>
                <span class="text-orange-400 font-bold">{{ ecosystemData.animalCount }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-white/70 text-sm">微生物总量</span>
                <span class="text-purple-400 font-bold">{{ ecosystemData.microbeCount }}</span>
              </div>
            </div>
            
            <Divider class="bg-white/10" />
            
            <!-- 代谢速率 -->
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-white/70 text-sm">光合作用率</span>
                <span class="text-blue-400 font-bold">{{ ecosystemData.photosynthesisRate.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-white/70 text-sm">呼吸作用率</span>
                <span class="text-red-400 font-bold">{{ ecosystemData.respirationRate.toFixed(2) }}</span>
              </div>
            </div>
            
            <Divider class="bg-white/10" />
            
            <!-- 生态健康度 -->
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-white/70 text-sm">生态健康度</span>
                <span 
                  :class="[
                    'font-bold',
                    ecosystemData.healthScore >= 70 ? 'text-green-400' : 
                    ecosystemData.healthScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                  ]"
                >
                  {{ ecosystemData.healthScore.toFixed(0) }}%
                </span>
              </div>
              <ProgressBar 
                :value="ecosystemData.healthScore" 
                class="h-3"
                :style="{
                  background: 'rgba(255,255,255,0.1)',
                  '--p-progressbar-value': getHealthColor()
                }"
              />
              <p class="text-white/50 text-xs mt-2">
                {{ getHealthStatus() }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 图表区域 -->
      <div class="lg:col-span-1">
        <div class="glass-panel-dark p-4 h-full">
          <h3 class="text-white/90 font-semibold mb-4 flex items-center">
            <i class="pi pi-chart-bar mr-2"></i>气体浓度变化趋势
          </h3>
          
          <div class="chart-container" ref="chartContainer">
            <canvas ref="chartCanvas"></canvas>
          </div>
          
          <!-- 图例 -->
          <div class="flex justify-center gap-4 mt-4">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span class="text-white/70 text-xs">氧气 (%)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-orange-500 rounded-full"></span>
              <span class="text-white/70 text-xs">CO₂ (×100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  ecosystemData: {
    type: Object,
    default: () => ({})
  },
  gasHistory: {
    type: Object,
    default: () => ({
      labels: [],
      oxygen: [],
      co2: []
    })
  },
  runTime: {
    type: Number,
    default: 0
  }
})

const chartCanvas = ref(null)
const chartContainer = ref(null)
let chart = null

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 获取氧气颜色
const getOxygenColor = () => {
  const val = props.ecosystemData.oxygenLevel
  if (val >= 18 && val <= 25) return '#22c55e'
  if (val >= 12 && val <= 30) return '#eab308'
  return '#ef4444'
}

// 获取CO2颜色
const getCO2Color = () => {
  const val = props.ecosystemData.co2Level
  if (val >= 0.03 && val <= 0.06) return '#22c55e'
  if (val >= 0.02 && val <= 0.1) return '#eab308'
  return '#ef4444'
}

// 获取pH颜色
const getPHColor = () => {
  const val = props.ecosystemData.phValue
  if (val >= 6.5 && val <= 7.5) return '#22c55e'
  if (val >= 5.5 && val <= 8.5) return '#eab308'
  return '#ef4444'
}

// 获取健康度颜色
const getHealthColor = () => {
  const val = props.ecosystemData.healthScore
  if (val >= 70) return '#22c55e'
  if (val >= 40) return '#eab308'
  return '#ef4444'
}

// 获取健康状态文本
const getHealthStatus = () => {
  const val = props.ecosystemData.healthScore
  if (val >= 70) return '生态系统健康，气体平衡良好'
  if (val >= 40) return '生态系统需关注，建议调整生物比例'
  return '生态系统失衡，需立即干预'
}

// 初始化图表
const initChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '氧气 (%)',
          data: [],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 4
        },
        {
          label: 'CO₂ (×100%)',
          data: [],
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            maxTicksLimit: 8
          },
          title: {
            display: true,
            text: '时间 (秒)',
            color: 'rgba(255, 255, 255, 0.6)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)'
          },
          title: {
            display: true,
            text: '浓度',
            color: 'rgba(255, 255, 255, 0.6)'
          },
          min: 0,
          max: 40
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  })
}

// 更新图表数据
const updateChart = () => {
  if (!chart) return
  
  chart.data.labels = props.gasHistory.labels
  chart.data.datasets[0].data = props.gasHistory.oxygen
  chart.data.datasets[1].data = props.gasHistory.co2
  chart.update('none')
}

// 监听数据变化
watch(() => props.gasHistory, () => {
  updateChart()
}, { deep: true })

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>
