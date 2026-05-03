<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
    <div class="flex justify-center mb-8">
      <a-radio-group v-model:value="timerMode" button-style="solid" size="large">
        <a-radio-button value="work">专注工作</a-radio-button>
        <a-radio-button value="break">短暂休息</a-radio-button>
        <a-radio-button value="longBreak">长时间休息</a-radio-button>
      </a-radio-group>
    </div>

    <div class="flex justify-center items-center gap-4 mb-8">
      <FlipDigit :value="minutesTens" />
      <FlipDigit :value="minutesOnes" />
      <div class="text-6xl font-bold text-white animate-pulse">:</div>
      <FlipDigit :value="secondsTens" />
      <FlipDigit :value="secondsOnes" />
    </div>

    <div class="flex justify-center gap-4 flex-wrap">
      <a-button 
        v-if="!isRunning" 
        type="primary" 
        size="large" 
        @click="startTimer"
        class="flex items-center justify-center"
        :style="{ minWidth: '120px', height: '50px' }"
      >
        <play-circle-outlined class="mr-2" />
        开始
      </a-button>
      <a-button 
        v-else 
        type="primary" 
        size="large" 
        danger 
        @click="pauseTimer"
        class="flex items-center justify-center"
        :style="{ minWidth: '120px', height: '50px' }"
      >
        <pause-circle-outlined class="mr-2" />
        暂停
      </a-button>
      <a-button 
        size="large" 
        @click="resetTimer"
        class="flex items-center justify-center"
        :style="{ minWidth: '120px', height: '50px' }"
      >
        <reload-outlined class="mr-2" />
        重置
      </a-button>
    </div>

    <div class="mt-8 text-center text-white/80">
      <p class="text-lg">已完成 <span class="font-bold text-yellow-300 text-2xl">{{ completedPomodoros }}</span> 个番茄钟</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import FlipDigit from './FlipDigit.vue'
import { message } from 'ant-design-vue'

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60
const LONG_BREAK_TIME = 15 * 60

const timerMode = ref('work')
const timeLeft = ref(WORK_TIME)
const isRunning = ref(false)
const completedPomodoros = ref(0)
let timerInterval = null

const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)

const minutesTens = computed(() => Math.floor(minutes.value / 10))
const minutesOnes = computed(() => minutes.value % 10)
const secondsTens = computed(() => Math.floor(seconds.value / 10))
const secondsOnes = computed(() => seconds.value % 10)

const startTimer = () => {
  if (isRunning.value) return
  isRunning.value = true
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      handleTimerComplete()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const resetTimer = () => {
  pauseTimer()
  setTimeBasedOnMode()
}

const setTimeBasedOnMode = () => {
  switch (timerMode.value) {
    case 'work':
      timeLeft.value = WORK_TIME
      break
    case 'break':
      timeLeft.value = BREAK_TIME
      break
    case 'longBreak':
      timeLeft.value = LONG_BREAK_TIME
      break
  }
}

const handleTimerComplete = () => {
  pauseTimer()
  if (timerMode.value === 'work') {
    completedPomodoros.value++
    message.success('专注时间结束！休息一下吧 🎉')
    timerMode.value = completedPomodoros.value % 4 === 0 ? 'longBreak' : 'break'
  } else {
    message.info('休息时间结束！准备开始新的专注 💪')
    timerMode.value = 'work'
  }
  setTimeBasedOnMode()
}

timerMode.value = 'work'
setTimeBasedOnMode()

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>
