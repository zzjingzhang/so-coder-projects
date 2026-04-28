export const SleepStage = {
  AWAKE: 'awake',
  LIGHT: 'light',
  DEEP: 'deep',
  REM: 'rem'
}

export const EnvironmentFactor = {
  TEMPERATURE: 'temperature',
  HUMIDITY: 'humidity',
  NOISE: 'noise',
  LIGHT: 'light',
  CAFFEINE: 'caffeine',
  EXERCISE: 'exercise',
  STRESS: 'stress'
}

export const AchievementType = {
  FIRST_WEEK: 'first_week',
  GOOD_SLEEP_STREAK_7: 'good_sleep_streak_7',
  GOOD_SLEEP_STREAK_30: 'good_sleep_streak_30',
  EARLY_BIRD_7: 'early_bird_7',
  CONSISTENT_30: 'consistent_30',
  PERFECT_SLEEP: 'perfect_sleep',
  NIGHT_OWL: 'night_owl',
  LONG_SLEEPER: 'long_sleeper',
  ENVIRONMENT_EXPERT: 'environment_expert'
}

export function createSleepRecord(data = {}) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  return {
    id: data.id || Date.now().toString(),
    date: data.date || today.toISOString(),
    bedTime: data.bedTime || '23:00',
    wakeTime: data.wakeTime || '07:00',
    sleepStages: data.sleepStages || generateDefaultSleepStages(),
    qualityScore: data.qualityScore || calculateQualityScore(data),
    notes: data.notes || '',
    environmentFactors: data.environmentFactors || {},
    createdAt: data.createdAt || now.toISOString(),
    updatedAt: data.updatedAt || now.toISOString()
  }
}

export function createSleepGoal(data = {}) {
  return {
    targetSleepHours: data.targetSleepHours || 8,
    targetBedTime: data.targetBedTime || '23:00',
    targetWakeTime: data.targetWakeTime || '07:00',
    idealTemperature: data.idealTemperature || 18,
    idealHumidity: data.idealHumidity || 50,
    avoidCaffeineAfter: data.avoidCaffeineAfter || '14:00',
    exerciseBeforeSleep: data.exerciseBeforeSleep !== undefined ? data.exerciseBeforeSleep : false
  }
}

export function generateDefaultSleepStages() {
  const stages = []
  const totalMinutes = 480
  
  let currentMinute = 0
  const stagePattern = [
    { stage: SleepStage.LIGHT, duration: 15 },
    { stage: SleepStage.DEEP, duration: 60 },
    { stage: SleepStage.LIGHT, duration: 10 },
    { stage: SleepStage.REM, duration: 15 },
    { stage: SleepStage.AWAKE, duration: 5 }
  ]
  
  let cycleCount = 0
  while (currentMinute < totalMinutes) {
    const basePattern = stagePattern.map(s => ({
      stage: s.stage,
      startMinute: currentMinute,
      duration: s.duration + (cycleCount * 2)
    }))
    
    for (const s of basePattern) {
      if (currentMinute < totalMinutes) {
        stages.push({
          stage: s.stage,
          startMinute: s.startMinute,
          duration: Math.min(s.duration, totalMinutes - currentMinute)
        })
        currentMinute += s.duration
      }
    }
    cycleCount++
  }
  
  return stages
}

export function calculateQualityScore(record) {
  let score = 50
  
  if (record.bedTime && record.wakeTime) {
    const sleepDuration = calculateSleepDuration(record.bedTime, record.wakeTime)
    const hours = sleepDuration / 60
    
    if (hours >= 7 && hours <= 9) {
      score += 30
    } else if (hours >= 6 && hours < 7) {
      score += 15
    } else if (hours >= 9 && hours < 10) {
      score += 15
    } else if (hours < 5 || hours > 11) {
      score -= 10
    }
  }
  
  if (record.sleepStages && record.sleepStages.length > 0) {
    const deepSleepMinutes = record.sleepStages
      .filter(s => s.stage === SleepStage.DEEP)
      .reduce((sum, s) => sum + s.duration, 0)
    
    const remSleepMinutes = record.sleepStages
      .filter(s => s.stage === SleepStage.REM)
      .reduce((sum, s) => sum + s.duration, 0)
    
    if (deepSleepMinutes >= 90) score += 10
    if (remSleepMinutes >= 90) score += 10
  }
  
  if (record.environmentFactors) {
    const { noise, light, temperature, humidity } = record.environmentFactors
    
    if (noise === 'quiet') score += 5
    if (light === 'dark') score += 5
    if (temperature && temperature >= 16 && temperature <= 20) score += 5
    if (humidity && humidity >= 40 && humidity <= 60) score += 5
  }
  
  return Math.max(0, Math.min(100, score))
}

export function calculateSleepDuration(bedTime, wakeTime) {
  if (!bedTime || !wakeTime) return 0
  
  const [bedHour, bedMin] = bedTime.split(':').map(Number)
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number)
  
  let bedMinutes = bedHour * 60 + bedMin
  let wakeMinutes = wakeHour * 60 + wakeMin
  
  if (wakeMinutes <= bedMinutes) {
    wakeMinutes += 24 * 60
  }
  
  return wakeMinutes - bedMinutes
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function getQualityLevel(score) {
  if (score >= 85) return { level: 'excellent', label: '优秀', color: 'text-green-600', bg: 'bg-green-100' }
  if (score >= 70) return { level: 'good', label: '良好', color: 'text-blue-600', bg: 'bg-blue-100' }
  if (score >= 50) return { level: 'fair', label: '一般', color: 'text-yellow-600', bg: 'bg-yellow-100' }
  return { level: 'poor', label: '较差', color: 'text-red-600', bg: 'bg-red-100' }
}
