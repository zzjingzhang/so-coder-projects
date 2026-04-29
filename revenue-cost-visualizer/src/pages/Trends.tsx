import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useData } from '@/context/DataContext'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react'

const COLORS = {
  revenue: '#22c55e',
  cost: '#ef4444',
  profit: '#3b82f6',
  growth: '#8b5cf6',
}

export function TrendsPage() {
  const { data } = useData()

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">暂无数据</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          请先在数据输入页面添加或导入财务数据，然后再查看趋势分析。
        </p>
        <Button asChild>
          <Link to="/input">
            <Plus className="mr-2 h-4 w-4" />
            添加数据
          </Link>
        </Button>
      </div>
    )
  }

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const totalRevenue = sortedData.reduce((sum, item) => sum + item.revenue, 0)
  const totalCost = sortedData.reduce((sum, item) => sum + item.cost, 0)
  const totalProfit = totalRevenue - totalCost
  const avgProfitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  const growthData = sortedData.map((item, index) => {
    if (index === 0) {
      return {
        date: item.date,
        收入增长: 0,
        成本增长: 0,
        利润增长: 0,
      }
    }
    const prev = sortedData[index - 1]
    return {
      date: item.date,
      收入增长: prev.revenue > 0 ? ((item.revenue - prev.revenue) / prev.revenue) * 100 : 0,
      成本增长: prev.cost > 0 ? ((item.cost - prev.cost) / prev.cost) * 100 : 0,
      利润增长: prev.profit !== 0 ? ((item.profit - prev.profit) / Math.abs(prev.profit)) * 100 : 0,
    }
  })

  const rollingAverage = sortedData.map((item, index) => {
    const windowSize = Math.min(3, index + 1)
    const windowData = sortedData.slice(index - windowSize + 1, index + 1)
    return {
      date: item.date,
      收入: item.revenue,
      成本: item.cost,
      收入移动平均: windowData.reduce((sum, d) => sum + d.revenue, 0) / windowData.length,
      成本移动平均: windowData.reduce((sum, d) => sum + d.cost, 0) / windowData.length,
    }
  })

  const latestData = sortedData[sortedData.length - 1]
  const previousData = sortedData[sortedData.length - 2]

  const getGrowthIndicator = (current: number, previous: number) => {
    const change = previous > 0 ? ((current - previous) / previous) * 100 : 0
    if (change > 5) return { icon: ArrowUp, color: 'text-chart-revenue', label: '增长' }
    if (change < -5) return { icon: ArrowDown, color: 'text-chart-cost', label: '下降' }
    return { icon: Minus, color: 'text-muted-foreground', label: '平稳' }
  }

  const revenueIndicator = previousData
    ? getGrowthIndicator(latestData.revenue, previousData.revenue)
    : null
  const costIndicator = previousData
    ? getGrowthIndicator(latestData.cost, previousData.cost)
    : null
  const profitIndicator = previousData
    ? getGrowthIndicator(latestData.profit, previousData.profit)
    : null

  const formatCurrency = (value: number) => `¥${value.toLocaleString()}`
  const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border shadow-lg rounded-lg p-3">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('增长') ? formatPercent(entry.value) : formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">趋势分析</h1>
        <p className="text-muted-foreground">深入分析收入、成本和利润的变化趋势</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>最新收入</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-chart-revenue">
                {formatCurrency(latestData.revenue)}
              </CardTitle>
              {revenueIndicator && (
                <revenueIndicator.icon className={`h-5 w-5 ${revenueIndicator.color}`} />
              )}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>最新成本</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-chart-cost">
                {formatCurrency(latestData.cost)}
              </CardTitle>
              {costIndicator && (
                <costIndicator.icon className={`h-5 w-5 ${costIndicator.color}`} />
              )}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>最新利润</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle
                className={`text-2xl ${latestData.profit >= 0 ? 'text-chart-profit' : 'text-destructive'}`}
              >
                {formatCurrency(latestData.profit)}
              </CardTitle>
              {profitIndicator && (
                <profitIndicator.icon className={`h-5 w-5 ${profitIndicator.color}`} />
              )}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>平均利润率</CardDescription>
            <CardTitle
              className={`text-2xl ${avgProfitMargin >= 0 ? 'text-chart-profit' : 'text-destructive'}`}
            >
              {avgProfitMargin.toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-chart-profit" />
              利润构成分析
            </CardTitle>
            <CardDescription>各时间段利润分布（收入 - 成本）</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData.map((d) => ({ ...d, 收入: d.revenue, 成本: d.cost, 利润: d.profit }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="收入" stackId="a" fill={COLORS.revenue} />
                <Bar dataKey="成本" stackId="a" fill={COLORS.cost} />
                <Bar dataKey="利润" fill={COLORS.profit} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-growth" />
              增长率分析
            </CardTitle>
            <CardDescription>环比增长率变化趋势</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} tick={{ fontSize: 12 }} />
                <Tooltip
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border shadow-lg rounded-lg p-3">
                          <p className="font-medium mb-2">{label}</p>
                          {payload.map((entry: any, index: number) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {formatPercent(entry.value)}
                            </p>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="收入增长" stroke={COLORS.revenue} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="成本增长" stroke={COLORS.cost} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="利润增长" stroke={COLORS.profit} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-profit" />
            移动平均趋势
          </CardTitle>
          <CardDescription>3期移动平均线平滑趋势（更清晰的长期趋势）</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rollingAverage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="收入移动平均" stroke={COLORS.revenue} fill={COLORS.revenue} fillOpacity={0.1} />
              <Area type="monotone" dataKey="成本移动平均" stroke={COLORS.cost} fill={COLORS.cost} fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>累计趋势</CardTitle>
          <CardDescription>累计收入、成本和利润变化</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={(() => {
                let cumRevenue = 0
                let cumCost = 0
                let cumProfit = 0
                return sortedData.map((item) => {
                  cumRevenue += item.revenue
                  cumCost += item.cost
                  cumProfit += item.profit
                  return {
                    date: item.date,
                    累计收入: cumRevenue,
                    累计成本: cumCost,
                    累计利润: cumProfit,
                  }
                })
              })()}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="累计收入" stroke={COLORS.revenue} fill={COLORS.revenue} fillOpacity={0.1} />
              <Area type="monotone" dataKey="累计成本" stroke={COLORS.cost} fill={COLORS.cost} fillOpacity={0.1} />
              <Area type="monotone" dataKey="累计利润" stroke={COLORS.profit} fill={COLORS.profit} fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
