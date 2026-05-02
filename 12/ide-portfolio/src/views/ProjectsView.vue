<script setup lang="ts">
import { Card } from 'ant-design-vue'
import { projects } from '@/data/mockData'

const getProjectColor = (tech: string): string => {
  const colors: Record<string, string> = {
    'Vue.js': 'green',
    'React': 'blue',
    'TypeScript': 'blue',
    'Node.js': 'green',
    'Express': 'gray',
    'MongoDB': 'green',
    'PostgreSQL': 'blue',
    'Docker': 'blue',
    'Tailwind CSS': 'cyan',
    'Stripe': 'purple',
    'Firebase': 'orange',
    'Redux': 'purple',
    'AWS': 'orange',
    'Chart.js': 'pink',
    'Regular Expressions': 'yellow',
    'Finite Automata': 'indigo'
  }
  return colors[tech] || 'default'
}
</script>

<template>
  <div class="min-h-full p-6 md:p-10">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">🚀 Projects</h1>
        <p class="text-gray-400">A showcase of my work and experiments</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <Card
          v-for="project in projects"
          :key="project.id"
          class="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all group"
        >
          <div class="flex flex-col h-full">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {{ project.name }}
                </h3>
              </div>
              <div class="flex gap-2">
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  title="GitHub"
                >
                  <span class="text-lg">📦</span>
                </a>
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  title="Live Demo"
                >
                  <span class="text-lg">🔗</span>
                </a>
              </div>
            </div>

            <p class="text-gray-300 mb-4 flex-grow">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 text-xs rounded-full"
                :class="{
                  'bg-green-900/50 text-green-300': getProjectColor(tech) === 'green',
                  'bg-blue-900/50 text-blue-300': getProjectColor(tech) === 'blue',
                  'bg-yellow-900/50 text-yellow-300': getProjectColor(tech) === 'yellow',
                  'bg-purple-900/50 text-purple-300': getProjectColor(tech) === 'purple',
                  'bg-orange-900/50 text-orange-300': getProjectColor(tech) === 'orange',
                  'bg-cyan-900/50 text-cyan-300': getProjectColor(tech) === 'cyan',
                  'bg-pink-900/50 text-pink-300': getProjectColor(tech) === 'pink',
                  'bg-indigo-900/50 text-indigo-300': getProjectColor(tech) === 'indigo',
                  'bg-gray-700 text-gray-300': getProjectColor(tech) === 'default' || getProjectColor(tech) === 'gray'
                }"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-semibold text-white mb-6 text-center">📊 Project Stats</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-blue-400">{{ projects.length }}</div>
            <div class="text-sm text-gray-400 mt-1">Total Projects</div>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-green-400">{{ projects.filter(p => p.github).length }}</div>
            <div class="text-sm text-gray-400 mt-1">Open Source</div>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-yellow-400">{{ [...new Set(projects.flatMap(p => p.technologies))].length }}</div>
            <div class="text-sm text-gray-400 mt-1">Tech Stack</div>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl font-bold text-purple-400">{{ projects.filter(p => p.link).length }}</div>
            <div class="text-sm text-gray-400 mt-1">Live Demos</div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>