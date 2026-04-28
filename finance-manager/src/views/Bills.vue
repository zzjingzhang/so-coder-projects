<script setup>
import { ref, computed } from 'vue'
import { bills } from '../data/mockData'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

// 账单列表
const billList = ref([...bills])
const selectedBills = ref([])

// 过滤状态
const filterStatus = ref('all')

// 对话框状态
const dialogVisible = ref(false)
const isEdit = ref(false)

// 表单数据
const formData = ref({
  id: null,
  name: '',
  amount: null,
  dueDate: new Date(),
  type: '每月',
  status: 'pending',
  description: ''
})

// 类型选项
const typeOptions = [
  { label: '每月', value: '每月' },
  { label: '每季度', value: '每季度' },
  { label: '每半年', value: '每半年' },
  { label: '每年', value: '每年' },
  { label: '一次性', value: '一次性' }
]

// 状态选项
const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '已支付', value: 'paid' }
]

// 统计数据
const pendingBills = computed(() => {
  return billList.value.filter(b => b.status === 'pending')
})

const paidBills = computed(() => {
  return billList.value.filter(b => b.status === 'paid')
})

const totalPendingAmount = computed(() => {
  return pendingBills.value.reduce((sum, b) => sum + b.amount, 0)
})

// 过滤后的账单列表
const filteredBills = computed(() => {
  let list = [...billList.value]

  // 按状态过滤
  if (filterStatus.value !== 'all') {
    list = list.filter(b => b.status === filterStatus.value)
  }

  // 按到期日排序（近的在前）
  return list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
})

// 计算距离到期日的天数
const getDaysUntilDue = (dueDate) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// 获取状态标签
const getStatusTag = (bill) => {
  if (bill.status === 'paid') {
    return { label: '已支付', severity: 'success' }
  }
  const daysUntilDue = getDaysUntilDue(bill.dueDate)
  if (daysUntilDue < 0) {
    return { label: '已逾期', severity: 'danger' }
  } else if (daysUntilDue <= 3) {
    return { label: '即将到期', severity: 'warning' }
  } else if (daysUntilDue <= 7) {
    return { label: '本周到期', severity: 'info' }
  }
  return { label: '待处理', severity: 'secondary' }
}

// 打开新增对话框
const openAddDialog = () => {
  isEdit.value = false
  formData.value = {
    id: null,
    name: '',
    amount: null,
    dueDate: new Date(),
    type: '每月',
    status: 'pending',
    description: ''
  }
  dialogVisible.value = true
}

// 打开编辑对话框
const openEditDialog = (bill) => {
  isEdit.value = true
  formData.value = {
    ...bill,
    dueDate: new Date(bill.dueDate)
  }
  dialogVisible.value = true
}

// 保存账单
const saveBill = () => {
  if (!formData.value.name) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入账单名称', life: 3000 })
    return
  }

  if (!formData.value.amount || formData.value.amount <= 0) {
    toast.add({ severity: 'error', summary: '错误', detail: '请输入有效的金额', life: 3000 })
    return
  }

  const formattedDate = formData.value.dueDate.toISOString().split('T')[0]

  if (isEdit.value) {
    const index = billList.value.findIndex(b => b.id === formData.value.id)
    if (index !== -1) {
      billList.value[index] = {
        ...formData.value,
        dueDate: formattedDate
      }
      toast.add({ severity: 'success', summary: '成功', detail: '账单信息已更新', life: 3000 })
    }
  } else {
    const newBill = {
      id: Date.now(),
      ...formData.value,
      dueDate: formattedDate
    }
    billList.value.push(newBill)
    toast.add({ severity: 'success', summary: '成功', detail: '账单已添加', life: 3000 })
  }

  dialogVisible.value = false
}

// 删除账单
const deleteBill = (bill) => {
  confirm.require({
    message: `确定要删除账单 "${bill.name}" 吗？`,
    header: '删除确认',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '删除',
    rejectLabel: '取消',
    acceptClass: 'p-button-danger',
    accept: () => {
      const index = billList.value.findIndex(b => b.id === bill.id)
      if (index !== -1) {
        billList.value.splice(index, 1)
        toast.add({ severity: 'success', summary: '成功', detail: '账单已删除', life: 3000 })
      }
    }
  })
}

// 标记为已支付
const markAsPaid = (bill) => {
  confirm.require({
    message: `确定要将 "${bill.name}" 标记为已支付吗？`,
    header: '确认操作',
    icon: 'pi pi-info-circle',
    acceptLabel: '确认',
    rejectLabel: '取消',
    accept: () => {
      const index = billList.value.findIndex(b => b.id === bill.id)
      if (index !== -1) {
        billList.value[index].status = 'paid'
        toast.add({ severity: 'success', summary: '成功', detail: '账单已标记为已支付', life: 3000 })
      }
    }
  })
}

// 标记为待处理
const markAsPending = (bill) => {
  const index = billList.value.findIndex(b => b.id === bill.id)
  if (index !== -1) {
    billList.value[index].status = 'pending'
    toast.add({ severity: 'info', summary: '提示', detail: '账单已标记为待处理', life: 3000 })
  }
}

// 格式化金额
const formatCurrency = (value) => {
  return `¥${value.toLocaleString()}`
}
</script>

