<template>
  <div class="space-y-6">
    <div class="text-center mb-4">
      <h2 class="text-2xl font-bold text-indigo-300 mb-2">📝 知识测验</h2>
      <p class="text-slate-400">测试你对电磁感应原理的理解</p>
    </div>

    <template v-if="quizState === 'setup'">
      <div class="max-w-2xl mx-auto">
        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold text-indigo-300">⚙️ 测验设置</span>
          </template>
          <div class="space-y-6">
            <div>
              <label class="block text-sm text-slate-400 mb-3">选择题目类别</label>
              <div class="flex flex-wrap gap-2">
                <el-tag
                  v-for="cat in categories"
                  :key="cat.id"
                  :type="selectedCategory === cat.id ? 'primary' : 'info'"
                  effect="plain"
                  class="cursor-pointer hover:scale-105 transition-transform"
                  @click="selectedCategory = cat.id"
                >
                  <span class="mr-1">{{ cat.icon }}</span>
                  {{ cat.name }}
                </el-tag>
              </div>
            </div>

            <div>
              <label class="block text-sm text-slate-400 mb-3">题目数量</label>
              <el-radio-group v-model="questionCount">
                <el-radio-button label="5">5题</el-radio-button>
                <el-radio-button label="10">10题</el-radio-button>
              </el-radio-group>
            </div>

            <el-button 
              type="primary" 
              size="large" 
              class="w-full"
              @click="startQuiz"
            >
              <span class="flex items-center justify-center gap-2">
                <span>🚀</span>
                <span>开始测验</span>
              </span>
            </el-button>
          </div>
        </el-card>

        <div class="mt-6">
          <el-card shadow="hover">
            <template #header>
              <span class="font-semibold text-indigo-300">📊 题库概览</span>
            </template>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                v-for="cat in categories.filter(c => c.id !== 'all')" 
                :key="cat.id"
                class="p-4 bg-slate-700/50 rounded-lg text-center"
              >
                <div class="text-2xl mb-2">{{ cat.icon }}</div>
                <div class="text-sm text-slate-300 font-medium">{{ cat.name }}</div>
                <div class="text-xl font-bold text-indigo-400 mt-1">
                  {{ getCategoryCount(cat.name) }}题
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </template>

    <template v-if="quizState === 'quiz'">
      <div class="max-w-3xl mx-auto">
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-slate-400">
              第 {{ currentIndex + 1 }} 题 / 共 {{ questions.length }} 题
            </span>
            <span class="text-sm text-slate-400">
              类别: {{ currentQuestion.category }}
            </span>
          </div>
          <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
              :style="{ width: `${((currentIndex + 1) / questions.length) * 100}%` }"
            ></div>
          </div>
        </div>

        <el-card shadow="hover" class="mb-6">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-indigo-300">
                问题 {{ currentIndex + 1 }}
              </span>
              <el-tag 
                :type="getDifficultyType(currentQuestion.difficulty)"
                size="small"
              >
                {{ getDifficultyLabel(currentQuestion.difficulty).text }}
              </el-tag>
            </div>
          </template>
          
          <div class="space-y-6">
            <div class="p-4 bg-slate-800/50 rounded-lg">
              <p class="text-lg text-slate-100 leading-relaxed">
                {{ currentQuestion.question }}
              </p>
            </div>

            <div class="space-y-3">
              <div
                v-for="option in currentQuestion.options"
                :key="option.id"
                class="p-4 rounded-lg cursor-pointer transition-all duration-200 border-2"
                :class="getOptionClass(option.id)"
                @click="selectOption(option.id)"
              >
                <div class="flex items-center gap-3">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    :class="getOptionBadgeClass(option.id)"
                  >
                    {{ option.id }}
                  </div>
                  <span class="text-slate-200">{{ option.text }}</span>
                </div>
              </div>
            </div>

            <div v-if="showExplanation" class="p-4 rounded-lg animate-fadeIn"
                 :class="isAnswerCorrect ? 'bg-green-900/30 border border-green-500/30' : 'bg-red-900/30 border border-red-500/30'">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xl">{{ isAnswerCorrect ? '✅' : '❌' }}</span>
                <span class="font-semibold" :class="isAnswerCorrect ? 'text-green-400' : 'text-red-400'">
                  {{ isAnswerCorrect ? '回答正确！' : '回答错误' }}
                </span>
              </div>
              <div class="text-sm text-slate-300 mb-2">
                正确答案: <span class="font-bold text-indigo-300">{{ currentQuestion.correctAnswer }}</span>
              </div>
              <div class="text-sm text-slate-400 leading-relaxed">
                <span class="font-medium text-slate-300">解析：</span>
                {{ currentQuestion.explanation }}
              </div>
            </div>
          </div>
        </el-card>

        <div class="flex justify-between">
          <el-button
            size="large"
            @click="prevQuestion"
            :disabled="currentIndex === 0"
          >
            <span class="flex items-center gap-2">
              <span>←</span>
              <span>上一题</span>
            </span>
          </el-button>

          <template v-if="currentIndex < questions.length - 1">
            <el-button
              v-if="!showExplanation"
              type="primary"
              size="large"
              @click="submitAnswer"
              :disabled="!selectedAnswer"
            >
              <span class="flex items-center gap-2">
                <span>✓</span>
                <span>提交答案</span>
              </span>
            </el-button>
            <el-button
              v-else
              type="warning"
              size="large"
              @click="nextQuestion"
            >
              <span class="flex items-center gap-2">
                <span>下一题</span>
                <span>→</span>
              </span>
            </el-button>
          </template>
          <template v-else>
            <el-button
              v-if="!showExplanation"
              type="primary"
              size="large"
              @click="submitAnswer"
              :disabled="!selectedAnswer"
            >
              <span class="flex items-center gap-2">
                <span>✓</span>
                <span>提交答案</span>
              </span>
            </el-button>
            <el-button
              v-else
              type="success"
              size="large"
              @click="finishQuiz"
            >
              <span class="flex items-center gap-2">
                <span>🎉</span>
                <span>查看结果</span>
              </span>
            </el-button>
          </template>
        </div>
      </div>
    </template>

    <template v-if="quizState === 'result'">
      <div class="max-w-3xl mx-auto">
        <el-card shadow="hover" class="text-center mb-6">
          <template #header>
            <span class="font-semibold text-indigo-300 text-xl">🎉 测验完成！</span>
          </template>
          
          <div class="py-8">
            <div class="text-6xl mb-4">
              {{ scoreEmoji }}
            </div>
            <div class="text-5xl font-bold mb-2" :class="scoreColor">
              {{ score }} / {{ totalQuestions }}
            </div>
            <div class="text-xl text-slate-400 mb-4">
              正确率: {{ correctPercentage }}%
            </div>
            
            <el-progress
              :percentage="correctPercentage"
              :color="progressColor"
              :stroke-width="12"
            />

            <div class="mt-6 grid grid-cols-3 gap-4">
              <div class="p-4 bg-green-900/30 rounded-lg">
                <div class="text-2xl font-bold text-green-400">{{ correctCount }}</div>
                <div class="text-sm text-slate-400">正确</div>
              </div>
              <div class="p-4 bg-red-900/30 rounded-lg">
                <div class="text-2xl font-bold text-red-400">{{ wrongCount }}</div>
                <div class="text-sm text-slate-400">错误</div>
              </div>
              <div class="p-4 bg-slate-700/30 rounded-lg">
                <div class="text-2xl font-bold text-indigo-400">{{ totalQuestions }}</div>
                <div class="text-sm text-slate-400">总计</div>
              </div>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover" class="mb-6">
          <template #header>
            <span class="font-semibold text-indigo-300">📋 答案详情</span>
          </template>
          
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div
              v-for="(q, index) in questions"
              :key="q.id"
              class="p-4 rounded-lg"
              :class="userAnswers[index] === q.correctAnswer ? 'bg-green-900/20' : 'bg-red-900/20'"
            >
              <div class="flex items-start gap-3">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="userAnswers[index] === q.correctAnswer ? 'bg-green-500' : 'bg-red-500'"
                >
                  <span class="text-white text-sm font-bold">
                    {{ userAnswers[index] === q.correctAnswer ? '✓' : '✗' }}
                  </span>
                </div>
                <div class="flex-1">
                  <div class="text-sm text-slate-300 mb-2">
                    <span class="text-indigo-400 font-medium">第{{ index + 1 }}题：</span>
                    {{ q.question }}
                  </div>
                  <div class="text-xs space-y-1">
                    <div class="text-slate-400">
                      你的答案: <span :class="userAnswers[index] === q.correctAnswer ? 'text-green-400' : 'text-red-400'">
                        {{ userAnswers[index] || '未作答' }}
                      </span>
                    </div>
                    <div class="text-slate-400" v-if="userAnswers[index] !== q.correctAnswer">
                      正确答案: <span class="text-green-400">{{ q.correctAnswer }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <div class="flex justify-center gap-4">
          <el-button type="primary" size="large" @click="restartQuiz">
            <span class="flex items-center gap-2">
              <span>🔄</span>
              <span>重新测验</span>
            </span>
          </el-button>
          <el-button size="large" @click="backToSetup">
            <span class="flex items-center gap-2">
              <span>⚙️</span>
              <span>更改设置</span>
            </span>
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { quizQuestions, categories, getDifficultyLabel } from '@/data/quizData.js'

const quizState = ref('setup')
const selectedCategory = ref('all')
const questionCount = ref('10')
const questions = ref([])
const currentIndex = ref(0)
const selectedAnswer = ref(null)
const showExplanation = ref(false)
const userAnswers = ref([])

const currentQuestion = computed(() => questions.value[currentIndex.value])

const score = computed(() => {
  return questions.value.reduce((acc, q, index) => {
    return acc + (userAnswers.value[index] === q.correctAnswer ? 1 : 0)
  }, 0)
})

const totalQuestions = computed(() => questions.value.length)
const correctCount = computed(() => score.value)
const wrongCount = computed(() => totalQuestions.value - score.value)
const correctPercentage = computed(() => Math.round((score.value / totalQuestions.value) * 100))

const scoreColor = computed(() => {
  if (correctPercentage.value >= 80) return 'text-green-400'
  if (correctPercentage.value >= 60) return 'text-yellow-400'
  return 'text-red-400'
})

const scoreEmoji = computed(() => {
  if (correctPercentage.value >= 80) return '🏆'
  if (correctPercentage.value >= 60) return '👍'
  return '💪'
})

const progressColor = computed(() => {
  if (correctPercentage.value >= 80) return '#22c55e'
  if (correctPercentage.value >= 60) return '#eab308'
  return '#ef4444'
})

const isAnswerCorrect = computed(() => {
  return selectedAnswer.value === currentQuestion.value?.correctAnswer
})

const getCategoryCount = (categoryName) => {
  return quizQuestions.filter(q => q.category === categoryName).length
}

const getDifficultyType = (difficulty) => {
  const types = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  }
  return types[difficulty] || 'info'
}

