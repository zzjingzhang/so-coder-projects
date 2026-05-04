<template>
  <div class="chart-container bg-white/80 rounded-lg p-4 shadow-sm">
    <h3 class="text-lg font-semibold text-gray-700 mb-3 text-center">浓度变化曲线图</h3>
    <Line 
      :data="chartData" 
      :options="chartOptions"
      :height="250"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import type { ConcentrationDataPoint } from '../types/gas'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps<{
  data: ConcentrationDataPoint[]
  title?: string
}>()

const chartData = computed(() => ({
  labels: props.data.map(d => `t=${d.time}`),
  datasets: [
    {
      label: 'N₂ (氮气)',
      data: props.data.map(d => d.N2),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'H₂ (氢气)',
      data: props.data.map(d => d.H2),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'He (氦气)',
      data: props.data.map(d => d.He),
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 16,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ${context.parsed.y.toFixed(4)} mol/L`
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '添加氦气次数',
        color: '#6b7280'
      },
      grid: {
        color: 'rgba(229, 231, 235, 0.5)'
      },
      ticks: {
        color: '#6b7280'
      }
    },
    y: {
      title: {
        display: true,
        text: '浓度 (mol/L)',
        color: '#6b7280'
      },
      beginAtZero: true,
      grid: {
        color: 'rgba(229, 231, 235, 0.5)'
      },
      ticks: {
        color: '#6b7280'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
}))
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
