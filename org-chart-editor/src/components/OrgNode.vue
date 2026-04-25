<template>
  <div 
    class="org-node"
    :class="{
      'is-selected': isSelected,
      'is-hovered': isHovered,
      'is-connecting': isConnecting
    }"
    @click.stop="$emit('select')"
  >
    <div class="node-header">
      <div class="node-avatar">
        <el-avatar :size="32" :icon="UserFilled" v-if="!node.avatar" />
        <el-avatar :size="32" :src="node.avatar" v-else />
      </div>
      <div class="node-info">
        <div class="node-name">{{ node.name }}</div>
        <div class="node-title">{{ node.title }}</div>
      </div>
      <div class="node-actions" v-if="isSelected || isHovered">
        <el-button 
          type="danger" 
          size="small" 
          circle 
          :icon="Delete"
          class="delete-btn"
          @click.stop="$emit('delete')"
        />
      </div>
    </div>
    
    <div class="node-footer" v-if="node.department">
      <span class="dept-label">{{ node.department }}</span>
    </div>
    
    <div 
      v-if="showConnectPoints"
      class="connect-point top"
      @click.stop="$emit('end-connect')"
    >
      <el-icon><ArrowUp /></el-icon>
    </div>
    <div 
      v-if="isSelected || showConnectPoints"
      class="connect-point bottom"
      @click.stop="$emit('start-connect')"
    >
      <el-icon><ArrowDown /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import type { OrgNode } from '../types'

defineProps<{
  node: OrgNode
  isSelected: boolean
  isConnecting: boolean
  isHovered: boolean
  showConnectPoints: boolean
}>()

defineEmits<{
  (e: 'select'): void
  (e: 'start-connect'): void
  (e: 'end-connect'): void
  (e: 'delete'): void
}>()
</script>

<style scoped>
.org-node {
  width: 180px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.org-node:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.org-node.is-selected {
  border-color: #409eff;
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.3);
}

.org-node.is-hovered {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.node-header {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 10px;
}

.node-avatar {
  flex-shrink: 0;
}

.node-info {
  flex: 1;
  min-width: 0;
}

.node-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-title {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-actions {
  position: absolute;
  top: 8px;
  right: 8px;
}

.delete-btn {
  width: 20px !important;
  height: 20px !important;
  padding: 0 !important;
  opacity: 0.7;
}

.delete-btn:hover {
  opacity: 1;
}

.node-footer {
  padding: 6px 12px;
  background: #f5f7fa;
  border-top: 1px solid #ebeef5;
}

.dept-label {
  font-size: 11px;
  color: #909399;
  font-weight: 500;
}

.connect-point {
  position: absolute;
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  left: 50%;
  transform: translateX(-50%);
}

.connect-point:hover {
  background: #409eff;
  transform: translateX(-50%) scale(1.2);
}

.connect-point:hover .el-icon {
  color: white;
}

.connect-point.top {
  top: -12px;
}

.connect-point.bottom {
  bottom: -12px;
}

.connect-point .el-icon {
  font-size: 12px;
  color: #409eff;
}
</style>
