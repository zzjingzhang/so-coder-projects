export interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  path: string
  icon?: string
}

export interface Tab {
  id: string
  name: string
  path: string
  type: 'file' | 'view'
  icon?: string
}

export interface TerminalHistoryItem {
  id: string
  type: 'input' | 'output' | 'error'
  content: string
  timestamp: number
}

export interface TerminalCommand {
  name: string
  description: string
  usage: string
  execute: (args: string[], context: TerminalContext) => string[]
}

export interface TerminalContext {
  currentPath: string
  fileSystem: FileNode[]
  history: string[]
}

export interface Skill {
  name: string
  level: number
  category: string
  icon?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  image?: string
  link?: string
  github?: string
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string[]
  technologies: string[]
}

export interface Education {
  school: string
  degree: string
  period: string
  description: string
}

export interface LAGRule {
  name: string
  pattern: string
  action?: string
}

export interface LAGToken {
  type: string
  value: string
  line: number
  column: number
}

export interface LAGResult {
  tokens: LAGToken[]
  errors: string[]
}
