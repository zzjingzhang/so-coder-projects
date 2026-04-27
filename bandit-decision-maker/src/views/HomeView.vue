<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProblems, deleteProblem, getArmStats } from '../utils/thompsonSampling'
import { FeedbackTypeLabels } from '../types'

const router = useRouter()
const problems = ref([])
const deleteConfirmVisible = ref(false)
const problemToDelete = ref(null)

function loadProblems() {
  problems.value = getProblems()
}

function getBestArm(problem) {
  let bestArm = null
  let bestExpected = -1
  
  for (const arm of problem.arms) {
    const stats = getArmStats(arm)
    if (stats.expectedValue > bestExpected) {
      bestExpected = stats.expectedValue
      bestArm = arm
    }
  }
  
  return { arm: bestArm, expectedValue: bestExpected }
}

function getTotalTrials(problem) {
  return problem.arms.reduce((sum, arm) => sum + arm.trials, 0)
}

function confirmDelete(problem) {
  problemToDelete.value = problem
  deleteConfirmVisible.value = true
}

function handleDelete() {
  if (problemToDelete.value) {
    deleteProblem(problemToDelete.value.id)
    loadProblems()
  }
  deleteConfirmVisible.value = false
  problemToDelete.value = null
}

onMounted(() => {
  loadProblems()
})
</script>

<template>
  <div>
    <div v-if="problems.length === 0" class="text-center py-16">
      <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="pi pi-slot-machine text-4xl text-blue-500"></i>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-3">还没有决策问题</h3>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        开始使用多臂老虎机算法来帮助您做出更好的日常决策。创建您的第一个问题，让算法帮您找到最优选择。
      </p>
      <button 
        @click="router.push('/problem/create')"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200"
      >
        <i class="pi pi-plus"></i>
        <span>创建第一个问题</span>
      </button>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="problem in problems" 
        :key="problem.id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden cursor-pointer group"
        @click="router.push(`/problem/${problem.id}`)"
      >
        <div class="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {{ problem.name }}
              </h3>
              <p v-if="problem.description" class="text-sm text-gray-500 mt-1 line-clamp-2">
                {{ problem.description }}
              </p>
            </div>
            <button 
              @click.stop="confirmDelete(problem)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <i class="pi pi-trash"></i>
            </button>
          </div>
          
          <div class="space-y-3 mb-5">
            <div class="flex items-center gap-2 text-sm">
              <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">
                {{ problem.arms.length }} 个选项
              </span>
              <span class="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg font-medium">
                {{ getTotalTrials(problem) }} 次测试
              </span>
            </div>
            
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <i class="pi pi-chart-bar"></i>
              <span>{{ FeedbackTypeLabels[problem.feedbackType] }}</span>
            </div>
          </div>
          
          <div v-if="getTotalTrials(problem) > 0" class="pt-4 border-t border-gray-100">
            <div class="text-xs text-gray-500 mb-2">当前最佳选择</div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <i class="pi pi-star-fill text-white"></i>
              </div>
              <div class="flex-1">
                <div class="font-medium text-gray-800">{{ getBestArm(problem).arm?.name }}</div>
                <div class="text-xs text-gray-500">
                  期望价值: {{ (getBestArm(problem).expectedValue * 100).toFixed(1) }}%
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="pt-4 border-t border-gray-100">
            <div class="text-sm text-gray-500 text-center py-2">
              <i class="pi pi-info-circle mr-1"></i>
              点击开始测试
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div 
      v-if="deleteConfirmVisible" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="deleteConfirmVisible = false"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="pi pi-exclamation-triangle text-3xl text-red-500"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">确认删除</h3>
          <p class="text-gray-500 mb-6">
            确定要删除问题 "<span class="font-medium text-gray-700">{{ problemToDelete?.name }}</span>" 吗？此操作不可撤销。
          </p>
          <div class="flex gap-3">
            <button 
              @click="deleteConfirmVisible = false"
              class="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              @click="handleDelete"
              class="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
