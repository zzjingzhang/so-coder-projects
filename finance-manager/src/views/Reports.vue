<script setup>
import { ref, computed } from 'vue'
import { transactions } from '../data/mockData'

// 时间段选择
const selectedPeriod = ref('month')

// 时间段选项
const periodOptions = [
  { label: '本月', value: 'month' },
  { label: '本季度', value: 'quarter' },
  { label: '本年', value: 'year' },
  { label: '全部', value: 'all' }
]

// 统计数据
const totalIncome = computed(() => {
  return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
})

const totalExpense = computed(() => {
  return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
})

const netBalance = computed(() => totalIncome.value - totalExpense.value)

const averageDailyExpense = computed(() => {
  const daysInMonth = 30
  return Math.round(totalExpense.value / daysInMonth)
})

// 收支趋势图数据
const lineChartData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '收入',
      data: [15000, 16000, 15500, 20000, 18000, 0],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
      fill: true
    },
    {
      label: '支出',
      data: [8000, 9500, 8200, 7500, 9000, 0],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      tension: 0.4,
      fill: true
    }
  ]
})

const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

// 收入分类饼图数据
const incomePieData = ref({
  labels: ['工资', '奖金', '投资收益', '兼职', '其他收入'],
  datasets: [
    {
      data: [15000, 3000, 2000, 0, 0],
      backgroundColor: [
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#f59e0b',
        '#06b6d4'
      ]
    }
  ]
})

const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
})

// 支出分类饼图数据
const expensePieData = ref({
  labels: ['餐饮', '交通', '购物', '娱乐', '住房', '医疗'],
  datasets: [
    {
      data: [1200, 350, 800, 150, 3000, 200],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#06b6d4'
      ]
    }
  ]
})

// 月度对比柱状图数据
const barChartData = ref({
  labels: ['1月', '2月', '3月', '4月'],
  datasets: [
    {
      type: 'bar',
      label: '收入',
      backgroundColor: '#10b981',
      data: [15000, 16000, 15500, 20000]
    },
    {
      type: 'bar',
      label: '支出',
      backgroundColor: '#ef4444',
      data: [8000, 9500, 8200, 7500]
    },
    {
      type: 'line',
      label: '结余',
      borderColor: '#3b82f6',
      borderWidth: 2,
      fill: false,
      data: [7000, 6500, 7300, 12500]
    }
  ]
})

const barChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

// 收入分类统计
const incomeByCategory = computed(() => {
  const incomeTransactions = transactions.filter(t => t.type === 'income')
  const result = {}
  incomeTransactions.forEach(t => {
    if (!result[t.category]) {
      result[t.category] = { category: t.category, amount: 0, count: 0 }
    }
    result[t.category].amount += t.amount
    result[t.category].count += 1
  })
  return Object.values(result).sort((a, b) => b.amount - a.amount)
})

// 支出分类统计
const expenseByCategory = computed(() => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense')
  const result = {}
  expenseTransactions.forEach(t => {
    if (!result[t.category]) {
      result[t.category] = { category: t.category, amount: 0, count: 0 }
    }
    result[t.category].amount += t.amount
    result[t.category].count += 1
  })
  return Object.values(result).sort((a, b) => b.amount - a.amount)
})

// 计算收入分类的占比
const getIncomePercentage = (amount) => {
  if (totalIncome.value === 0) return 0
  return Math.round((amount / totalIncome.value) * 100)
}

// 计算支出分类的占比
const getExpensePercentage = (amount) => {
  if (totalExpense.value === 0) return 0
  return Math.round((amount / totalExpense.value) * 100)
}

// 格式化金额
const formatCurrency = (value) => {
  return `¥${value.toLocaleString()}`
}
</script>

