<template>
  <div class="relative">
    <svg 
      width="600" 
      height="500" 
      viewBox="0 0 600 500"
      class="overflow-visible"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="strongGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g 
        :transform="`rotate(${rotation} 300 250) scale(${scaleX}, 1)`"
        style="transition: transform 1.5s ease-in-out"
      >
        <rect 
          x="100" 
          y="100" 
          width="400" 
          height="300" 
          fill="none" 
          stroke="#3498DB" 
          stroke-width="3"
          stroke-dasharray="10,5"
          class="dash-line"
          :class="{ 'opacity-0': step < 2, 'opacity-100': step >= 2 && step < 6 }"
          style="transition: opacity 0.8s ease-in-out"
        />

        <text 
          x="50" 
          y="250" 
          fill="#ECF0F1" 
          font-size="18" 
          font-weight="bold"
          text-anchor="middle"
          :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          3
        </text>
        <text 
          x="300" 
          y="80" 
          fill="#ECF0F1" 
          font-size="18" 
          font-weight="bold"
          text-anchor="middle"
          :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          4
        </text>

        <g 
          :class="{ 'opacity-0': step > 5, 'opacity-100': step <= 5 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          <line 
            x1="200" 
            y1="100" 
            x2="200" 
            y2="200" 
            stroke="#ECF0F1" 
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <line 
            x1="300" 
            y1="200" 
            x2="300" 
            y2="300" 
            stroke="#ECF0F1" 
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <line 
            x1="400" 
            y1="300" 
            x2="400" 
            y2="400" 
            stroke="#ECF0F1" 
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <line 
            x1="200" 
            y1="200" 
            x2="300" 
            y2="200" 
            stroke="#ECF0F1" 
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <line 
            x1="300" 
            y1="300" 
            x2="400" 
            y2="300" 
            stroke="#ECF0F1" 
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <line 
            x1="400" 
            y1="400" 
            x2="500" 
            y2="400" 
            stroke="#ECF0F1" 
            stroke-width="2"
            stroke-dasharray="5,5"
          />
        </g>

        <g 
          class="horizontal-steps"
          :class="{ 'translate-x-0': step < 3, 'translate-x-40': step >= 3 && step < 5 }"
          style="transition: transform 1.2s ease-in-out"
        >
          <line 
            x1="100" 
            y1="100" 
            x2="200" 
            y2="100" 
            stroke="#E67E22" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="200" 
            y1="200" 
            x2="300" 
            y2="200" 
            stroke="#E67E22" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="300" 
            y1="300" 
            x2="400" 
            y2="300" 
            stroke="#E67E22" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="400" 
            y1="400" 
            x2="500" 
            y2="400" 
            stroke="#E67E22" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
        </g>

        <g 
          class="vertical-steps"
          :class="{ 'translate-y-0': step < 4, 'translate-y-30': step >= 4 && step < 5 }"
          style="transition: transform 1.2s ease-in-out"
        >
          <line 
            x1="500" 
            y1="100" 
            x2="500" 
            y2="400" 
            stroke="#3498DB" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="100" 
            y1="100" 
            x2="100" 
            y2="200" 
            stroke="#3498DB" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="200" 
            y1="200" 
            x2="200" 
            y2="300" 
            stroke="#3498DB" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="300" 
            y1="300" 
            x2="300" 
            y2="400" 
            stroke="#3498DB" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
          <line 
            x1="400" 
            y1="400" 
            x2="400" 
            y2="500" 
            stroke="#3498DB" 
            stroke-width="4"
            filter="url(#glow)"
            :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
          />
        </g>

        <g 
          :class="{ 'opacity-100': step >= 5, 'opacity-0': step < 5 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          <rect 
            x="100" 
            y="100" 
            width="400" 
            height="300" 
            fill="none" 
            stroke="#F1C40F" 
            stroke-width="5"
            filter="url(#strongGlow)"
            :class="{ 'opacity-100': step >= 6, 'opacity-0': step < 6 }"
            style="transition: opacity 0.8s ease-in-out"
          />
          
          <line 
            x1="100" 
            y1="100" 
            x2="500" 
            y2="100" 
            stroke="#E67E22" 
            stroke-width="5"
            filter="url(#strongGlow)"
            :class="{ 'opacity-100': step >= 6, 'opacity-0': step < 6 }"
            style="transition: opacity 0.8s ease-in-out"
          />
          <line 
            x1="100" 
            y1="400" 
            x2="500" 
            y2="400" 
            stroke="#E67E22" 
            stroke-width="5"
            filter="url(#strongGlow)"
            :class="{ 'opacity-100': step >= 6, 'opacity-0': step < 6 }"
            style="transition: opacity 0.8s ease-in-out"
          />
          <line 
            x1="100" 
            y1="100" 
            x2="100" 
            y2="400" 
            stroke="#3498DB" 
            stroke-width="5"
            filter="url(#strongGlow)"
            :class="{ 'opacity-100': step >= 6, 'opacity-0': step < 6 }"
            style="transition: opacity 0.8s ease-in-out"
          />
          <line 
            x1="500" 
            y1="100" 
            x2="500" 
            y2="400" 
            stroke="#3498DB" 
            stroke-width="5"
            filter="url(#strongGlow)"
            :class="{ 'opacity-100': step >= 6, 'opacity-0': step < 6 }"
            style="transition: opacity 0.8s ease-in-out"
          />
        </g>

        <g 
          :class="{ 'opacity-100': step >= 6, 'opacity-0': step < 6 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          <text 
            x="300" 
            y="80" 
            fill="#E67E22" 
            font-size="20" 
            font-weight="bold"
            text-anchor="middle"
            filter="url(#glow)"
          >
            长 = 4
          </text>
          <text 
            x="50" 
            y="250" 
            fill="#3498DB" 
            font-size="20" 
            font-weight="bold"
            text-anchor="middle"
            filter="url(#glow)"
          >
            宽 = 3
          </text>
        </g>

        <g 
          :class="{ 'opacity-100': step >= 3, 'opacity-0': step < 3 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          <text 
            x="250" 
            y="150" 
            fill="#E67E22" 
            font-size="14"
            text-anchor="middle"
          >
            → 平移
          </text>
          <text 
            x="350" 
            y="250" 
            fill="#E67E22" 
            font-size="14"
            text-anchor="middle"
          >
            → 平移
          </text>
        </g>

        <g 
          :class="{ 'opacity-100': step >= 4, 'opacity-0': step < 4 }"
          style="transition: opacity 0.8s ease-in-out"
        >
          <text 
            x="150" 
            y="250" 
            fill="#3498DB" 
            font-size="14"
            text-anchor="middle"
          >
            ↓ 平移
          </text>
          <text 
            x="250" 
            y="350" 
            fill="#3498DB" 
            font-size="14"
            text-anchor="middle"
          >
            ↓ 平移
          </text>
        </g>
      </g>
    </svg>

    <div class="absolute -bottom-8 left-0 right-0 flex justify-center gap-8">
      <div 
        class="flex items-center gap-2"
        :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
      >
        <div class="w-4 h-1 bg-orange-500 rounded"></div>
        <span class="text-white text-sm">水平边</span>
      </div>
      <div 
        class="flex items-center gap-2"
        :class="{ 'opacity-100': step >= 1, 'opacity-0': step < 1 }"
      >
        <div class="w-1 h-4 bg-blue-500 rounded"></div>
        <span class="text-white text-sm">垂直边</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'StaircaseAnimation',
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const rotation = ref(0)
    const scaleX = ref(1)

    watch(() => props.step, (newStep) => {
      if (newStep >= 1 && newStep < 3) {
        rotation.value = 0
        scaleX.value = 1
      }
    })

    return {
      rotation,
      scaleX
    }
  }
}
</script>

<style scoped>
svg {
  filter: drop-shadow(0 0 20px rgba(230, 126, 34, 0.3));
}

line {
  transition: all 0.8s ease-in-out;
}

.translate-x-40 {
  transform: translateX(40px);
}

.translate-y-30 {
  transform: translateY(30px);
}

.translate-x-0 {
  transform: translateX(0);
}

.translate-y-0 {
  transform: translateY(0);
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
</style>
