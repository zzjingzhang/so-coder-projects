<script setup>
import { ref, computed } from 'vue'
import { investments, investmentTypes } from '../data/mockData'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

// 投资列表
const investmentList = ref([...investments])
const selectedInvestments = ref([])

// 搜索和过滤
const searchKeyword = ref('')
const filterType = ref('all')

// 对话框状态
const dialogVisible = ref(false)
const isEdit = ref(false)
const detailVisible = ref(false)
const selectedInvestment = ref(null)

// 表单数据
const formData = ref({
  id: null,
  name: '',
  type: '股票',
  code: '',
  shares: null,
  buyPrice: null,
  currentPrice: null,
  purchaseDate: new Date()
})

// 类型选项
const typeOptions = [
  { label: '全部', value: 'all' },
  ...investmentTypes.map(t => ({ label: t, value: t }))
]

const formTypeOptions = computed(() => {
  return investmentTypes.map(t => ({ label: t, value: t }))
})

// 统计数据
const totalInvestment = computed(() => {
  return investmentList.value.reduce((sum, i) => sum + i.shares * i.buyPrice, 0)
})

const currentValue = computed(() => {
  return investmentList.value.reduce((sum, i) => sum + i.shares * i.currentPrice, 0)
})

const totalProfit = computed(() => currentValue.value - totalInvestment.value)

const profitPercentage = computed(() => {
  if (totalInvestment.value === 0) return 0
  return ((totalProfit.value / totalInvestment.value) * 100).toFixed(2)
})

// 按类型统计
const investmentByType = computed(() => {
  const result = {}
  investmentList.value.forEach(i => {
    if (!result[i.type]) {
      result[i.type] = { name: i.type, value: 0, count: 0 }
    }
    result[i.type].value += i.shares * i.currentPrice
    result[i.type].count += 1
  })
  return Object.values(result)
})

// 过滤后的投资列表
const filteredInvestments = computed(() => {
  let list = [...investmentList.value]

  // 按类型过滤
  if (filterType.value !== 'all') {
    list = list.filter(i => i.type === filterType.value)
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    list = list.filter(i =>
      i.name.toLowerCase().includes(keyword) ||
      i.code.toLowerCase().includes(keyword)
    )
  }

  return list
})

// 计算单个投资的收益
const calculateProfit = (investment) => {
  const buyValue = investment.shares * investment.buyPrice
  const currentValue = investment.shares * investment.currentPrice
  return {
    absolute: currentValue - buyValue,
    percentage: buyValue > 0 ? (((currentValue - buyValue) / buyValue) * 100).toFixed(2) : 0
  }
}

// 打开新增对话框
const openAddDialog = () => {
  isEdit.value = false
  formData.value = {
    id: null,
    name: '',
    type: '股票',
    code: '',
    shares: null,
    buyPrice: null,
    currentPrice: null,
    purchaseDate: new Date()
  }
  dialogVisible.value = true
}

// 打开编辑对话框
const openEditDialog = (investment) => {
  isEdit.value = true
  formData.value = {
    ...investment,
    purchaseDate: new Date(investment.purchaseDate)
  }
  dialogVisible.value = true
}

// 打开详情对话框
const openDetailDialog = (investment) => {
  selectedInvestment.value = investment
  detailVisible.value = true
}

// 保存投资
const saveInvestment = () => {
  if (!formData.value.name) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入投资名称', life: 3000 })
    return
  }

  if (!formData.value.shares || formData.value.shares <= 0) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入有效的份额', life: 3000 })
    return
  }

  if (!formData.value.buyPrice || formData.value.buyPrice <= 0) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入有效的买入价格', life: 3000 })
    return
  }

  const formattedDate = formData.value.purchaseDate.toISOString().split('T')[0]

  if (isEdit.value) {
    const index = investmentList.value.findIndex(i => i.id === formData.value.id)
    if (index !== -1) {
      investmentList.value[index] = {
        ...formData.value,
        purchaseDate: formattedDate
      }
      toast.add({ severity: 'success', summary: '成功', detail: '投资信息已更新', life: 3000 })
    }
  } else {
    const newInvestment = {
      id: Date.now(),
      ...formData.value,
      purchaseDate: formattedDate,
      currentPrice: formData.value.currentPrice || formData.value.buyPrice
    }
    investmentList.value.push(newInvestment)
    toast.add({ severity: 'success', summary: '成功', detail: '投资已添加', life: 3000 })
  }

  dialogVisible.value = false
}

