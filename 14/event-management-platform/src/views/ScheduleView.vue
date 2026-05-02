<template>
  <div class="schedule-view py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-cold-gray-900 mb-2">日程安排</h1>
        <p class="text-cold-gray-600">管理您的活动日程，轻松规划和安排各类活动。</p>
      </div>

      <!-- 工具栏 -->
      <div class="bg-white rounded-xl shadow-sm border border-cold-gray-200 p-4 mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex items-center gap-4">
            <el-button 
              type="primary" 
              class="bg-accent-500 hover:bg-accent-600 border-none"
              @click="showAddDialog = true"
            >
              <span class="mr-2">+</span> 添加活动
            </el-button>
            <el-date-picker
              v-model="selectedDate"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="w-48"
            />
          </div>
          <div class="flex items-center gap-4">
            <el-input
              v-model="searchQuery"
              placeholder="搜索活动..."
              class="w-64"
              clearable
            >
              <template #prefix>
                <el-icon class="el-input__icon"><search /></el-icon>
              </template>
            </el-input>
            <el-select v-model="filterStatus" placeholder="筛选状态" clearable class="w-40">
              <el-option label="全部" value="" />
              <el-option label="进行中" value="active" />
              <el-option label="筹备中" value="planning" />
              <el-option label="已完成" value="completed" />
              <el-option label="已取消" value="cancelled" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 日历视图和活动列表 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 日历视图 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-cold-gray-200 overflow-hidden">
            <div class="p-4 border-b border-cold-gray-200 bg-cold-gray-50">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-cold-gray-900">
                  {{ currentMonth }} {{ currentYear }}
                </h2>
                <div class="flex gap-2">
                  <el-button size="small" @click="prevMonth">
                    <el-icon><arrow-left /></el-icon>
                  </el-button>
                  <el-button size="small" @click="nextMonth">
                    <el-icon><arrow-right /></el-icon>
                  </el-button>
                  <el-button size="small" @click="goToToday">今天</el-button>
                </div>
              </div>
            </div>
            <div class="p-4">
              <!-- 星期标题 -->
              <div class="grid grid-cols-7 gap-1 mb-2">
                <div 
                  v-for="day in weekDays" 
                  :key="day" 
                  class="text-center text-sm font-medium text-cold-gray-500 py-2"
                >
                  {{ day }}
                </div>
              </div>
              <!-- 日期格子 -->
              <div class="grid grid-cols-7 gap-1">
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  class="aspect-square p-2 rounded-lg cursor-pointer transition-colors"
                  :class="getDayClasses(day)"
                  @click="selectDay(day)"
                >
                  <div class="text-sm font-medium" :class="getDayNumberClasses(day)">
                    {{ day.date }}
                  </div>
                  <div class="mt-1">
                    <div
                      v-for="(event, eventIndex) in getEventsForDay(day)"
                      :key="eventIndex"
                      class="text-xs truncate mb-1 px-1 py-0.5 rounded"
                      :class="getEventTagClass(event.status)"
                    >
                      {{ event.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 活动列表 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-cold-gray-200 overflow-hidden h-full">
            <div class="p-4 border-b border-cold-gray-200 bg-cold-gray-50">
              <h2 class="text-lg font-semibold text-cold-gray-900">
                活动列表
                <span class="text-sm font-normal text-cold-gray-500 ml-2">
                  ({{ filteredEvents.length }} 个活动)
                </span>
              </h2>
            </div>
            <div class="p-4 max-h-[600px] overflow-y-auto">
              <div v-if="filteredEvents.length === 0" class="text-center py-8">
                <div class="text-4xl mb-4">📅</div>
                <p class="text-cold-gray-500">暂无活动</p>
                <el-button 
                  type="primary" 
                  class="mt-4 bg-accent-500 hover:bg-accent-600 border-none"
                  @click="showAddDialog = true"
                >
                  添加第一个活动
                </el-button>
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="event in filteredEvents"
                  :key="event.id"
                  class="p-4 rounded-lg border border-cold-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  @click="viewEvent(event)"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-cold-gray-900">{{ event.title }}</h3>
                    <el-tag :type="getTagType(event.status)" size="small">
                      {{ getStatusText(event.status) }}
                    </el-tag>
                  </div>
                  <p class="text-sm text-cold-gray-600 mb-3 line-clamp-2">
                    {{ event.description }}
                  </p>
                  <div class="flex flex-col gap-1 text-sm text-cold-gray-500">
                    <div class="flex items-center">
                      <el-icon class="mr-2"><calendar /></el-icon>
                      <span>{{ event.date }} {{ event.startTime }} - {{ event.endTime }}</span>
                    </div>
                    <div class="flex items-center">
                      <el-icon class="mr-2"><location /></el-icon>
                      <span>{{ event.location }}</span>
                    </div>
                    <div class="flex items-center">
                      <el-icon class="mr-2"><user /></el-icon>
                      <span>{{ event.participants }} 位参与者</span>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-4">
                    <el-button size="small" @click.stop="editEvent(event)">
                      编辑
                    </el-button>
                    <el-button size="small" type="danger" @click.stop="deleteEvent(event)">
                      删除
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加/编辑活动对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="isEditMode ? '编辑活动' : '添加活动'"
      width="500px"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        class="mt-4"
      >
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入活动标题" />
        </el-form-item>
        <el-form-item label="活动描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入活动描述"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="活动日期" prop="date">
          <el-date-picker
            v-model="formData.date"
            type="date"
            placeholder="选择活动日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker
            v-model="formData.startTime"
            placeholder="选择开始时间"
            format="HH:mm"
            value-format="HH:mm"
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-time-picker
            v-model="formData.endTime"
            placeholder="选择结束时间"
            format="HH:mm"
            value-format="HH:mm"
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="活动地点" prop="location">
          <el-input v-model="formData.location" placeholder="请输入活动地点" />
        </el-form-item>
        <el-form-item label="参与者人数" prop="participants">
          <el-input-number v-model="formData.participants" :min="1" :max="1000" class="w-full" />
        </el-form-item>
        <el-form-item label="活动状态" prop="status">
          <el-select v-model="formData.status" placeholder="选择活动状态" class="w-full">
            <el-option label="进行中" value="active" />
            <el-option label="筹备中" value="planning" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm" class="bg-accent-500 hover:bg-accent-600 border-none">
          {{ isEditMode ? '保存修改' : '添加活动' }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 查看活动详情对话框 -->
    <el-dialog
      v-model="showViewDialog"
      title="活动详情"
      width="500px"
    >
      <div v-if="selectedEvent" class="space-y-4">
        <div>
          <h3 class="text-xl font-bold text-cold-gray-900">{{ selectedEvent.title }}</h3>
          <el-tag :type="getTagType(selectedEvent.status)" class="mt-2">
            {{ getStatusText(selectedEvent.status) }}
          </el-tag>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-cold-gray-700 mb-1">活动描述</h4>
          <p class="text-cold-gray-600">{{ selectedEvent.description }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-semibold text-cold-gray-700 mb-1">活动日期</h4>
            <p class="text-cold-gray-600">{{ selectedEvent.date }}</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-cold-gray-700 mb-1">活动时间</h4>
            <p class="text-cold-gray-600">{{ selectedEvent.startTime }} - {{ selectedEvent.endTime }}</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-cold-gray-700 mb-1">活动地点</h4>
            <p class="text-cold-gray-600">{{ selectedEvent.location }}</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-cold-gray-700 mb-1">参与者人数</h4>
            <p class="text-cold-gray-600">{{ selectedEvent.participants }} 人</p>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="showViewDialog = false">关闭</el-button>
        <el-button type="primary" @click="editFromView" class="bg-accent-500 hover:bg-accent-600 border-none">
          编辑活动
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Search, ArrowLeft, ArrowRight, Calendar, Location, User } from '@element-plus/icons-vue'

// 类型定义
interface Event {
  id: number
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  participants: number
  status: 'active' | 'planning' | 'completed' | 'cancelled'
}

interface CalendarDay {
  date: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

// 响应式数据
const selectedDate = ref<string>('')
const searchQuery = ref<string>('')
const filterStatus = ref<string>('')
const showAddDialog = ref<boolean>(false)
const showViewDialog = ref<boolean>(false)
const isEditMode = ref<boolean>(false)
const selectedEvent = ref<Event | null>(null)
const editingEventId = ref<number | null>(null)
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
  title: '',
  description: '',
  date: '',
  startTime: '09:00',
  endTime: '17:00',
  location: '',
  participants: 10,
  status: 'planning' as const
})

// 表单验证规则
const formRules: FormRules = {
  title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
  date: [{ required: true, message: '请选择活动日期', trigger: 'change' }],
  location: [{ required: true, message: '请输入活动地点', trigger: 'blur' }]
}

// 模拟活动数据
const events = ref<Event[]>([
  {
    id: 1,
    title: '技术峰会 2026',
    description: '汇聚业界顶尖技术专家，探讨最新技术趋势和最佳实践。',
    date: '2026-06-15',
    startTime: '09:00',
    endTime: '18:00',
    location: '北京国际会议中心',
    participants: 500,
    status: 'active'
  },
  {
    id: 2,
    title: '产品发布会',
    description: '全新产品线发布，展示创新成果，邀请媒体和合作伙伴参加。',
    date: '2026-07-20',
    startTime: '14:00',
    endTime: '17:00',
    location: '上海世博中心',
    participants: 200,
    status: 'planning'
  },
  {
    id: 3,
    title: '年度培训课程',
    description: '为团队成员提供专业技能培训，提升整体业务能力。',
    date: '2026-08-10',
    startTime: '09:00',
    endTime: '17:00',
    location: '线上会议',
    participants: 100,
    status: 'planning'
  },
  {
    id: 4,
    title: '客户答谢会',
    description: '感谢一年来客户的支持与信任，加强客户关系。',
    date: '2026-12-25',
    startTime: '18:00',
    endTime: '21:00',
    location: '广州白云国际会议中心',
    participants: 150,
    status: 'planning'
  },
  {
    id: 5,
    title: '季度业务回顾',
    description: '总结上季度业务成果，规划下季度工作重点。',
    date: '2026-06-30',
    startTime: '14:00',
    endTime: '17:00',
    location: '公司会议室 A',
    participants: 30,
    status: 'active'
  }
])

// 日历相关数据
const currentDate = ref<Date>(new Date())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 计算属性
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => {
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return months[currentDate.value.getMonth()]
})

const filteredEvents = computed(() => {
  let result = [...events.value]
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    )
  }
  
  // 状态过滤
  if (filterStatus.value) {
    result = result.filter(event => event.status === filterStatus.value)
  }
  
  // 日期过滤
  if (selectedDate.value) {
    result = result.filter(event => event.date === selectedDate.value)
  }
  
  // 按日期排序
  return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

// 日历天数计算
const calendarDays = computed((): CalendarDay[] => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  const days: CalendarDay[] = []
  
  // 上个月的日期
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonthLastDay - i
    days.push({
      date,
      month: month - 1,
      year,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  // 当前月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDay = new Date(year, month, i)
    const isToday = currentDay.getTime() === today.getTime()
    const isSelected = selectedDate.value === `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    
    days.push({
      date: i,
      month,
      year,
      isCurrentMonth: true,
      isToday,
      isSelected
    })
  }
  
  // 下个月的日期
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      month: month + 1,
      year,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  return days
})

// 方法
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
  selectedDate.value = formatDate(new Date())
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getDayClasses = (day: CalendarDay): string => {
  const classes: string[] = []
  
  if (!day.isCurrentMonth) {
    classes.push('bg-cold-gray-50', 'text-cold-gray-400')
  } else {
    classes.push('bg-white', 'hover:bg-cold-gray-50')
  }
  
  if (day.isToday) {
    classes.push('ring-2', 'ring-accent-500', 'bg-accent-50')
  }
  
  if (day.isSelected) {
    classes.push('bg-accent-100', 'ring-2', 'ring-accent-500')
  }
  
  return classes.join(' ')
}

const getDayNumberClasses = (day: CalendarDay): string => {
  const classes: string[] = []
  
  if (!day.isCurrentMonth) {
    classes.push('text-cold-gray-400')
  } else {
    classes.push('text-cold-gray-900')
  }
  
  if (day.isToday) {
    classes.push('font-bold', 'text-accent-600')
  }
  
  return classes.join(' ')
}

const getEventsForDay = (day: CalendarDay): Event[] => {
  if (!day.isCurrentMonth) return []
  
  const year = day.year
  const month = String(day.month + 1).padStart(2, '0')
  const date = String(day.date).padStart(2, '0')
  const dayStr = `${year}-${month}-${date}`
  
  return events.value.filter(event => event.date === dayStr)
}

const getEventTagClass = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'planning':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-cold-gray-100 text-cold-gray-800'
  }
}

const getTagType = (status: string): '' | 'success' | 'warning' | 'info' | 'danger' => {
  switch (status) {
    case 'active':
      return 'success'
    case 'planning':
      return 'warning'
    case 'completed':
      return 'info'
    case 'cancelled':
      return 'danger'
    default:
      return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'active':
      return '进行中'
    case 'planning':
      return '筹备中'
    case 'completed':
      return '已完成'
    case 'cancelled':
      return '已取消'
    default:
      return status
  }
}

const selectDay = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return
  
  const year = day.year
  const month = String(day.month + 1).padStart(2, '0')
  const date = String(day.date).padStart(2, '0')
  selectedDate.value = `${year}-${month}-${date}`
}

const viewEvent = (event: Event) => {
  selectedEvent.value = event
  showViewDialog.value = true
}

const editEvent = (event: Event) => {
  isEditMode.value = true
  editingEventId.value = event.id
  formData.title = event.title
  formData.description = event.description
  formData.date = event.date
  formData.startTime = event.startTime
  formData.endTime = event.endTime
  formData.location = event.location
  formData.participants = event.participants
  formData.status = event.status
  showViewDialog.value = false
  showAddDialog.value = true
}

const editFromView = () => {
  if (selectedEvent.value) {
    editEvent(selectedEvent.value)
  }
}

const deleteEvent = (event: Event) => {
  ElMessageBox.confirm(
    `确定要删除活动"${event.title}"吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = events.value.findIndex(e => e.id === event.id)
    if (index !== -1) {
      events.value.splice(index, 1)
      ElMessage.success('活动已删除')
    }
  }).catch(() => {
    // 用户取消
  })
}

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.date = ''
  formData.startTime = '09:00'
  formData.endTime = '17:00'
  formData.location = ''
  formData.participants = 10
  formData.status = 'planning'
  isEditMode.value = false
  editingEventId.value = null
}

const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEditMode.value && editingEventId.value) {
        // 编辑模式
        const index = events.value.findIndex(e => e.id === editingEventId.value)
        if (index !== -1) {
          events.value[index] = {
            ...events.value[index],
            ...formData
          }
          ElMessage.success('活动已更新')
        }
      } else {
        // 添加模式
        const newEvent: Event = {
          id: Date.now(),
          ...formData
        }
        events.value.push(newEvent)
        ElMessage.success('活动已添加')
      }
      
      showAddDialog.value = false
      resetForm()
    }
  })
}

// 生命周期
onMounted(() => {
  selectedDate.value = formatDate(new Date())
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>