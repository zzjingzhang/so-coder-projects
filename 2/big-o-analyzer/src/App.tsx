import React, { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import BigOChart from '@/components/BigOChart'
import CalculatorPanel from '@/components/CalculatorPanel'
import { generateChartData } from '@/utils/calculations'

interface ChartConfig {
  dataKey: string
  title: string
  color: string
}

const chartConfigs: ChartConfig[] = [
  { dataKey: 'O(1)', title: 'O(1) - Constant Time', color: '#10B981' },
  { dataKey: 'O(log n)', title: 'O(log n) - Logarithmic', color: '#3B82F6' },
  { dataKey: 'O(n)', title: 'O(n) - Linear', color: '#F59E0B' },
  { dataKey: 'O(n²)', title: 'O(n²) - Quadratic', color: '#EF4444' },
  { dataKey: 'O(2ⁿ)', title: 'O(2ⁿ) - Exponential', color: '#8B5CF6' },
  { dataKey: 'O(n!)', title: 'O(n!) - Factorial', color: '#EC4899' },
]

const HomePage: React.FC = () => {
  const chartData = useMemo(() => generateChartData(15), [])

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Big-O Notation Analyzer
          </h1>
          <p className="text-gray-400 text-center mt-2">
            Visualize and compare algorithm time complexity
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-6">Complexity Visualization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chartConfigs.map((config) => (
                <BigOChart
                  key={config.dataKey}
                  data={chartData}
                  dataKey={config.dataKey}
                  title={config.title}
                  color={config.color}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <CalculatorPanel />
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Understanding Big-O notation helps you write efficient code.</p>
          <p className="mt-1">
            From best to worst: O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2ⁿ) → O(n!)
          </p>
        </footer>
      </main>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
