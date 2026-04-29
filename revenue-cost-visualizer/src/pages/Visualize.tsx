import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useData } from '@/context/DataContext'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, TrendingUp, PieChart } from 'lucide-react'

const COLORS = {
  revenue: '#22c55e',
  cost: '#ef4444',
  profit: '#3b82f6',
}

export function VisualizePage() {
  const { data } = useData()
  const [chartType, setChartType] = useState<'line' | 'bar' | 'composed'>('line')
  const [showProfit, setShowProfit] = useState(true)

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0)
  const totalProfit = totalRevenue - totalCost
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  const chartData = data.map((item) => ({
    date: item.date,
    收入: item.revenue,
    成本: item.cost,
    利润: item.profit,
  }))

  const formatCurrency = (value: number) => `¥${value.toLocaleString()}`

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border shadow-lg rounded-lg p-3">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">暂无数据</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          请先在数据输入页面添加或导入财务数据，然后再查看可视化效果。
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">数据可视化</h1>
          <p className="text-muted-foreground">通过图表直观展示收入与成本趋势</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={chartType}
            onValueChange={(value: 'line' | 'bar' | 'composed') => setChartType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择图表类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">折线图</SelectItem>
              <SelectItem value="bar">条形图</SelectItem>
              <SelectItem value="composed">组合图</SelectItem>
            </SelectContent>
          </Select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showProfit}
              onChange={(e) => setShowProfit(e.target.checked)}
              className="rounded border-input"
            />
            <span className="text-sm">显示利润线</span>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-revenue" />
              总收入
            </CardDescription>
            <CardTitle className="text-2xl text-chart-revenue">
              {formatCurrency(totalRevenue)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-chart-cost" />
              总成本
            </CardDescription>
            <CardTitle className="text-2xl text-chart-cost">
              {formatCurrency(totalCost)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-chart-profit" />
              总利润
            </CardDescription>
            <CardTitle
              className={`text-2xl ${totalProfit >= 0 ? 'text-chart-profit' : 'text-destructive'}`}
            >
              {formatCurrency(totalProfit)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>利润率</CardDescription>
            <CardTitle
              className={`text-2xl ${profitMargin >= 0 ? 'text-chart-profit' : 'text-destructive'}`}
            >
              {profitMargin.toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="trend" className="w-full">
        <TabsList>
          <TabsTrigger value="trend">趋势图</TabsTrigger>
          <TabsTrigger value="comparison">对比图</TabsTrigger>
        </TabsList>

        <TabsContent value="trend" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>收入成本趋势图</CardTitle>
              <CardDescription>
                展示各时间段的收入、成本和利润变化趋势
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="收入"
                      stroke={COLORS.revenue}
                      strokeWidth={2}
                      dot={{ fill: COLORS.revenue }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="成本"
                      stroke={COLORS.cost}
                      strokeWidth={2}
                      dot={{ fill: COLORS.cost }}
                      activeDot={{ r: 6 }}
                    />
                    {showProfit && (
                      <Line
                        type="monotone"
                        dataKey="利润"
                        stroke={COLORS.profit}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: COLORS.profit }}
                        activeDot={{ r: 6 }}
                      />
                    )}
                  </LineChart>
                ) : chartType === 'bar' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="收入" fill={COLORS.revenue} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="成本" fill={COLORS.cost} radius={[4, 4, 0, 0]} />
                    {showProfit && <Bar dataKey="利润" fill={COLORS.profit} radius={[4, 4, 0, 0]} />}
                  </BarChart>
                ) : (
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="收入" fill={COLORS.revenue} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="成本" fill={COLORS.cost} radius={[4, 4, 0, 0]} />
                    {showProfit && (
                      <Line type="monotone" dataKey="利润" stroke={COLORS.profit} strokeWidth={2} />
                    )}
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>收入与成本对比</CardTitle>
                <CardDescription>各时间段的收入与成本条形图对比</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} />
                    <YAxis dataKey="date" type="category" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="收入" fill={COLORS.revenue} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="成本" fill={COLORS.cost} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>利润变化图</CardTitle>
                <CardDescription>各时间段的利润面积图</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="利润"
                      fill={COLORS.profit}
                      fillOpacity={0.3}
                      stroke={COLORS.profit}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
