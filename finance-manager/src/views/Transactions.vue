<script setup>
import { ref, computed, onMounted } from 'vue'
import { transactions, categories } from '../data/mockData'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

// 交易列表
const transactionList = ref([...transactions])
const selectedTransactions = ref([])

// 搜索和过滤
const searchKeyword = ref('')
const filterType = ref('all')
const filterCategory = ref('all')
const dateRange = ref(null)

// 对话框状态
const dialogVisible = ref(false)
const isEdit = ref(false)

// 表单数据
const formData = ref({
  id: null,
  type: 'expense',
  category: '',
  amount: null,
  date: new Date(),
  description: ''
})

// 分类选项
const typeOptions = [
  { label: '全部', value: 'all' },
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expense' }
]

const typeSelectOptions = [
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expense' }
]

// 计算过滤后的交易列表
const filteredTransactions = computed(() => {
  let list = [...transactionList.value]

  // 按类型过滤
  if (filterType.value !== 'all') {
    list = list.filter(t => t.type === filterType.value)
  }

  // 按分类过滤
  if (filterCategory.value !== 'all') {
    list = list.filter(t => t.category === filterCategory.value)
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    list = list.filter(t =>
      t.category.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword)
    )
  }

  // 按日期范围过滤
  if (dateRange.value && dateRange.value[0] && dateRange.value[1]) {
    const startDate = dateRange.value[0]
    const endDate = dateRange.value[1]
    list = list.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  return list
})

// 根据类型获取分类选项
const categoryOptions = computed(() => {
  if (filterType.value === 'all') {
    return [
      { label: '全部', value: 'all' },
      ...categories.income.map(c => ({ label: c, value: c })),
      ...categories.expense.map(c => ({ label: c, value: c }))
    ]
  }
  return [
    { label: '全部', value: 'all' },
    ...categories[filterType.value].map(c => ({ label: c, value: c }))
  ]
})

const formCategoryOptions = computed(() => {
  return categories[formData.value.type].map(c => ({ label: c, value: c }))
})

// 打开新增对话框
const openAddDialog = () => {
  isEdit.value = false
  formData.value = {
    id: null,
    type: 'expense',
    category: categories.expense[0],
    amount: null,
    date: new Date(),
    description: ''
  }
  dialogVisible.value = true
}

// 打开编辑对话框
const openEditDialog = (transaction) => {
  isEdit.value = true
  formData.value = {
    ...transaction,
    date: new Date(transaction.date)
  }
  dialogVisible.value = true
}

// 保存交易
const saveTransaction = () => {
  if (!formData.value.amount || formData.value.amount <= 0) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入有效的金额', life: 3000 })
    return
  }

  if (!formData.value.category) {
    toast.add({ severity: 'error', summary: '错误', detail: '请选择分类', life: 3000 })
    return
  }

  const formattedDate = formData.value.date.toISOString().split('T')[0]

  if (isEdit.value) {
    const index = transactionList.value.findIndex(t => t.id === formData.value.id)
    if (index !== -1) {
      transactionList.value[index] = {
        ...formData.value,
        date: formattedDate
      }
      toast.add({ severity: 'success', summary: '成功', detail: '交易记录已更新', life: 3000 })
    }
  } else {
    const newTransaction = {
      id: Date.now(),
      ...formData.value,
      date: formattedDate
    }
    transactionList.value.unshift(newTransaction)
    toast.add({ severity: 'success', summary: '成功', detail: '交易记录已添加', life: 3000 })
  }

  dialogVisible.value = false
}

// 删除交易
const deleteTransaction = (transaction) => {
  confirm.require({
    message: '确定要删除这条交易记录吗？此操作无法撤销。',
    header: '删除确认',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: () => {
      const index = transactionList.value.findIndex(t => t.id === transaction.id)
      if (index !== -1) {
        transactionList.value.splice(index, 1)
        toast.add({ severity: 'success', summary: '成功', detail: '交易记录已删除', life: 3000 })
      }
    }
  })
}

// 批量删除
const deleteSelected = () => {
  confirm.require({
    message: `确定要删除选中的 ${selectedTransactions.value.length} 条记录吗？`,
    header: '删除确认',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: () => {
      selectedTransactions.value.forEach(t => {
        const index = transactionList.value.findIndex(transaction => transaction.id === t.id)
        if (index !== -1) {
          transactionList.value.splice(index, 1)
        }
      })
      selectedTransactions.value = []
      toast.add({ severity: 'success', summary: '成功', detail: '已删除选中的记录', life: 3000 })
    }
  })
}

// 重置过滤
const resetFilters = () => {
  searchKeyword.value = ''
  filterType.value = 'all'
  filterCategory.value = 'all'
  dateRange.value = null
}

// 格式化金额
const formatCurrency = (value) => {
  return `¥${value.toLocaleString()}`
}
</script>

