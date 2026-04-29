import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiConfig {
  baseURL: string
  apiKey: string
  timeout?: number
}

export class ApiClient {
  private instance: AxiosInstance
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken()
          window.dispatchEvent(new CustomEvent('auth:logout'))
        }
        return Promise.reject(error)
      }
    )
  }

  public getToken(): string | null {
    return localStorage.getItem('base44_token')
  }

  public setToken(token: string): void {
    localStorage.setItem('base44_token', token)
  }

  public clearToken(): void {
    localStorage.removeItem('base44_token')
  }

  public isAuthenticated(): boolean {
    return !!this.getToken()
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config)
    return response.data
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }

  public async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.instance.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      }
    })

    return response.data.url
  }
}

const apiKey = import.meta.env.VITE_BASE44_API_KEY || 'demo_key'
const baseURL = import.meta.env.VITE_BASE44_BASE_URL || 'https://api.base44.com'

export const apiClient = new ApiClient({
  baseURL,
  apiKey
})
