import { apiClient } from './client'
import type { OptimizationResult, GeneratedAchievements } from '@/types'

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionRequest {
  model: string
  messages: Message[]
  temperature?: number
  max_tokens?: number
}

export interface ChatCompletionResponse {
  id: string
  choices: Array<{
    message: Message
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class LLMService {
  private model: string

  constructor() {
    this.model = import.meta.env.VITE_BASE44_MODEL || 'gpt-4'
  }

  async chat(messages: Message[], options?: {
    temperature?: number
    max_tokens?: number
  }): Promise<string> {
    const request: ChatCompletionRequest = {
      model: this.model,
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.max_tokens || 2000
    }

    const response = await apiClient.post<ChatCompletionResponse>('/chat/completions', request)
    return response.choices[0].message.content
  }

  async generateAchievements(
    company: string,
    position: string,
    description: string
  ): Promise<GeneratedAchievements> {
    const prompt = `你是一位专业的简历顾问，擅长将工作经历描述转化为量化的成就要点。

请根据以下工作经历信息，生成 3-5 个量化的成就要点。每个要点都应该：
1. 以动词开头（如：主导、优化、实现、提升、负责等）
2. 包含具体的数据和数字（如时间、百分比、金额等）
3. 展示具体的成果和影响
4. 使用 STAR 法则（情境、任务、行动、结果）

公司：${company}
职位：${position}
工作描述：${description}

请直接返回一个 JSON 数组，格式如下：
{
  "achievements": [
    "主导了XX项目，提升了XX效率XX%",
    "优化了XX流程，节省了XX成本XX元",
    "实现了XX功能，增加了XX用户XX人"
  ]
}`

    const messages: Message[] = [
      {
        role: 'system',
        content: '你是一位专业的简历顾问，擅长帮助求职者优化工作经历描述，将普通描述转化为量化、有影响力的成就要点。你总是返回格式正确的 JSON 数据。'
      },
      {
        role: 'user',
        content: prompt
      }
    ]

    try {
      const response = await this.chat(messages, { temperature: 0.8, max_tokens: 1500 })
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as GeneratedAchievements
        return parsed
      }
      
      return {
        achievements: this.parseAchievementsFromText(response)
      }
    } catch (error) {
      console.error('Failed to generate achievements:', error)
      throw error
    }
  }

  async optimizeResume(
    jobDescription: string,
    currentResume: string
  ): Promise<OptimizationResult> {
    const prompt = `你是一位专业的简历优化专家，精通 ATS（申请人追踪系统）和招聘者偏好。

请分析以下职位描述和当前简历内容，提供详细的优化建议。

=== 职位描述 ===
${jobDescription}

=== 当前简历内容 ===
${currentResume}

请提供以下优化建议（以 JSON 格式返回）：

1. missingKeywords: 职位描述中提到但简历中缺失的关键技能和关键词数组
2. recommendedSkills: 根据职位描述推荐添加的技能数组
3. summarySuggestions: 简历摘要/个人简介的改进建议数组
4. optimizationTips: 具体的简历优化技巧和建议数组

请严格按照以下 JSON 格式返回：
{
  "missingKeywords": ["关键词1", "关键词2", ...],
  "recommendedSkills": ["技能1", "技能2", ...],
  "summarySuggestions": ["建议1", "建议2", ...],
  "optimizationTips": ["技巧1", "技巧2", ...]
}`

    const messages: Message[] = [
      {
        role: 'system',
        content: '你是一位专业的简历优化专家，精通 ATS 系统和企业招聘偏好。你善于分析职位描述，发现简历中的差距，并提供具体、可操作的优化建议。你总是返回格式正确的 JSON 数据。'
      },
      {
        role: 'user',
        content: prompt
      }
    ]

    try {
      const response = await this.chat(messages, { temperature: 0.7, max_tokens: 2000 })
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as OptimizationResult
        return parsed
      }
      
      return this.parseOptimizationFromText(response)
    } catch (error) {
      console.error('Failed to optimize resume:', error)
      throw error
    }
  }

  private parseAchievementsFromText(text: string): string[] {
    const lines = text.split('\n').filter(line => line.trim())
    const achievements: string[] = []
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.match(/^[\d\-•*]/) || trimmed.length > 20) {
        const cleaned = trimmed.replace(/^[\d\-•*\s]+/, '')
        if (cleaned.length > 10) {
          achievements.push(cleaned)
        }
      }
    }
    
    return achievements.slice(0, 5)
  }

  private parseOptimizationFromText(text: string): OptimizationResult {
    const result: OptimizationResult = {
      missingKeywords: [],
      recommendedSkills: [],
      summarySuggestions: [],
      optimizationTips: []
    }

    const lines = text.split('\n')
    let currentSection: keyof OptimizationResult | null = null

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed.toLowerCase().includes('缺失的关键词') || trimmed.toLowerCase().includes('missing')) {
        currentSection = 'missingKeywords'
      } else if (trimmed.toLowerCase().includes('推荐技能') || trimmed.toLowerCase().includes('skill')) {
        currentSection = 'recommendedSkills'
      } else if (trimmed.toLowerCase().includes('摘要建议') || trimmed.toLowerCase().includes('summary')) {
        currentSection = 'summarySuggestions'
      } else if (trimmed.toLowerCase().includes('优化技巧') || trimmed.toLowerCase().includes('tip')) {
        currentSection = 'optimizationTips'
      } else if (currentSection && trimmed.match(/^[\d\-•*]/)) {
        const item = trimmed.replace(/^[\d\-•*\s]+/, '')
        if (item.length > 5) {
          result[currentSection].push(item)
        }
      }
    }

    return result
  }
}

export const llmService = new LLMService()
