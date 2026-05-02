<script setup lang="ts">
import { ref } from 'vue'
import { Timeline, Card, Tag } from 'ant-design-vue'
import { experiences, education } from '@/data/mockData'

const activeSection = ref('experience')
</script>

<template>
  <div class="min-h-full p-6 md:p-10">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">📄 Resume</h1>
        <p class="text-gray-400">My professional journey and qualifications</p>
      </div>

      <div class="flex gap-2 mb-8 justify-center flex-wrap">
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeSection === 'experience' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
          @click="activeSection = 'experience'"
        >
          💼 Experience
        </button>
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeSection === 'education' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
          @click="activeSection = 'education'"
        >
          🎓 Education
        </button>
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeSection === 'skills' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
          @click="activeSection = 'skills'"
        >
          💪 Skills
        </button>
      </div>

      <div v-if="activeSection === 'experience'">
        <h2 class="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>💼</span> Professional Experience
        </h2>
        <Timeline mode="left" class="ide-timeline">
          <Timeline.Item
            v-for="(exp, index) in experiences"
            :key="index"
            :color="index === 0 ? 'blue' : 'gray'"
          >
            <Card class="bg-gray-800/50 border-gray-700 mb-4">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 class="text-xl font-semibold text-white">{{ exp.position }}</h3>
                  <p class="text-blue-400">{{ exp.company }}</p>
                </div>
                <span class="text-sm text-gray-400 mt-2 md:mt-0">{{ exp.period }}</span>
              </div>
              <ul class="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li v-for="(desc, idx) in exp.description" :key="idx">
                  {{ desc }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-2">
                <Tag v-for="tech in exp.technologies" :key="tech" color="blue">
                  {{ tech }}
                </Tag>
              </div>
            </Card>
          </Timeline.Item>
        </Timeline>
      </div>

      <div v-if="activeSection === 'education'">
        <h2 class="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>🎓</span> Education
        </h2>
        <div class="space-y-6">
          <Card
            v-for="(edu, index) in education"
            :key="index"
            class="bg-gray-800/50 border-gray-700"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-white">{{ edu.degree }}</h3>
                <p class="text-blue-400">{{ edu.school }}</p>
              </div>
              <span class="text-sm text-gray-400 mt-2 md:mt-0">{{ edu.period }}</span>
            </div>
            <p class="text-gray-300">{{ edu.description }}</p>
          </Card>
        </div>
      </div>

      <div v-if="activeSection === 'skills'">
        <h2 class="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>💪</span> Quick Skills Overview
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl mb-2">⚡</div>
            <h3 class="text-white font-medium mb-1">Frontend</h3>
            <p class="text-sm text-gray-400">Vue.js, React, Tailwind</p>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl mb-2">🔧</div>
            <h3 class="text-white font-medium mb-1">Backend</h3>
            <p class="text-sm text-gray-400">Node.js, Express, Python</p>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl mb-2">🗄️</div>
            <h3 class="text-white font-medium mb-1">Database</h3>
            <p class="text-sm text-gray-400">MongoDB, PostgreSQL</p>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl mb-2">☁️</div>
            <h3 class="text-white font-medium mb-1">DevOps</h3>
            <p class="text-sm text-gray-400">Docker, AWS, CI/CD</p>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl mb-2">📱</div>
            <h3 class="text-white font-medium mb-1">Mobile</h3>
            <p class="text-sm text-gray-400">React Native, PWA</p>
          </Card>
          <Card class="bg-gray-800/50 border-gray-700 text-center">
            <div class="text-3xl mb-2">🛠️</div>
            <h3 class="text-white font-medium mb-1">Tools</h3>
            <p class="text-sm text-gray-400">Git, VS Code, Figma</p>
          </Card>
        </div>
        
        <div class="mt-8 text-center">
          <p class="text-gray-400">For detailed skills with proficiency levels, open the <span class="text-blue-400">SkillsView.vue</span> file.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-timeline-item-content) {
  width: 95%;
}

:deep(.ant-timeline-item-tail) {
  border-color: #374151;
}

:deep(.ant-timeline-item-head) {
  background-color: #1e1e1e;
}
</style>