const getOptionClass = (optionId) => {
  if (!showExplanation.value) {
    return selectedAnswer.value === optionId
      ? 'bg-indigo-900/50 border-indigo-500'
      : 'bg-slate-800/50 border-transparent hover:bg-slate-700/50'
  }
  
  if (optionId === currentQuestion.value.correctAnswer) {
    return 'bg-green-900/40 border-green-500'
  }
  if (selectedAnswer.value === optionId && optionId !== currentQuestion.value.correctAnswer) {
    return 'bg-red-900/40 border-red-500'
  }
  return 'bg-slate-800/30 border-transparent opacity-50'
}

const getOptionBadgeClass = (optionId) => {
  if (!showExplanation.value) {
    return selectedAnswer.value === optionId
      ? 'bg-indigo-500 text-white'
      : 'bg-slate-600 text-slate-200'
  }
  
  if (optionId === currentQuestion.value.correctAnswer) {
    return 'bg-green-500 text-white'
  }
  if (selectedAnswer.value === optionId && optionId !== currentQuestion.value.correctAnswer) {
    return 'bg-red-500 text-white'
  }
  return 'bg-slate-600 text-slate-400'
}

const selectOption = (optionId) => {
  if (!showExplanation.value) {
    selectedAnswer.value = optionId
  }
}

