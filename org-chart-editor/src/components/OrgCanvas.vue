<template>
  <div 
    ref="canvasRef"
    class="org-canvas"
    @mousedown="handleCanvasClick"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <svg class="connection-svg" :style="svgStyle">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#409eff" />
        </marker>
      </defs>
      
      <g v-for="conn in connections" :key="conn.id">
        <path
          :d="getConnectionPath(conn)"
          stroke="#409eff"
          stroke-width="2"
          fill="none"
          marker-end="url(#arrowhead)"
          class="connection-path"
          @click.stop="handleConnectionClick(conn.id)"
        />
        <path
          :d="getConnectionPath(conn)"
          stroke="transparent"
          stroke-width="12"
          fill="none"
          class="connection-hit-area"
          @click.stop="handleConnectionClick(conn.id)"
        />
      </g>
      
      <path
        v-if="tempConnection"
        :d="tempConnectionPath"
        stroke="#67c23a"
        stroke-width="2"
        stroke-dasharray="5,5"
        fill="none"
      />
    </svg>
    
    <div 
      v-for="node in nodes" 
      :key="node.id"
      class="node-wrapper"
      :style="getNodeStyle(node)"
      @mousedown.stop="handleNodeMouseDown($event, node)"
      @mouseenter="handleNodeHover(node.id, true)"
      @mouseleave="handleNodeHover(node.id, false)"
    >
      <OrgNodeComponent 
        :node="node"
        :is-selected="selectedNodeId === node.id"
        :is-connecting="isConnecting && connectionStartNodeId"
        :is-hovered="hoveredNodeId === node.id"
        :show-connect-points="showConnectPoints"
        @select="handleSelectNode(node.id)"
        @start-connect="handleStartConnect(node.id)"
        @end-connect="handleEndConnect(node.id)"
        @delete="handleDeleteNode(node.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { OrgNode, OrgConnection } from '../types'
import OrgNodeComponent from './OrgNode.vue'

const props = defineProps<{
  nodes: OrgNode[]
  connections: OrgConnection[]
  selectedNodeId: string | null
}>()

const emit = defineEmits<{
  (e: 'select-node', nodeId: string | null): void
  (e: 'move-node', payload: { id: string; x: number; y: number }): void
  (e: 'create-connection', connection: OrgConnection): void
  (e: 'delete-node', nodeId: string): void
  (e: 'delete-connection', connectionId: string): void
}>()

const canvasRef = ref<HTMLElement | null>(null)
const canvasOffset = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragNodeId = ref<string | null>(null)
const dragOffset = ref({ x: 0, y: 0 })
const isConnecting = ref(false)
const connectionStartNodeId = ref<string | null>(null)
const tempConnection = ref<{ fromX: number; fromY: number; toX: number; toY: number } | null>(null)
const hoveredNodeId = ref<string | null>(null)
const showConnectPoints = ref(false)

const NODE_WIDTH = 180
const NODE_HEIGHT = 80

const svgStyle = computed(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute' as const,
  top: 0,
  left: 0,
  pointerEvents: 'none'
}))

const tempConnectionPath = computed(() => {
  if (!tempConnection.value) return ''
  return getBezierPath(
    tempConnection.value.fromX,
    tempConnection.value.fromY,
    tempConnection.value.toX,
    tempConnection.value.toY
  )
})

function getNodeStyle(node: OrgNode) {
  return {
    position: 'absolute' as const,
    left: `${node.x}px`,
    top: `${node.y}px`,
    zIndex: props.selectedNodeId === node.id ? 10 : 1
  }
}

function getNodeCenter(nodeId: string) {
  const node = props.nodes.find(n => n.id === nodeId)
  if (!node) return { x: 0, y: 0 }
  return {
    x: node.x + NODE_WIDTH / 2,
    y: node.y + NODE_HEIGHT / 2
  }
}

function getNodeBottom(nodeId: string) {
  const node = props.nodes.find(n => n.id === nodeId)
  if (!node) return { x: 0, y: 0 }
  return {
    x: node.x + NODE_WIDTH / 2,
    y: node.y + NODE_HEIGHT
  }
}

function getNodeTop(nodeId: string) {
  const node = props.nodes.find(n => n.id === nodeId)
  if (!node) return { x: 0, y: 0 }
  return {
    x: node.x + NODE_WIDTH / 2,
    y: node.y
  }
}

