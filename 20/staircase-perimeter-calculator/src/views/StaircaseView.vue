<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center p-8">
    <h1 
      class="text-4xl font-bold mb-12"
      :class="{ 'title-glow': showTitle, 'text-orange-500': true }"
    >
      楼梯图形平移法计算周长
    </h1>

    <div class="relative mb-12">
      <StaircaseAnimation 
        :is-playing="isPlaying"
        :step="animationStep"
      />
    </div>

    <div 
      class="mt-8 text-center"
      :class="{ 'formula-glow': showFormula, 'text-yellow-400': true }"
    >
      <div class="text-3xl font-bold" v-if="showFormula">
        (3 + 4) × 2 = 14
      </div>
      <div class="text-lg text-gray-300 mt-2" v-if="showFormula">
        周长 = (长 + 宽) × 2
      </div>
    </div>

    <div class="mt-12 flex gap-4">
      <a-button 
        type="primary" 
        size="large"
        @click="startAnimation"
        :disabled="isPlaying"
        class="bg-orange-500 hover:bg-orange-600 border-orange-500"
      >
        开始动画
      </a-button>
      <a-button 
        size="large"
        @click="resetAnimation"
      >
        重置
      </a-button>
    </div>

    <div class="mt-8 text-gray-400 text-sm max-w-2xl text-center">
      <p>点击"开始动画"按钮，观察楼梯图形如何通过平移法变换成长方形。</p>
      <p class="mt-1">通过平移水平和垂直的边，我们可以将楼梯图形的周长计算转化为长方形的周长计算。</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import StaircaseAnimation from '../components/StaircaseAnimation.vue'

export default {
  name: 'StaircaseView',
  components: {
    StaircaseAnimation
  },
  setup() {
    const isPlaying = ref(false)
    const animationStep = ref(1)
    const showTitle = ref(false)
    const showFormula = ref(false)

    onMounted(() => {
      setTimeout(() => {
        showTitle.value = true
      }, 500)
    })

    const startAnimation = () => {
      if (isPlaying.value) return
      
      isPlaying.value = true
      animationStep.value = 1
      showFormula.value = false

      const steps = [
        { step: 1, delay: 1000 },
        { step: 2, delay: 2000 },
        { step: 3, delay: 2000 },
        { step: 4, delay: 1500 },
        { step: 5, delay: 1500 },
        { step: 6, delay: 1000 }
      ]

      let currentIndex = 0
      const executeStep = () => {
        if (currentIndex < steps.length) {
          const step = steps[currentIndex]
          animationStep.value = step.step
          
          if (step.step === 6) {
            setTimeout(() => {
              showFormula.value = true
            }, 500)
          }
          
          currentIndex++
          setTimeout(executeStep, step.delay)
        } else {
          isPlaying.value = false
        }
      }

      executeStep()
    }

    const resetAnimation = () => {
      isPlaying.value = false
      animationStep.value = 1
      showFormula.value = false
    }

    return {
      isPlaying,
      animationStep,
      showTitle,
      showFormula,
      startAnimation,
      resetAnimation
    }
  }
}
</script>