// 删除投资
const deleteInvestment = (investment) => {
  confirm.require({
    message: `确定要删除投资 "${investment.name}" 吗？`,
    header: '删除确认',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: () => {
      const index = investmentList.value.findIndex(i => i.id === investment.id)
      if (index !== -1) {
        investmentList.value.splice(index, 1)
        toast.add({ severity: 'success', summary: '成功', detail: '投资已删除', life: 3000 })
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
    <!-- 工具栏 -->
    <Card>
      <template #content>
        <div class="flex flex-wrap items-center gap-4">
          <InputText
            v-model="searchKeyword"
            placeholder="搜索投资名称或代码..."
            class="w-full md:w-64"
            icon="pi pi-search"
          />
          <Dropdown
            v-model="filterType"
            :options="typeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="选择类型"
            class="w-full md:w-48"
          />
          <Button
            label="新增投资"
            icon="pi pi-plus"
            class="ml-auto"
            @click="openAddDialog"
          />
          <Button
            v-if="selectedInvestments.length > 0"
            label="删除选中"
            icon="pi pi-trash"
            severity="danger"
          />
        </div>
      </template>
    </Card>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 总投入 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-wallet text-blue-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总投入</p>
              <p class="text-2xl font-bold text-blue-600">{{ formatCurrency(totalInvestment) }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 当前市值 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-chart-line text-purple-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">当前市值</p>
              <p class="text-2xl font-bold text-purple-600">{{ formatCurrency(currentValue) }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 总收益 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                totalProfit >= 0 ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <i
                :class="[
                  'pi text-2xl',
                  totalProfit >= 0 ? 'pi-arrow-up text-green-600' : 'pi-arrow-down text-red-600'
                ]"
              ></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总收益</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ totalProfit >= 0 ? '+' : '' }}{{ formatCurrency(totalProfit) }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 收益率 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                profitPercentage >= 0 ? 'bg-green-100' : 'bg-red-100'
              ]"
            >
              <i
                :class="[
                  'pi pi-percentage text-2xl',
                  profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              ></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">收益率</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ profitPercentage >= 0 ? '+' : '' }}{{ profitPercentage }}%
              </p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 投资列表 -->
    <Card>
      <template #header>
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">投资组合</h3>
          <Tag :value="`共 ${filteredInvestments.length} 项投资`" severity="info" />
        </div>
      </template>
      <template #content>
        <DataTable
          :value="filteredInvestments"
          v-model:selection="selectedInvestments"
          selectionMode="multiple"
          :paginator="true"
          :rows="10"
          :rowsPerPage="[5, 10, 20, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="显示 {first} 到 {last}，共 {totalRecords} 项投资"
          dataKey="id"
          stripedRows
          responsiveLayout="scroll"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem" />
          <Column field="name" header="投资名称" :style="{ minWidth: '150px' }">
            <template #body="slotProps">
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    slotProps.data.type === '股票' ? 'bg-red-100' :
                    slotProps.data.type === '基金' ? 'bg-blue-100' :
                    slotProps.data.type === '理财' ? 'bg-green-100' :
                    slotProps.data.type === '债券' ? 'bg-yellow-100' : 'bg-gray-100'
                  ]"
                >
                  <i
                    :class="[
                      'pi text-lg',
                      slotProps.data.type === '股票' ? 'pi-chart-line text-red-600' :
                      slotProps.data.type === '基金' ? 'pi-briefcase text-blue-600' :
                      slotProps.data.type === '理财' ? 'pi-money-bill text-green-600' :
                      slotProps.data.type === '债券' ? 'pi-file text-yellow-600' : 'pi-tag text-gray-600'
                    ]"
                  ></i>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ slotProps.data.name }}</p>
                  <p class="text-sm text-gray-500">{{ slotProps.data.code }}</p>
                </div>
              </div>
            </template>
          </Column>
          <Column field="type" header="类型" :style="{ width: '100px' }">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.type"
                :severity="
                  slotProps.data.type === '股票' ? 'danger' :
                  slotProps.data.type === '基金' ? 'info' :
                  slotProps.data.type === '理财' ? 'success' :
                  slotProps.data.type === '债券' ? 'warning' : 'secondary'
                "
              />
            </template>
          </Column>
          <Column field="shares" header="份额" :style="{ width: '100px' }">
            <template #body="slotProps">
              <span class="font-medium">{{ slotProps.data.shares }}</span>
            </template>
          </Column>
          <Column field="buyPrice" header="买入价" :style="{ width: '120px' }">
            <template #body="slotProps">
              <span>{{ formatCurrency(slotProps.data.buyPrice) }}</span>
            </template>
          </Column>
          <Column field="currentPrice" header="现价" :style="{ width: '120px' }">
            <template #body="slotProps">
              <span class="font-medium">{{ formatCurrency(slotProps.data.currentPrice) }}</span>
            </template>
          </Column>
          <Column header="收益" :style="{ width: '150px' }">
            <template #body="slotProps">
              <div>
                <p
                  :class="[
                    'font-bold',
                    calculateProfit(slotProps.data).absolute >= 0 ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ calculateProfit(slotProps.data).absolute >= 0 ? '+' : '' }}
                  {{ formatCurrency(calculateProfit(slotProps.data).absolute) }}
                </p>
                <p
                  :class="[
                    'text-sm',
                    calculateProfit(slotProps.data).absolute >= 0 ? 'text-green-500' : 'text-red-500'
                  ]"
                >
                  {{ calculateProfit(slotProps.data).absolute >= 0 ? '+' : '' }}
                  {{ calculateProfit(slotProps.data).percentage }}%
                </p>
              </div>
            </template>
          </Column>
          <Column header="操作" :style="{ width: '180px' }" bodyStyle="text-align: center">
            <template #body="slotProps">
              <Button
                icon="pi pi-eye"
                class="p-button-rounded p-button-text p-button-sm mr-1"
                @click="openDetailDialog(slotProps.data)"
                title="查看详情"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-text p-button-sm mr-1"
                @click="openEditDialog(slotProps.data)"
                title="编辑"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-sm p-button-danger"
                @click="deleteInvestment(slotProps.data)"
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
      :header="isEdit ? '编辑投资' : '新增投资'"
      :modal="true"
      :style="{ width: '600px' }"
      :closable="false"
    >
      <div class="p-fluid space-y-4">
        <div class="grid">
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">投资名称 *</label>
            <InputText
              v-model="formData.name"
              placeholder="输入投资名称"
              class="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">类型</label>
            <Dropdown
              v-model="formData.type"
              :options="formTypeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择类型"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">代码</label>
            <InputText
              v-model="formData.code"
              placeholder="输入代码（可选）"
              class="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">份额 *</label>
            <InputNumber
              v-model="formData.shares"
              :min="0"
              placeholder="输入份额"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">买入价 *</label>
            <InputNumber
              v-model="formData.buyPrice"
              mode="currency"
              currency="CNY"
              :min="0"
              placeholder="输入买入价"
              class="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">现价</label>
            <InputNumber
              v-model="formData.currentPrice"
              mode="currency"
              currency="CNY"
              :min="0"
              placeholder="输入现价（可选）"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">买入日期</label>
            <Calendar
              v-model="formData.purchaseDate"
              :showIcon="true"
              dateFormat="yy-mm-dd"
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
          @click="saveInvestment"
        />
      </template>
    </Dialog>

    <!-- 详情对话框 -->
    <Dialog
      v-model:visible="detailVisible"
      header="投资详情"
      :modal="true"
      :style="{ width: '500px' }"
      :closable="true"
    >
      <div v-if="selectedInvestment" class="space-y-6">
        <div class="flex items-center gap-4">
          <div
            :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center',
              selectedInvestment.type === '股票' ? 'bg-red-100' :
              selectedInvestment.type === '基金' ? 'bg-blue-100' :
              selectedInvestment.type === '理财' ? 'bg-green-100' :
              selectedInvestment.type === '债券' ? 'bg-yellow-100' : 'bg-gray-100'
            ]"
          >
            <i
              :class="[
                'pi text-3xl',
                selectedInvestment.type === '股票' ? 'pi-chart-line text-red-600' :
                selectedInvestment.type === '基金' ? 'pi-briefcase text-blue-600' :
                selectedInvestment.type === '理财' ? 'pi-money-bill text-green-600' :
                selectedInvestment.type === '债券' ? 'pi-file text-yellow-600' : 'pi-tag text-gray-600'
              ]"
            ></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ selectedInvestment.name }}</h3>
            <p class="text-gray-500">{{ selectedInvestment.code }}</p>
            <Tag
              :value="selectedInvestment.type"
              :severity="
                selectedInvestment.type === '股票' ? 'danger' :
                selectedInvestment.type === '基金' ? 'info' :
                selectedInvestment.type === '理财' ? 'success' :
                selectedInvestment.type === '债券' ? 'warning' : 'secondary'
              "
              class="mt-2"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">份额</p>
            <p class="text-lg font-bold text-gray-800">{{ selectedInvestment.shares }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">买入日期</p>
            <p class="text-lg font-bold text-gray-800">{{ selectedInvestment.purchaseDate }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">买入价</p>
            <p class="text-lg font-bold text-gray-800">{{ formatCurrency(selectedInvestment.buyPrice) }}</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">现价</p>
            <p class="text-lg font-bold text-gray-800">{{ formatCurrency(selectedInvestment.currentPrice) }}</p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-semibold text-gray-700">收益统计</h4>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <p class="text-sm text-gray-500">绝对收益</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  calculateProfit(selectedInvestment).absolute >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ calculateProfit(selectedInvestment).absolute >= 0 ? '+' : '' }}
                {{ formatCurrency(calculateProfit(selectedInvestment).absolute) }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">收益率</p>
              <p
                :class="[
                  'text-2xl font-bold',
                  calculateProfit(selectedInvestment).absolute >= 0 ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ calculateProfit(selectedInvestment).absolute >= 0 ? '+' : '' }}
                {{ calculateProfit(selectedInvestment).percentage }}%
              </p>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-gray-500">当前市值</span>
              <span class="font-bold text-purple-600">
                {{ formatCurrency(selectedInvestment.shares * selectedInvestment.currentPrice) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="关闭"
          icon="pi pi-times"
          @click="detailVisible = false"
        />
      </template>
    </Dialog>
  </div>
</template>