const submitAnswer = () => {
  if (!selectedAnswer.value) return
  
  userAnswers.value[currentIndex.value] = selectedAnswer.value
  showExplanation.value = true
}

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    selectedAnswer.value = userAnswers.value[currentIndex.value] || null
    showExplanation.value = userAnswers.value[currentIndex.value] !== undefined
  }
}

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    selectedAnswer.value = userAnswers.value[currentIndex.value] || null
    showExplanation.value = userAnswers.value[currentIndex.value] !== undefined
  }
}

const startQuiz = () => {
  let filteredQuestions = selectedCategory.value === 'all'
    ? [...quizQuestions]
    : quizQuestions.filter(q => q.category === selectedCategory.value)
  
  filteredQuestions = shuffleArray(filteredQuestions)
  
  const count = parseInt(questionCount.value)
  questions.value = filteredQuestions.slice(0, Math.min(count, filteredQuestions.length))
  userAnswers.value = new Array(questions.value.length).fill(null)
  currentIndex.value = 0
  selectedAnswer.value = null
  showExplanation.value = false
  quizState.value = 'quiz'
}

const finishQuiz = () => {
  quizState.value = 'result'
}

const restartQuiz = () => {
  startQuiz()
}

const backToSetup = () => {
  quizState.value = 'setup'
}

const shuffleArray = (array) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