<template>
  <div class="space-y-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 总账单数 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-file text-blue-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">总账单数</p>
              <p class="text-2xl font-bold text-blue-600">{{ billList.length }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 待处理 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-clock text-orange-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">待处理</p>
              <p class="text-2xl font-bold text-orange-600">{{ pendingBills.length }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 已支付 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-check-circle text-green-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">已支付</p>
              <p class="text-2xl font-bold text-green-600">{{ paidBills.length }}</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- 待支付金额 -->
      <Card>
        <template #content>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <i class="pi pi-money-bill text-red-600 text-2xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">待支付金额</p>
              <p class="text-2xl font-bold text-red-600">{{ formatCurrency(totalPendingAmount) }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 工具栏 -->
    <Card>
      <template #content>
        <div class="flex flex-wrap items-center gap-4">
          <span class="text-gray-600 font-medium">状态筛选：</span>
          <Dropdown
            v-model="filterStatus"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="选择状态"
            class="w-48"
          />
          <Button
            label="新增账单"
            icon="pi pi-plus"
            class="ml-auto"
            @click="openAddDialog"
          />
        </div>
      </template>
    </Card>

    <!-- 账单列表 -->
    <Card>
      <template #header>
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">账单列表</h3>
          <Tag :value="`共 ${filteredBills.length} 条记录`" severity="info" />
        </div>
      </template>
      <template #content>
        <div v-if="filteredBills.length === 0" class="text-center py-12 text-gray-500">
          <i class="pi pi-file-o text-4xl text-gray-300 mb-4"></i>
          <p class="text-lg">暂无账单记录</p>
          <p class="text-sm mt-2">点击"新增账单"按钮开始添加您的账单</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="bill in filteredBills"
            :key="bill.id"
            :class="[
              'bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow',
              bill.status === 'paid' ? 'opacity-60' : '',
              getDaysUntilDue(bill.dueDate) < 0 && bill.status === 'pending' ? 'border-2 border-red-300' : ''
            ]"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div
                  :class="[
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    bill.type === '每月' ? 'bg-blue-100' :
                    bill.type === '每季度' ? 'bg-purple-100' :
                    bill.type === '每年' ? 'bg-green-100' : 'bg-gray-100'
                  ]"
                >
                  <i
                    :class="[
                      'pi text-2xl',
                      bill.type === '每月' ? 'pi-calendar text-blue-600' :
                      bill.type === '每季度' ? 'pi-calendar-plus text-purple-600' :
                      bill.type === '每年' ? 'pi-calendar-times text-green-600' : 'pi-tag text-gray-600'
                    ]"
                  ></i>
                </div>
                <div>
                  <div class="flex items-center gap-3">
                    <h4 class="text-lg font-semibold text-gray-800">{{ bill.name }}</h4>
                    <Tag
                      :value="getStatusTag(bill).label"
                      :severity="getStatusTag(bill).severity"
                    />
                  </div>
                  <p class="text-gray-500">{{ bill.description || '暂无描述' }}</p>
                  <div class="flex items-center gap-4 mt-2 text-sm">
                    <span class="flex items-center gap-1 text-gray-500">
                      <i class="pi pi-repeat"></i>
                      {{ bill.type }}
                    </span>
                    <span
                      :class="[
                        'flex items-center gap-1',
                        getDaysUntilDue(bill.dueDate) < 0 && bill.status === 'pending' ? 'text-red-600 font-medium' :
                        getDaysUntilDue(bill.dueDate) <= 7 && bill.status === 'pending' ? 'text-orange-600' : 'text-gray-500'
                      ]"
                    >
                      <i class="pi pi-calendar"></i>
                      到期日: {{ bill.dueDate }}
                      <span v-if="bill.status === 'pending'" class="ml-1">
                        ({{
                          getDaysUntilDue(bill.dueDate) < 0
                            ? `已逾期 ${Math.abs(getDaysUntilDue(bill.dueDate))} 天`
                            : getDaysUntilDue(bill.dueDate) === 0
                            ? '今天到期'
                            : `还有 ${getDaysUntilDue(bill.dueDate)} 天`
                        }})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="text-right">
                  <p class="text-2xl font-bold text-red-600">{{ formatCurrency(bill.amount) }}</p>
                </div>
                <div class="flex gap-2">
                  <Button
                    v-if="bill.status === 'pending'"
                    icon="pi pi-check"
                    class="p-button-rounded p-button-success p-button-text p-button-sm"
                    @click="markAsPaid(bill)"
                    title="标记为已支付"
                  />
                  <Button
                    v-if="bill.status === 'paid'"
                    icon="pi pi-undo"
                    class="p-button-rounded p-button-text p-button-sm"
                    @click="markAsPending(bill)"
                    title="标记为待处理"
                  />
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-text p-button-sm"
                    @click="openEditDialog(bill)"
                    title="编辑"
                  />
                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-text p-button-sm p-button-danger"
                    @click="deleteBill(bill)"
                    title="删除"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- 新增/编辑对话框 -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="isEdit ? '编辑账单' : '新增账单'"
      :modal="true"
      :style="{ width: '500px' }"
      :closable="false"
    >
      <div class="p-fluid space-y-4">
        <div class="grid">
          <div class="col-12">
            <label class="block mb-2 font-medium text-gray-700">账单名称 *</label>
            <InputText
              v-model="formData.name"
              placeholder="输入账单名称"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">金额 *</label>
            <InputNumber
              v-model="formData.amount"
              mode="currency"
              currency="CNY"
              :min="0"
              placeholder="输入金额"
              class="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">到期日</label>
            <Calendar
              v-model="formData.dueDate"
              :showIcon="true"
              dateFormat="yy-mm-dd"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">类型</label>
            <Dropdown
              v-model="formData.type"
              :options="typeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="选择类型"
              class="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <label class="block mb-2 font-medium text-gray-700">状态</label>
            <Dropdown
              v-model="formData.status"
              :options="[
                { label: '待处理', value: 'pending' },
                { label: '已支付', value: 'paid' }
              ]"
              optionLabel="label"
              optionValue="value"
              placeholder="选择状态"
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
          @click="saveBill"
        />
      </template>
    </Dialog>
  </div>
</template>
