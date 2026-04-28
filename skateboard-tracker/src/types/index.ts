export type DifficultyLevel = 1 | 2 | 3 | 4 | 5

export interface Trick {
  id: string
  name: string
  difficulty: DifficultyLevel
  category: string
  description: string
  mastered: boolean
  masteryLevel: number
  createdDate: string
  updatedDate: string
  tags: string[]
}

export interface PracticeRecord {
  id: string
  date: string
  duration: number
  location: string
  tricks: PracticeTrick[]
  notes: string
  overallRating: number
}

export interface PracticeTrick {
  trickId: string
  trickName: string
  attempts: number
  successfulAttempts: number
  progressNotes: string
}

export interface DashboardStats {
  totalTricks: number
  masteredTricks: number
  totalPracticeSessions: number
  totalPracticeMinutes: number
  recentSessions: PracticeRecord[]
  trendingTricks: { trickId: string; trickName: string; practiceCount: number }[]
}
