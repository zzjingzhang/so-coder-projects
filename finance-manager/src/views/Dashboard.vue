<script setup>
import { ref, computed, onMounted } from 'vue'
import { transactions, budgets, investments, bills } from '../data/mockData'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// 计算统计数据
const totalIncome = computed(() => {
  return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
})

const totalExpense = computed(() => {
  return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
})

const balance = computed(() => totalIncome.value - totalExpense.value)

const totalInvestment = computed(() => {
  return investments.reduce((sum, i) => sum + i.shares * i.currentPrice, 0)
})

const pendingBills = computed(() => {
  return bills.filter(b => b.status === 'pending')
})

// 图表数据
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

const pieChartData = ref({
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

const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
})

onMounted(() => {
  // 检查是否有即将到期的账单
  const urgentBills = pendingBills.value.filter(b => {
    const dueDate = new Date(b.dueDate)
    const today = new Date()
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  })

  if (urgentBills.length > 0) {
    toast.add({
      severity: 'warn',
      summary: '账单提醒',
      detail: `有 ${urgentBills.length} 个账单即将到期，请及时处理`,
      life: 5000
    })
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- 总收入 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-arrow-up text-green-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">本月收入</p>
              <p class="text-2xl font-bold text-green-600">¥{{ totalIncome.toLocaleString() }}</p>
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
              <p class="text-gray-500 text-sm">本月支出</p>
              <p class="text-2xl font-bold text-red-600">¥{{ totalExpense.toLocaleString() }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 结余 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-wallet text-blue-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">本月结余</p>
              <p class="text-2xl font-bold text-blue-600">¥{{ balance.toLocaleString() }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 投资总额 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-chart-line text-purple-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">投资总额</p>
              <p class="text-2xl font-bold text-purple-600">¥{{ totalInvestment.toLocaleString() }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 收支趋势图 -->
      <Card class="lg:col-span-2">
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

      <!-- 支出分类饼图 -->
      <Card>
        <template #header>
          <div class="px-4 py-2 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800">支出分类</h3>
          </div>
        </template>
        <template #content>
          <div class="h-80">
            <Chart type="pie" :data="pieChartData" :options="pieChartOptions" />
          </div>
        </template>
      </Card>
    </div>

    <!-- 待处理账单和最近交易 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 待处理账单 -->
      <Card>
        <template #header>
          <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800">待处理账单</h3>
            <Tag :value="pendingBills.length + ' 项'" severity="warning" />
          </div>
        </template>
        <template #content>
          <div v-if="pendingBills.length === 0" class="text-center py-8 text-gray-500">
            <i class="pi pi-check-circle text-4xl text-green-500 mb-2"></i>
            <p>暂无待处理账单</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="bill in pendingBills"
              :key="bill.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    bill.type === '每月' ? 'bg-blue-100' : 'bg-orange-100'
                  ]"
                >
                  <i
                    :class="[
                      'pi pi-calendar text-lg',
                      bill.type === '每月' ? 'text-blue-600' : 'text-orange-600'
                    ]"
                  ></i>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ bill.name }}</p>
                  <p class="text-sm text-gray-500">{{ bill.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-red-600">¥{{ bill.amount.toLocaleString() }}</p>
                <p class="text-sm text-gray-500">到期日: {{ bill.dueDate }}</p>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- 最近交易 -->
      <Card>
        <template #header>
          <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800">最近交易</h3>
            <Button label="查看全部" text class="text-sm" />
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <div
              v-for="transaction in transactions.slice(0, 5)"
              :key="transaction.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div
                  :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  ]"
                >
                  <i
                    :class="[
                      'pi pi-money-bill text-lg',
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    ]"
                  ></i>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ transaction.category }}</p>
                  <p class="text-sm text-gray-500">{{ transaction.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <p
                  :class="[
                    'font-bold',
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ transaction.type === 'income' ? '+' : '-' }}¥{{ transaction.amount.toLocaleString() }}
                </p>
                <p class="text-sm text-gray-500">{{ transaction.date }}</p>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
