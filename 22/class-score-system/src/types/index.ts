export interface Team {
  id: number
  name: string
  score: number
  color: string
  emoji: string
}

export interface Student {
  id: number
  name: string
  teamId: number
  score: number
}

export interface AppData {
  teams: Team[]
  students: Student[]
  defaultPoints: number
}

export const DEFAULT_TEAMS: Team[] = [
  { id: 1, name: '第一组', score: 0, color: 'pink', emoji: '🐰' },
  { id: 2, name: '第二组', score: 0, color: 'blue', emoji: '🐻' },
  { id: 3, name: '第三组', score: 0, color: 'green', emoji: '🐸' },
  { id: 4, name: '第四组', score: 0, color: 'orange', emoji: '🦊' },
]

export const generateDefaultStudents = (): Student[] => {
  const students: Student[] = []
  for (let i = 1; i <= 38; i++) {
    const teamId = ((i - 1) % 4) + 1
    students.push({
      id: i,
      name: `学生${i}`,
      teamId,
      score: 0,
    })
  }
  return students
}
