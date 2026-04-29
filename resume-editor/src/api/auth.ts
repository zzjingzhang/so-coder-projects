import { apiClient } from './client'
import type { User } from '@/types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
}

export interface AuthResponse {
  token: string
  user: User
}

export class AuthService {
  private readonly STORAGE_KEY = 'base44_user'

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
      
      apiClient.setToken(response.token)
      this.setUser(response.user)
      
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data)
      
      apiClient.setToken(response.token)
      this.setUser(response.user)
      
      return response
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      apiClient.clearToken()
      this.clearUser()
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const user = this.getUser()
    if (!user) {
      return null
    }

    try {
      const response = await apiClient.get<User>('/auth/me')
      return response
    } catch (error) {
      console.error('Failed to get current user:', error)
      return user
    }
  }

  isAuthenticated(): boolean {
    return apiClient.isAuthenticated()
  }

  private setUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
  }

  private getUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY)
    if (!data) {
      return null
    }
    try {
      return JSON.parse(data)
    } catch {
      return null
    }
  }

  private clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}

export const authService = new AuthService()
