<script setup>
import { ref, computed, watch } from 'vue'
import { budgets, categories } from '../data/mockData'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

// 预算列表
const budgetList = ref([...budgets])

// 当前月份
const currentMonth = ref('2026-04')

// 对话框状态
const dialogVisible = ref(false)
const isEdit = ref(false)

// 表单数据
const formData = ref({
  id: null,
  category: '',
  amount: null,
  spent: 0,
  month: currentMonth.value
})

// 分类选项
const categoryOptions = computed(() => {
  return categories.expense.map(c => ({ label: c, value: c }))
})

// 月份选项
const monthOptions = [
  { label: '2026年1月', value: '2026-01' },
  { label: '2026年2月', value: '2026-02' },
  { label: '2026年3月', value: '2026-03' },
  { label: '2026年4月', value: '2026-04' },
  { label: '2026年5月', value: '2026-05' },
  { label: '2026年6月', value: '2026-06' }
]

// 统计数据
const totalBudget = computed(() => {
  return budgetList.value.reduce((sum, b) => sum + b.amount, 0)
})

const totalSpent = computed(() => {
  return budgetList.value.reduce((sum, b) => sum + b.spent, 0)
})

const remainingBudget = computed(() => totalBudget.value - totalSpent.value)

const budgetPercentage = computed(() => {
  if (totalBudget.value === 0) return 0
  return Math.round((totalSpent.value / totalBudget.value) * 100)
})

// 过滤后的预算列表
const filteredBudgets = computed(() => {
  return budgetList.value.filter(b => b.month === currentMonth.value)
})

// 计算每个预算的进度条颜色
const getProgressSeverity = (percentage) => {
  if (percentage >= 90) return 'danger'
  if (percentage >= 70) return 'warning'
  return 'success'
}

// 打开新增对话框
const openAddDialog = () => {
  isEdit.value = false
  formData.value = {
    id: null,
    category: categories.expense[0],
    amount: null,
    spent: 0,
    month: currentMonth.value
  }
  dialogVisible.value = true
}

// 打开编辑对话框
const openEditDialog = (budget) => {
  isEdit.value = true
  formData.value = { ...budget }
  dialogVisible.value = true
}

// 保存预算
const saveBudget = () => {
  if (!formData.value.amount || formData.value.amount <= 0) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入有效的预算金额', life: 3000 })
    return
  }

  // 检查是否已存在相同分类的预算
  const existingBudget = budgetList.value.find(
    b => b.category === formData.value.category &&
         b.month === formData.value.month &&
         b.id !== formData.value.id
  )

  if (existingBudget) {
    toast.add({ severity: 'error', summary: '错误', detail: '该分类本月已设置预算', life: 3000 })
    return
  }

  if (isEdit.value) {
    const index = budgetList.value.findIndex(b => b.id === formData.value.id)
    if (index !== -1) {
      budgetList.value[index] = { ...formData.value }
      toast.add({ severity: 'success', summary: '成功', detail: '预算已更新', life: 3000 })
    }
  } else {
    const newBudget = {
      id: Date.now(),
      ...formData.value
    }
    budgetList.value.push(newBudget)
    toast.add({ severity: 'success', summary: '成功', detail: '预算已添加', life: 3000 })
  }

  dialogVisible.value = false
}

// 删除预算
const deleteBudget = (budget) => {
  confirm.require({
    message: `确定要删除 "${budget.category}" 的预算吗？`,
    header: '删除确认',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: () => {
      const index = budgetList.value.findIndex(b => b.id === budget.id)
      if (index !== -1) {
        budgetList.value.splice(index, 1)
        toast.add({ severity: 'success', summary: '成功', detail: '预算已删除', life: 3000 })
      }
    }
  })
}

// 格式化金额
const formatCurrency = (value) => {
  return `¥${value.toLocaleString()}`
}
</script>

