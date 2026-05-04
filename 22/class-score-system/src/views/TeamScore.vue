<script setup lang="ts">
import { ref, inject, computed, type Ref } from 'vue'
import type { Team } from '../types'

const teams = inject<Ref<Team[]>>('teams')!
const defaultPoints = inject<Ref<number>>('defaultPoints')!

const pointValue = ref(defaultPoints.value)
const showRanking = ref(false)

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

const addPoints = (teamId: number) => {
  const team = teams.value.find(t => t.id === teamId)
  if (team) {
    team.score += pointValue.value
  }
}

const minusPoints = (teamId: number) => {
  const team = teams.value.find(t => t.id === teamId)
  if (team && team.score >= pointValue.value) {
    team.score -= pointValue.value
  } else if (team) {
    team.score = 0
  }
}

const sortedTeams = computed(() => {
  return [...teams.value].sort((a, b) => b.score - a.score)
})

const topThreeTeams = computed(() => {
  return sortedTeams.value.slice(0, 3)
})

const isFirstPlace = (teamId: number) => {
  return sortedTeams.value[0]?.id === teamId && sortedTeams.value[0]?.score > 0
}

const getRankingBadge = (index: number) => {
  const badges = [
    { text: '🥇', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { text: '🥈', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    { text: '🥉', color: 'bg-orange-100 text-orange-700 border-orange-300' }
  ]
  return badges[index] || null
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-lg font-semibold text-gray-700">积分值设置：</span>
          <div class="flex items-center gap-2">
            <button
              @click="pointValue = Math.max(1, pointValue - 1)"
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-all btn-score"
            >
              -
            </button>
            <span class="text-3xl font-bold text-sky-600 min-w-[60px] text-center">
              {{ pointValue }}
            </span>
            <button
              @click="pointValue = Math.min(5, pointValue + 1)"
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-all btn-score"
            >
              +
            </button>
          </div>
          <span class="text-sm text-gray-500">(1-5分)</span>
        </div>
        
        <button
          @click="showRanking = !showRanking"
          class="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          {{ showRanking ? '隐藏排行榜' : '📊 显示排行榜' }}
        </button>
      </div>
    </div>

    <div v-if="showRanking && topThreeTeams.length > 0" class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <h3 class="text-2xl font-bold text-center text-gray-800 mb-6">
        🏆 当前积分排名前三的小组
      </h3>
      <div class="flex flex-wrap justify-center gap-6">
        <div
          v-for="(team, index) in topThreeTeams"
          :key="team.id"
          class="flex flex-col items-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg"
          :class="[
            index === 0 ? 'bg-gradient-to-b from-yellow-50 to-yellow-100 border-2 border-yellow-300 scale-110' : '',
            index === 1 ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-gray-300' : '',
            index === 2 ? 'bg-gradient-to-b from-orange-50 to-orange-100 border-2 border-orange-300' : ''
          ]"
        >
          <span class="text-5xl mb-2" v-if="index === 0">
            {{ getRankingBadge(index)?.text }}
          </span>
          <span class="text-4xl mb-2" v-else>
            {{ getRankingBadge(index)?.text }}
          </span>
          <span class="text-3xl mb-2">{{ team.emoji }}</span>
          <span class="text-lg font-bold text-gray-800">{{ team.name }}</span>
          <span class="text-2xl font-bold text-sky-600 mt-2">
            {{ team.score }} 分
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
          v-for="team in teams"
          :key="team.id"
          class="team-card bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border-4 relative"
          :class="[
            getTeamColorClasses(team.color).border,
            isFirstPlace(team.id) ? 'winner-glow' : ''
          ]"
        >
          <span v-if="isFirstPlace(team.id)" class="crown-icon">
            👑
          </span>
          
          <div
            class="p-8 text-center"
            :class="getTeamColorClasses(team.color).light"
          >
            <div class="text-8xl mb-5 drop-shadow-lg">
              {{ team.emoji }}
            </div>
            <input
              v-model="team.name"
              type="text"
              class="text-2xl font-bold text-center w-full bg-transparent border-b-2 border-dashed focus:outline-none focus:border-sky-500 transition-all py-3"
              :class="getTeamColorClasses(team.color).text"
            />
          </div>
          
          <div class="p-8">
            <div class="text-center mb-8">
              <span class="text-base text-gray-500">当前积分</span>
              <div class="text-5xl font-black text-gray-800 mt-2">
                {{ team.score }}
              </div>
            </div>
            
            <div class="flex items-center justify-center gap-6">
              <button
                @click="minusPoints(team.id)"
                class="w-20 h-20 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-4xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 btn-score flex items-center justify-center leading-none"
              >
                -
              </button>
              
              <div class="flex flex-col items-center px-4">
                <span class="text-3xl font-bold text-gray-600">
                  {{ pointValue }}
                </span>
                <span class="text-sm text-gray-400 mt-1">分</span>
              </div>
              
              <button
                @click="addPoints(team.id)"
                class="w-20 h-20 rounded-2xl bg-green-500 hover:bg-green-600 text-white text-4xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 btn-score flex items-center justify-center leading-none"
              >
                +
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
