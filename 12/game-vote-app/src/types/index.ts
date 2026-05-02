export interface User {
  id: string
  username: string
  password: string
  email: string
  createdAt: Date
}

export interface Game {
  id: string
  name: string
  cover: string
  rating: number
  releaseDate: string
  genres: string[]
  summary: string
  igdbId?: number
}

export interface VoteOption {
  game: Game
  votes: number
}

export interface Poll {
  id: string
  title: string
  description: string
  creatorId: string
  creatorName: string
  createdAt: Date
  maxGames: 5 | 10
  allowedGenres: string[] | null
  options: VoteOption[]
  isActive: boolean
}

export interface UserVote {
  id: string
  userId: string
  pollId: string
  gameId: string
  gameName: string
  pollTitle: string
  votedAt: Date
}
