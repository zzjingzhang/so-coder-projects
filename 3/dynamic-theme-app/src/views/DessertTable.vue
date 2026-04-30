<template>
  <div class="space-y-4">
    <el-card class="theme-transition">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <el-icon><Cake /></el-icon>
            <span class="font-semibold">甜点管理</span>
          </div>
          <div class="flex gap-2">
            <el-button type="primary" @click="handleAdd">
              <el-icon class="mr-1"><Plus /></el-icon>
              添加甜点
            </el-button>
            <el-button @click="handleReset">
              <el-icon class="mr-1"><Refresh /></el-icon>
              重置数据
            </el-button>
          </div>
        </div>
      </template>
      
      <el-table
        :data="desserts"
        style="width: 100%"
        :default-sort="{ prop: 'calories', order: 'descending' }"
        v-loading="loading"
        stripe
        border
      >
        <el-table-column
          prop="name"
          label="名称"
          sortable
          min-width="150"
        />
        <el-table-column
          prop="calories"
          label="卡路里"
          sortable
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="fat"
          label="脂肪 (g)"
          sortable
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="carbs"
          label="碳水化合物 (g)"
          sortable
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="protein"
          label="蛋白质 (g)"
          sortable
          min-width="120"
          align="center"
        />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <el-button type="primary" link @click="handleEdit(scope.row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button type="danger" link @click="handleDelete(scope.row)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑甜点' : '添加甜点'"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入甜点名称"
          />
        </el-form-item>
        <el-form-item label="卡路里" prop="calories">
          <el-input-number
            v-model="formData.calories"
            :min="0"
            :max="1000"
            style="width: 100%"
            placeholder="请输入卡路里"
          />
        </el-form-item>
        <el-form-item label="脂肪" prop="fat">
          <el-input-number
            v-model="formData.fat"
            :min="0"
            :max="100"
            :precision="1"
            style="width: 100%"
            placeholder="请输入脂肪含量"
          />
        </el-form-item>
        <el-form-item label="碳水化合物" prop="carbs">
          <el-input-number
            v-model="formData.carbs"
            :min="0"
            :max="200"
            :precision="1"
            style="width: 100%"
            placeholder="请输入碳水化合物含量"
          />
        </el-form-item>
        <el-form-item label="蛋白质" prop="protein">
          <el-input-number
            v-model="formData.protein"
            :min="0"
            :max="100"
            :precision="1"
            style="width: 100%"
            placeholder="请输入蛋白质含量"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <el-dialog
      v-model="resetDialogVisible"
      title="确认重置"
      width="400px"
    >
      <div class="flex items-center gap-3">
        <el-icon class="text-2xl text-warning"><Warning /></el-icon>
        <span>确定要重置为初始数据吗？所有修改将丢失。</span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReset">
            确定重置
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const dialogVisible = ref(false)
const resetDialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref(null)
const formRef = ref(null)

const initialDesserts = [
  { id: 1, name: '巧克力蛋糕', calories: 300, fat: 12.0, carbs: 45.0, protein: 5.0 },
  { id: 2, name: '草莓冰淇淋', calories: 200, fat: 8.0, carbs: 30.0, protein: 3.0 },
  { id: 3, name: '提拉米苏', calories: 350, fat: 15.0, carbs: 40.0, protein: 6.0 },
  { id: 4, name: '芒果慕斯', calories: 180, fat: 5.0, carbs: 35.0, protein: 2.0 },
  { id: 5, name: '芝士蛋糕', calories: 320, fat: 18.0, carbs: 35.0, protein: 8.0 },
  { id: 6, name: '苹果派', calories: 280, fat: 10.0, carbs: 45.0, protein: 3.0 },
]

const desserts = ref([])

const formData = reactive({
  name: '',
  calories: 100,
  fat: 5.0,
  carbs: 20.0,
  protein: 2.0
})

const rules = {
  name: [
    { required: true, message: '请输入甜点名称', trigger: 'blur' },
    { min: 2, max: 50, message: '名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  calories: [
    { required: true, message: '请输入卡路里', trigger: 'blur' },
    { type: 'number', min: 0, max: 1000, message: '卡路里范围 0-1000', trigger: 'blur' }
  ]
}

const resetForm = () => {
  formData.name = ''
  formData.calories = 100
  formData.fat = 5.0
  formData.carbs = 20.0
  formData.protein = 2.0
}

const handleAdd = () => {
  isEdit.value = false
  editingId.value = null
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  editingId.value = row.id
  formData.name = row.name
  formData.calories = row.calories
  formData.fat = row.fat
  formData.carbs = row.carbs
  formData.protein = row.protein
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除甜点 "${row.name}" 吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      const index = desserts.value.findIndex(item => item.id === row.id)
      if (index > -1) {
        desserts.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        const index = desserts.value.findIndex(item => item.id === editingId.value)
        if (index > -1) {
          desserts.value[index] = {
            ...desserts.value[index],
            ...formData
          }
          ElMessage.success('更新成功')
        }
      } else {
        const maxId = Math.max(...desserts.value.map(item => item.id), 0)
        desserts.value.push({
          id: maxId + 1,
          ...formData
        })
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}

const handleReset = () => {
  resetDialogVisible.value = true
}

const confirmReset = () => {
  desserts.value = JSON.parse(JSON.stringify(initialDesserts))
  resetDialogVisible.value = false
  ElMessage.success('数据已重置为初始状态')
}

onMounted(() => {
  desserts.value = JSON.parse(JSON.stringify(initialDesserts))
})
</script>
