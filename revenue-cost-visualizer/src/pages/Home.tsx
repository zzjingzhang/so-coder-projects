import { Link } from 'react-router-dom'
import { BarChart3, Plus, TrendingUp, Upload, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useData } from '@/context/DataContext'

const features = [
  {
    icon: Plus,
    title: '数据输入',
    description: '通过表单手动输入收入和成本数据，支持按日期记录每笔交易。',
    link: '/input',
  },
  {
    icon: Upload,
    title: 'CSV 导入',
    description: '批量上传 CSV 文件，快速导入历史财务数据。',
    link: '/input',
  },
  {
    icon: BarChart3,
    title: '数据可视化',
    description: '使用折线图、条形图等多种图表类型直观展示收入与成本对比。',
    link: '/visualize',
  },
  {
    icon: TrendingUp,
    title: '趋势分析',
    description: '分析利润趋势，计算增长率，辅助业务决策。',
    link: '/trends',
  },
]

export function HomePage() {
  const { data, loadSampleData } = useData()
  const hasData = data.length > 0

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0)
  const totalProfit = totalRevenue - totalCost

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          收入成本可视化工具
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          轻松管理您的财务数据，通过交互式可视化直观了解收入与成本趋势，
          帮助您做出更明智的业务决策。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/input">
              开始使用 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {!hasData && (
            <Button variant="outline" size="lg" onClick={loadSampleData}>
              加载示例数据
            </Button>
          )}
        </div>
      </section>

      {hasData && (
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总收入</CardDescription>
              <CardTitle className="text-2xl text-chart-revenue">
                ¥{totalRevenue.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总成本</CardDescription>
              <CardTitle className="text-2xl text-chart-cost">
                ¥{totalCost.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总利润</CardDescription>
              <CardTitle
                className={`text-2xl ${totalProfit >= 0 ? 'text-chart-profit' : 'text-destructive'}`}
              >
                ¥{totalProfit.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">功能特性</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
                <Button variant="link" className="mt-2 p-0 h-auto" asChild>
                  <Link to={feature.link}>了解更多 →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
