<template>
  <div class="org-chart-editor">
    <header class="header">
      <div class="title">组织结构图编辑器</div>
    </header>
    <main class="main-content">
      <aside class="sidebar">
        <Toolbar 
          :nodes="nodes" 
          :connections="connections"
          @onAddNode="handleAddNode" 
          @onSave="handleSave" 
          @onLoad="handleLoad"
          @onImportData="handleImportData"
        />
      </aside>
      <section class="canvas-container">
        <OrgCanvas 
          :nodes="nodes" 
          :connections="connections"
          :selectedNodeId="selectedNodeId"
          @select-node="handleSelectNode"
          @move-node="handleMoveNode"
          @create-connection="handleCreateConnection"
          @delete-node="handleDeleteNode"
          @delete-connection="handleDeleteConnection"
        />
      </section>
      <aside class="property-panel" v-if="selectedNode">
        <PropertyPanel 
          :node="selectedNode" 
          @update-node="handleUpdateNode"
          @delete-node="handleDeleteSelectedNode"
        />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { OrgNode, OrgConnection, OrgChartData } from './types'
import OrgCanvas from './components/OrgCanvas.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import Toolbar from './components/Toolbar.vue'
import { saveToLocalStorage, loadFromLocalStorage } from './utils/dataUtils'

const nodes = ref<OrgNode[]>([])
const connections = ref<OrgConnection[]>([])
const selectedNodeId = ref<string | null>(null)

const selectedNode = computed(() => {
  return nodes.value.find(node => node.id === selectedNodeId.value) || null
})

const handleAddNode = () => {
  const newNode: OrgNode = {
    id: `node_${Date.now()}`,
    name: '新职位',
    title: '请输入职称',
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 200,
    description: '',
    department: ''
  }
  nodes.value.push(newNode)
  ElMessage.success('已添加新节点')
}

const handleSelectNode = (nodeId: string | null) => {
  selectedNodeId.value = nodeId
}

const handleMoveNode = (payload: { id: string; x: number; y: number }) => {
  const node = nodes.value.find(n => n.id === payload.id)
  if (node) {
    node.x = payload.x
    node.y = payload.y
  }
}

const handleCreateConnection = (connection: OrgConnection) => {
  const exists = connections.value.some(
    c => c.from === connection.from && c.to === connection.to
  )
  if (!exists && connection.from !== connection.to) {
    connections.value.push(connection)
    ElMessage.success('已建立连接关系')
  }
}

const handleUpdateNode = (updatedNode: OrgNode) => {
  const index = nodes.value.findIndex(n => n.id === updatedNode.id)
  if (index !== -1) {
    nodes.value[index] = { ...updatedNode }
  }
}

const handleDeleteNode = (nodeId: string) => {
  nodes.value = nodes.value.filter(n => n.id !== nodeId)
  connections.value = connections.value.filter(
    c => c.from !== nodeId && c.to !== nodeId
  )
  if (selectedNodeId.value === nodeId) {
    selectedNodeId.value = null
  }
  ElMessage.success('已删除节点')
}

const handleDeleteSelectedNode = () => {
  if (selectedNodeId.value) {
    handleDeleteNode(selectedNodeId.value)
  }
}

const handleDeleteConnection = (connectionId: string) => {
  connections.value = connections.value.filter(c => c.id !== connectionId)
  ElMessage.success('已删除连接关系')
}

const handleSave = () => {
  saveToLocalStorage(nodes.value, connections.value)
  ElMessage.success('已保存到本地存储')
}

const handleLoad = () => {
  const data = loadFromLocalStorage()
  if (data) {
    nodes.value = data.nodes
    connections.value = data.connections
    selectedNodeId.value = null
    ElMessage.success('已从本地存储加载')
  } else {
    ElMessage.warning('没有找到保存的数据')
  }
}

const handleImportData = (data: OrgChartData) => {
  if (data.nodes && data.connections) {
    nodes.value = data.nodes
    connections.value = data.connections
    selectedNodeId.value = null
  }
}
</script>

<style scoped>
.org-chart-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  min-height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.title {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.main-content {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  min-width: 240px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.canvas-container {
  flex: 1;
  min-width: 0;
  background: #f5f7fa;
  position: relative;
  overflow: hidden;
}

.property-panel {
  width: 300px;
  min-width: 300px;
  background: white;
  border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  overflow-x: hidden;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
    min-width: 200px;
  }
  
  .property-panel {
    width: 260px;
    min-width: 260px;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    min-width: 100%;
    min-height: 80px;
    height: auto;
    max-height: 120px;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    overflow-y: auto;
  }
  
  .property-panel {
    width: 100%;
    min-width: 100%;
    max-height: 40vh;
    border-left: none;
    border-top: 1px solid #e0e0e0;
  }
}
</style>
