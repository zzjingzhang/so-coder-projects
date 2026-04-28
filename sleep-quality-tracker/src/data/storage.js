const STORAGE_KEYS = {
  SLEEP_RECORDS: 'sleep_records',
  SLEEP_GOALS: 'sleep_goals',
  ACHIEVEMENTS: 'sleep_achievements'
}

export function saveSleepRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEYS.SLEEP_RECORDS, JSON.stringify(records))
    return true
  } catch (error) {
    console.error('Failed to save sleep records:', error)
    return false
  }
}

export function loadSleepRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SLEEP_RECORDS)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to load sleep records:', error)
  }
  return []
}

export function saveSleepGoals(goals) {
  try {
    localStorage.setItem(STORAGE_KEYS.SLEEP_GOALS, JSON.stringify(goals))
    return true
  } catch (error) {
    console.error('Failed to save sleep goals:', error)
    return false
  }
}

export function loadSleepGoals() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SLEEP_GOALS)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to load sleep goals:', error)
  }
  return null
}

export function saveAchievements(achievements) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
    return true
  } catch (error) {
    console.error('Failed to save achievements:', error)
    return false
  }
}

export function loadAchievements() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to load achievements:', error)
  }
  return []
}

export function exportData() {
  const data = {
    records: loadSleepRecords(),
    goals: loadSleepGoals(),
    achievements: loadAchievements(),
    exportedAt: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sleep-data-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
    
    if (data.records) {
      saveSleepRecords(data.records)
    }
    if (data.goals) {
      saveSleepGoals(data.goals)
    }
    if (data.achievements) {
      saveAchievements(data.achievements)
    }
    
    return true
  } catch (error) {
    console.error('Failed to import data:', error)
    return false
  }
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.SLEEP_RECORDS)
  localStorage.removeItem(STORAGE_KEYS.SLEEP_GOALS)
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS)
}
