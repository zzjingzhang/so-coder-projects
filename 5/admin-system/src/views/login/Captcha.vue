<template>
  <div class="captcha-container" @click="refresh">
    <canvas ref="canvasRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 40
  }
})

const emit = defineEmits(['update:modelValue'])

const canvasRef = ref(null)
const code = ref('')

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const randomColor = (min, max) => {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

const draw = () => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = randomColor(180, 230)
  ctx.fillRect(0, 0, props.width, props.height)
  
  let textCode = ''
  const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  for (let i = 0; i < 4; i++) {
    const text = pool[randomNum(0, pool.length)]
    textCode += text
    const fontSize = randomNum(20, 30)
    const deg = randomNum(-30, 30)
    ctx.font = fontSize + 'px Simhei'
    ctx.fillStyle = randomColor(80, 150)
    ctx.save()
    ctx.translate(30 * i + 15, 25)
    ctx.rotate(deg * Math.PI / 180)
    ctx.fillText(text, -15, 0)
    ctx.restore()
  }
  
  for (let i = 0; i < 8; i++) {
    ctx.beginPath()
    ctx.strokeStyle = randomColor(100, 200)
    ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height))
    ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height))
    ctx.stroke()
  }
  
  for (let i = 0; i < 40; i++) {
    ctx.beginPath()
    ctx.fillStyle = randomColor(0, 255)
    ctx.arc(randomNum(0, props.width), randomNum(0, props.height), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
  
  code.value = textCode
  emit('update:modelValue', textCode)
}

const refresh = () => {
  draw()
}

onMounted(() => {
  draw()
})

defineExpose({ refresh })
</script>

<style scoped>
.captcha-container {
  cursor: pointer;
  display: inline-block;
}
</style>