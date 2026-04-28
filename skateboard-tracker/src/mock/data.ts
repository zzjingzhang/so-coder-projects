import type { Trick, PracticeRecord } from '@/types'

export const mockTricks: Trick[] = [
  {
    id: '1',
    name: 'Ollie',
    difficulty: 2,
    category: '平地基础',
    description: '最基础的滑板跳跃动作，将滑板带离地面',
    mastered: true,
    masteryLevel: 90,
    createdDate: '2024-01-15',
    updatedDate: '2024-03-20',
    tags: ['基础', '跳跃', '必备']
  },
  {
    id: '2',
    name: 'Kickflip',
    difficulty: 3,
    category: '翻转动作',
    description: '前脚向前刷板使滑板横向翻转360度',
    mastered: true,
    masteryLevel: 75,
    createdDate: '2024-02-01',
    updatedDate: '2024-03-18',
    tags: ['翻转', '进阶']
  },
  {
    id: '3',
    name: 'Heelflip',
    difficulty: 3,
    category: '翻转动作',
    description: '后脚脚跟刷板使滑板反向翻转360度',
    mastered: false,
    masteryLevel: 40,
    createdDate: '2024-02-15',
    updatedDate: '2024-03-15',
    tags: ['翻转', '进阶']
  },
  {
    id: '4',
    name: '50-50 Grind',
    difficulty: 4,
    category: '杆上动作',
    description: '两个桥同时在杆或台上滑行',
    mastered: false,
    masteryLevel: 30,
    createdDate: '2024-03-01',
    updatedDate: '2024-03-25',
    tags: ['杆上', '高级']
  },
  {
    id: '5',
    name: 'Manual',
    difficulty: 2,
    category: '平衡动作',
    description: '只用后轮滑行的平衡动作',
    mastered: true,
    masteryLevel: 85,
    createdDate: '2024-01-20',
    updatedDate: '2024-03-10',
    tags: ['平衡', '基础']
  },
  {
    id: '6',
    name: 'Pop Shove-it',
    difficulty: 3,
    category: '转板动作',
    description: '滑板在空中横向旋转180度',
    mastered: true,
    masteryLevel: 70,
    createdDate: '2024-01-25',
    updatedDate: '2024-03-05',
    tags: ['转板', '进阶']
  },
  {
    id: '7',
    name: 'Frontside 180',
    difficulty: 3,
    category: '转体动作',
    description: '人和滑板一起向前转体180度',
    mastered: false,
    masteryLevel: 50,
    createdDate: '2024-02-10',
    updatedDate: '2024-03-22',
    tags: ['转体', '进阶']
  },
  {
    id: '8',
    name: 'Backside 180',
    difficulty: 3,
    category: '转体动作',
    description: '人和滑板一起向后转体180度',
    mastered: false,
    masteryLevel: 35,
    createdDate: '2024-03-05',
    updatedDate: '2024-03-20',
    tags: ['转体', '进阶']
  }
]

export const mockPracticeRecords: PracticeRecord[] = [
  {
    id: '1',
    date: '2024-03-25',
    duration: 90,
    location: '城市滑板公园',
    tricks: [
      { trickId: '1', trickName: 'Ollie', attempts: 50, successfulAttempts: 45, progressNotes: '稳定度很好，高度有所提升' },
      { trickId: '2', trickName: 'Kickflip', attempts: 30, successfulAttempts: 20, progressNotes: '翻转角度控制更好了' },
      { trickId: '4', trickName: '50-50 Grind', attempts: 15, successfulAttempts: 5, progressNotes: '需要更多练习，平衡还不够' }
    ],
    notes: '今天状态不错，Kickflip 有明显进步。50-50 还需要加强练习，下次尝试更低的台子。',
    overallRating: 4
  },
  {
    id: '2',
    date: '2024-03-23',
    duration: 60,
    location: '社区广场',
    tricks: [
      { trickId: '1', trickName: 'Ollie', attempts: 40, successfulAttempts: 38, progressNotes: '热身很好，动作稳定' },
      { trickId: '3', trickName: 'Heelflip', attempts: 25, successfulAttempts: 10, progressNotes: '后脚动作需要改进，翻板不够' },
      { trickId: '7', trickName: 'Frontside 180', attempts: 20, successfulAttempts: 8, progressNotes: '转体角度不够，需要更大的爆发力' }
    ],
    notes: 'Heelflip 和 Frontside 180 是重点练习的动作。感觉 Heelflip 进步缓慢，需要看一些教学视频。',
    overallRating: 3
  },
  {
    id: '3',
    date: '2024-03-20',
    duration: 120,
    location: '专业滑板场',
    tricks: [
      { trickId: '2', trickName: 'Kickflip', attempts: 40, successfulAttempts: 30, progressNotes: '今天手感特别好，成功率很高' },
      { trickId: '6', trickName: 'Pop Shove-it', attempts: 30, successfulAttempts: 25, progressNotes: '转板很稳，可以尝试接其他动作' },
      { trickId: '5', trickName: 'Manual', attempts: 20, successfulAttempts: 18, progressNotes: '距离增加了，可以尝试 Manual 接 Ollie' }
    ],
    notes: '今天是近期练习最好的一次！Kickflip 成功率达到 75%，感觉快要完全掌握了。',
    overallRating: 5
  },
  {
    id: '4',
    date: '2024-03-18',
    duration: 75,
    location: '学校操场',
    tricks: [
      { trickId: '1', trickName: 'Ollie', attempts: 35, successfulAttempts: 32, progressNotes: '热身用，动作标准' },
      { trickId: '3', trickName: 'Heelflip', attempts: 30, successfulAttempts: 12, progressNotes: '比上次好一点，但还是不稳定' },
      { trickId: '8', trickName: 'Backside 180', attempts: 15, successfulAttempts: 5, progressNotes: '刚开始学，动作很僵硬' }
    ],
    notes: 'Backside 180 刚接触，感觉比 Frontside 难。需要先多练习转体的感觉。',
    overallRating: 3
  },
  {
    id: '5',
    date: '2024-03-15',
    duration: 90,
    location: '城市滑板公园',
    tricks: [
      { trickId: '2', trickName: 'Kickflip', attempts: 35, successfulAttempts: 22, progressNotes: '稳定进步中' },
      { trickId: '4', trickName: '50-50 Grind', attempts: 20, successfulAttempts: 8, progressNotes: '上台子的时机需要调整' },
      { trickId: '7', trickName: 'Frontside 180', attempts: 25, successfulAttempts: 10, progressNotes: '转体时肩膀要先转' }
    ],
    notes: '今天学习了一个小技巧：Frontside 180 转体时，眼睛要先看落点。感觉有帮助！',
    overallRating: 4
  }
]

export const trickCategories = ['平地基础', '翻转动作', '转板动作', '转体动作', '杆上动作', '平衡动作']

export const difficultyLevelNames: Record<number, string> = {
  1: '入门',
  2: '初级',
  3: '中级',
  4: '高级',
  5: '专家'
}

export const difficultyLevelColors: Record<number, string> = {
  1: 'success',
  2: 'primary',
  3: 'warning',
  4: 'danger',
  5: ''
}
