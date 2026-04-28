export type TechName = 
  | 'Vue.js' | 'Vue 3' | 'Vue'
  | 'React' | 'React Native'
  | 'TypeScript' | 'TS'
  | 'JavaScript' | 'JS'
  | 'Node.js' | 'Node'
  | 'Tailwind' | 'Tailwind CSS'
  | 'CSS'
  | 'Next.js' | 'Next'
  | 'Nuxt.js' | 'Nuxt'
  | 'Express'
  | 'Python'
  | 'Go' | 'Golang'
  | 'PostgreSQL' | 'Postgres' | 'Pg'
  | 'MongoDB' | 'Mongo'
  | 'Redis'
  | 'Docker'
  | 'Kubernetes' | 'K8s'
  | 'Git'
  | 'ECharts'
  | 'Element Plus' | 'Element'
  | 'Socket.io' | 'Socket'
  | 'Firebase'
  | 'Web3.js' | 'Web3'
  | 'WebRTC'
  | string

export interface TechIconConfig {
  icon: string
  color: string
  bgColor: string
}

export const techIconMap: Record<string, TechIconConfig> = {
  'Vue.js': { icon: '💚', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  'Vue 3': { icon: '💚', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  'Vue': { icon: '💚', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  
  'React': { icon: '⚛️', color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  'React Native': { icon: '⚛️', color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  
  'TypeScript': { icon: '📘', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  'TS': { icon: '📘', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'JavaScript': { icon: '📒', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  'JS': { icon: '📒', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  
  'Node.js': { icon: '🟢', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  'Node': { icon: '🟢', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  
  'Tailwind': { icon: '🎨', color: 'text-cyan-600', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  'Tailwind CSS': { icon: '🎨', color: 'text-cyan-600', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  
  'CSS': { icon: '🎨', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'Next.js': { icon: '▲', color: 'text-gray-800 dark:text-gray-200', bgColor: 'bg-gray-100 dark:bg-gray-700' },
  'Next': { icon: '▲', color: 'text-gray-800 dark:text-gray-200', bgColor: 'bg-gray-100 dark:bg-gray-700' },
  
  'Nuxt.js': { icon: '💚', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  'Nuxt': { icon: '💚', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  
  'Express': { icon: '🚂', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-700' },
  
  'Python': { icon: '🐍', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'Go': { icon: '🐹', color: 'text-cyan-600', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  'Golang': { icon: '🐹', color: 'text-cyan-600', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  
  'PostgreSQL': { icon: '🐘', color: 'text-blue-700', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  'Postgres': { icon: '🐘', color: 'text-blue-700', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  'Pg': { icon: '🐘', color: 'text-blue-700', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'MongoDB': { icon: '🍃', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  'Mongo': { icon: '🍃', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  
  'Redis': { icon: '🔴', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' },
  
  'Docker': { icon: '🐳', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'Kubernetes': { icon: '☸️', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  'K8s': { icon: '☸️', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'Git': { icon: '🔧', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  
  'ECharts': { icon: '📊', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  
  'Element Plus': { icon: '📦', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  'Element': { icon: '📦', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  
  'Socket.io': { icon: '🔌', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-700' },
  'Socket': { icon: '🔌', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-700' },
  
  'Firebase': { icon: '🔥', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  
  'Web3.js': { icon: '💎', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  'Web3': { icon: '💎', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  
  'WebRTC': { icon: '📹', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
}

export const defaultTechIcon: TechIconConfig = {
  icon: '🔹',
  color: 'text-gray-500',
  bgColor: 'bg-gray-100 dark:bg-gray-700'
}

export function getTechIcon(techName: string): TechIconConfig {
  return techIconMap[techName] || defaultTechIcon
}

export function getTechIconEmoji(techName: string): string {
  return getTechIcon(techName).icon
}
