<script setup lang="ts">
import { ref, inject, computed, type Ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { Team, Student } from '../types'

const teams = inject<Ref<Team[]>>('teams')!
const students = inject<Ref<Student[]>>('students')!
const defaultPoints = inject<Ref<number>>('defaultPoints')!

const studentPointValue = ref(defaultPoints.value)
const activeTeamFilter = ref<number | null>(null)

const filteredStudents = computed(() => {
  if (activeTeamFilter.value === null) {
    return students.value
  }
  return students.value.filter(s => s.teamId === activeTeamFilter.value)
})

const getTeamInfo = (teamId: number) => {
  return teams.value.find(t => t.id === teamId)
}

const getTeamColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; border: string; text: string; light: string }> = {
    pink: {
      bg: 'bg-pink-400',
      border: 'border-pink-500',
      text: 'text-pink-600',
      light: 'bg-pink-50'
    },
    blue: {
      bg: 'bg-blue-400',
      border: 'border-blue-500',
      text: 'text-blue-600',
      light: 'bg-blue-50'
    },
    green: {
      bg: 'bg-green-400',
      border: 'border-green-500',
      text: 'text-green-600',
      light: 'bg-green-50'
    },
    orange: {
      bg: 'bg-orange-400',
      border: 'border-orange-500',
      text: 'text-orange-600',
      light: 'bg-orange-50'
    }
  }
  return colorMap[color] || colorMap.pink
}

const getTeamTotalPoints = (teamId: number) => {
  return students.value
    .filter(s => s.teamId === teamId)
    .reduce((sum, s) => sum + s.score, 0)
}

const getTeamConversionProgress = (teamId: number) => {
  const totalPoints = getTeamTotalPoints(teamId)
  const quotient = Math.floor(totalPoints / 10)
  const remainder = totalPoints % 10
  return {
    totalPoints,
    quotient,
    remainder,
    progress: (remainder / 10) * 100
  }
}

const addStudentPoints = (studentId: number) => {
  const student = students.value.find(s => s.id === studentId)
  if (student) {
    const oldTotal = getTeamTotalPoints(student.teamId)
    const oldQuotient = Math.floor(oldTotal / 10)
    
    student.score += studentPointValue.value
    
    const newTotal = getTeamTotalPoints(student.teamId)
    const newQuotient = Math.floor(newTotal / 10)
    
    if (newQuotient > oldQuotient) {
      const team = teams.value.find(t => t.id === student.teamId)
      if (team) {
        const increment = newQuotient - oldQuotient
        team.score += increment
        ElMessage.success({
          message: `🎉 恭喜${team.name}！组内学生积分累计达到${newQuotient * 10}分，小组积分+${increment}分！`,
          duration: 3000
        })
      }
    }
  }
}

