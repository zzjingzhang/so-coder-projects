<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProblem, selectNextArm, updateArmWithFeedback, getArmStats } from '../utils/thompsonSampling'
import { FeedbackType, FeedbackTypeLabels } from '../types'

const route = useRoute()
const router = useRouter()

const problem = ref(null)
const selectedArm = ref(null)
const feedbackValue = ref(null)
const feedbackSubmitted = ref(false)
const showHistory = ref(false)

const totalTrials = computed(() => {
  if (!problem.value) return 0
  return problem.value.arms.reduce((sum, arm) => sum + arm.trials, 0)
})

const sortedArms = computed(() => {
  if (!problem.value) return []
  return [...problem.value.arms].sort((a, b) => {
    const statsA = getArmStats(a)
    const statsB = getArmStats(b)
    return statsB.expectedValue - statsA.expectedValue
  })
})

function loadProblem() {
  const id = route.params.id
  problem.value = getProblem(id)
  if (!problem.value) {
    router.push('/')
  }
}

function selectArm() {
  if (!problem.value) return
  selectedArm.value = selectNextArm(problem.value)
  feedbackValue.value = null
  feedbackSubmitted.value = false
}

function submitFeedback() {
  if (!problem.value || !selectedArm.value || feedbackValue.value === null) return
  
  problem.value = updateArmWithFeedback(
    problem.value,
    selectedArm.value.id,
    feedbackValue.value
  )
  
  feedbackSubmitted.value = true
}

function resetSelection() {
  selectedArm.value = null
  feedbackValue.value = null
  feedbackSubmitted.value = false
}

function getStarRating() {
  if (feedbackValue.value === null) return 0
  return feedbackValue.value
}

