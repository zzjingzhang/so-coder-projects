<script setup lang="ts">
import { ref, computed } from 'vue'
import { Progress, Card, Tag } from 'ant-design-vue'
import { skills } from '@/data/mockData'

const selectedCategory = ref('all')

const categories = computed(() => {
  const cats = ['all']
  skills.forEach(skill => {
    if (!cats.includes(skill.category)) {
      cats.push(skill.category)
    }
  })
  return cats
})

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') {
    return skills
  }
  return skills.filter(s => s.category === selectedCategory.value)
})

const getSkillColor = (level: number): string => {
  if (level >= 90) return 'blue'
  if (level >= 80) return 'green'
  if (level >= 70) return 'yellow'
  return 'orange'
}
</script>

<template>
  <div class="min-h-full p-6 md:p-10">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">💪 Skills</h1>
        <p class="text-gray-400">Technologies and tools I work with</p>
      </div>

      <div class="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          v-for="category in categories"
          :key="category"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
          :class="selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
          @click="selectedCategory = category"
        >
          {{ category === 'all' ? '🌟 All' : category }}
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <Card
          v-for="skill in filteredSkills"
          :key="skill.name"
          class="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">
                {{ 
                  skill.icon === 'vue' ? '💚' :
                  skill.icon === 'react' ? '⚛️' :
                  skill.icon === 'ts' ? '🔷' :
                  skill.icon === 'js' ? '🟨' :
                  skill.icon === 'node' ? '🟢' :
                  skill.icon === 'python' ? '🐍' :
                  skill.icon === 'css' ? '🎨' :
                  skill.icon === 'docker' ? '🐳' :
                  skill.icon === 'git' ? '📚' :
                  skill.icon === 'db' ? '🗄️' : '🔧'
                }}
              </span>
              <div>
                <h3 class="text-white font-semibold">{{ skill.name }}</h3>
                <Tag color="blue" class="mt-1">{{ skill.category }}</Tag>
              </div>
            </div>
            <span class="text-lg font-bold" :class="getSkillColor(skill.level) === 'blue' ? 'text-blue-400' : getSkillColor(skill.level) === 'green' ? 'text-green-400' : getSkillColor(skill.level) === 'yellow' ? 'text-yellow-400' : 'text-orange-400'">
              {{ skill.level }}%
            </span>
          </div>
          <Progress
            :percent="skill.level"
            :strokeColor="
              getSkillColor(skill.level) === 'blue' ? '#3b82f6' :
              getSkillColor(skill.level) === 'green' ? '#22c55e' :
              getSkillColor(skill.level) === 'yellow' ? '#eab308' : '#f97316'
            "
            :showInfo="false"
            :strokeWidth="8"
          />
        </Card>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-semibold text-white mb-6 text-center">📊 Skills Overview</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-blue-400">{{ skills.length }}</div>
            <div class="text-sm text-gray-400 mt-1">Total Skills</div>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-green-400">{{ skills.filter(s => s.level >= 80).length }}</div>
            <div class="text-sm text-gray-400 mt-1">Expert Level</div>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-yellow-400">{{ categories.length - 1 }}</div>
            <div class="text-sm text-gray-400 mt-1">Categories</div>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-purple-400">{{ Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length) }}%</div>
            <div class="text-sm text-gray-400 mt-1">Average Level</div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
