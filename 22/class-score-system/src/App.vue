<script setup lang="ts">
import { ref, watch, provide, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Team, Student, AppData } from './types'
import { loadData, saveData } from './utils/storage'

const router = useRouter()
const route = useRoute()

const appData = ref<AppData>(loadData())

const teams: Ref<Team[]> = ref(appData.value.teams)
const students: Ref<Student[]> = ref(appData.value.students)
const defaultPoints = ref(appData.value.defaultPoints)

watch([teams, students, defaultPoints], () => {
  saveData({
    teams: teams.value,
    students: students.value,
    defaultPoints: defaultPoints.value
  })
}, { deep: true })

provide('teams', teams)
provide('students', students)
provide('defaultPoints', defaultPoints)

const isTeamActive = () => route.path === '/team' || route.path === '/'
const isStudentActive = () => route.path === '/student'

const resetAllData = () => {
  if (confirm('确定要重置所有数据吗？此操作不可恢复！')) {
    const data = loadData()
    teams.value = data.teams.map(t => ({ ...t, score: 0 }))
    students.value = data.students.map(s => ({ ...s, score: 0 }))
    alert('数据已重置！')
  }
}
</script>

<template>
  <div class="sky-bg min-h-screen relative">
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    <div class="cloud cloud-4"></div>
    <div class="cloud cloud-5"></div>
    
    <div class="relative z-10 min-h-screen flex flex-col items-center">
      <header class="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-20 w-full">
        <div class="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <h1 class="text-2xl font-bold text-sky-700 whitespace-nowrap">
            🌈 班级积分系统
          </h1>
          <nav class="flex flex-wrap items-center gap-3">
            <button
              @click="router.push('/team')"
              class="px-5 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
              :class="isTeamActive() 
                ? 'bg-sky-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              👥 小组积分
            </button>
            <button
              @click="router.push('/student')"
              class="px-5 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
              :class="isStudentActive() 
                ? 'bg-sky-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              👨‍🎓 学生积分
            </button>
            <button
              @click="resetAllData"
              class="px-5 py-3 rounded-full font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 flex items-center justify-center"
            >
              🔄 重置
            </button>
          </nav>
        </div>
      </header>
      
      <main class="w-full max-w-7xl px-6 py-8 flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>
