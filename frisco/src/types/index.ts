export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: Author
  publishDate: string
  tags: string[]
  category: string
  readTime: string
}

export interface Author {
  name: string
  avatar: string
  role: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export interface ProcessStep {
  id: number
  step: number
  title: string
  description: string
  icon: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
  bio: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface Stat {
  id: number
  value: string
  label: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  social: {
    name: string
    url: string
    icon: string
  }[]
}

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}