const minusStudentPoints = (studentId: number) => {
  const student = students.value.find(s => s.id === studentId)
  if (student) {
    const oldTotal = getTeamTotalPoints(student.teamId)
    const oldQuotient = Math.floor(oldTotal / 10)
    
    if (student.score >= studentPointValue.value) {
      student.score -= studentPointValue.value
    } else {
      student.score = 0
    }
    
    const newTotal = getTeamTotalPoints(student.teamId)
    const newQuotient = Math.floor(newTotal / 10)
    
    if (newQuotient < oldQuotient) {
      const team = teams.value.find(t => t.id === student.teamId)
      if (team) {
        const decrement = oldQuotient - newQuotient
        team.score = Math.max(0, team.score - decrement)
        ElMessage.warning({
          message: `⚠️ ${team.name}组内学生积分减少，小组积分-${decrement}分`,
          duration: 2000
        })
      }
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-lg font-semibold text-gray-700">学生积分值：</span>
          <div class="flex items-center gap-2">
            <button
              @click="studentPointValue = Math.max(1, studentPointValue - 1)"
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-all btn-score"
            >
              -
            </button>
            <span class="text-3xl font-bold text-sky-600 min-w-[60px] text-center">
              {{ studentPointValue }}
            </span>
            <button
              @click="studentPointValue = Math.min(5, studentPointValue + 1)"
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-all btn-score"
            >
              +
            </button>
          </div>
          <span class="text-sm text-gray-500">(1-5分)</span>
        </div>
      </div>
    </div>

    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">📊 各小组积分转换进度（每10分转小组1分）</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="team in teams"
          :key="team.id"
          class="p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg"
          :class="[
            getTeamColorClasses(team.color).light,
            getTeamColorClasses(team.color).border,
            activeTeamFilter === team.id ? 'ring-4 ring-sky-400' : ''
          ]"
          @click="activeTeamFilter = activeTeamFilter === team.id ? null : team.id"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="text-2xl">{{ team.emoji }}</span>
            <span class="font-bold text-gray-800">{{ team.name }}</span>
          </div>
          <div class="text-sm text-gray-600 mb-2">
            组内总积分: <span class="font-bold">{{ getTeamConversionProgress(team.id).totalPoints }}</span> 分
          </div>
          <div class="text-sm text-gray-600 mb-2">
            已转换: <span class="font-bold text-sky-600">{{ getTeamConversionProgress(team.id).quotient }}</span> 次
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="getTeamColorClasses(team.color).bg"
              :style="{ width: getTeamConversionProgress(team.id).progress + '%' }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 mt-1 text-right">
            {{ getTeamConversionProgress(team.id).remainder }}/10 分
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-500 mt-4 text-center">
        👆 点击小组卡片可筛选显示对应小组的学生
      </p>
    </div>

    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">
        👨‍🎓 学生列表 
        <span v-if="activeTeamFilter" class="text-base font-normal text-gray-500">
          ({{ getTeamInfo(activeTeamFilter)?.name }})
        </span>
        <span class="text-base font-normal text-gray-500">
          共 {{ filteredStudents.length }} 人
        </span>
      </h3>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        <div
          v-for="student in filteredStudents"
          :key="student.id"
          class="team-card rounded-2xl border-2 overflow-hidden shadow-md hover:shadow-xl transition-all"
          :class="[
            getTeamColorClasses(getTeamInfo(student.teamId)?.color || 'pink').light,
            getTeamColorClasses(getTeamInfo(student.teamId)?.color || 'pink').border
          ]"
        >
          <div class="p-5 text-center">
            <div class="text-4xl mb-3">
              {{ getTeamInfo(student.teamId)?.emoji }}
            </div>
            <input
              v-model="student.name"
              type="text"
              class="text-base font-semibold text-center w-full bg-transparent border-b border-dashed focus:outline-none focus:border-sky-500 transition-all py-2"
              :class="getTeamColorClasses(getTeamInfo(student.teamId)?.color || 'pink').text"
            />
            <div class="text-sm text-gray-500 mt-2">
              学号: {{ student.id }}
            </div>
          </div>
          
          <div class="bg-white p-5">
            <div class="text-center mb-5">
              <span class="text-sm text-gray-500">积分</span>
              <div class="text-3xl font-black text-gray-800 mt-1">
                {{ student.score }}
              </div>
            </div>
            
            <div class="flex items-center justify-center gap-3">
              <button
                @click="minusStudentPoints(student.id)"
                class="w-11 h-11 rounded-xl bg-red-400 hover:bg-red-500 text-white text-xl font-bold shadow transition-all transform hover:scale-105 btn-score flex items-center justify-center leading-none"
              >
                -
              </button>
              <span class="text-base font-bold text-gray-600 w-8 text-center">
                {{ studentPointValue }}
              </span>
              <button
                @click="addStudentPoints(student.id)"
                class="w-11 h-11 rounded-xl bg-green-400 hover:bg-green-500 text-white text-xl font-bold shadow transition-all transform hover:scale-105 btn-score flex items-center justify-center leading-none"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
