import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { FinancialData } from '@/types'

interface DataContextType {
  data: FinancialData[]
  addData: (item: Omit<FinancialData, 'id' | 'profit'>) => void
  addBatchData: (items: Omit<FinancialData, 'id' | 'profit'>[]) => void
  updateData: (id: string, item: Partial<FinancialData>) => void
  deleteData: (id: string) => void
  clearData: () => void
  loadSampleData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const generateId = () => Math.random().toString(36).substring(2, 9)

const createFinancialItem = (item: Omit<FinancialData, 'id' | 'profit'>): FinancialData => ({
  id: generateId(),
  date: item.date,
  revenue: item.revenue,
  cost: item.cost,
  profit: item.revenue - item.cost,
})

const sampleData: Omit<FinancialData, 'id' | 'profit'>[] = [
  { date: '2024-01-31', revenue: 125000, cost: 85000 },
  { date: '2024-02-29', revenue: 132000, cost: 92000 },
  { date: '2024-03-31', revenue: 148000, cost: 98000 },
  { date: '2024-04-30', revenue: 155000, cost: 102000 },
  { date: '2024-05-31', revenue: 162000, cost: 105000 },
  { date: '2024-06-30', revenue: 178000, cost: 112000 },
  { date: '2024-07-31', revenue: 195000, cost: 125000 },
  { date: '2024-08-31', revenue: 189000, cost: 118000 },
  { date: '2024-09-30', revenue: 205000, cost: 132000 },
  { date: '2024-10-31', revenue: 218000, cost: 145000 },
  { date: '2024-11-30', revenue: 225000, cost: 148000 },
  { date: '2024-12-31', revenue: 245000, cost: 155000 },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FinancialData[]>([])

  const addData = useCallback((item: Omit<FinancialData, 'id' | 'profit'>) => {
    const newItem = createFinancialItem(item)
    setData((prev) => [...prev, newItem].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
  }, [])

  const addBatchData = useCallback((items: Omit<FinancialData, 'id' | 'profit'>[]) => {
    const newItems = items.map(createFinancialItem)
    setData((prev) =>
      [...prev, ...newItems].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    )
  }, [])

  const updateData = useCallback((id: string, updates: Partial<FinancialData>) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const updated = { ...item, ...updates }
        updated.profit = updated.revenue - updated.cost
        return updated
      })
    )
  }, [])

  const deleteData = useCallback((id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearData = useCallback(() => {
    setData([])
  }, [])

  const loadSampleData = useCallback(() => {
    setData(sampleData.map(createFinancialItem))
  }, [])

  return (
    <DataContext.Provider
      value={{
        data,
        addData,
        addBatchData,
        updateData,
        deleteData,
        clearData,
        loadSampleData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
