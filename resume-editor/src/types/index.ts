export interface PersonalInfo {
  name: string
  email: string
  phone: string
  avatar: string
  location: string
  github: string
  linkedin: string
  website: string
  summary: string
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  description: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Project {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  description: string
  technologies: string[]
  link: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  workExperience: WorkExperience[]
  projects: Project[]
  skills: Skill[]
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export interface OptimizationResult {
  missingKeywords: string[]
  recommendedSkills: string[]
  summarySuggestions: string[]
  optimizationTips: string[]
}

export interface GeneratedAchievements {
  achievements: string[]
}

export interface AppState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  isMobile: boolean
  user: User | null
  toasts: Toast[]
  resumeData: ResumeData
  loading: boolean
}
