import { reactive } from 'vue'
import type { User, Poll, UserVote } from '@/types'

const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'admin',
    password: '123456',
    email: 'admin@example.com',
    createdAt: new Date('2026-01-01')
  },
  {
    id: 'user2',
    username: 'game_lover',
    password: '123456',
    email: 'gamer@example.com',
    createdAt: new Date('2026-02-15')
  }
]

const mockPolls: Poll[] = [
  {
    id: 'poll1',
    title: '2026年最受期待的RPG游戏',
    description: '投票选出你最期待的角色扮演游戏！',
    creatorId: 'user1',
    creatorName: 'admin',
    createdAt: new Date('2026-04-20'),
    maxGames: 5,
    allowedGenres: ['角色扮演'],
    options: [
      {
        game: {
          id: 'game1',
          name: '艾尔登法环2',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epic%20fantasy%20RPG%20game%20cover%20dark%20souls%20style&image_size=square',
          rating: 9.5,
          releaseDate: '2026-06-01',
          genres: ['角色扮演', '动作'],
          summary: 'FromSoftware的最新力作，开放世界RPG的巅峰之作。'
        },
        votes: 15
      },
      {
        game: {
          id: 'game2',
          name: '博德之门3：终极版',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20RPG%20game%20cover%20dungeons%20dragons%20style&image_size=square',
          rating: 9.7,
          releaseDate: '2026-03-15',
          genres: ['角色扮演', '回合制'],
          summary: '获奖无数的RPG游戏，包含所有DLC内容。'
        },
        votes: 12
      },
      {
        game: {
          id: 'game3',
          name: '最终幻想16',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=final%20fantasy%20style%20RPG%20game%20cover%20crystal&image_size=square',
          rating: 9.0,
          releaseDate: '2025-06-22',
          genres: ['角色扮演', '动作'],
          summary: '史克威尔艾尼克斯的最新最终幻想作品。'
        },
        votes: 8
      }
    ],
    isActive: true
  },
  {
    id: 'poll2',
    title: '最佳多人竞技游戏',
    description: '你最喜欢的多人对战游戏是什么？',
    creatorId: 'user2',
    creatorName: 'game_lover',
    createdAt: new Date('2026-04-25'),
    maxGames: 10,
    allowedGenres: null,
    options: [
      {
        game: {
          id: 'game4',
          name: '英雄联盟',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moba%20game%20cover%20league%20of%20legends%20style&image_size=square',
          rating: 9.2,
          releaseDate: '2009-10-27',
          genres: ['MOBA', '多人竞技'],
          summary: '全球最受欢迎的MOBA游戏。'
        },
        votes: 20
      },
      {
        game: {
          id: 'game5',
          name: 'DOTA 2',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dota%202%20style%20moba%20game%20cover&image_size=square',
          rating: 9.1,
          releaseDate: '2013-07-09',
          genres: ['MOBA', '多人竞技'],
          summary: 'Valve开发的经典MOBA游戏。'
        },
        votes: 15
      }
    ],
    isActive: true
  }
]

const mockUserVotes: UserVote[] = [
  {
    id: 'vote1',
    userId: 'user2',
    pollId: 'poll1',
    gameId: 'game1',
    gameName: '艾尔登法环2',
    pollTitle: '2026年最受期待的RPG游戏',
    votedAt: new Date('2026-04-22')
  }
]

interface StoreState {
  users: User[]
  polls: Poll[]
  userVotes: UserVote[]
}

const state = reactive<StoreState>({
  users: [...mockUsers],
  polls: [...mockPolls],
  userVotes: [...mockUserVotes]
})

export function useGameStore() {
  const loadData = () => {
    const storedPolls = localStorage.getItem('polls')
    const storedVotes = localStorage.getItem('userVotes')
    const storedUsers = localStorage.getItem('users')
    
    if (storedPolls) state.polls = JSON.parse(storedPolls)
    if (storedVotes) state.userVotes = JSON.parse(storedVotes)
    if (storedUsers) state.users = JSON.parse(storedUsers)
  }

  const saveData = () => {
    localStorage.setItem('polls', JSON.stringify(state.polls))
    localStorage.setItem('userVotes', JSON.stringify(state.userVotes))
    localStorage.setItem('users', JSON.stringify(state.users))
  }

  const registerUser = (username: string, password: string, email: string): User => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      username,
      password,
      email,
      createdAt: new Date()
    }
    state.users.push(newUser)
    saveData()
    return newUser
  }

  const findUser = (username: string, password: string): User | null => {
    return state.users.find(u => u.username === username && u.password === password) || null
  }

  const usernameExists = (username: string): boolean => {
    return state.users.some(u => u.username === username)
  }

  const getPolls = (): Poll[] => {
    return [...state.polls].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const getPollById = (id: string): Poll | undefined => {
    return state.polls.find(p => p.id === id)
  }

  const createPoll = (
    title: string,
    description: string,
    creatorId: string,
    creatorName: string,
    maxGames: 5 | 10,
    allowedGenres: string[] | null
  ): Poll => {
    const newPoll: Poll = {
      id: `poll_${Date.now()}`,
      title,
      description,
      creatorId,
      creatorName,
      createdAt: new Date(),
      maxGames,
      allowedGenres,
      options: [],
      isActive: true
    }
    state.polls.push(newPoll)
    saveData()
    return newPoll
  }

  const addGameToPoll = (pollId: string, game: any) => {
    const poll = state.polls.find(p => p.id === pollId)
    if (!poll) return false

    const exists = poll.options.some(opt => opt.game.id === game.id)
    if (exists) return false

    poll.options.push({
      game: game,
      votes: 0
    })
    saveData()
    return true
  }

  const voteForGame = (pollId: string, gameId: string, userId: string, gameName: string, pollTitle: string): boolean => {
    const poll = state.polls.find(p => p.id === pollId)
    if (!poll) return false

    const alreadyVoted = state.userVotes.some(
      v => v.pollId === pollId && v.userId === userId
    )
    if (alreadyVoted) return false

    const option = poll.options.find(o => o.game.id === gameId)
    if (!option) return false

    option.votes++

    const userVote: UserVote = {
      id: `vote_${Date.now()}`,
      userId,
      pollId,
      gameId,
      gameName,
      pollTitle,
      votedAt: new Date()
    }
    state.userVotes.push(userVote)
    saveData()
    return true
  }

  const hasUserVoted = (pollId: string, userId: string): boolean => {
    return state.userVotes.some(
      v => v.pollId === pollId && v.userId === userId
    )
  }

  const getUserVotes = (userId: string): UserVote[] => {
    return state.userVotes
      .filter(v => v.userId === userId)
      .sort((a, b) => new Date(b.votedAt).getTime() - new Date(a.votedAt).getTime())
  }

  const getPollResults = (pollId: string, limit: number): any[] => {
    const poll = state.polls.find(p => p.id === pollId)
    if (!poll) return []

    return [...poll.options]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, limit)
      .map((opt, index) => ({
        rank: index + 1,
        game: opt.game,
        votes: opt.votes
      }))
  }

  return {
    state,
    loadData,
    saveData,
    registerUser,
    findUser,
    usernameExists,
    getPolls,
    getPollById,
    createPoll,
    addGameToPoll,
    voteForGame,
    hasUserVoted,
    getUserVotes,
    getPollResults
  }
}
