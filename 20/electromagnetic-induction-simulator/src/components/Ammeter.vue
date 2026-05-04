<template>
  <div class="flex flex-col items-center">
    <svg 
      :width="svgSize" 
      :height="svgSize" 
      :viewBox="`0 0 ${svgSize} ${svgSize}`"
      class="drop-shadow-lg"
    >
      <defs>
        <radialGradient id="meterBackground" cx="50%" cy="30%" r="60%">
          <stop offset="0%" style="stop-color:#334155;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </radialGradient>
        <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#dc2626;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="centerDot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#94a3b8;stop-opacity:1" />
        </radialGradient>
        <filter id="needleGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <circle 
        :cx="centerX" 
        :cy="centerY" 
        :r="outerRadius" 
        fill="url(#meterBackground)"
        stroke="#475569"
        stroke-width="4"
      />
      
      <circle 
        :cx="centerX" 
        :cy="centerY" 
        :r="outerRadius - 8" 
        fill="none"
        stroke="#6366f1"
        stroke-width="1"
        opacity="0.3"
      />

      <g>
        <path
          :d="scaleArcPath"
          fill="none"
          stroke="#64748b"
          stroke-width="2"
          opacity="0.5"
        />
        
        <g v-for="(tick, index) in majorTicks" :key="`major-${index}`">
          <line
            :x1="tick.startX"
            :y1="tick.startY"
            :x2="tick.endX"
            :y2="tick.endY"
            stroke="#94a3b8"
            stroke-width="2"
          />
          <text
            :x="tick.labelX"
            :y="tick.labelY"
            text-anchor="middle"
            fill="#e2e8f0"
            font-size="11"
            font-weight="bold"
          >
            {{ tick.label }}
          </text>
        </g>

        <g v-for="(tick, index) in minorTicks" :key="`minor-${index}`">
          <line
            :x1="tick.startX"
            :y1="tick.startY"
            :x2="tick.endX"
            :y2="tick.endY"
            stroke="#64748b"
            stroke-width="1"
          />
        </g>

        <g>
          <line
            :x1="centerX"
            :y1="centerY - outerRadius + 25"
            :x2="centerX"
            :y2="centerY - outerRadius + 40"
            stroke="#22d3ee"
            stroke-width="3"
          />
          <text
            :x="centerX"
            :y="centerY - outerRadius + 18"
            text-anchor="middle"
            fill="#22d3ee"
            font-size="10"
            font-weight="bold"
          >
            0
          </text>
        </g>

        <text
          :x="centerX - outerRadius + 30"
          :y="centerY - 10"
          text-anchor="middle"
          fill="#f97316"
          font-size="9"
          font-weight="bold"
        >
          -
        </text>
        <text
          :x="centerX + outerRadius - 30"
          :y="centerY - 10"
          text-anchor="middle"
          fill="#22c55e"
          font-size="9"
          font-weight="bold"
        >
          +
        </text>
      </g>

      <g :transform="`rotate(${needleAngle}, ${centerX}, ${centerY})`">
        <line
          :x1="centerX"
          :y1="centerY + 15"
          :x2="centerX"
          :y2="centerY - needleLength"
          stroke="url(#needleGradient)"
          stroke-width="3"
          stroke-linecap="round"
          filter="url(#needleGlow)"
        />
        <polygon
          :points="`${centerX},${centerY - needleLength - 6} ${centerX - 4},${centerY - needleLength} ${centerX + 4},${centerY - needleLength}`"
          fill="#ef4444"
          filter="url(#needleGlow)"
        />
      </g>

      <circle 
        :cx="centerX" 
        :cy="centerY" 
        :r="12" 
        fill="url(#centerDot)"
        stroke="#475569"
        stroke-width="2"
      />
      <circle 
        :cx="centerX" 
        :cy="centerY" 
        :r="4" 
        fill="#ef4444"
      />

      <g>
        <rect
          :x="centerX - 40"
          :y="centerY + outerRadius + 5"
          width="80"
          height="25"
          rx="5"
          fill="#1e293b"
          stroke="#475569"
          stroke-width="1"
        />
        <text
          :x="centerX"
          :y="centerY + outerRadius + 22"
          text-anchor="middle"
          fill="#e2e8f0"
          font-size="12"
          font-weight="bold"
        >
          电流计
        </text>
      </g>
    </svg>

    <div class="mt-4 text-center">
      <div 
        class="text-2xl font-mono font-bold transition-colors duration-300"
        :class="getValueColorClass(current)"
      >
        {{ displayValue }}
      </div>
      <div class="text-xs text-slate-400 mt-1">安培 (A)</div>
    </div>

    <div class="mt-3 w-full">
      <div class="flex justify-between text-xs text-slate-500 mb-1">
        <span>-5A</span>
        <span>0A</span>
        <span>+5A</span>
      </div>
      <div class="h-2 bg-slate-700 rounded-full overflow-hidden relative">
        <div 
          class="absolute inset-y-0 transition-all duration-300"
          :style="indicatorStyle"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    default: 0
  }
})

