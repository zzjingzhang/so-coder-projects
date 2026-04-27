<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createProblem } from '../utils/thompsonSampling'
import { FeedbackType, FeedbackTypeLabels } from '../types'

const router = useRouter()

const formData = ref({
  name: '',
  description: '',
  feedbackType: FeedbackType.SCALAR,
  arms: ['选项 1', '选项 2']
})

const errors = ref({})

const feedbackOptions = [
  { value: FeedbackType.SCALAR, label: FeedbackTypeLabels[FeedbackType.SCALAR], icon: 'pi pi-sliders-h' },
  { value: FeedbackType.BINARY, label: FeedbackTypeLabels[FeedbackType.BINARY], icon: 'pi pi-thumbs-up' },
  { value: FeedbackType.STARS, label: FeedbackTypeLabels[FeedbackType.STARS], icon: 'pi pi-star' }
]

function addArm() {
  formData.value.arms.push(`选项 ${formData.value.arms.length + 1}`)
}

function removeArm(index) {
  if (formData.value.arms.length > 2) {
    formData.value.arms.splice(index, 1)
  }
}

function updateArm(index, value) {
  formData.value.arms[index] = value
}

function validateForm() {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = '请输入问题名称'
  }
  
  const validArms = formData.value.arms.filter(arm => arm.trim())
  if (validArms.length < 2) {
    errors.value.arms = '至少需要 2 个有效选项'
  }
  
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }
  
  const validArms = formData.value.arms.filter(arm => arm.trim())
  const problem = createProblem(
    formData.value.name.trim(),
    formData.value.description.trim(),
    validArms,
    formData.value.feedbackType
  )
  
  router.push(`/problem/${problem.id}`)
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
        <h2 class="text-2xl font-bold text-white mb-2">创建新的决策问题</h2>
        <p class="text-blue-100">
          使用多臂老虎机算法来帮助您做出更好的决策
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            问题名称 <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="formData.name"
            type="text"
            placeholder="例如：今天午餐吃什么？"
            :class="[
              'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all',
              errors.name 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
            ]"
          />
          <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            问题描述
          </label>
          <textarea 
            v-model="formData.description"
            placeholder="添加更多关于这个决策问题的背景信息..."
            rows="3"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all resize-none"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            反馈类型 <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-1 gap-3">
            <label 
              v-for="option in feedbackOptions" 
              :key="option.value"
              :class="[
                'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all',
                formData.feedbackType === option.value
                  ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              ]"
            >
              <input 
                v-model="formData.feedbackType"
                :value="option.value"
                type="radio"
                class="w-4 h-4 text-blue-600"
              />
              <i :class="[option.icon, 'text-xl', formData.feedbackType === option.value ? 'text-blue-500' : 'text-gray-400']"></i>
              <span class="font-medium text-gray-700">{{ option.label }}</span>
            </label>
          </div>
        </div>
        
        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="block text-sm font-medium text-gray-700">
              可选方案（强盗臂） <span class="text-red-500">*</span>
            </label>
            <button 
              type="button"
              @click="addArm"
              class="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <i class="pi pi-plus-circle"></i>
              <span>添加选项</span>
            </button>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="(arm, index) in formData.arms" 
              :key="index"
              class="flex items-center gap-3"
            >
              <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-500">
                {{ index + 1 }}
              </div>
              <input 
                :value="arm"
                @input="updateArm(index, $event.target.value)"
                type="text"
                :placeholder="`选项 ${index + 1}`"
                class="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
              <button 
                type="button"
                @click="removeArm(index)"
                :disabled="formData.arms.length <= 2"
                :class="[
                  'p-2.5 rounded-lg transition-all',
                  formData.arms.length <= 2 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                ]"
              >
                <i class="pi pi-minus-circle"></i>
              </button>
            </div>
          </div>
          
          <p v-if="errors.arms" class="text-sm text-red-500 mt-2">{{ errors.arms }}</p>
          <p class="text-sm text-gray-500 mt-2">
            <i class="pi pi-info-circle mr-1"></i>
            至少需要 2 个选项，最多可以添加任意数量
          </p>
        </div>
        
        <div class="pt-6 border-t border-gray-100">
          <div class="flex gap-4">
            <button 
              type="button"
              @click="router.push('/')"
              class="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200"
            >
              创建问题
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
