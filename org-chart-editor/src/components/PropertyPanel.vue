<template>
  <div class="property-panel">
    <div class="panel-header">
      <span class="panel-title">节点属性</span>
    </div>
    
    <el-form :model="formData" label-position="top" class="property-form">
      <el-form-item label="姓名">
        <el-input 
          v-model="formData.name" 
          placeholder="请输入姓名"
          @change="handleUpdate"
        />
      </el-form-item>
      
      <el-form-item label="职称">
        <el-input 
          v-model="formData.title" 
          placeholder="请输入职称"
          @change="handleUpdate"
        />
      </el-form-item>
      
      <el-form-item label="部门">
        <el-input 
          v-model="formData.department" 
          placeholder="请输入部门"
          @change="handleUpdate"
        />
      </el-form-item>
      
      <el-form-item label="电话">
        <el-input 
          v-model="formData.phone" 
          placeholder="请输入电话"
          @change="handleUpdate"
        />
      </el-form-item>
      
      <el-form-item label="邮箱">
        <el-input 
          v-model="formData.email" 
          placeholder="请输入邮箱"
          @change="handleUpdate"
        />
      </el-form-item>
      
      <el-form-item label="描述">
        <el-input 
          v-model="formData.description" 
          type="textarea"
          :rows="4"
          placeholder="请输入描述"
          @change="handleUpdate"
        />
      </el-form-item>
    </el-form>
    
    <div class="panel-footer">
      <el-button type="danger" @click="handleDelete" :icon="Delete">
        删除节点
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { OrgNode } from '../types'

const props = defineProps<{
  node: OrgNode
}>()

const emit = defineEmits<{
  (e: 'update-node', node: OrgNode): void
  (e: 'delete-node'): void
}>()

const formData = ref<Partial<OrgNode>>({
  name: '',
  title: '',
  department: '',
  phone: '',
  email: '',
  description: ''
})

watch(() => props.node, (newNode) => {
  formData.value = {
    name: newNode.name || '',
    title: newNode.title || '',
    department: newNode.department || '',
    phone: newNode.phone || '',
    email: newNode.email || '',
    description: newNode.description || ''
  }
}, { immediate: true, deep: true })

function handleUpdate() {
  const updatedNode: OrgNode = {
    ...props.node,
    ...formData.value
  } as OrgNode
  emit('update-node', updatedNode)
}

function handleDelete() {
  emit('delete-node')
}
</script>

<style scoped>
.property-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e4e7ed;
  background: #fafafa;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.property-form {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

:deep(.el-form-item) {
  margin-bottom: 18px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  padding-bottom: 6px;
}

.panel-footer {
  padding: 16px 20px;
  border-top: 1px solid #e4e7ed;
  background: #fafafa;
}
</style>
