<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const cpuChart = ref(null);
const memoryChart = ref(null);
const networkChart = ref(null);

const cpuChartInstance = ref(null);
const memoryChartInstance = ref(null);
const networkChartInstance = ref(null);

const timeRange = ref('5m');
const isRefreshing = ref(false);
const lastUpdateTime = ref('');

const cpuData = ref([]);
const memoryData = ref([]);
const networkInData = ref([]);
const networkOutData = ref([]);
const labels = ref([]);

let dataUpdateInterval = null;

const timeRangeOptions = {
  '1m': { points: 12, interval: 5000, label: '1分钟' },
  '5m': { points: 30, interval: 10000, label: '5分钟' },
  '15m': { points: 45, interval: 20000, label: '15分钟' },
  '1h': { points: 60, interval: 60000, label: '1小时' }
};

const generateRandomData = () => {
  const range = timeRangeOptions[timeRange.value];
  const now = new Date();
  
  labels.value = [];
  cpuData.value = [];
  memoryData.value = [];
  networkInData.value = [];
  networkOutData.value = [];
  
  for (let i = range.points - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * range.interval);
    labels.value.push(formatTime(time));
    
    cpuData.value.push(Math.floor(Math.random() * 60) + 20);
    memoryData.value.push(Math.floor(Math.random() * 40) + 40);
    networkInData.value.push(Math.floor(Math.random() * 100) + 50);
    networkOutData.value.push(Math.floor(Math.random() * 80) + 30);
  }
  
  updateLastUpdateTime();
};

const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

const updateLastUpdateTime = () => {
  const now = new Date();
  lastUpdateTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
};

const addNewDataPoint = () => {
  const range = timeRangeOptions[timeRange.value];
  const now = new Date();
  const timeLabel = formatTime(now);
  
  labels.value.shift();
  labels.value.push(timeLabel);
  
  cpuData.value.shift();
  cpuData.value.push(Math.floor(Math.random() * 60) + 20);
  
  memoryData.value.shift();
  memoryData.value.push(Math.floor(Math.random() * 40) + 40);
  
  networkInData.value.shift();
  networkInData.value.push(Math.floor(Math.random() * 100) + 50);
  
  networkOutData.value.shift();
  networkOutData.value.push(Math.floor(Math.random() * 80) + 30);
  
  updateLastUpdateTime();
  initCharts();
};

const createChart = (canvas, datasets, chartTitle, yAxisLabel) => {
  if (!canvas) return null;
  
  const ctx = canvas.getContext('2d');
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...labels.value],
      datasets: datasets.map(ds => ({
        ...ds,
        data: [...ds.data]
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle,
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: '时间'
          },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: yAxisLabel
          },
          min: 0,
          max: yAxisLabel === '百分比 (%)' ? 100 : undefined,
          ticks: {
            callback: function(value) {
              if (yAxisLabel === '百分比 (%)') {
                return value + '%';
              }
              return value + ' MB/s';
            }
          }
        }
      },
      animation: {
        duration: 300
      }
    }
  });
};

const initCharts = () => {
  if (cpuChartInstance.value) cpuChartInstance.value.destroy();
  if (memoryChartInstance.value) memoryChartInstance.value.destroy();
  if (networkChartInstance.value) networkChartInstance.value.destroy();
  
  cpuChartInstance.value = createChart(
    cpuChart.value,
    [
      {
        label: 'CPU 使用率',
        data: cpuData.value,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ],
    'CPU 使用率',
    '百分比 (%)'
  );
  
  memoryChartInstance.value = createChart(
    memoryChart.value,
    [
      {
        label: '内存使用率',
        data: memoryData.value,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ],
    '内存使用率',
    '百分比 (%)'
  );
  
  networkChartInstance.value = createChart(
    networkChart.value,
    [
      {
        label: '入站流量',
        data: networkInData.value,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      },
      {
        label: '出站流量',
        data: networkOutData.value,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ],
    '网络流量',
    '流量 (MB/s)'
  );
};

const handleRefresh = () => {
  isRefreshing.value = true;
  
  setTimeout(() => {
    generateRandomData();
    initCharts();
    isRefreshing.value = false;
  }, 500);
};

const startDataUpdate = () => {
  if (dataUpdateInterval) {
    clearInterval(dataUpdateInterval);
  }
  
  const range = timeRangeOptions[timeRange.value];
  dataUpdateInterval = setInterval(() => {
    addNewDataPoint();
  }, range.interval);
};

watch(timeRange, () => {
  generateRandomData();
  initCharts();
  startDataUpdate();
});

onMounted(() => {
  generateRandomData();
  initCharts();
  startDataUpdate();
});

onUnmounted(() => {
  if (dataUpdateInterval) {
    clearInterval(dataUpdateInterval);
  }
  
  if (cpuChartInstance.value) cpuChartInstance.value.destroy();
  if (memoryChartInstance.value) memoryChartInstance.value.destroy();
  if (networkChartInstance.value) networkChartInstance.value.destroy();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">服务器监控仪表盘</h1>
              <p class="text-sm text-gray-500">实时监控系统性能</p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">时间范围:</span>
              <select 
                v-model="timeRange"
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="1m">1 分钟</option>
                <option value="5m">5 分钟</option>
                <option value="15m">15 分钟</option>
                <option value="1h">1 小时</option>
              </select>
            </div>
            
            <button 
              @click="handleRefresh"
              :disabled="isRefreshing"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                class="w-4 h-4" 
                :class="{ 'animate-spin': isRefreshing }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span v-if="!isRefreshing">刷新数据</span>
              <span v-else>刷新中...</span>
            </button>
            
            <div class="flex items-center gap-1 text-sm text-gray-500">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>最后更新: {{ lastUpdateTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">当前 CPU 使用率</p>
              <p class="text-3xl font-bold text-gray-900">{{ cpuData[cpuData.length - 1] || 0 }}%</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
          </div>
          <div class="mt-3">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                :style="{ width: `${cpuData[cpuData.length - 1] || 0}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">当前内存使用率</p>
              <p class="text-3xl font-bold text-gray-900">{{ memoryData[memoryData.length - 1] || 0 }}%</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
          <div class="mt-3">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-green-600 h-2 rounded-full transition-all duration-500" 
                :style="{ width: `${memoryData[memoryData.length - 1] || 0}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">网络流量</p>
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-sm text-gray-400">入站</p>
                  <p class="text-xl font-bold text-amber-600">{{ networkInData[networkInData.length - 1] || 0 }} MB/s</p>
                </div>
                <div>
                  <p class="text-sm text-gray-400">出站</p>
                  <p class="text-xl font-bold text-red-600">{{ networkOutData[networkOutData.length - 1] || 0 }} MB/s</p>
                </div>
              </div>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="h-80">
            <canvas ref="cpuChart"></canvas>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="h-80">
            <canvas ref="memoryChart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="h-80">
          <canvas ref="networkChart"></canvas>
        </div>
      </div>
    </main>
    
    <footer class="bg-white border-t border-gray-200 mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p class="text-center text-sm text-gray-500">
          服务器监控仪表盘 v1.0 | 数据每 {{ Math.floor(timeRangeOptions[timeRange].interval / 1000) }} 秒自动刷新
        </p>
      </div>
    </footer>
  </div>
</template>
