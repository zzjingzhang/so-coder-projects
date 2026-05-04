export const sampleData = [
  { month: '一月', sales: 4000, revenue: 2400, customers: 2400, profit: 1200 },
  { month: '二月', sales: 3000, revenue: 1398, customers: 2210, profit: 800 },
  { month: '三月', sales: 2000, revenue: 9800, customers: 2290, profit: 2400 },
  { month: '四月', sales: 2780, revenue: 3908, customers: 2000, profit: 1800 },
  { month: '五月', sales: 1890, revenue: 4800, customers: 2181, profit: 2100 },
  { month: '六月', sales: 2390, revenue: 3800, customers: 2500, profit: 2800 },
  { month: '七月', sales: 3490, revenue: 4300, customers: 2100, profit: 2600 },
]

export const dataColumns = [
  { value: 'month', label: '月份', type: 'category' },
  { value: 'sales', label: '销售额', type: 'number' },
  { value: 'revenue', label: '收入', type: 'number' },
  { value: 'customers', label: '客户数', type: 'number' },
  { value: 'profit', label: '利润', type: 'number' },
]

export const chartTypes = [
  { value: 'line', label: '折线图' },
  { value: 'bar', label: '柱状图' },
  { value: 'scatter', label: '散点图' },
]