const svgSize = 200
const centerX = svgSize / 2
const centerY = svgSize / 2 - 5
const outerRadius = 80
const scaleRadius = 65
const needleLength = 55
const maxCurrent = 5

const scaleArcPath = computed(() => {
  const startAngle = -135
  const endAngle = 135
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180
  
  const x1 = centerX + scaleRadius * Math.cos(startRad)
  const y1 = centerY + scaleRadius * Math.sin(startRad)
  const x2 = centerX + scaleRadius * Math.cos(endRad)
  const y2 = centerY + scaleRadius * Math.sin(endRad)
  
  return `M ${x1} ${y1} A ${scaleRadius} ${scaleRadius} 0 1 1 ${x2} ${y2}`
})

const needleAngle = computed(() => {
  const clampedCurrent = Math.max(-maxCurrent, Math.min(maxCurrent, props.current))
  const angleRange = 270
  const angle = (clampedCurrent / maxCurrent) * (angleRange / 2)
  return angle
})

const displayValue = computed(() => {
  return props.current.toFixed(2)
})

const majorTicks = computed(() => {
  const ticks = []
  const values = [-5, -3, -1, 1, 3, 5]
  const labelRadius = scaleRadius - 20
  
  values.forEach((value, index) => {
    const angle = (value / maxCurrent) * 135
    const rad = (angle * Math.PI) / 180
    const startRad = rad
    const endRad = rad
    
    ticks.push({
      startX: centerX + (scaleRadius - 8) * Math.cos(startRad),
      startY: centerY + (scaleRadius - 8) * Math.sin(startRad),
      endX: centerX + scaleRadius * Math.cos(endRad),
      endY: centerY + scaleRadius * Math.sin(endRad),
      labelX: centerX + labelRadius * Math.cos(rad),
      labelY: centerY + labelRadius * Math.sin(rad) + 4,
      label: value
    })
  })
  
  return ticks
})

const minorTicks = computed(() => {
  const ticks = []
  
  for (let i = -4; i <= 4; i++) {
    if ([0, -1, 1, -3, 3, -5, 5].includes(i)) continue
    
    const value = i
    const angle = (value / maxCurrent) * 135
    const rad = (angle * Math.PI) / 180
    
    ticks.push({
      startX: centerX + (scaleRadius - 4) * Math.cos(rad),
      startY: centerY + (scaleRadius - 4) * Math.sin(rad),
      endX: centerX + scaleRadius * Math.cos(rad),
      endY: centerY + scaleRadius * Math.sin(rad)
    })
  }
  
  return ticks
})

const indicatorStyle = computed(() => {
  const value = Math.max(-maxCurrent, Math.min(maxCurrent, props.current))
  const percent = (value + maxCurrent) / (maxCurrent * 2) * 100
  
  let color = '#6366f1'
  if (Math.abs(value) > 0.1) {
    color = value > 0 ? '#22c55e' : '#ef4444'
  }
  
  if (value >= 0) {
    return {
      left: '50%',
      width: `${percent - 50}%`,
      background: `linear-gradient(90deg, #6366f1, ${color})`
    }
  } else {
    return {
      left: `${percent}%`,
      width: `${50 - percent}%`,
      background: `linear-gradient(90deg, ${color}, #6366f1)`
    }
  }
})

const getValueColorClass = (value) => {
  if (Math.abs(value) < 0.01) return 'text-slate-400'
  return value > 0 ? 'text-green-400' : 'text-red-400'
}
</script>
