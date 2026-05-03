import type { YearData } from '../types'

const countries = [
  { id: 'cn', name: '中国', basePopulation: 554, growthRate: 1.015, color: '#ef4444' },
  { id: 'in', name: '印度', basePopulation: 376, growthRate: 1.02, color: '#f97316' },
  { id: 'us', name: '美国', basePopulation: 158, growthRate: 1.01, color: '#3b82f6' },
  { id: 'id', name: '印度尼西亚', basePopulation: 77, growthRate: 1.018, color: '#10b981' },
  { id: 'pk', name: '巴基斯坦', basePopulation: 37, growthRate: 1.025, color: '#8b5cf6' },
  { id: 'br', name: '巴西', basePopulation: 54, growthRate: 1.016, color: '#06b6d4' },
  { id: 'ng', name: '尼日利亚', basePopulation: 38, growthRate: 1.028, color: '#84cc16' },
  { id: 'bd', name: '孟加拉国', basePopulation: 38, growthRate: 1.022, color: '#ec4899' },
  { id: 'ru', name: '俄罗斯', basePopulation: 103, growthRate: 1.003, color: '#6366f1' },
  { id: 'jp', name: '日本', basePopulation: 84, growthRate: 1.005, color: '#f43f5e' },
  { id: 'mx', name: '墨西哥', basePopulation: 28, growthRate: 1.02, color: '#14b8a6' },
  { id: 'et', name: '埃塞俄比亚', basePopulation: 22, growthRate: 1.03, color: '#a855f7' },
  { id: 'ph', name: '菲律宾', basePopulation: 19, growthRate: 1.022, color: '#f59e0b' },
  { id: 'eg', name: '埃及', basePopulation: 22, growthRate: 1.02, color: '#0ea5e9' },
  { id: 'vn', name: '越南', basePopulation: 25, growthRate: 1.015, color: '#22c55e' },
]

const startYear = 1950
const endYear = 2050

export const generatePopulationData = (): YearData[] => {
  const data: YearData[] = []
  
  for (let year = startYear; year <= endYear; year++) {
    const yearData: YearData = {
      year,
      countries: []
    }
    
    const yearOffset = year - startYear
    
    for (const country of countries) {
      let population = country.basePopulation
      for (let i = 0; i < yearOffset; i++) {
        population *= country.growthRate
      }
      
      yearData.countries.push({
        id: country.id,
        name: country.name,
        population: Math.round(population),
        color: country.color,
        rank: 0
      })
    }
    
    yearData.countries.sort((a, b) => b.population - a.population)
    yearData.countries.forEach((country, index) => {
      country.rank = index + 1
    })
    
    data.push(yearData)
  }
  
  return data
}

export const populationData = generatePopulationData()

export const formatPopulation = (population: number): string => {
  if (population >= 1000) {
    return `${(population / 1000).toFixed(2)} 十亿`
  }
  return `${population} 百万`
}

export const getYearRange = () => ({
  startYear,
  endYear
})
