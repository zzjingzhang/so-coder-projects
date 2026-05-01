<template>
  <div class="league-table-container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">英超联赛积分榜</h1>
      <p class="text-gray-600">2023-2024赛季</p>
    </div>

    <div class="mb-4 flex justify-between items-center">
      <div class="legend flex flex-wrap gap-4">
        <div class="flex items-center">
          <div class="w-4 h-4 bg-green-500 mr-2"></div>
          <span class="text-sm">欧冠区</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-blue-500 mr-2"></div>
          <span class="text-sm">欧联杯区</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-orange-500 mr-2"></div>
          <span class="text-sm">欧协联区</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-red-500 mr-2"></div>
          <span class="text-sm">降级区</span>
        </div>
      </div>
      
      <v-btn 
        color="primary" 
        @click="simulateMatchWeek"
        :loading="isSimulating"
      >
        模拟一轮比赛
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="sortedTeams"
      :items-per-page="-1"
      class="elevation-1"
      :item-class="getRowClass"
    >
      <template v-slot:item.rank="{ item }">
        <div class="flex items-center">
          <span 
            :class="[
              item.rankChange > 0 ? 'rank-up' : '',
              item.rankChange < 0 ? 'rank-down' : ''
            ]"
          >
            {{ item.currentRank }}
          </span>
          <v-icon 
            v-if="item.rankChange > 0" 
            color="green" 
            size="small"
            class="ml-1"
          >
            mdi-arrow-up
          </v-icon>
          <v-icon 
            v-else-if="item.rankChange < 0" 
            color="red" 
            size="small"
            class="ml-1"
          >
            mdi-arrow-down
          </v-icon>
          <span 
            v-else 
            class="ml-1 text-gray-400"
          >
            -
          </span>
        </div>
      </template>

      <template v-slot:item.team="{ item }">
        <div class="flex items-center">
          <v-avatar size="32" class="mr-3">
            <v-img :src="item.logo"></v-img>
          </v-avatar>
          <span class="font-medium">{{ item.name }}</span>
        </div>
      </template>

      <template v-slot:item.form="{ item }">
        <div class="flex gap-1">
          <v-chip 
            v-for="(result, index) in item.form" 
            :key="index"
            :color="getFormColor(result)"
            size="small"
            class="ma-0"
          >
            {{ result }}
          </v-chip>
        </div>
      </template>

      <template v-slot:item.points="{ item }">
        <span class="font-bold text-lg">{{ item.points }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const headers = [
  { title: '排名', key: 'rank', align: 'center', width: '80px' },
  { title: '球队', key: 'team', align: 'left' },
  { title: '场次', key: 'played', align: 'center', width: '60px' },
  { title: '胜', key: 'wins', align: 'center', width: '50px' },
  { title: '平', key: 'draws', align: 'center', width: '50px' },
  { title: '负', key: 'losses', align: 'center', width: '50px' },
  { title: '进球', key: 'goalsFor', align: 'center', width: '60px' },
  { title: '失球', key: 'goalsAgainst', align: 'center', width: '60px' },
  { title: '净胜球', key: 'goalDifference', align: 'center', width: '70px' },
  { title: '积分', key: 'points', align: 'center', width: '60px' },
  { title: '近期状态', key: 'form', align: 'center', width: '150px' },
]

const teams = ref([
  { id: 1, name: '曼城', logo: 'https://img.aote2u.com/soccer/team/50/50_60.png', played: 30, wins: 22, draws: 5, losses: 3, goalsFor: 70, goalsAgainst: 25, form: ['W', 'W', 'D', 'W', 'W'], currentRank: 1, previousRank: 1 },
  { id: 2, name: '阿森纳', logo: 'https://img.aote2u.com/soccer/team/43/43_60.png', played: 30, wins: 20, draws: 4, losses: 6, goalsFor: 65, goalsAgainst: 30, form: ['W', 'L', 'W', 'W', 'D'], currentRank: 2, previousRank: 2 },
  { id: 3, name: '利物浦', logo: 'https://img.aote2u.com/soccer/team/44/44_60.png', played: 30, wins: 19, draws: 7, losses: 4, goalsFor: 60, goalsAgainst: 28, form: ['D', 'W', 'W', 'L', 'W'], currentRank: 3, previousRank: 4 },
  { id: 4, name: '阿斯顿维拉', logo: 'https://img.aote2u.com/soccer/team/47/47_60.png', played: 30, wins: 18, draws: 4, losses: 8, goalsFor: 55, goalsAgainst: 35, form: ['W', 'W', 'L', 'W', 'W'], currentRank: 4, previousRank: 3 },
  { id: 5, name: '托特纳姆热刺', logo: 'https://img.aote2u.com/soccer/team/46/46_60.png', played: 30, wins: 17, draws: 5, losses: 8, goalsFor: 60, goalsAgainst: 40, form: ['L', 'W', 'D', 'W', 'L'], currentRank: 5, previousRank: 5 },
  { id: 6, name: '切尔西', logo: 'https://img.aote2u.com/soccer/team/45/45_60.png', played: 30, wins: 15, draws: 8, losses: 7, goalsFor: 50, goalsAgainst: 35, form: ['W', 'D', 'W', 'D', 'W'], currentRank: 6, previousRank: 7 },
  { id: 7, name: '曼联', logo: 'https://img.aote2u.com/soccer/team/48/48_60.png', played: 30, wins: 15, draws: 5, losses: 10, goalsFor: 45, goalsAgainst: 40, form: ['L', 'L', 'W', 'D', 'W'], currentRank: 7, previousRank: 6 },
  { id: 8, name: '纽卡斯尔联', logo: 'https://img.aote2u.com/soccer/team/61/61_60.png', played: 30, wins: 13, draws: 6, losses: 11, goalsFor: 52, goalsAgainst: 45, form: ['W', 'L', 'W', 'L', 'D'], currentRank: 8, previousRank: 8 },
  { id: 9, name: '西汉姆联', logo: 'https://img.aote2u.com/soccer/team/54/54_60.png', played: 30, wins: 12, draws: 5, losses: 13, goalsFor: 40, goalsAgainst: 48, form: ['D', 'W', 'L', 'L', 'W'], currentRank: 9, previousRank: 10 },
  { id: 10, name: '狼队', logo: 'https://img.aote2u.com/soccer/team/62/62_60.png', played: 30, wins: 11, draws: 6, losses: 13, goalsFor: 38, goalsAgainst: 45, form: ['W', 'D', 'D', 'L', 'W'], currentRank: 10, previousRank: 9 },
  { id: 11, name: '伯恩茅斯', logo: 'https://img.aote2u.com/soccer/team/74/74_60.png', played: 30, wins: 10, draws: 7, losses: 13, goalsFor: 42, goalsAgainst: 50, form: ['L', 'W', 'D', 'W', 'L'], currentRank: 11, previousRank: 11 },
  { id: 12, name: '富勒姆', logo: 'https://img.aote2u.com/soccer/team/63/63_60.png', played: 30, wins: 10, draws: 6, losses: 14, goalsFor: 38, goalsAgainst: 48, form: ['W', 'L', 'L', 'D', 'W'], currentRank: 12, previousRank: 13 },
  { id: 13, name: '埃弗顿', logo: 'https://img.aote2u.com/soccer/team/51/51_60.png', played: 30, wins: 9, draws: 8, losses: 13, goalsFor: 35, goalsAgainst: 46, form: ['D', 'D', 'W', 'L', 'L'], currentRank: 13, previousRank: 12 },
  { id: 14, name: '布莱顿', logo: 'https://img.aote2u.com/soccer/team/70/70_60.png', played: 30, wins: 9, draws: 7, losses: 14, goalsFor: 40, goalsAgainst: 52, form: ['L', 'W', 'D', 'D', 'L'], currentRank: 14, previousRank: 14 },
  { id: 15, name: '水晶宫', logo: 'https://img.aote2u.com/soccer/team/52/52_60.png', played: 30, wins: 8, draws: 8, losses: 14, goalsFor: 35, goalsAgainst: 48, form: ['D', 'L', 'W', 'D', 'D'], currentRank: 15, previousRank: 15 },
  { id: 16, name: '布伦特福德', logo: 'https://img.aote2u.com/soccer/team/71/71_60.png', played: 30, wins: 8, draws: 6, losses: 16, goalsFor: 38, goalsAgainst: 55, form: ['W', 'L', 'L', 'W', 'L'], currentRank: 16, previousRank: 16 },
  { id: 17, name: '诺丁汉森林', logo: 'https://img.aote2u.com/soccer/team/68/68_60.png', played: 30, wins: 7, draws: 8, losses: 15, goalsFor: 32, goalsAgainst: 50, form: ['L', 'D', 'D', 'L', 'W'], currentRank: 17, previousRank: 17 },
  { id: 18, name: '卢顿', logo: 'https://img.aote2u.com/soccer/team/75/75_60.png', played: 30, wins: 6, draws: 7, losses: 17, goalsFor: 30, goalsAgainst: 55, form: ['D', 'L', 'W', 'L', 'L'], currentRank: 18, previousRank: 18 },
  { id: 19, name: '伯恩利', logo: 'https://img.aote2u.com/soccer/team/67/67_60.png', played: 30, wins: 5, draws: 6, losses: 19, goalsFor: 25, goalsAgainst: 58, form: ['L', 'L', 'D', 'W', 'L'], currentRank: 19, previousRank: 19 },
  { id: 20, name: '谢菲尔德联', logo: 'https://img.aote2u.com/soccer/team/69/69_60.png', played: 30, wins: 4, draws: 5, losses: 21, goalsFor: 20, goalsAgainst: 65, form: ['L', 'D', 'L', 'L', 'L'], currentRank: 20, previousRank: 20 },
])

const isSimulating = ref(false)

const sortedTeams = computed(() => {
  return [...teams.value].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    return b.goalsFor - a.goalsFor
  }).map((team, index) => ({
    ...team,
    currentRank: index + 1,
    rankChange: team.previousRank - (index + 1)
  }))
})

