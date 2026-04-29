import React, { useState, useRef, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useData } from '@/context/DataContext'
import { Plus, Upload, Trash2, Trash, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import type { FinancialData } from '@/types'

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50]

export function DataInputPage() {
  const { data, addData, addBatchData, deleteData, clearData, loadSampleData } = useData()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    date: '',
    revenue: '',
    cost: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage))

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return data.slice(start, end)
  }, [data, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!formData.date || !formData.revenue || !formData.cost) {
      setError('请填写所有必填字段')
      return
    }

    const revenue = parseFloat(formData.revenue)
    const cost = parseFloat(formData.cost)

    if (isNaN(revenue) || isNaN(cost) || revenue < 0 || cost < 0) {
      setError('请输入有效的金额（正数）')
      return
    }

    addData({
      date: formData.date,
      revenue,
      cost,
    })

    setFormData({ date: '', revenue: '', cost: '' })
    setSuccess('数据添加成功！')
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccess(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const lines = text.split('\n').filter((line) => line.trim())

        if (lines.length < 2) {
          setError('CSV 文件格式不正确，至少需要包含标题行和一行数据')
          return
        }

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
        const dateIndex = headers.indexOf('date')
        const revenueIndex = headers.indexOf('revenue')
        const costIndex = headers.indexOf('cost')

        if (dateIndex === -1 || revenueIndex === -1 || costIndex === -1) {
          setError('CSV 必须包含以下列：date, revenue, cost')
          return
        }

        const newData: { date: string; revenue: number; cost: number }[] = []
        let errorCount = 0

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map((v) => v.trim())
          const revenue = parseFloat(values[revenueIndex])
          const cost = parseFloat(values[costIndex])

          if (!isNaN(revenue) && !isNaN(cost) && values[dateIndex]) {
            newData.push({
              date: values[dateIndex],
              revenue,
              cost,
            })
          } else {
            errorCount++
          }
        }

        if (newData.length > 0) {
          addBatchData(newData)
          setSuccess(`成功导入 ${newData.length} 条数据${errorCount > 0 ? `，${errorCount} 条数据格式错误已跳过` : ''}`)
          setTimeout(() => setSuccess(null), 5000)
        } else {
          setError('没有找到有效的数据行')
        }
      } catch {
        setError('解析 CSV 文件时发生错误')
      }
    }
    reader.readAsText(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadSampleCSV = () => {
    const sampleCSV = `date,revenue,cost
2024-01-31,125000,85000
2024-02-29,132000,92000
2024-03-31,148000,98000
2024-04-30,155000,102000
2024-05-31,162000,105000
2024-06-30,178000,112000`

    const blob = new Blob([sampleCSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">数据输入</h1>
          <p className="text-muted-foreground">手动输入或批量上传财务数据</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSampleData}>
            加载示例数据
          </Button>
          <Button variant="destructive" onClick={clearData}>
            <Trash className="mr-2 h-4 w-4" />
            清空所有
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-chart-revenue/10 border border-chart-revenue/20 text-chart-revenue px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      <Tabs defaultValue="form" className="w-full">
        <TabsList>
          <TabsTrigger value="form" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            表单输入
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            CSV 上传
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>添加新数据</CardTitle>
              <CardDescription>
                输入日期、收入和成本数据，点击添加按钮保存
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">日期 *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">收入 (¥) *</Label>
                    <Input
                      id="revenue"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">成本 (¥) *</Label>
                    <Input
                      id="cost"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" />
                  添加数据
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>上传 CSV 文件</CardTitle>
              <CardDescription>
                上传包含财务数据的 CSV 文件。CSV 必须包含以下列：date, revenue, cost
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={downloadSampleCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  下载示例 CSV
                </Button>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  点击选择文件或拖拽 CSV 文件到此处
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="max-w-xs mx-auto"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">CSV 格式要求：</p>
                <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
{`date,revenue,cost
2024-01-31,125000,85000
2024-02-29,132000,92000
2024-03-31,148000,98000`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {data.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>已输入的数据 ({data.length} 条)</CardTitle>
                <CardDescription>
                  显示第 {Math.min(((currentPage - 1) * itemsPerPage) + 1, data.length)} - {Math.min(currentPage * itemsPerPage, data.length)} 条
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">每页显示：</span>
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num} 条
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">日期</th>
                    <th className="text-right py-3 px-4 font-medium">收入</th>
                    <th className="text-right py-3 px-4 font-medium">成本</th>
                    <th className="text-right py-3 px-4 font-medium">利润</th>
                    <th className="text-right py-3 px-4 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item: FinancialData) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4 text-right text-chart-revenue">
                        ¥{item.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-chart-cost">
                        ¥{item.cost.toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-medium ${
                          item.profit >= 0 ? 'text-chart-profit' : 'text-destructive'
                        }`}
                      >
                        ¥{item.profit.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteData(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  第 {currentPage} 页，共 {totalPages} 页
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    首页
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {typeof page === 'number' ? (
                        <Button
                          variant={page === currentPage ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={page === currentPage ? 'bg-primary text-primary-foreground' : ''}
                        >
                          {page}
                        </Button>
                      ) : (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                    </React.Fragment>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    末页
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
