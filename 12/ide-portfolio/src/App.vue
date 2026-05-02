<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Tab, FileNode, TerminalHistoryItem, TerminalContext } from '@/types'
import { fileSystem } from '@/data/mockData'
import { executeCommand, createInitialContext } from '@/utils/terminalCommands'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarWidth = ref(260)
const terminalHeight = ref(200)
const isMobileSidebarOpen = ref(false)
const isTerminalOpen = ref(true)
const isMobile = ref(false)

const activeTab = ref('home')
const tabs = ref<Tab[]>([
  { id: 'home', name: 'HomeView.vue', path: '/home', type: 'view' }
])

const expandedFolders = ref<Set<string>>(new Set(['/src']))

const terminalHistory = ref<TerminalHistoryItem[]>([])
const terminalInput = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const terminalContext = reactive<TerminalContext>(createInitialContext())

const welcomeMessage = [
  '',
  '  ╔══════════════════════════════════════════════════════════════╗',
  '  ║           Welcome to IDE Portfolio Terminal v1.0              ║',
  '  ║                    Developer Workspace                          ║',
  '  ╚══════════════════════════════════════════════════════════════╝',
  '',
  '  This is an interactive terminal simulator.',
  '  Navigate through your portfolio using commands.',
  '',
  '  Type "help" to see available commands.',
  '  Type "lag" to learn about Lexical Analyzer Generator.',
  '',
  `  Current time: ${new Date().toLocaleString()}`,
  ''
]

watch(() => route.path, (newPath) => {
  const pathToTab: Record<string, string> = {
    '/home': 'home',
    '/resume': 'resume',
    '/skills': 'skills',
    '/projects': 'projects',
    '/contact': 'contact',
    '/lag': 'lag'
  }
  
  const tabId = pathToTab[newPath]
  if (tabId) {
    activeTab.value = tabId
    
    const existingTab = tabs.value.find(t => t.id === tabId)
    if (!existingTab) {
      const tabNames: Record<string, { name: string, path: string }> = {
        home: { name: 'HomeView.vue', path: '/home' },
        resume: { name: 'ResumeView.vue', path: '/resume' },
        skills: { name: 'SkillsView.vue', path: '/skills' },
        projects: { name: 'ProjectsView.vue', path: '/projects' },
        contact: { name: 'ContactView.vue', path: '/contact' },
        lag: { name: 'LAGView.vue', path: '/lag' }
      }
      
      const tabInfo = tabNames[tabId]
      if (tabInfo) {
        tabs.value.push({
          id: tabId,
          name: tabInfo.name,
          path: tabInfo.path,
          type: 'view'
        })
      }
    }
  }
}, { immediate: true })

const initTerminal = () => {
  welcomeMessage.forEach((line) => {
    terminalHistory.value.push({
      id: Date.now().toString() + Math.random(),
      type: 'output',
      content: line,
      timestamp: Date.now()
    })
  })
}

const toggleFolder = (path: string) => {
  if (expandedFolders.value.has(path)) {
    expandedFolders.value.delete(path)
  } else {
    expandedFolders.value.add(path)
  }
}

const openFile = (node: FileNode) => {
  if (node.type === 'folder') {
    toggleFolder(node.path)
    return
  }

  const pathToRoute: Record<string, { id: string, name: string, path: string }> = {
    '/src/views/HomeView.vue': { id: 'home', name: 'HomeView.vue', path: '/home' },
    '/src/views/ResumeView.vue': { id: 'resume', name: 'ResumeView.vue', path: '/resume' },
    '/src/views/SkillsView.vue': { id: 'skills', name: 'SkillsView.vue', path: '/skills' },
    '/src/views/ProjectsView.vue': { id: 'projects', name: 'ProjectsView.vue', path: '/projects' },
    '/src/views/ContactView.vue': { id: 'contact', name: 'ContactView.vue', path: '/contact' },
    '/src/views/LAGView.vue': { id: 'lag', name: 'LAGView.vue', path: '/lag' }
  }

  const routeInfo = pathToRoute[node.path]
  if (routeInfo) {
    const existingTab = tabs.value.find(t => t.id === routeInfo.id)
    if (!existingTab) {
      tabs.value.push({
        id: routeInfo.id,
        name: routeInfo.name,
        path: routeInfo.path,
        type: 'view'
      })
    }
    activeTab.value = routeInfo.id
    router.push(routeInfo.path)
  }
  
  if (isMobile.value) {
    isMobileSidebarOpen.value = false
  }
}

