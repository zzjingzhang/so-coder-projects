<script setup>
import { ref, watch } from 'vue'
import { NCard, NSpace, NSlider, NRadioGroup, NRadio, NText } from 'naive-ui'

const props = defineProps({
  q1Magnitude: {
    type: Number,
    default: 5
  },
  q1Polarity: {
    type: Number,
    default: 1
  },
  q2Magnitude: {
    type: Number,
    default: 5
  },
  q2Polarity: {
    type: Number,
    default: -1
  },
  distance: {
    type: Number,
    default: 150
  }
})

const emit = defineEmits([
  'update:q1Magnitude',
  'update:q1Polarity',
  'update:q2Magnitude',
  'update:q2Polarity',
  'update:distance'
])

const localQ1Magnitude = ref(props.q1Magnitude)
const localQ1Polarity = ref(props.q1Polarity)
const localQ2Magnitude = ref(props.q2Magnitude)
const localQ2Polarity = ref(props.q2Polarity)
const localDistance = ref(props.distance)

watch(() => props.q1Magnitude, (val) => {
  localQ1Magnitude.value = val
})

watch(() => props.q1Polarity, (val) => {
  localQ1Polarity.value = val
})

watch(() => props.q2Magnitude, (val) => {
  localQ2Magnitude.value = val
})

watch(() => props.q2Polarity, (val) => {
  localQ2Polarity.value = val
})

watch(() => props.distance, (val) => {
  localDistance.value = val
})

watch(localQ1Magnitude, (val) => {
  emit('update:q1Magnitude', val)
})

watch(localQ1Polarity, (val) => {
  emit('update:q1Polarity', val)
})

watch(localQ2Magnitude, (val) => {
  emit('update:q2Magnitude', val)
})

watch(localQ2Polarity, (val) => {
  emit('update:q2Polarity', val)
})

watch(localDistance, (val) => {
  emit('update:distance', val)
})
</script>

<template>
  <div class="w-80 h-full bg-gray-100 p-6 overflow-y-auto">
    <NSpace vertical :size="20">
      <div class="text-center">
        <h2 class="text-xl font-bold text-gray-800 mb-1">电场模拟器</h2>
        <p class="text-sm text-gray-500">Electric Field Simulator</p>
      </div>

      <NCard :bordered="false" class="shadow-md">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <span class="font-semibold text-gray-700">电荷 Q1</span>
          </div>
        </template>

        <NSpace vertical :size="16">
          <div>
            <div class="flex justify-between items-center mb-2">
              <NText class="text-sm text-gray-600">电量大小</NText>
              <NText class="text-sm font-medium text-gray-800">{{ localQ1Magnitude }}</NText>
            </div>
            <NSlider
              v-model:value="localQ1Magnitude"
              :min="1"
              :max="10"
              :step="1"
            />
          </div>

          <div>
            <NText class="text-sm text-gray-600 block mb-2">电荷极性</NText>
            <NRadioGroup v-model:value="localQ1Polarity">
              <NSpace>
                <NRadio :value="1">
                  <span class="text-red-600 font-medium">正 (+)</span>
                </NRadio>
                <NRadio :value="-1">
                  <span class="text-blue-600 font-medium">负 (-)</span>
                </NRadio>
              </NSpace>
            </NRadioGroup>
          </div>
        </NSpace>
      </NCard>

      <NCard :bordered="false" class="shadow-md">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="font-semibold text-gray-700">电荷 Q2</span>
          </div>
        </template>

        <NSpace vertical :size="16">
          <div>
            <div class="flex justify-between items-center mb-2">
              <NText class="text-sm text-gray-600">电量大小</NText>
              <NText class="text-sm font-medium text-gray-800">{{ localQ2Magnitude }}</NText>
            </div>
            <NSlider
              v-model:value="localQ2Magnitude"
              :min="1"
              :max="10"
              :step="1"
            />
          </div>

          <div>
            <NText class="text-sm text-gray-600 block mb-2">电荷极性</NText>
            <NRadioGroup v-model:value="localQ2Polarity">
              <NSpace>
                <NRadio :value="1">
                  <span class="text-red-600 font-medium">正 (+)</span>
                </NRadio>
                <NRadio :value="-1">
                  <span class="text-blue-600 font-medium">负 (-)</span>
                </NRadio>
              </NSpace>
            </NRadioGroup>
          </div>
        </NSpace>
      </NCard>

      <NCard :bordered="false" class="shadow-md">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gray-500"></div>
            <span class="font-semibold text-gray-700">间距设置</span>
          </div>
        </template>

        <div>
          <div class="flex justify-between items-center mb-2">
            <NText class="text-sm text-gray-600">电荷间距</NText>
            <NText class="text-sm font-medium text-gray-800">{{ localDistance }} px</NText>
          </div>
          <NSlider
            v-model:value="localDistance"
            :min="50"
            :max="300"
            :step="10"
          />
        </div>
      </NCard>

      <div class="text-center text-xs text-gray-400 mt-4">
        <p>调整参数实时预览电场分布</p>
        <p class="mt-1">电场线从正电荷出发，指向负电荷</p>
      </div>
    </NSpace>
  </div>
</template>

<style scoped>
</style>
