import React, { useState, useMemo } from 'react'
import { calculateBigOValues, formatLargeNumber, recursiveFactorial } from '@/utils/calculations'

interface BigOItem {
  label: string
  key: keyof ReturnType<typeof calculateBigOValues>
  color: string
  description: string
}

const bigOItems: BigOItem[] = [
  { label: 'O(1)', key: 'constant', color: '#10B981', description: 'Constant - Best case' },
  { label: 'O(log n)', key: 'logN', color: '#3B82F6', description: 'Logarithmic' },
  { label: 'O(n)', key: 'linear', color: '#F59E0B', description: 'Linear' },
  { label: 'O(n²)', key: 'quadratic', color: '#EF4444', description: 'Quadratic' },
  { label: 'O(2ⁿ)', key: 'exponential', color: '#8B5CF6', description: 'Exponential' },
  { label: 'O(n!)', key: 'factorial', color: '#EC4899', description: 'Factorial - Worst case' },
]

const CalculatorPanel: React.FC = () => {
  const [n, setN] = useState<number>(10)
  const [inputValue, setInputValue] = useState<string>('10')

  const handleInputChange = (value: string) => {
    setInputValue(value)
    const num = parseInt(value, 10)
    if (!isNaN(num) && num >= 0) {
      setN(num)
    }
  }

  const increment = () => {
    const newN = Math.min(n + 1, 100)
    setN(newN)
    setInputValue(newN.toString())
  }

  const decrement = () => {
    const newN = Math.max(n - 1, 0)
    setN(newN)
    setInputValue(newN.toString())
  }

  const values = useMemo(() => calculateBigOValues(n), [n])

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Big-O Calculator</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter value of n:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="100"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter an integer"
          />
          <div className="flex gap-1">
            <button
              onClick={decrement}
              className="h-full px-3 py-3 flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-gray-200 rounded-lg transition-colors"
              aria-label="Decrease value"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={increment}
              className="h-full px-3 py-3 flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-gray-200 rounded-lg transition-colors"
              aria-label="Increase value"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Current n: <span className="font-bold text-blue-400">{n}</span>
        </p>
      </div>

      <div className="space-y-3">
        {bigOItems.map((item) => (
          <div 
            key={item.key} 
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-white text-lg">{item.label}</span>
              </div>
              <span 
                className="font-mono text-xl font-bold" 
                style={{ color: item.color }}
              >
                {formatLargeNumber(values[item.key])}
              </span>
            </div>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Recursive Factorial Function:</h3>
        <div className="bg-gray-800 rounded p-3">
          <code className="text-green-400 text-sm">
            factorial(n) = n {'>'} 0 ? n × factorial(n-1) : 1
          </code>
          <p className="mt-2 text-sm text-gray-400">
            factorial({n}) = <span className="text-green-400 font-mono">{formatLargeNumber(recursiveFactorial(n))}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-300 mb-2">Complexity Comparison:</h3>
        <p className="text-xs text-blue-200">
          O(1) {'<'} O(log n) {'<'} O(n) {'<'} O(n²) {'<'} O(2ⁿ) {'<'} O(n!)
        </p>
        <p className="text-xs text-blue-300 mt-2">
          Note: For n {'>'} 15, factorial and exponential values become extremely large.
        </p>
      </div>
    </div>
  )
}

export default CalculatorPanel