const closeTab = (tabId: string, e?: Event) => {
  e?.stopPropagation()
  
  if (tabs.value.length === 1) return
  
  const index = tabs.value.findIndex(t => t.id === tabId)
  if (index > -1) {
    tabs.value.splice(index, 1)
    
    if (activeTab.value === tabId) {
      const newActive = tabs.value[Math.max(0, index - 1)]
      activeTab.value = newActive.id
      router.push(newActive.path)
    }
  }
}

const selectTab = (tab: Tab) => {
  activeTab.value = tab.id
  router.push(tab.path)
}

const submitTerminalCommand = () => {
  const input = terminalInput.value.trim()
  
  if (input) {
    terminalHistory.value.push({
      id: Date.now().toString() + Math.random(),
      type: 'input',
      content: `developer@portfolio:${terminalContext.currentPath}$ ${input}`,
      timestamp: Date.now()
    })
    
    commandHistory.value.push(input)
    terminalContext.history.push(input)
    historyIndex.value = -1
    
    const { output, isClear } = executeCommand(input, terminalContext)
    
    if (isClear) {
      terminalHistory.value = []
    } else {
      output.forEach((line) => {
        terminalHistory.value.push({
          id: Date.now().toString() + Math.random(),
          type: line.includes('not found') || line.includes('No such') || line.includes('Not a') ? 'error' : 'output',
          content: line,
          timestamp: Date.now()
        })
      })
    }
  } else {
    terminalHistory.value.push({
      id: Date.now().toString() + Math.random(),
      type: 'input',
      content: `developer@portfolio:${terminalContext.currentPath}$`,
      timestamp: Date.now()
    })
  }
  
  terminalInput.value = ''
  
  setTimeout(() => {
    const terminalEl = document.getElementById('terminal-output')
    if (terminalEl) {
      terminalEl.scrollTop = terminalEl.scrollHeight
    }
  }, 0)
}

const handleTerminalKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    submitTerminalCommand()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (commandHistory.value.length > 0) {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++
        terminalInput.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value]
      }
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIndex.value > 0) {
      historyIndex.value--
      terminalInput.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value]
    } else if (historyIndex.value === 0) {
      historyIndex.value = -1
      terminalInput.value = ''
    }
  }
}

const focusTerminal = () => {
  const input = document.getElementById('terminal-input') as HTMLInputElement
  if (input) {
    input.focus()
  }
}

const toggleTerminal = () => {
  isTerminalOpen.value = !isTerminalOpen.value
}

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const getFileIcon = (name: string): string => {
  if (name.endsWith('.vue')) return 'vue'
  if (name.endsWith('.ts')) return 'ts'
  if (name.endsWith('.js')) return 'js'
  if (name.endsWith('.css')) return 'css'
  if (name.endsWith('.json')) return 'json'
  if (name.endsWith('.md')) return 'md'
  if (name.endsWith('.html')) return 'html'
  return 'file'
}

const renderFileNodes = (nodes: FileNode[], level: number = 0): void => {
  nodes.forEach(node => {
    if (node.type === 'folder' && node.children) {
      renderFileNodes(node.children, level + 1)
    }
  })
}

initTerminal()
checkMobile()

if (typeof window !== 'undefined') {
  window.addEventListener('resize', checkMobile)
}
</script>

