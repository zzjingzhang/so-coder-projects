<template>
  <div class="flip-digit-container relative w-20 h-28 md:w-24 md:h-32">
    <div class="flip-digit absolute inset-0 perspective-1000">
      <div 
        class="digit-top absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-xl overflow-hidden flex items-center justify-center border-b border-gray-700"
        style="z-index: 10;"
      >
        <span class="text-5xl md:text-6xl font-bold text-white transform translate-y-1/4">{{ displayValue }}</span>
      </div>
      
      <div 
        class="digit-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-xl overflow-hidden flex items-center justify-center border-t border-gray-700"
        style="z-index: 10;"
      >
        <span class="text-5xl md:text-6xl font-bold text-white transform -translate-y-1/4">{{ displayValue }}</span>
      </div>

      <div 
        v-if="isFlipping"
        class="flip-top absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-xl overflow-hidden flex items-center justify-center border-b border-gray-700 animate-flip-down"
        style="transform-origin: bottom; backface-visibility: hidden; z-index: 20;"
      >
        <span class="text-5xl md:text-6xl font-bold text-white transform translate-y-1/4">{{ prevValue }}</span>
      </div>

      <div 
        v-if="isFlipping"
        class="flip-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-xl overflow-hidden flex items-center justify-center border-t border-gray-700 animate-flip-up"
        style="transform-origin: top; backface-visibility: hidden; z-index: 20;"
      >
        <span class="text-5xl md:text-6xl font-bold text-white transform -translate-y-1/4">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    required: true
  }
})

const prevValue = ref(props.value)
const displayValue = ref(props.value)
const isFlipping = ref(false)

watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    prevValue.value = oldVal
    isFlipping.value = true
    
    setTimeout(() => {
      displayValue.value = newVal
    }, 300)
    
    setTimeout(() => {
      isFlipping.value = false
    }, 600)
  }
})

onMounted(() => {
  prevValue.value = props.value
  displayValue.value = props.value
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.animate-flip-down {
  animation: flipDown 0.6s ease-in-out forwards;
}

.animate-flip-up {
  animation: flipUp 0.6s ease-in-out forwards;
}

@keyframes flipDown {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

@keyframes flipUp {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
</style>
