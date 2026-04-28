import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createSleepRecord, createSleepGoal, calculateSleepDuration, formatDuration, getQualityLevel, AchievementType } from '../data/models'
import { loadSleepRecords, saveSleepRecords, loadSleepGoals, saveSleepGoals, loadAchievements, saveAchievements } from '../data/storage'

export const useSleepStore = defineStore('sleep', () => {
  const records = ref([])
  const goals = ref(null)
  const achievements = ref([])
  const selectedDate = ref(null)
  const selectedRecord = ref(null)

  const latestRecord = computed(() => {
    if (records.value.length === 0) return null
    return records.value
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  })

  const weeklyAverage = computed(() => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weekRecords = records.value.filter(r => {
      const recordDate = new Date(r.date)
      return recordDate >= weekAgo && recordDate <= now
    })
    
    if (weekRecords.length === 0) return { duration: 0, score: 0 }
    
    const totalDuration = weekRecords.reduce((sum, r) => 
      sum + calculateSleepDuration(r.bedTime, r.wakeTime), 0)
    const totalScore = weekRecords.reduce((sum, r) => sum + r.qualityScore, 0)
    
    return {
      duration: Math.round(totalDuration / weekRecords.length),
      score: Math.round(totalScore / weekRecords.length),
      count: weekRecords.length
    }
  })

  const currentStreak = computed(() => {
    if (records.value.length === 0) return 0
    
    const sortedRecords = records.value
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    
    let streak = 0
    let currentDate = new Date()
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    
    for (const record of sortedRecords) {
      const recordDate = new Date(record.date)
      const recordDay = new Date(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate())
      
      const dayDiff = Math.round((currentDate - recordDay) / (1000 * 60 * 60 * 24))
      
      if (dayDiff === streak) {
        streak++
      } else if (dayDiff > streak + 1) {
        break
      }
    }
    
    return streak
  })

  const goodSleepStreak = computed(() => {
    if (records.value.length === 0) return 0
    
    const sortedRecords = records.value
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    let maxStreak = 0
    let currentStreak = 0
    
    for (const record of sortedRecords) {
      if (record.qualityScore >= 70) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }
    
    return maxStreak
  })

  const hasAchievement = (achievementType) => {
    return achievements.value.some(a => a.type === achievementType)
  }

  function checkAchievements() {
    const newAchievements = []
    
    if (records.value.length >= 7 && !hasAchievement(AchievementType.FIRST_WEEK)) {
      newAchievements.push({
        type: AchievementType.FIRST_WEEK,
        name: '第一周',
        description: '连续记录睡眠一周',
        icon: 'pi pi-calendar',
        unlockedAt: new Date().toISOString()
      })
    }
    
    if (goodSleepStreak.value >= 7 && !hasAchievement(AchievementType.GOOD_SLEEP_STREAK_7)) {
      newAchievements.push({
        type: AchievementType.GOOD_SLEEP_STREAK_7,
        name: '周优质睡眠',
        description: '连续7天获得良好睡眠质量',
        icon: 'pi pi-star',
        unlockedAt: new Date().toISOString()
      })
    }
    
    if (goodSleepStreak.value >= 30 && !hasAchievement(AchievementType.GOOD_SLEEP_STREAK_30)) {
      newAchievements.push({
        type: AchievementType.GOOD_SLEEP_STREAK_30,
        name: '月优质睡眠',
        description: '连续30天获得良好睡眠质量',
        icon: 'pi pi-trophy',
        unlockedAt: new Date().toISOString()
      })
    }
    
    const perfectRecords = records.value.filter(r => r.qualityScore >= 95)
    if (perfectRecords.length >= 1 && !hasAchievement(AchievementType.PERFECT_SLEEP)) {
      newAchievements.push({
        type: AchievementType.PERFECT_SLEEP,
        name: '完美睡眠',
        description: '获得一次95分以上的完美睡眠',
        icon: 'pi pi-crown',
        unlockedAt: new Date().toISOString()
      })
    }
    
    const earlyBirdRecords = records.value.filter(r => {
      const wakeHour = parseInt(r.wakeTime.split(':')[0])
      return wakeHour >= 5 && wakeHour <= 7
    })
    if (earlyBirdRecords.length >= 7 && !hasAchievement(AchievementType.EARLY_BIRD_7)) {
      newAchievements.push({
        type: AchievementType.EARLY_BIRD_7,
        name: '早起达人',
        description: '7天在5-7点之间起床',
        icon: 'pi pi-sun',
        unlockedAt: new Date().toISOString()
      })
    }
    
    const envRecords = records.value.filter(r => 
      r.environmentFactors && Object.keys(r.environmentFactors).length >= 5
    )
    if (envRecords.length >= 10 && !hasAchievement(AchievementType.ENVIRONMENT_EXPERT)) {
      newAchievements.push({
        type: AchievementType.ENVIRONMENT_EXPERT,
        name: '环境专家',
        description: '记录10次完整的睡眠环境数据',
        icon: 'pi pi-sliders-h',
        unlockedAt: new Date().toISOString()
      })
    }
    
    if (newAchievements.length > 0) {
      achievements.value = [...achievements.value, ...newAchievements]
      saveAchievements(achievements.value)
    }
    
    return newAchievements
  }

  function addRecord(recordData) {
    const record = createSleepRecord(recordData)
    records.value = [...records.value, record]
    saveSleepRecords(records.value)
    checkAchievements()
    return record
  }

  function updateRecord(id, updates) {
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value[index] = {
        ...records.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveSleepRecords(records.value)
      return records.value[index]
    }
    return null
  }

  function deleteRecord(id) {
    records.value = records.value.filter(r => r.id !== id)
    saveSleepRecords(records.value)
  }

  function getRecordByDate(dateString) {
    return records.value.find(r => {
      const recordDate = new Date(r.date).toDateString()
      const targetDate = new Date(dateString).toDateString()
      return recordDate === targetDate
    })
  }

  function setGoals(goalsData) {
    goals.value = createSleepGoal(goalsData)
    saveSleepGoals(goals.value)
    return goals.value
  }

  function initialize() {
    records.value = loadSleepRecords()
    goals.value = loadSleepGoals() || createSleepGoal()
    achievements.value = loadAchievements()
  }

  function getRecommendations() {
    const recommendations = []
    
    if (weeklyAverage.value.duration < 420) {
      recommendations.push({
        type: 'duration',
        title: '睡眠时间不足',
        description: '建议您每晚至少睡眠7小时。尝试提前30分钟上床睡觉。',
        icon: 'pi pi-clock',
        severity: 'warning'
      })
    }
    
    if (weeklyAverage.value.score < 60) {
      recommendations.push({
        type: 'quality',
        title: '睡眠质量需要提升',
        description: '您的睡眠质量评分较低。建议记录睡眠环境因素，如噪音、光线、温度等，以便找到改善方向。',
        icon: 'pi pi-chart-line',
        severity: 'warning'
      })
    }
    
    if (records.value.length > 7) {
      const recentRecords = records.value
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7)
      
      const bedTimes = recentRecords.map(r => {
        const [h, m] = r.bedTime.split(':').map(Number)
        return h * 60 + m
      })
      
      const variance = Math.max(...bedTimes) - Math.min(...bedTimes)
      if (variance > 120) {
        recommendations.push({
          type: 'consistency',
          title: '睡眠时间不规律',
          description: '您的上床时间差异较大。保持固定的睡眠时间有助于改善睡眠质量。',
          icon: 'pi pi-exclamation-circle',
          severity: 'info'
        })
      }
    }
    
    if (goals.value) {
      recommendations.push({
        type: 'goal',
        title: '目标追踪',
        description: `您的目标是每晚睡眠 ${goals.value.targetSleepHours} 小时。当前周平均 ${formatDuration(weeklyAverage.value.duration)}。`,
        icon: 'pi pi-flag',
        severity: 'info'
      })
    }
    
    recommendations.push({
      type: 'general',
      title: '通用建议',
      description: '1. 睡前1小时避免使用电子设备\n2. 保持卧室温度在18-22°C\n3. 建立规律的睡前仪式\n4. 避免下午3点后摄入咖啡因',
      icon: 'pi pi-lightbulb',
      severity: 'success'
    })
    
    return recommendations
  }

  return {
    records,
    goals,
    achievements,
    selectedDate,
    selectedRecord,
    latestRecord,
    weeklyAverage,
    currentStreak,
    goodSleepStreak,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordByDate,
    setGoals,
    initialize,
    hasAchievement,
    checkAchievements,
    getRecommendations
  }
})
