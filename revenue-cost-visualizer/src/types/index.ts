export interface FinancialData {
  id: string
  date: string
  revenue: number
  cost: number
  profit: number
}

export interface ChartType {
  value: 'line' | 'bar' | 'both'
  label: string
}

export interface DataInputForm {
  date: string
  revenue: number
  cost: number
}

export type PeriodType = 'day' | 'week' | 'month' | 'quarter' | 'year'
