<script setup>
import { NButton, NButtonGroup, NIcon, NSelect, NDivider, NTooltip } from 'naive-ui'
import { 
  BrushOutline, 
  SquareOutline, 
  EllipseOutline, 
  TextOutline, 
  HandLeftOutline,
  ImagesOutline,
  DownloadOutline,
  ArrowUndoOutline,
  ArrowRedoOutline,
  CloseOutline,
  ChevronUpOutline,
  ChevronDownOutline
} from '@vicons/ionicons5'

const props = defineProps({
  activeTool: {
    type: String,
    default: 'brush'
  },
  toolSettings: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['tool-change', 'settings-change', 'import-image', 'export-image'])

const tools = [
  { id: 'brush', label: '画笔', icon: BrushOutline },
  { id: 'eraser', label: '橡皮擦', icon: CloseOutline },
  { id: 'rectangle', label: '矩形', icon: SquareOutline },
  { id: 'circle', label: '圆形', icon: EllipseOutline },
  { id: 'line', label: '线条', icon: ChevronUpOutline },
  { id: 'text', label: '文本', icon: TextOutline },
  { id: 'select', label: '选择', icon: HandLeftOutline }
]

function handleToolClick(toolId) {
  emit('tool-change', toolId)
}

function isToolActive(toolId) {
  return props.activeTool === toolId
}
</script>

<template>
  <div class="flex items-center gap-2">
    <NButtonGroup>
      <NButton @click="() => emit('undo')">
        <NIcon><ArrowUndoOutline /></NIcon>
      </NButton>
      <NButton @click="() => emit('redo')">
        <NIcon><ArrowRedoOutline /></NIcon>
      </NButton>
    </NButtonGroup>

    <NDivider vertical />

    <NButtonGroup>
      <NButton
        v-for="tool in tools"
        :key="tool.id"
        :type="isToolActive(tool.id) ? 'primary' : 'default'"
        @click="handleToolClick(tool.id)"
      >
        <NTooltip :trigger="'hover'" :placement="'bottom'">
          <template #trigger>
            <NIcon><component :is="tool.icon" /></NIcon>
          </template>
          <span>{{ tool.label }}</span>
        </NTooltip>
      </NButton>
    </NButtonGroup>

    <NDivider vertical />

    <NButtonGroup>
      <NButton @click="() => emit('import-image')">
        <NIcon><ImagesOutline /></NIcon>
        <span class="ml-1">导入</span>
      </NButton>
      <NButton type="primary" @click="() => emit('export-image')">
        <NIcon><DownloadOutline /></NIcon>
        <span class="ml-1">导出</span>
      </NButton>
    </NButtonGroup>
  </div>
</template>

<style scoped>
</style>
