import type { AppData } from '../types'
import { DEFAULT_TEAMS, generateDefaultStudents } from '../types'

const STORAGE_KEY = 'class-score-system-data'

export const loadData = (): AppData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data) as AppData
    }
  } catch (e) {
    console.error('Failed to load data:', e)
  }
  return {
    teams: JSON.parse(JSON.stringify(DEFAULT_TEAMS)),
    students: generateDefaultStudents(),
    defaultPoints: 1,
  }
}

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save data:', e)
  }
}
