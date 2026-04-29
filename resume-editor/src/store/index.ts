import { reactive, computed, watch } from 'vue'
import type { AppState, ResumeData, Toast, User, Skill } from '@/types'

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const getInitialResumeData = (): ResumeData => ({
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  education: [],
  workExperience: [],
  projects: [],
  skills: []
})

const getStoredResumeData = (): ResumeData => {
  const stored = localStorage.getItem('resume_data')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return getInitialResumeData()
    }
  }
  return getInitialResumeData()
}

const getStoredTheme = (): 'light' | 'dark' => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getStoredSidebarState = (): boolean => {
  const stored = localStorage.getItem('sidebar_collapsed')
  return stored === 'true'
}

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('base44_user')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

const state = reactive<AppState>({
  theme: getStoredTheme(),
  sidebarCollapsed: getStoredSidebarState(),
  isMobile: window.innerWidth < 768,
  user: getStoredUser(),
  toasts: [],
  resumeData: getStoredResumeData(),
  loading: false
})

const isDark = computed(() => state.theme === 'dark')

const toggleTheme = () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
}

const toggleSidebar = () => {
  state.sidebarCollapsed = !state.sidebarCollapsed
}

const setSidebarCollapsed = (collapsed: boolean) => {
  state.sidebarCollapsed = collapsed
}

const setIsMobile = (isMobile: boolean) => {
  state.isMobile = isMobile
}

const setUser = (user: User | null) => {
  state.user = user
}

const setLoading = (loading: boolean) => {
  state.loading = loading
}

const addToast = (type: Toast['type'], message: string) => {
  const toast: Toast = {
    id: generateId(),
    type,
    message
  }
  state.toasts.push(toast)
  
  setTimeout(() => {
    removeToast(toast.id)
  }, 3000)
}

const removeToast = (id: string) => {
  const index = state.toasts.findIndex(t => t.id === id)
  if (index > -1) {
    state.toasts.splice(index, 1)
  }
}

const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
  state.resumeData.personalInfo = {
    ...state.resumeData.personalInfo,
    ...info
  }
}

const addEducation = () => {
  state.resumeData.education.push({
    id: generateId(),
    school: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const updateEducation = (id: string, data: Partial<ResumeData['education'][0]>) => {
  const index = state.resumeData.education.findIndex(e => e.id === id)
  if (index > -1) {
    state.resumeData.education[index] = {
      ...state.resumeData.education[index],
      ...data
    }
  }
}

const removeEducation = (id: string) => {
  const index = state.resumeData.education.findIndex(e => e.id === id)
  if (index > -1) {
    state.resumeData.education.splice(index, 1)
  }
}

const addWorkExperience = () => {
  state.resumeData.workExperience.push({
    id: generateId(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: []
  })
}

const updateWorkExperience = (id: string, data: Partial<ResumeData['workExperience'][0]>) => {
  const index = state.resumeData.workExperience.findIndex(w => w.id === id)
  if (index > -1) {
    state.resumeData.workExperience[index] = {
      ...state.resumeData.workExperience[index],
      ...data
    }
  }
}

const removeWorkExperience = (id: string) => {
  const index = state.resumeData.workExperience.findIndex(w => w.id === id)
  if (index > -1) {
    state.resumeData.workExperience.splice(index, 1)
  }
}

const addProject = () => {
  state.resumeData.projects.push({
    id: generateId(),
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: [],
    link: ''
  })
}

const updateProject = (id: string, data: Partial<ResumeData['projects'][0]>) => {
  const index = state.resumeData.projects.findIndex(p => p.id === id)
  if (index > -1) {
    state.resumeData.projects[index] = {
      ...state.resumeData.projects[index],
      ...data
    }
  }
}

const removeProject = (id: string) => {
  const index = state.resumeData.projects.findIndex(p => p.id === id)
  if (index > -1) {
    state.resumeData.projects.splice(index, 1)
  }
}

const addSkillCategory = () => {
  state.resumeData.skills.push({
    category: '',
    items: []
  })
}

const updateSkillCategory = (index: number, data: Partial<Skill>) => {
  if (index >= 0 && index < state.resumeData.skills.length) {
    state.resumeData.skills[index] = {
      ...state.resumeData.skills[index],
      ...data
    }
  }
}

const removeSkillCategory = (index: number) => {
  if (index >= 0 && index < state.resumeData.skills.length) {
    state.resumeData.skills.splice(index, 1)
  }
}

const setResumeData = (data: ResumeData) => {
  state.resumeData = data
}

const resetResumeData = () => {
  state.resumeData = getInitialResumeData()
}

watch(
  () => state.theme,
  (theme) => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true }
)

watch(
  () => state.sidebarCollapsed,
  (collapsed) => {
    localStorage.setItem('sidebar_collapsed', String(collapsed))
  },
  { immediate: true }
)

watch(
  () => state.resumeData,
  (data) => {
    localStorage.setItem('resume_data', JSON.stringify(data))
  },
  { deep: true, immediate: true }
)

watch(
  () => state.user,
  (user) => {
    if (user) {
      localStorage.setItem('base44_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('base44_user')
    }
  }
)

export const useStore = () => {
  return {
    state,
    isDark,
    toggleTheme,
    toggleSidebar,
    setSidebarCollapsed,
    setIsMobile,
    setUser,
    setLoading,
    addToast,
    removeToast,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addProject,
    updateProject,
    removeProject,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    setResumeData,
    resetResumeData
  }
}
