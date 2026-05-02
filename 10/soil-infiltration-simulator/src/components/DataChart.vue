<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    title: {
      text: '土壤下渗数据实时监测',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['黏土', '黄土', '砂土'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      name: '时间 (s)'
    },
    yAxis: [
      {
        type: 'value',
        name: '下渗量 (ml)',
        position: 'left'
      },
      {
        type: 'value',
        name: '下渗速度 (ml/s)',
        position: 'right'
      }
    ],
    series: [
      {
        name: '黏土',
        type: 'line',
        smooth: true,
        data: [],
        yAxisIndex: 0,
        itemStyle: { color: '#8B4513' }
      },
      {
        name: '黄土',
        type: 'line',
        smooth: true,
        data: [],
        yAxisIndex: 0,
        itemStyle: { color: '#D2B48C' }
      },
      {
        name: '砂土',
        type: 'line',
        smooth: true,
        data: [],
        yAxisIndex: 0,
        itemStyle: { color: '#F4A460' }
      }
    ]
  }
  
  chartInstance.setOption(option)
}

const updateChart = () => {
  if (!chartInstance || !props.chartData) return
  
  const { clay, loess, sand } = props.chartData
  
  if (!clay && !loess && !sand) return
  
  const allTimes = new Set()
  
  if (clay?.time) clay.time.forEach(t => allTimes.add(t))
  if (loess?.time) loess.time.forEach(t => allTimes.add(t))
  if (sand?.time) sand.time.forEach(t => allTimes.add(t))
  
  const timeData = Array.from(allTimes).sort((a, b) => a - b)
  
  const getDataAtTime = (soilData, time) => {
    if (!soilData || !soilData.time || !soilData.infiltratedWater) return null
    const index = soilData.time.indexOf(time)
    return index >= 0 ? soilData.infiltratedWater[index] : null
  }
  
  const clayData = timeData.map(t => getDataAtTime(clay, t))
  const loessData = timeData.map(t => getDataAtTime(loess, t))
  const sandData = timeData.map(t => getDataAtTime(sand, t))
  
  const option = {
    xAxis: {
      data: timeData
    },
    series: [
      {
        data: clayData
      },
      {
        data: loessData
      },
      {
        data: sandData
      }
    ]
  }
  
  chartInstance.setOption(option, true)
}

watch(() => props.chartData, () => {
  updateChart()
}, { deep: true })

onMounted(() => {
  initChart()
  
  const handleResize = () => {
    chartInstance?.resize()
  }
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chartInstance?.dispose()
})
</script>

<template>
  <div class="w-full h-80">
    <div ref="chartRef" class="w-full h-full"></div>
  </div>
</template>
