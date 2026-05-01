<template>
  <div class="block-editor">
    <div ref="editorRef" class="editor-container">
      <div 
        v-for="(block, index) in blocks" 
        :key="block.id" 
        :data-id="block.id"
        class="block-wrapper group flex items-start gap-1 py-1 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div class="block-handle flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
          <button 
            class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-400 cursor-pointer"
            v-tooltip.bottom="'点击添加块'"
            @click.stop="showAddMenu(index)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button 
            class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-400 cursor-grab active:cursor-grabbing"
            v-tooltip.bottom="'拖拽排序'"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="9" cy="6" r="1.5" />
              <circle cx="15" cy="6" r="1.5" />
              <circle cx="9" cy="12" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="18" r="1.5" />
              <circle cx="15" cy="18" r="1.5" />
            </svg>
          </button>
        </div>

        <div class="block-content flex-1 min-w-0">
          <BlockHeading 
            v-if="block.type === 'heading1'" 
            :modelValue="block" 
            :level="1"
            @update="(b) => updateBlock(index, b)"
            @delete="() => deleteBlock(index)"
          />
          <BlockHeading 
            v-else-if="block.type === 'heading2'" 
            :modelValue="block" 
            :level="2"
            @update="(b) => updateBlock(index, b)"
            @delete="() => deleteBlock(index)"
          />
          <BlockHeading 
            v-else-if="block.type === 'heading3'" 
            :modelValue="block" 
            :level="3"
            @update="(b) => updateBlock(index, b)"
            @delete="() => deleteBlock(index)"
          />
          <BlockParagraph 
            v-else-if="block.type === 'paragraph'" 
            :modelValue="block"
            @update="(b) => updateBlock(index, b)"
            @delete="() => deleteBlock(index)"
            @add-block-after="() => addBlockAfter(index)"
            @open-add-menu="() => showAddMenu(index)"
          />
          <BlockTodo 
            v-else-if="block.type === 'todo'" 
            :modelValue="block"
            @update="(b) => updateBlock(index, b)"
            @delete="() => deleteBlock(index)"
            @add-block-after="() => addBlockAfter(index)"
          />
          <BlockEmbed 
            v-else-if="block.type === 'embed'" 
            :modelValue="block"
            @update="(b) => updateBlock(index, b)"
          />
          <BlockTable 
            v-else-if="block.type === 'table'" 
            :modelValue="block"
            @update="(b) => updateBlock(index, b)"
          />
          <BlockDivider 
            v-else-if="block.type === 'divider'" 
          />
        </div>

        <div class="block-actions opacity-0 group-hover:opacity-100 transition-opacity pt-1">
          <button 
            class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-400"
            v-tooltip.bottom="'转换块类型'"
            @click.stop="showConvertMenu(index)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <button 
            class="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 text-gray-400 hover:text-red-500"
            v-tooltip.bottom="'删除块'"
            @click.stop="deleteBlock(index)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        class="flex items-center gap-2 py-4 text-gray-400 cursor-text hover:text-gray-600"
        @click="addBlockAtEnd"
      >
        <span class="text-sm">点击添加新块，或输入 / 选择块类型</span>
      </div>
    </div>

    <div 
      v-if="addMenuVisible" 
      class="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-72 max-h-80 overflow-y-auto"
      :style="addMenuPosition"
      @click.stop
    >
      <div class="p-2 border-b border-gray-100">
        <p class="text-xs text-gray-400 uppercase tracking-wider font-medium px-2">基础块</p>
      </div>
      <div class="p-1">
        <button 
          v-for="item in blockMenuItems" 
          :key="item.type"
          class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-left transition-colors"
          @click="addBlock(item.type)"
        >
          <div class="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
            <component :is="item.icon" class="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">{{ item.label }}</p>
            <p class="text-xs text-gray-500">{{ item.description }}</p>
          </div>
        </button>
      </div>
    </div>

    <div 
      v-if="convertMenuVisible" 
      class="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-64 max-h-80 overflow-y-auto"
      :style="convertMenuPosition"
      @click.stop
    >
      <div class="p-2 border-b border-gray-100">
        <p class="text-xs text-gray-400 uppercase tracking-wider font-medium px-2">转换为</p>
      </div>
      <div class="p-1">
        <button 
          v-for="item in convertMenuItems" 
          :key="item.type"
          class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-left transition-colors"
          @click="convertBlock(item.type)"
        >
          <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
            <component :is="item.icon" class="w-4 h-4 text-gray-600" />
          </div>
          <p class="text-sm font-medium text-gray-800">{{ item.label }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue'
import Sortable from 'sortablejs'
import type { SortableEvent } from 'sortablejs'
import type { Block, BlockType } from '@/types'
import BlockHeading from './blocks/BlockHeading.vue'
import BlockParagraph from './blocks/BlockParagraph.vue'
import BlockTodo from './blocks/BlockTodo.vue'
import BlockEmbed from './blocks/BlockEmbed.vue'
import BlockTable from './blocks/BlockTable.vue'
import BlockDivider from './blocks/BlockDivider.vue'

const props = defineProps<{
  blocks: Block[]
}>()

const emit = defineEmits<{
  'update:blocks': [blocks: Block[]]
}>()

const editorRef = ref<HTMLElement | null>(null)
const addMenuVisible = ref(false)
const convertMenuVisible = ref(false)
const addMenuPosition = ref({ top: '0px', left: '0px' })
const convertMenuPosition = ref({ top: '0px', left: '0px' })
const targetBlockIndex = ref(-1)

const TextIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6h16M4 12h16M4 18h7' })
    ])
  }
}

const HeadingIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' })
    ])
  }
}

const CheckIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const LinkIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' })
    ])
  }
}

const TableIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 10h18M10 3v18m4-18v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z' })
    ])
  }
}

const DividerIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 12H4' })
    ])
  }
}

const blockMenuItems = [
  { type: 'paragraph' as BlockType, label: '文本', description: '普通文本段落', icon: TextIcon },
  { type: 'heading1' as BlockType, label: '一级标题', description: '大号标题', icon: HeadingIcon },
  { type: 'heading2' as BlockType, label: '二级标题', description: '中号标题', icon: HeadingIcon },
  { type: 'heading3' as BlockType, label: '三级标题', description: '小号标题', icon: HeadingIcon },
  { type: 'todo' as BlockType, label: '待办事项', description: '带复选框的任务列表', icon: CheckIcon },
  { type: 'embed' as BlockType, label: '嵌入', description: '嵌入视频、网页或图片', icon: LinkIcon },
  { type: 'table' as BlockType, label: '表格', description: '添加表格', icon: TableIcon },
  { type: 'divider' as BlockType, label: '分割线', description: '添加水平分割线', icon: DividerIcon },
]

const convertMenuItems = [
  { type: 'paragraph' as BlockType, label: '文本', icon: TextIcon },
  { type: 'heading1' as BlockType, label: '一级标题', icon: HeadingIcon },
  { type: 'heading2' as BlockType, label: '二级标题', icon: HeadingIcon },
  { type: 'heading3' as BlockType, label: '三级标题', icon: HeadingIcon },
  { type: 'todo' as BlockType, label: '待办事项', icon: CheckIcon },
]

let sortable: Sortable | null = null

function generateId(): string {
  return 'block_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

function createBlock(type: BlockType, content = ''): Block {
  const config: Block['config'] = {}
  if (type === 'todo') {
    config.checked = false
  }
  if (type === 'table') {
    config.rows = 3
    config.cols = 3
  }
  if (type === 'embed') {
    config.embedType = 'iframe'
  }
  return {
    id: generateId(),
    type,
    content,
    config
  }
}

function updateBlock(index: number, block: Block) {
  const newBlocks = [...props.blocks]
  newBlocks[index] = block
  emit('update:blocks', newBlocks)
}

function deleteBlock(index: number) {
  if (props.blocks.length <= 1) {
    const newBlocks = [createBlock('paragraph')]
    emit('update:blocks', newBlocks)
    return
  }
  const newBlocks = props.blocks.filter((_, i) => i !== index)
  emit('update:blocks', newBlocks)
}

function showAddMenu(index: number) {
  targetBlockIndex.value = index
  addMenuVisible.value = true
  convertMenuVisible.value = false
  
  setTimeout(() => {
    const wrapper = editorRef.value?.querySelectorAll('.block-wrapper')[index]
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect()
      addMenuPosition.value = {
        top: `${rect.bottom + 4}px`,
        left: `${Math.max(10, rect.left)}px`
      }
    }
  }, 10)
}

function showConvertMenu(index: number) {
  const blockType = props.blocks[index]?.type
  if (['embed', 'table', 'divider'].includes(blockType)) {
    return
  }
  
  targetBlockIndex.value = index
  convertMenuVisible.value = true
  addMenuVisible.value = false
  
  setTimeout(() => {
    const wrapper = editorRef.value?.querySelectorAll('.block-wrapper')[index]
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect()
      convertMenuPosition.value = {
        top: `${rect.bottom + 4}px`,
        left: `${Math.max(10, rect.left)}px`
      }
    }
  }, 10)
}

function addBlock(type: BlockType) {
  const newBlock = createBlock(type)
  const newBlocks = [...props.blocks]
  
  if (targetBlockIndex.value >= 0) {
    newBlocks.splice(targetBlockIndex.value + 1, 0, newBlock)
  } else {
    newBlocks.push(newBlock)
  }
  
  emit('update:blocks', newBlocks)
  addMenuVisible.value = false
  targetBlockIndex.value = -1
}

function addBlockAfter(index: number) {
  const newBlock = createBlock('paragraph')
  const newBlocks = [...props.blocks]
  newBlocks.splice(index + 1, 0, newBlock)
  emit('update:blocks', newBlocks)
}

function addBlockAtEnd() {
  const newBlock = createBlock('paragraph')
  const newBlocks = [...props.blocks, newBlock]
  emit('update:blocks', newBlocks)
}

function convertBlock(type: BlockType) {
  if (targetBlockIndex.value < 0) return
  
  const newBlocks = [...props.blocks]
  const currentBlock = newBlocks[targetBlockIndex.value]
  
  newBlocks[targetBlockIndex.value] = {
    ...currentBlock,
    type,
    config: type === 'todo' ? { checked: false } : {}
  }
  
  emit('update:blocks', newBlocks)
  convertMenuVisible.value = false
  targetBlockIndex.value = -1
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.fixed.z-50')) {
    addMenuVisible.value = false
    convertMenuVisible.value = false
  }
}

onMounted(() => {
  if (editorRef.value) {
    sortable = new Sortable(editorRef.value.querySelector('.editor-container') as HTMLElement, {
      animation: 150,
      handle: '.block-handle',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      direction: 'vertical',
      onEnd: (evt: SortableEvent) => {
        const { oldIndex, newIndex } = evt
        if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
          const newBlocks = [...props.blocks]
          const [movedBlock] = newBlocks.splice(oldIndex, 1)
          newBlocks.splice(newIndex, 0, movedBlock)
          emit('update:blocks', newBlocks)
        }
      }
    })
  }
  
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  sortable?.destroy()
  document.removeEventListener('click', handleClickOutside)
})
</script>
