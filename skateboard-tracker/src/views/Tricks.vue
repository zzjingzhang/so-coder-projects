<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { mockTricks, trickCategories, difficultyLevelNames, difficultyLevelColors } from '@/mock/data'
import type { Trick, DifficultyLevel } from '@/types'

const tricks = ref<Trick[]>([...mockTricks])
const searchKeyword = ref('')
const filterCategory = ref('')
const filterDifficulty = ref<number | ''>('')
const filterMastered = ref<boolean | ''>('')

const dialogVisible = ref(false)
const isEdit = ref(false)
const loading = ref(false)

const formRef = ref<FormInstance>()

const defaultForm: Omit<Trick, 'id' | 'createdDate' | 'updatedDate'> = {
  name: '',
  difficulty: 1 as DifficultyLevel,
  category: '',
  description: '',
  mastered: false,
  masteryLevel: 0,
  tags: []
}

const form = reactive<Omit<Trick, 'id' | 'createdDate' | 'updatedDate'>>({ ...defaultForm })

const rules: FormRules = {
  name: [
    { required: true, message: '请输入技巧名称', trigger: 'blur' },
    { min: 2, max: 50, message: '名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  difficulty: [
    { required: true, message: '请选择难度等级', trigger: 'change' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
}

const filteredTricks = computed(() => {
  return tricks.value.filter(trick => {
    const matchKeyword = searchKeyword.value
      ? trick.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        trick.description.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        trick.tags.some(tag => tag.toLowerCase().includes(searchKeyword.value.toLowerCase()))
      : true
    
    const matchCategory = filterCategory.value ? trick.category === filterCategory.value : true
    const matchDifficulty = filterDifficulty.value !== '' ? trick.difficulty === filterDifficulty.value : true
    const matchMastered = filterMastered.value !== '' ? trick.mastered === filterMastered.value : true
    
    return matchKeyword && matchCategory && matchDifficulty && matchMastered
  })
})

const getDifficultyName = (level: number) => difficultyLevelNames[level] || '未知'
const getDifficultyType = (level: number) => difficultyLevelColors[level] || 'info'

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN')
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, defaultForm)
  dialogVisible.value = true
}

const handleEdit = (row: Trick) => {
  isEdit.value = true
  Object.assign(form, {
    name: row.name,
    difficulty: row.difficulty,
    category: row.category,
    description: row.description,
    mastered: row.mastered,
    masteryLevel: row.masteryLevel,
    tags: [...row.tags]
  })
  dialogVisible.value = true
}

const handleDelete = async (row: Trick) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除技巧「${row.name}」吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = tricks.value.findIndex(t => t.id === row.id)
    if (index > -1) {
      tricks.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  } catch {
    // 用户取消
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      
      try {
        if (isEdit.value) {
          const index = tricks.value.findIndex(t => t.id === (tricks.value as Trick[])[0]?.id)
          if (index > -1) {
            const trick = tricks.value[index]
            tricks.value[index] = {
              ...trick,
              ...form,
              updatedDate: new Date().toISOString().split('T')[0]
            }
          }
          ElMessage.success('更新成功')
        } else {
          const newTrick: Trick = {
            id: Date.now().toString(),
            ...form,
            createdDate: new Date().toISOString().split('T')[0],
            updatedDate: new Date().toISOString().split('T')[0]
          }
          tricks.value.unshift(newTrick)
          ElMessage.success('添加成功')
        }
        dialogVisible.value = false
      } finally {
        loading.value = false
      }
    }
  })
}

const resetFilters = () => {
  searchKeyword.value = ''
  filterCategory.value = ''
  filterDifficulty.value = ''
  filterMastered.value = ''
}
</script>

<template>
  <div class="tricks-page">
    <div class="page-header flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">技巧档案</h1>
        <p class="text-gray-500 mt-1">管理你掌握的滑板动作和技巧</p>
      </div>
      <el-button type="primary" @click="handleAdd">
        <el-icon class="mr-1"><Plus /></el-icon>
        添加技巧
      </el-button>
    </div>

    <el-card class="mb-6">
      <el-form :inline="true" :model="{ searchKeyword, filterCategory, filterDifficulty, filterMastered }">
        <el-form-item label="搜索">
          <el-input
            v-model="searchKeyword"
            placeholder="名称、描述、标签"
            clearable
            class="w-48"
          />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="filterCategory" placeholder="全部分类" clearable class="w-36">
            <el-option
              v-for="cat in trickCategories"
              :key="cat"
              :label="cat"
              :value="cat"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="难度">
          <el-select v-model="filterDifficulty" placeholder="全部难度" clearable class="w-32">
            <el-option
              v-for="(name, level) in difficultyLevelNames"
              :key="level"
              :label="name"
              :value="Number(level)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterMastered" placeholder="全部状态" clearable class="w-32">
            <el-option label="已掌握" :value="true" />
            <el-option label="学习中" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFilters">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table
        :data="filteredTricks"
        style="width: 100%"
        v-loading="loading"
        stripe
        :empty-text="searchKeyword || filterCategory || filterDifficulty || filterMastered ? '没有找到匹配的技巧' : '暂无技巧数据'"
      >
        <el-table-column prop="name" label="技巧名称" min-width="150">
          <template #default="{ row }">
            <div class="flex items-center">
              <span class="font-medium text-gray-800">{{ row.name }}</span>
              <el-tag
                v-if="row.mastered"
                type="success"
                size="small"
                class="ml-2"
                effect="dark"
              >
                已掌握
              </el-tag>
              <el-tag
                v-else
                type="info"
                size="small"
                class="ml-2"
              >
                学习中
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100">
          <template #default="{ row }">
            <el-tag :type="getDifficultyType(row.difficulty)" effect="light">
              {{ getDifficultyName(row.difficulty) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="masteryLevel" label="掌握程度" width="180">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-progress
                :percentage="row.masteryLevel"
                :stroke-width="10"
                :show-text="true"
                :color="row.masteryLevel >= 80 ? '#67c23a' : row.masteryLevel >= 60 ? '#409eff' : row.masteryLevel >= 40 ? '#e6a23c' : '#f56c6c'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="tags" label="标签" min-width="150">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags.slice(0, 3)"
              :key="tag"
              size="small"
              type="info"
              effect="plain"
              class="mr-1 mb-1"
            >
              {{ tag }}
            </el-tag>
            <el-tag v-if="row.tags.length > 3" size="small" type="info">
              +{{ row.tags.length - 3 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdDate" label="添加日期" width="120">
          <template #default="{ row }">
            {{ formatDate(row.createdDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑技巧' : '添加技巧'"
      v-model="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="mt-4"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入技巧名称" />
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="form.difficulty" placeholder="请选择难度" class="w-full">
            <el-option
              v-for="(name, level) in difficultyLevelNames"
              :key="level"
              :label="name"
              :value="Number(level) as DifficultyLevel"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类" class="w-full">
            <el-option
              v-for="cat in trickCategories"
              :key="cat"
              :label="cat"
              :value="cat"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入技巧描述"
          />
        </el-form-item>
        <el-form-item label="掌握程度">
          <el-slider
            v-model="form.masteryLevel"
            :min="0"
            :max="100"
            :step="5"
            show-input
            :show-input-controls="false"
            input-size="small"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="输入后按回车添加标签"
            class="w-full"
          >
            <el-option
              v-for="tag in ['基础', '进阶', '高级', '翻转', '转体', '杆上', '平衡', '跳跃', '必备']"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.mastered"
            active-text="已掌握"
            inactive-text="学习中"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.tricks-page {
  min-height: calc(100vh - 120px);
}
</style>