<template>
  <div class="flex flex-col h-screen bg-ide-dark overflow-hidden">
    <div class="h-8 bg-ide-sidebar flex items-center px-3 border-b border-gray-700 select-none">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"></div>
        <div class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"></div>
      </div>
      <div class="flex-1 text-center text-sm text-ide-text">
        👨‍💻 Developer Portfolio - IDE Style
      </div>
      <div class="hidden md:flex items-center gap-2">
        <button class="px-2 py-0.5 text-xs text-ide-text hover:bg-gray-700 rounded" @click="toggleTerminal">
          {{ isTerminalOpen ? 'Hide Terminal' : 'Show Terminal' }}
        </button>
      </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <div class="hidden md:flex flex-col" :style="{ width: sidebarWidth + 'px' }">
        <div class="h-9 bg-ide-sidebar flex items-center px-3 text-xs text-ide-text uppercase tracking-wider border-b border-gray-700">
          Explorer
        </div>
        <div class="flex-1 bg-ide-sidebar overflow-y-auto ide-scrollbar p-1">
          <div class="text-xs text-ide-text uppercase tracking-wider px-3 py-2">
            PORTFOLIO
          </div>
          <div class="pl-2">
            <template v-for="node in fileSystem" :key="node.path">
              <div
                v-if="node.type === 'folder'"
                class="group"
              >
                <div
                  class="flex items-center gap-1 px-2 py-0.5 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                  @click="toggleFolder(node.path)"
                >
                  <span class="text-xs text-gray-500">
                    {{ expandedFolders.has(node.path) ? '▼' : '▶' }}
                  </span>
                  <span class="text-yellow-400">📁</span>
                  <span>{{ node.name }}</span>
                </div>
                <div v-if="expandedFolders.has(node.path) && node.children" class="pl-4">
                  <template v-for="child in node.children" :key="child.path">
                    <div
                      v-if="child.type === 'folder'"
                      class="group"
                    >
                      <div
                        class="flex items-center gap-1 px-2 py-0.5 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                        @click="toggleFolder(child.path)"
                      >
                        <span class="text-xs text-gray-500">
                          {{ expandedFolders.has(child.path) ? '▼' : '▶' }}
                        </span>
                        <span class="text-yellow-400">📁</span>
                        <span>{{ child.name }}</span>
                      </div>
                      <div v-if="expandedFolders.has(child.path) && child.children" class="pl-4">
                        <div
                          v-for="file in child.children"
                          :key="file.path"
                          class="flex items-center gap-1 px-2 py-0.5 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                          @click="openFile(file)"
                        >
                          <span class="text-green-400">📄</span>
                          <span>{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="flex items-center gap-1 px-2 py-0.5 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                      @click="openFile(child)"
                    >
                      <span class="text-green-400">📄</span>
                      <span>{{ child.name }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div
                v-else
                class="flex items-center gap-1 px-2 py-0.5 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                @click="openFile(node)"
              >
                <span class="text-green-400">📄</span>
                <span>{{ node.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="md:hidden fixed inset-0 z-50" v-if="isMobileSidebarOpen">
        <div class="absolute inset-0 bg-black/50" @click="toggleMobileSidebar"></div>
        <div class="absolute left-0 top-0 bottom-0 w-72 bg-ide-sidebar flex flex-col">
          <div class="h-14 bg-ide-dark flex items-center px-4 border-b border-gray-700">
            <span class="text-ide-text font-semibold">📁 Explorer</span>
          </div>
          <div class="flex-1 overflow-y-auto ide-scrollbar p-2">
            <template v-for="node in fileSystem" :key="node.path">
              <div
                v-if="node.type === 'folder'"
                class="group"
              >
                <div
                  class="flex items-center gap-1 px-2 py-2 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                  @click="toggleFolder(node.path)"
                >
                  <span class="text-xs text-gray-500">
                    {{ expandedFolders.has(node.path) ? '▼' : '▶' }}
                  </span>
                  <span class="text-yellow-400">📁</span>
                  <span>{{ node.name }}</span>
                </div>
                <div v-if="expandedFolders.has(node.path) && node.children" class="pl-4">
                  <template v-for="child in node.children" :key="child.path">
                    <div
                      v-if="child.type === 'folder'"
                      class="group"
                    >
                      <div
                        class="flex items-center gap-1 px-2 py-2 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                        @click="toggleFolder(child.path)"
                      >
                        <span class="text-xs text-gray-500">
                          {{ expandedFolders.has(child.path) ? '▼' : '▶' }}
                        </span>
                        <span class="text-yellow-400">📁</span>
                        <span>{{ child.name }}</span>
                      </div>
                      <div v-if="expandedFolders.has(child.path) && child.children" class="pl-4">
                        <div
                          v-for="file in child.children"
                          :key="file.path"
                          class="flex items-center gap-1 px-2 py-2 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                          @click="openFile(file)"
                        >
                          <span class="text-green-400">📄</span>
                          <span>{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="flex items-center gap-1 px-2 py-2 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                      @click="openFile(child)"
                    >
                      <span class="text-green-400">📄</span>
                      <span>{{ child.name }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div
                v-else
                class="flex items-center gap-1 px-2 py-2 text-sm text-ide-text hover:bg-gray-700 cursor-pointer rounded"
                @click="openFile(node)"
              >
                <span class="text-green-400">📄</span>
                <span>{{ node.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="h-9 bg-ide-dark flex items-center border-b border-gray-700 overflow-x-auto">
          <div class="flex">
            <div
              v-for="tab in tabs"
              :key="tab.id"
              class="group flex items-center gap-2 px-3 h-full cursor-pointer border-r border-gray-700"
              :class="{ 'bg-ide-dark': activeTab !== tab.id, 'bg-gray-700': activeTab === tab.id }"
              @click="selectTab(tab)"
            >
              <span class="text-green-400 text-sm">📄</span>
              <span class="text-sm text-ide-text whitespace-nowrap">{{ tab.name }}</span>
              <button
                v-if="tabs.length > 1"
                class="ml-1 w-4 h-4 flex items-center justify-center rounded text-gray-500 hover:bg-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                @click.stop="closeTab(tab.id, $event)"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div class="md:hidden h-10 bg-ide-sidebar flex items-center px-3 border-b border-gray-700">
          <button
            class="flex items-center gap-2 px-2 py-1 text-sm text-ide-text hover:bg-gray-700 rounded"
            @click="toggleMobileSidebar"
          >
            <span>☰</span>
            <span>Explorer</span>
          </button>
          <div class="flex-1"></div>
          <button
            class="flex items-center gap-2 px-2 py-1 text-sm text-ide-text hover:bg-gray-700 rounded"
            @click="toggleTerminal"
          >
            <span>⌨️</span>
          </button>
        </div>

        <div class="flex-1 overflow-auto ide-scrollbar bg-ide-dark">
          <router-view />
        </div>

        <div v-if="isTerminalOpen" class="border-t border-gray-700 bg-ide-dark flex flex-col" :style="{ height: terminalHeight + 'px' }">
          <div class="h-8 bg-ide-sidebar flex items-center px-3 border-b border-gray-700">
            <div class="flex items-center gap-4 text-sm">
              <span class="text-ide-text font-medium cursor-pointer border-b-2 border-blue-500 pb-1">TERMINAL</span>
            </div>
            <div class="flex-1"></div>
            <div class="flex items-center gap-2">
              <button class="text-gray-500 hover:text-ide-text" @click="toggleTerminal">
                <span class="text-lg">−</span>
              </button>
            </div>
          </div>
          
          <div 
            id="terminal-output"
            class="flex-1 overflow-y-auto ide-scrollbar p-2 bg-black/50"
            @click="focusTerminal"
          >
            <div class="terminal-text">
              <div
                v-for="item in terminalHistory"
                :key="item.id"
                class="whitespace-pre-wrap"
                :class="{
                  'text-green-400': item.type === 'input',
                  'text-ide-text': item.type === 'output',
                  'text-red-400': item.type === 'error'
                }"
              >{{ item.content }}</div>
            </div>
          </div>
          
          <div class="h-8 bg-black/50 flex items-center px-2 border-t border-gray-800">
            <span class="terminal-text text-green-400 mr-1">
              developer@portfolio:{{ terminalContext.currentPath }}$
            </span>
            <input
              id="terminal-input"
              v-model="terminalInput"
              @keydown="handleTerminalKeydown"
              class="flex-1 bg-transparent border-none outline-none terminal-text text-ide-text caret-green-400"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="h-6 bg-blue-800 flex items-center px-3 text-xs text-white select-none">
      <div class="flex items-center gap-4">
        <span>main</span>
        <span>⟳ 0</span>
        <span>⚙ 0</span>
      </div>
      <div class="flex-1"></div>
      <div class="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
        <span>Vue</span>
        <span>TypeScript</span>
      </div>
    </div>
  </div>
</template>
