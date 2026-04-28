export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  github: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  category: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface Theme {
  isDark: boolean
}