const getRowClass = (item) => {
  const rank = item.currentRank
  if (rank <= 4) return 'promotion-zone'
  if (rank === 5) return 'europa-zone'
  if (rank === 6) return 'conference-zone'
  if (rank >= 18) return 'relegation-zone'
  return ''
}

const getFormColor = (result) => {
  switch (result) {
    case 'W': return 'success'
    case 'D': return 'warning'
    case 'L': return 'error'
    default: return 'default'
  }
}

const simulateMatchWeek = () => {
  isSimulating.value = true
  
  teams.value.forEach(team => {
    team.previousRank = team.currentRank
  })
  
  setTimeout(() => {
    teams.value.forEach(team => {
      const result = Math.random()
      team.played++
      
      if (result < 0.4) {
        team.wins++
        team.points = (team.wins * 3) + (team.draws * 1)
        team.goalsFor += Math.floor(Math.random() * 4) + 1
        team.goalsAgainst += Math.floor(Math.random() * 2)
        team.form.push('W')
      } else if (result < 0.7) {
        team.draws++
        team.points = (team.wins * 3) + (team.draws * 1)
        const goals = Math.floor(Math.random() * 3)
        team.goalsFor += goals
        team.goalsAgainst += goals
        team.form.push('D')
      } else {
        team.losses++
        team.points = (team.wins * 3) + (team.draws * 1)
        team.goalsFor += Math.floor(Math.random() * 2)
        team.goalsAgainst += Math.floor(Math.random() * 4) + 1
        team.form.push('L')
      }
      
      if (team.form.length > 5) {
        team.form.shift()
      }
      
      team.goalDifference = team.goalsFor - team.goalsAgainst
    })
    
    isSimulating.value = false
  }, 1000)
}

onMounted(() => {
  teams.value.forEach(team => {
    team.points = (team.wins * 3) + (team.draws * 1)
    team.goalDifference = team.goalsFor - team.goalsAgainst
  })
})
</script>

<style scoped>
.league-table-container {
  max-width: 1400px;
}

.legend {
  font-size: 14px;
}

.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.v-data-table-header) {
  background-color: #1976d2 !important;
}

:deep(.v-data-table-header th) {
  color: white !important;
  font-weight: 600 !important;
}

:deep(.v-data-table-row) {
  transition: background-color 0.3s ease;
}

:deep(.v-data-table-row:hover) {
  background-color: rgba(25, 118, 210, 0.05) !important;
}
</style>