<template>
  <div class="space-y-6">
    <!-- 时间段选择器 -->
    <Card>
      <template #content>
        <div class="flex flex-wrap items-center gap-4">
          <span class="text-gray-600 font-medium">选择时间段：</span>
          <Dropdown
            v-model="selectedPeriod"
            :options="periodOptions"
            optionLabel="label"
            optionValue="value"
            class="w-48"
          />
        </div>
      </template>
    </Card>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 总收入 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-arrow-up text-green-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总收入</p>
              <p class="text-2xl font-bold text-green-600">{{ formatCurrency(totalIncome) }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 总支出 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-arrow-down text-red-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总支出</p>
              <p class="text-2xl font-bold text-red-600">{{ formatCurrency(totalExpense) }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 净结余 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                netBalance >= 0 ? 'bg-blue-100' : 'bg-red-100'
              ]"
            >
              <i
                :class="[
                  'pi text-2xl',
                  netBalance >= 0 ? 'pi-wallet text-blue-600' : 'pi-exclamation-circle text-red-600'
                ]"
              ></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">净结余</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  netBalance >= 0 ? 'text-blue-600' : 'text-red-600'
                ]"
              >
                {{ netBalance >= 0 ? '+' : '' }}{{ formatCurrency(netBalance) }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 平均每日支出 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-calendar text-purple-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">平均每日支出</p>
              <p class="text-2xl font-bold text-purple-600">{{ formatCurrency(averageDailyExpense) }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 收支趋势图 -->
    <Card>
      <template #header>
        <div class="px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">收支趋势</h3>
        </div>
      </template>
      <template #content>
        <div class="h-80">
          <Chart type="line" :data="lineChartData" :options="lineChartOptions" />
        </div>
      </template>
    </Card>

    <!-- 收入和支出分类饼图 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 收入分类 -->
      <Card>
        <template #header>
          <div class="px-4 py-2 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800">收入分类</h3>
          </div>
        </template>
        <template #content>
          <div class="h-80">
            <Chart type="pie" :data="incomePieData" :options="pieChartOptions" />
          </div>
        </template>
      </Card>

      <!-- 支出分类 -->
      <Card>
        <template #header>
          <div class="px-4 py-2 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800">支出分类</h3>
          </div>
        </template>
        <template #content>
          <div class="h-80">
            <Chart type="pie" :data="expensePieData" :options="pieChartOptions" />
          </div>
        </template>
      </Card>
    </div>

    <!-- 月度对比图 -->
    <Card>
      <template #header>
        <div class="px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">月度收支对比</h3>
        </div>
      </template>
      <template #content>
        <div class="h-80">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </template>
    </Card>

    <!-- 收入分类详情 -->
    <Card>
      <template #header>
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">收入分类详情</h3>
          <Tag :value="`共 ${incomeByCategory.length} 类`" severity="success" />
        </div>
      </template>
      <template #content>
        <div v-if="incomeByCategory.length === 0" class="text-center py-8 text-gray-500">
          <i class="pi pi-inbox text-4xl text-gray-300 mb-2"></i>
          <p>暂无收入记录</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="(item, index) in incomeByCategory"
            :key="item.category"
            class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-green-600 font-bold text-sm">{{ index + 1 }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ item.category }}</h4>
                  <p class="text-sm text-gray-500">{{ item.count }} 笔交易</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-green-600">{{ formatCurrency(item.amount) }}</p>
                <p class="text-sm text-gray-500">占比 {{ getIncomePercentage(item.amount) }}%</p>
              </div>
            </div>
            <ProgressBar
              :value="getIncomePercentage(item.amount)"
              :showValue="false"
              class="h-2"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- 支出分类详情 -->
    <Card>
      <template #header>
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">支出分类详情</h3>
          <Tag :value="`共 ${expenseByCategory.length} 类`" severity="danger" />
        </div>
      </template>
      <template #content>
        <div v-if="expenseByCategory.length === 0" class="text-center py-8 text-gray-500">
          <i class="pi pi-inbox text-4xl text-gray-300 mb-2"></i>
          <p>暂无支出记录</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="(item, index) in expenseByCategory"
            :key="item.category"
            class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span class="text-red-600 font-bold text-sm">{{ index + 1 }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ item.category }}</h4>
                  <p class="text-sm text-gray-500">{{ item.count }} 笔交易</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-red-600">{{ formatCurrency(item.amount) }}</p>
                <p class="text-sm text-gray-500">占比 {{ getExpensePercentage(item.amount) }}%</p>
              </div>
            </div>
            <ProgressBar
              :value="getExpensePercentage(item.amount)"
              :showValue="false"
              severity="danger"
              class="h-2"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- 财务总结 -->
    <Card>
      <template #header>
        <div class="px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">财务总结</h3>
        </div>
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <i class="pi pi-arrow-up text-white text-xl"></i>
              </div>
              <h4 class="font-semibold text-gray-800">收入情况</h4>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">总收入</span>
                <span class="font-bold text-green-600">{{ formatCurrency(totalIncome) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">收入类别</span>
                <span class="font-medium">{{ incomeByCategory.length }} 类</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">主要收入来源</span>
                <span class="font-medium">
                  {{ incomeByCategory.length > 0 ? incomeByCategory[0].category : '-' }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <i class="pi pi-arrow-down text-white text-xl"></i>
              </div>
              <h4 class="font-semibold text-gray-800">支出情况</h4>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">总支出</span>
                <span class="font-bold text-red-600">{{ formatCurrency(totalExpense) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">支出类别</span>
                <span class="font-medium">{{ expenseByCategory.length }} 类</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">最大支出项</span>
                <span class="font-medium">
                  {{ expenseByCategory.length > 0 ? expenseByCategory[0].category : '-' }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <i class="pi pi-chart-pie text-white text-xl"></i>
              </div>
              <h4 class="font-semibold text-gray-800">整体状况</h4>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">净结余</span>
                <span
                  :class="[
                    'font-bold',
                    netBalance >= 0 ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ netBalance >= 0 ? '+' : '' }}{{ formatCurrency(netBalance) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">储蓄率</span>
                <span class="font-medium">
                  {{ totalIncome.value > 0 ? Math.round((netBalance.value / totalIncome.value) * 100) : 0 }}%
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">健康状况</span>
                <Tag
                  :value="
                    netBalance >= totalIncome.value * 0.3 ? '良好' :
                    netBalance >= 0 ? '一般' : '需关注'
                  "
                  :severity="
                    netBalance >= totalIncome.value * 0.3 ? 'success' :
                    netBalance >= 0 ? 'warning' : 'danger'
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
