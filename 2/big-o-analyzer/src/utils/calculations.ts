export const recursiveFactorial = (n: number): number => {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  return n * recursiveFactorial(n - 1)
}

export const calculateBigOValues = (n: number) => {
  const factorial = recursiveFactorial(n)
  return {
    constant: 1,
    logN: n > 0 ? Math.log2(n) : NaN,
    linear: n,
    quadratic: n * n,
    exponential: Math.pow(2, n),
    factorial: factorial,
  }
}

export const generateChartData = (maxN: number = 20) => {
  const data = []
  for (let n = 1; n <= maxN; n++) {
    const values = calculateBigOValues(n)
    data.push({
      n,
      'O(1)': values.constant,
      'O(log n)': values.logN,
      'O(n)': values.linear,
      'O(n²)': values.quadratic,
      'O(2ⁿ)': values.exponential,
      'O(n!)': values.factorial,
    })
  }
  return data
}

export const formatLargeNumber = (num: number): string => {
  if (isNaN(num)) return 'Invalid'
  if (!isFinite(num)) return 'Infinity'
  if (num === 0) return '0'
  if (num > 1e15) return num.toExponential(2)
  if (num > 1e6) return num.toExponential(2)
  if (Number.isInteger(num)) return num.toLocaleString()
  return num.toFixed(4)
}