function getBezierPath(x1: number, y1: number, x2: number, y2: number) {
  const dy = y2 - y1
  const controlOffset = Math.max(Math.abs(dy) / 2, 50)
  return `M ${x1} ${y1} C ${x1} ${y1 + controlOffset}, ${x2} ${y2 - controlOffset}, ${x2} ${y2}`
}

function getConnectionPath(conn: OrgConnection) {
  const fromPoint = getNodeBottom(conn.from)
  const toPoint = getNodeTop(conn.to)
  return getBezierPath(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y)
}

function updateCanvasOffset() {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  canvasOffset.value = { x: rect.left, y: rect.top }
}

function handleCanvasClick(e: MouseEvent) {
  if (e.target === canvasRef.value || (e.target as HTMLElement).classList.contains('org-canvas')) {
    emit('select-node', null)
    isConnecting.value = false
    connectionStartNodeId.value = null
    tempConnection.value = null
    showConnectPoints.value = false
  }
}

function handleNodeMouseDown(e: MouseEvent, node: OrgNode) {
  const target = e.target as HTMLElement
  if (target.closest('.connect-point') || target.closest('.delete-btn')) {
    return
  }
  
  emit('select-node', node.id)
  isDragging.value = true
  dragNodeId.value = node.id
  
  const clientX = e.clientX - canvasOffset.value.x
  const clientY = e.clientY - canvasOffset.value.y
  dragOffset.value = {
    x: clientX - node.x,
    y: clientY - node.y
  }
}

function handleMouseMove(e: MouseEvent) {
  const clientX = e.clientX - canvasOffset.value.x
  const clientY = e.clientY - canvasOffset.value.y
  
  if (isDragging.value && dragNodeId.value) {
    const newX = Math.max(0, clientX - dragOffset.value.x)
    const newY = Math.max(0, clientY - dragOffset.value.y)
    emit('move-node', {
      id: dragNodeId.value,
      x: newX,
      y: newY
    })
  }
  
  if (isConnecting.value && connectionStartNodeId.value) {
    const startPoint = getNodeBottom(connectionStartNodeId.value)
    tempConnection.value = {
      fromX: startPoint.x,
      fromY: startPoint.y,
      toX: clientX,
      toY: clientY
    }
  }
}

function handleMouseUp() {
  if (isDragging.value) {
    isDragging.value = false
    dragNodeId.value = null
  }
}

function handleSelectNode(nodeId: string) {
  emit('select-node', nodeId)
}

function handleStartConnect(nodeId: string) {
  isConnecting.value = true
  connectionStartNodeId.value = nodeId
  showConnectPoints.value = true
}

function handleEndConnect(nodeId: string) {
  if (isConnecting.value && connectionStartNodeId.value && connectionStartNodeId.value !== nodeId) {
    const newConnection: OrgConnection = {
      id: `conn_${Date.now()}`,
      from: connectionStartNodeId.value,
      to: nodeId
    }
    emit('create-connection', newConnection)
  }
  isConnecting.value = false
  connectionStartNodeId.value = null
  tempConnection.value = null
  showConnectPoints.value = false
}

function handleNodeHover(nodeId: string, isHovered: boolean) {
  hoveredNodeId.value = isHovered ? nodeId : null
}

function handleDeleteNode(nodeId: string) {
  emit('delete-node', nodeId)
}

function handleConnectionClick(connectionId: string) {
  emit('delete-connection', connectionId)
}

onMounted(() => {
  updateCanvasOffset()
  window.addEventListener('resize', updateCanvasOffset)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasOffset)
})
</script>

<style scoped>
.org-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(circle, #d0d0d0 1px, transparent 1px);
  background-size: 20px 20px;
  cursor: grab;
}

.org-canvas:active {
  cursor: grabbing;
}

.connection-svg {
  z-index: 1;
}

.connection-path {
  cursor: pointer;
  transition: stroke 0.2s;
}

.connection-path:hover {
  stroke: #f56c6c;
  stroke-width: 3px;
}

.connection-hit-area {
  cursor: pointer;
}

.node-wrapper {
  cursor: move;
  transition: transform 0.1s ease-out;
}

.node-wrapper:hover {
  z-index: 20 !important;
}
</style>
