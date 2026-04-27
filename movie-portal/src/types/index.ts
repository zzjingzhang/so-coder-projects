export interface Actor {
  id: number
  name: string
  avatar: string
  role: string
}

export interface DownloadLink {
  quality: '480p' | '720p' | '1080p'
  size: string
  url: string
}

export interface Movie {
  id: number
  title: string
  originalTitle: string
  poster: string
  backdrop: string
  rating: number
  year: number
  duration: string
  genres: string[]
  description: string
  videoUrl: string
  actors: Actor[]
  downloadLinks: DownloadLink[]
  director: string
  releaseDate: string
  country: string
}

export interface CarouselItem {
  id: number
  movieId: number
  title: string
  subtitle: string
  backdrop: string
  poster: string
}
