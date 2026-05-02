<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col items-center justify-center p-8">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12">
        <h1 class="text-6xl font-bold text-teal-700 mb-6">运势查询</h1>
        <p class="text-3xl text-teal-600">输入您的农历生日，查看2025年运势走向</p>
      </div>

      <div class="bg-white rounded-3xl shadow-2xl p-12" v-if="!fortuneResult">
        <div class="space-y-10">
          <div>
            <label class="block text-3xl font-semibold text-teal-700 mb-6">农历生日</label>
            <p class="text-2xl text-teal-600 mb-6">请输入您的农历生日，格式如：1990年05月15日</p>
          </div>

          <div class="flex flex-wrap gap-6">
            <div class="flex-1 min-w-48">
              <label class="block text-2xl font-medium text-teal-700 mb-4">年份</label>
              <input 
                v-model.number="birthYear"
                type="number"
                placeholder="1990"
                min="1900"
                max="2025"
                class="w-full text-4xl px-8 py-6 border-3 border-teal-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-center"
              />
            </div>
            <div class="flex-1 min-w-48">
              <label class="block text-2xl font-medium text-teal-700 mb-4">月份</label>
              <select 
                v-model.number="birthMonth"
                class="w-full text-4xl px-8 py-6 border-3 border-teal-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white text-center"
              >
                <option value="">请选择</option>
                <option v-for="m in 12" :key="m" :value="m">{{ m }}月</option>
              </select>
            </div>
            <div class="flex-1 min-w-48">
              <label class="block text-2xl font-medium text-teal-700 mb-4">日期</label>
              <select 
                v-model.number="birthDay"
                class="w-full text-4xl px-8 py-6 border-3 border-teal-200 rounded-2xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white text-center"
              >
                <option value="">请选择</option>
                <option v-for="d in 30" :key="d" :value="d">{{ d }}日</option>
              </select>
            </div>
          </div>

          <div class="text-center pt-8">
            <button 
              @click="checkFortune"
              :disabled="!isValidInput"
              class="text-4xl font-bold px-20 py-8 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
            >
              查看运势
            </button>
            <p v-if="!isValidInput" class="text-2xl text-rose-500 mt-6">请完整填写您的农历生日</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-2xl p-12" v-else>
        <div class="text-center mb-12">
          <h2 class="text-5xl font-bold text-teal-700 mb-4">2025年运势解析</h2>
          <p class="text-3xl text-teal-600">农历 {{ birthYear }}年{{ birthMonth }}月{{ birthDay }}日 出生</p>
        </div>

        <div class="space-y-10">
          <div class="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-10 border-l-4 border-teal-500">
            <h3 class="text-4xl font-bold text-teal-700 mb-6 flex items-center">
              <span class="mr-4">🌟</span>
              整体运势
            </h3>
            <p class="text-3xl text-teal-800 leading-relaxed">{{ fortuneResult.overall }}</p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border-l-4 border-rose-400">
              <h3 class="text-3xl font-bold text-rose-600 mb-5 flex items-center">
                <span class="mr-3">💕</span>
                感情运势
              </h3>
              <p class="text-2xl text-rose-700 leading-relaxed">{{ fortuneResult.love }}</p>
            </div>

            <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border-l-4 border-amber-400">
              <h3 class="text-3xl font-bold text-amber-600 mb-5 flex items-center">
                <span class="mr-3">💰</span>
                财运
              </h3>
              <p class="text-2xl text-amber-700 leading-relaxed">{{ fortuneResult.wealth }}</p>
            </div>

            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-blue-400">
              <h3 class="text-3xl font-bold text-blue-600 mb-5 flex items-center">
                <span class="mr-3">📚</span>
                事业运势
              </h3>
              <p class="text-2xl text-blue-700 leading-relaxed">{{ fortuneResult.career }}</p>
            </div>

            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <h3 class="text-3xl font-bold text-green-600 mb-5 flex items-center">
                <span class="mr-3">🏥</span>
                健康运势
              </h3>
              <p class="text-2xl text-green-700 leading-relaxed">{{ fortuneResult.health }}</p>
            </div>
          </div>

          <div class="text-center pt-8">
            <button 
              @click="resetForm"
              class="text-3xl font-semibold px-16 py-6 border-3 border-teal-500 text-teal-600 rounded-2xl hover:bg-teal-50 transition-all duration-300"
            >
              重新查询
            </button>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-2xl text-teal-600">基于中国传统命理学 · 仅供娱乐参考</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { calculateFortune, getZodiacSign } from '../utils/fortune.js'

const birthYear = ref(null)
const birthMonth = ref(null)
const birthDay = ref(null)
const fortuneResult = ref(null)

const isValidInput = computed(() => {
  return birthYear.value && birthMonth.value && birthDay.value &&
         birthYear.value >= 1900 && birthYear.value <= 2025 &&
         birthMonth.value >= 1 && birthMonth.value <= 12 &&
         birthDay.value >= 1 && birthDay.value <= 30
})

const checkFortune = () => {
  if (!isValidInput.value) return
  
  const zodiac = getZodiacSign(birthYear.value)
  fortuneResult.value = calculateFortune(birthYear.value, birthMonth.value, birthDay.value, zodiac)
}

const resetForm = () => {
  birthYear.value = null
  birthMonth.value = null
  birthDay.value = null
  fortuneResult.value = null
}
</script>