<template>
  <div class="space-y-6">
    <!-- 工具栏 -->
    <Card>
      <template #content>
        <div class="space-y-4">
          <!-- 搜索和主要操作 -->
          <div class="flex flex-wrap items-center gap-4">
            <InputText
              v-model="searchKeyword"
              placeholder="搜索交易..."
              class="w-full md:w-64"
              icon="pi pi-search"
            />
            <Dropdown
              v-model="filterType"
              :options="typeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择类型"
              class="w-full md:w-40"
            />
            <Dropdown
              v-model="filterCategory"
              :options="categoryOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择分类"
              class="w-full md:w-40"
            />
            <Button label="重置" icon="pi pi-refresh" text @click="resetFilters" />
            <Button
              label="新增交易"
              icon="pi pi-plus"
              class="ml-auto"
              @click="openAddDialog"
            />
            <Button
              v-if="selectedTransactions.length > 0"
              label="删除选中"
              icon="pi pi-trash"
              severity="danger"
              @click="deleteSelected"
            />
          </div>

          <!-- 日期范围过滤 -->
          <div class="flex items-center gap-4">
            <span class="text-gray-600">日期范围：</span>
            <Calendar
              v-model="dateRange"
              selectionMode="range"
              :showIcon="true"
              dateFormat="yy-mm-dd"
              placeholder="选择日期范围"
              class="w-full md:w-80"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-arrow-up text-green-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总收入</p>
              <p class="text-2xl font-bold text-green-600">
                ¥{{ filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0).toLocaleString() }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-arrow-down text-red-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总支出</p>
              <p class="text-2xl font-bold text-red-600">
                ¥{{ filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0).toLocaleString() }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-wallet text-blue-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">净结余</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  (filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) -
                    filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)) >= 0
                    ? 'text-blue-600'
                    : 'text-red-600'
                ]"
              >
                ¥{{
                  (filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) -
                    filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)).toLocaleString()
                }}
              </p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 交易列表 -->
    <Card>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">交易记录</h3>
          <Tag :value="`共 ${filteredTransactions.length} 条记录`" severity="info" />
        </div>
      </template>
      <template #content>
        <DataTable
          :value="filteredTransactions"
          v-model:selection="selectedTransactions"
          selectionMode="multiple"
          :paginator="true"
          :rows="10"
          :rowsPerPage="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="显示 {first} 到 {last}，共 {totalRecords} 条记录"
          dataKey="id"
          stripedRows
          responsiveLayout="scroll"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem" />
          <Column field="id" header="ID" :style="{ width: '80px' }" />
          <Column field="type" header="类型" :style="{ width: '100px' }">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.type === 'income' ? '收入' : '支出'"
                :severity="slotProps.data.type === 'income' ? 'success' : 'danger'"
              />
            </template>
          </Column>
          <Column field="category" header="分类" :style="{ width: '120px' }" />
          <Column field="amount" header="金额" :style="{ width: '150px' }">
            <template #body="slotProps">
              <span
                :class="[
                  'font-bold',
                  slotProps.data.type === 'income' ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ slotProps.data.type === 'income' ? '+' : '-' }}{{ formatCurrency(slotProps.data.amount) }}
              </span>
            </template>
          </Column>
          <Column field="date" header="日期" :style="{ width: '120px' }" />
          <Column field="description" header="描述" :style="{ minWidth: '200px' }">
            <template #body="slotProps">
              <span class="text-gray-600">{{ slotProps.data.description || '-' }}</span>
            </template>
          </Column>
          <Column header="操作" :style="{ width: '150px' }" bodyStyle="text-align: center">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-text p-button-sm mr-2"
                @click="openEditDialog(slotProps.data)"
                title="编辑"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-sm p-button-danger"
                @click="deleteTransaction(slotProps.data)"
                title="删除"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- 新增/编辑对话框 -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="isEdit ? '编辑交易记录' : '新增交易记录'"
      :modal="true"
      :style="{ width: '500px' }"
      :closable="false"
    >
      <div class="p-fluid space-y-4">
        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">类型</label>
            <Dropdown
              v-model="formData.type"
              :options="typeSelectOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择类型"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">分类</label>
            <Dropdown
              v-model="formData.category"
              :options="formCategoryOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择分类"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">金额</label>
            <InputNumber
              v-model="formData.amount"
              mode="currency"
              currency="CNY"
              :min="0"
              placeholder="输入金额"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">日期</label>
            <Calendar
              v-model="formData.date"
              :showIcon="true"
              dateFormat="yy-mm-dd"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">描述</label>
            <Textarea
              v-model="formData.description"
              rows="3"
              placeholder="输入描述信息（可选）"
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
          @click="saveTransaction"
        />
      </template>
    </Dialog>
  </div>
</template>