<template>
  <div class="space-y-6">
    <!-- 月份选择器和操作按钮 -->
    <Card>
      <template #content>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <span class="text-gray-600 font-medium">选择月份：</span>
            <Dropdown
              v-model="currentMonth"
              :options="monthOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择月份"
              class="w-48"
            />
          </div>
          <Button label="新增预算" icon="pi pi-plus" @click="openAddDialog" />
        </div>
      </template>
    </Card>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 总预算 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-wallet text-blue-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总预算</p>
              <p class="text-2xl font-bold text-blue-600">{{ formatCurrency(totalBudget) }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 已支出 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-arrow-down text-red-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">已支出</p>
              <p class="text-2xl font-bold text-red-600">{{ formatCurrency(totalSpent) }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 剩余预算 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                remainingBudget >= 0 ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <i
                :class="[
                  'pi pi-money-bill text-2xl',
                  remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              ></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">剩余预算</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ formatCurrency(remainingBudget) }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 执行进度 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                budgetPercentage >= 90 ? 'bg-red-100' : budgetPercentage >= 70 ? 'bg-yellow-100' : 'bg-green-100'
              ]"
            >
              <i
                :class="[
                  'pi pi-chart-pie text-2xl',
                  budgetPercentage >= 90 ? 'text-red-600' : budgetPercentage >= 70 ? 'text-yellow-600' : 'text-green-600'
                ]"
              ></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">执行进度</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  budgetPercentage >= 90 ? 'text-red-600' : budgetPercentage >= 70 ? 'text-yellow-600' : 'text-green-600'
                ]"
              >
                {{ budgetPercentage }}%
              </p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 总体进度条 -->
    <Card>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-800">总体预算执行情况</h3>
      </template>
      <template #content>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">总预算: {{ formatCurrency(totalBudget) }}</span>
            <span class="text-gray-600">已使用: {{ formatCurrency(totalSpent) }} ({{ budgetPercentage }}%)</span>
          </div>
          <ProgressBar
            :value="budgetPercentage"
            :showValue="false"
            :severity="getProgressSeverity(budgetPercentage)"
            class="h-4"
          />
          <div class="flex items-center justify-between text-sm">
            <span class="text-green-600">剩余: {{ formatCurrency(remainingBudget) }}</span>
            <span class="text-gray-500">
              {{ budgetPercentage < 100 ? '预算充足' : '预算已超支' }}
            </span>
          </div>
        </div>
      </template>
    </Card>

    <!-- 各分类预算详情 -->
    <Card>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">各分类预算详情</h3>
          <Tag :value="`共 ${filteredBudgets.length} 项预算`" severity="info" />
        </div>
      </template>
      <template #content>
        <div v-if="filteredBudgets.length === 0" class="text-center py-12 text-gray-500">
          <i class="pi pi-folder-open text-4xl text-gray-300 mb-4"></i>
          <p class="text-lg">本月暂无预算设置</p>
          <p class="text-sm mt-2">点击"新增预算"按钮开始设置您的预算</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="budget in filteredBudgets"
            :key="budget.id"
            class="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    budget.spent / budget.amount >= 0.9 ? 'bg-red-100' :
                    budget.spent / budget.amount >= 0.7 ? 'bg-yellow-100' : 'bg-green-100'
                  ]"
                >
                  <i
                    :class="[
                      'pi pi-tag text-lg',
                      budget.spent / budget.amount >= 0.9 ? 'text-red-600' :
                      budget.spent / budget.amount >= 0.7 ? 'text-yellow-600' : 'text-green-600'
                    ]"
                  ></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ budget.category }}</h4>
                  <p class="text-sm text-gray-500">预算: {{ formatCurrency(budget.amount) }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="openEditDialog(budget)"
                  title="编辑"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-sm p-button-danger"
                  @click="deleteBudget(budget)"
                  title="删除"
                />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">已使用: {{ formatCurrency(budget.spent) }}</span>
                <span
                  :class="[
                    'font-medium',
                    budget.spent / budget.amount >= 0.9 ? 'text-red-600' :
                    budget.spent / budget.amount >= 0.7 ? 'text-yellow-600' : 'text-green-600'
                  ]"
                >
                  {{ Math.round((budget.spent / budget.amount) * 100) }}%
                </span>
              </div>
              <ProgressBar
                :value="Math.round((budget.spent / budget.amount) * 100)"
                :showValue="false"
                :severity="getProgressSeverity(Math.round((budget.spent / budget.amount) * 100))"
                class="h-3"
              />
              <div class="flex items-center justify-between text-sm">
                <span
                  :class="[
                    budget.amount - budget.spent >= 0 ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  剩余: {{ formatCurrency(budget.amount - budget.spent) }}
                </span>
                <Tag
                  :value="
                    budget.spent / budget.amount >= 0.9 ? '需注意' :
                    budget.spent / budget.amount >= 0.7 ? '已过半' : '正常'
                  "
                  :severity="
                    budget.spent / budget.amount >= 0.9 ? 'danger' :
                    budget.spent / budget.amount >= 0.7 ? 'warning' : 'success'
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- 新增/编辑对话框 -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="isEdit ? '编辑预算' : '新增预算'"
      :modal="true"
      :style="{ width: '500px' }"
      :closable="false"
    >
      <div class="p-fluid space-y-4">
        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">分类</label>
            <Dropdown
              v-model="formData.category"
              :options="categoryOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择分类"
              class="w-full"
              :disabled="isEdit"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">预算金额</label>
            <InputNumber
              v-model="formData.amount"
              mode="currency"
              currency="CNY"
              :min="0"
              placeholder="输入预算金额"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">月份</label>
            <Dropdown
              v-model="formData.month"
              :options="monthOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择月份"
              class="w-full"
              :disabled="isEdit"
            />
          </div>
        </div>

        <div v-if="isEdit" class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">已支出金额</label>
            <InputNumber
              v-model="formData.spent"
              mode="currency"
              currency="CNY"
              :min="0"
              placeholder="输入已支出金额"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="取消"
          icon="pi pi-times"
          text
          @click="dialogVisible = false"
        />
        <Button
          label="保存"
          icon="pi pi-check"
          @click="saveBudget"
        />
      </template>
    </Dialog>
  </div>
</template>
