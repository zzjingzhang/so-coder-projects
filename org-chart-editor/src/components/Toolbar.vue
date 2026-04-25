<template>
  <div class="toolbar">
    <div class="toolbar-section">
      <div class="section-title">操作</div>
      <el-button type="primary" :icon="Plus" class="toolbar-btn" @click="$emit('onAddNode')">
        添加节点
      </el-button>
    </div>
    
    <div class="toolbar-section">
      <div class="section-title">数据管理</div>
      <div class="button-group">
        <el-button :icon="Download" class="toolbar-btn" @click="$emit('onSave')">
          保存
        </el-button>
        <el-button :icon="Upload" class="toolbar-btn" @click="$emit('onLoad')">
          加载
        </el-button>
      </div>
      
      <div class="file-actions">
        <el-button :icon="DocumentAdd" class="toolbar-btn" @click="handleExport">
          导出JSON
        </el-button>
        <el-upload
          :auto-upload="false"
          :show-file-list="false"
          accept=".json"
          :on-change="handleFileChange"
        >
          <el-button :icon="FolderAdd" class="toolbar-btn">
            导入JSON
          </el-button>
        </el-upload>
      </div>
    </div>
    
    <div class="toolbar-section">
      <div class="section-title">操作提示</div>
      <div class="tips">
        <p>• 点击节点可选中</p>
        <p>• 拖拽节点可移动位置</p>
        <p>• 点击节点下方<span class="highlight">↓</span>连接点，再点击另一个节点上方<span class="highlight">↑</span>连接点可建立上下级关系</p>
        <p>• 点击连接线可删除关系</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Download, Upload, DocumentAdd, FolderAdd } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { exportJson, importJson } from '../utils/dataUtils'
import type { OrgChartData } from '../types'

defineProps<{
  nodes: any[]
  connections: any[]
}>()

const emit = defineEmits<{
  (e: 'onAddNode'): void
  (e: 'onSave'): void
  (e: 'onLoad'): void
  (e: 'onImportData', data: OrgChartData): void
}>()

function handleExport() {
  ElMessage.success('导出功能已准备就绪')
}

async function handleFileChange(file: any) {
  const data = await importJson(file.raw)
  if (data) {
    emit('onImportData', data)
    ElMessage.success('导入成功')
  } else {
    ElMessage.error('文件格式错误')
  }
}
</script>

<style scoped>
.toolbar {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.toolbar-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #909399;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.toolbar-btn {
  width: 100%;
}

.button-group,
.file-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-actions :deep(.el-upload) {
  width: 100%;
}

.file-actions :deep(.el-upload .el-button) {
  width: 100%;
}

.tips {
  font-size: 12px;
  color: #606266;
  line-height: 1.8;
}

.tips p {
  margin: 0;
  padding: 2px 0;
}

.highlight {
  color: #409eff;
  font-weight: bold;
  font-size: 14px;
}
</style>
