import type { OrgNode, OrgConnection, OrgChartData } from '../types'

const STORAGE_KEY = 'org-chart-editor-data'

export function saveToLocalStorage(nodes: OrgNode[], connections: OrgConnection[]): void {
  const data: OrgChartData = {
    nodes,
    connections
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadFromLocalStorage(): OrgChartData | null {
  const dataStr = localStorage.getItem(STORAGE_KEY)
  if (!dataStr) return null
  
  try {
    return JSON.parse(dataStr) as OrgChartData
  } catch {
    return null
  }
}

export function exportJson(nodes: OrgNode[], connections: OrgConnection[]): void {
  const data: OrgChartData = {
    nodes,
    connections
  }
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `org-chart-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function importJson(file: File): Promise<OrgChartData | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as OrgChartData
        resolve(data)
      } catch {
        resolve(null)
      }
    }
    reader.onerror = () => resolve(null)
    reader.readAsText(file)
  })
}