function setStarRating(rating) {
  feedbackValue.value = rating
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

watch(() => route.params.id, () => {
  loadProblem()
})

onMounted(() => {
  loadProblem()
})
</script>

<template>
  <div v-if="problem" class="space-y-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white mb-2">{{ problem.name }}</h2>
            <p v-if="problem.description" class="text-blue-100 max-w-xl">
              {{ problem.description }}
            </p>
          </div>
          <button 
            @click="router.push('/')"
            class="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl text-white transition-all"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        
        <div class="flex flex-wrap gap-4 mt-6">
          <div class="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-xl">
            <i class="pi pi-sitemap text-white"></i>
            <span class="text-white font-medium">{{ problem.arms.length }} 个选项</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-xl">
            <i class="pi pi-history text-white"></i>
            <span class="text-white font-medium">{{ totalTrials }} 次测试</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-xl">
            <i class="pi pi-chart-bar text-white"></i>
            <span class="text-white font-medium">{{ FeedbackTypeLabels[problem.feedbackType] }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium mb-4">
          <i class="pi pi-magic"></i>
          <span>汤普森采样推荐</span>
        </div>
        
        <div v-if="!selectedArm">
          <h3 class="text-xl font-bold text-gray-800 mb-4">准备好开始测试了吗？</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            点击下方按钮，算法将根据当前数据为您推荐下一个应该尝试的选项。
          </p>
          <button 
            @click="selectArm"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200"
          >
            <i class="pi pi-play"></i>
            <span>推荐下一个选项</span>
          </button>
        </div>
        
        <div v-else-if="!feedbackSubmitted">
          <div class="mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <i class="pi pi-bolt text-4xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">推荐尝试</h3>
            <p class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {{ selectedArm.name }}
            </p>
          </div>
          
          <div class="max-w-md mx-auto">
            <div class="text-left mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-3">
                请为这个选项提供反馈
              </label>
              
              <div v-if="problem.feedbackType === 'scalar'" class="space-y-3">
                <input 
                  v-model.number="feedbackValue"
                  type="range"
                  min="1"
                  max="100"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">1 (差)</span>
                  <span class="text-2xl font-bold text-blue-600">{{ feedbackValue || 50 }}</span>
                  <span class="text-gray-500">100 (好)</span>
                </div>
              </div>
              
              <div v-else-if="problem.feedbackType === 'binary'" class="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  @click="feedbackValue = 'good'"
                  :class="[
                    'flex flex-col items-center gap-2 p-6 border-2 rounded-2xl transition-all',
                    feedbackValue === 'good'
                      ? 'border-green-400 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <i class="pi pi-thumbs-up text-4xl" :class="feedbackValue === 'good' ? 'text-green-500' : 'text-gray-400'"></i>
                  <span class="font-medium" :class="feedbackValue === 'good' ? 'text-green-700' : 'text-gray-600'">好</span>
                </button>
                <button 
                  type="button"
                  @click="feedbackValue = 'bad'"
                  :class="[
                    'flex flex-col items-center gap-2 p-6 border-2 rounded-2xl transition-all',
                    feedbackValue === 'bad'
                      ? 'border-red-400 bg-red-50 ring-2 ring-red-200'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <i class="pi pi-thumbs-down text-4xl" :class="feedbackValue === 'bad' ? 'text-red-500' : 'text-gray-400'"></i>
                  <span class="font-medium" :class="feedbackValue === 'bad' ? 'text-red-700' : 'text-gray-600'">坏</span>
                </button>
              </div>
              
              <div v-else-if="problem.feedbackType === 'stars'" class="flex justify-center gap-2">
                <button 
                  v-for="star in 5" 
                  :key="star"
                  type="button"
                  @click="setStarRating(star)"
                  class="text-4xl transition-transform hover:scale-110"
                >
                  <i 
                    :class="[
                      star <= getStarRating() ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'
                    ]"
                  ></i>
                </button>
              </div>
            </div>
            
            <div class="flex gap-3">
              <button 
                @click="resetSelection"
                class="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button 
                @click="submitFeedback"
                :disabled="feedbackValue === null"
                :class="[
                  'flex-1 px-4 py-2.5 rounded-xl font-medium transition-all',
                  feedbackValue !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                ]"
              >
                提交反馈
              </button>
            </div>
          </div>
        </div>
        
        <div v-else>
          <div class="mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
              <i class="pi pi-check text-4xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">反馈已提交！</h3>
            <p class="text-gray-500">
              感谢您的反馈，算法已更新学习。
            </p>
          </div>
          
          <div class="flex gap-3 justify-center">
            <button 
              @click="selectArm"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200"
            >
              <i class="pi pi-refresh"></i>
              <span>继续测试</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-800">选项状态排名</h3>
          <p class="text-sm text-gray-500">基于汤普森采样的期望价值排序</p>
        </div>
        <button 
          @click="showHistory = !showHistory"
          class="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-colors"
        >
          <i :class="showHistory ? 'pi pi-eye-slash' : 'pi pi-history'"></i>
          <span>{{ showHistory ? '隐藏历史' : '查看历史' }}</span>
        </button>
      </div>
      
      <div class="divide-y divide-gray-50">
        <div 
          v-for="(arm, index) in sortedArms" 
          :key="arm.id"
          :class="[
            'px-8 py-5 transition-all',
            index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
          ]"
        >
          <div class="flex items-center gap-4">
            <div 
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg',
                index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                index === 1 ? 'bg-gray-200 text-gray-600' :
                index === 2 ? 'bg-orange-100 text-orange-600' :
                'bg-gray-100 text-gray-500'
              ]"
            >
              {{ index + 1 }}
            </div>
            
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-gray-800">{{ arm.name }}</h4>
                <span v-if="index === 0" class="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-lg">
                  当前最佳
                </span>
              </div>
              
              <div class="mt-2">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-gray-500">期望价值</span>
                  <span class="font-medium text-gray-700">{{ (getArmStats(arm).expectedValue * 100).toFixed(1) }}%</span>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                    :style="{ width: `${getArmStats(arm).expectedValue * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-800">{{ arm.trials }}</div>
              <div class="text-xs text-gray-500">测试次数</div>
            </div>
          </div>
          
          <div v-if="showHistory && arm.history.length > 0" class="mt-4 pl-14">
            <div class="text-sm font-medium text-gray-600 mb-2">最近反馈</div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(record, hIndex) in arm.history.slice(-5).reverse()" 
                :key="hIndex"
                :class="[
                  'px-3 py-1.5 rounded-lg text-sm font-medium',
                  record.normalizedReward >= 0.7 ? 'bg-green-100 text-green-700' :
                  record.normalizedReward >= 0.4 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]"
              >
                {{ record.feedback }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="totalTrials === 0" class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
      <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
        <i class="pi pi-lightbulb text-3xl text-blue-500"></i>
      </div>
      <h3 class="text-lg font-bold text-gray-800 mb-2">开始您的探索之旅</h3>
      <p class="text-gray-600 max-w-md mx-auto">
        多臂老虎机算法通过平衡探索（尝试新选项）和利用（选择已知好的选项）来帮助您找到最优决策。
        每次测试后，算法会更新对每个选项的信念，随着数据积累，推荐会越来越准确。
      </p>
    </div>
  </div>
</template>
