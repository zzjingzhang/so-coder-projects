<script setup>
import { ref, reactive } from 'vue'
import Toolbar from '../components/Toolbar.vue'
import Sidebar from '../components/Sidebar.vue'
import BlockItem from '../components/BlockItem.vue'

const blocks = ref([
  {
    id: 1,
    type: 'heading',
    content: '欢迎使用块状编辑器',
    level: 1,
    styles: {
      color: '#1e293b',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'left'
    }
  },
  {
    id: 2,
    type: 'paragraph',
    content: '这是一个功能强大的块状编辑器，支持多种块类型，包括段落、标题、图片和引用块。您可以通过工具栏和侧边栏来管理和定制这些块。',
    styles: {
      color: '#475569',
      fontSize: '1rem',
      fontWeight: 'normal',
      textAlign: 'left'
    }
  },
  {
    id: 3,
    type: 'quote',
    content: '好的编辑器应该让写作变得简单而愉快。',
    author: '块状编辑器',
    styles: {
      color: '#64748b',
      fontSize: '1.125rem',
      fontWeight: 'italic',
      textAlign: 'left',
      borderColor: '#3b82f6'
    }
  }
])

const selectedBlock = ref(null)
const nextBlockId = ref(4)

const addBlock = (type) => {
  const newBlock = {
    id: nextBlockId.value++,
    type: type,
    content: '',
    styles: getDefaultStyles(type)
  }
  
  if (type === 'heading') {
    newBlock.level = 2
  } else if (type === 'quote') {
    newBlock.author = ''
  } else if (type === 'image') {
    newBlock.url = ''
    newBlock.alt = ''
  }
  
  blocks.value.push(newBlock)
  selectedBlock.value = newBlock
}

const getDefaultStyles = (type) => {
  const baseStyles = {
    color: '#475569',
    fontSize: '1rem',
    fontWeight: 'normal',
    textAlign: 'left'
  }
  
  if (type === 'heading') {
    return {
      ...baseStyles,
      color: '#1e293b',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    }
  } else if (type === 'quote') {
    return {
      ...baseStyles,
      color: '#64748b',
      fontSize: '1.125rem',
      fontWeight: 'italic',
      borderColor: '#3b82f6'
    }
  }
  
  return baseStyles
}

const deleteBlock = (id) => {
  const index = blocks.value.findIndex(b => b.id === id)
  if (index !== -1) {
    blocks.value.splice(index, 1)
    if (selectedBlock.value?.id === id) {
      selectedBlock.value = null
    }
  }
}

const selectBlock = (block) => {
  selectedBlock.value = block
}

const updateBlockStyles = (styles) => {
  if (selectedBlock.value) {
    selectedBlock.value.styles = { ...selectedBlock.value.styles, ...styles }
  }
}

const moveBlockUp = (id) => {
  const index = blocks.value.findIndex(b => b.id === id)
  if (index > 0) {
    const temp = blocks.value[index]
    blocks.value[index] = blocks.value[index - 1]
    blocks.value[index - 1] = temp
  }
}

const moveBlockDown = (id) => {
  const index = blocks.value.findIndex(b => b.id === id)
  if (index < blocks.value.length - 1) {
    const temp = blocks.value[index]
    blocks.value[index] = blocks.value[index + 1]
    blocks.value[index + 1] = temp
  }
}
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <Toolbar @add-block="addBlock" />
    
    <div class="flex flex-1 overflow-hidden">
      <Sidebar 
        :selected-block="selectedBlock" 
        @update-styles="updateBlockStyles"
      />
      
      <main class="flex-1 overflow-auto p-8">
        <div class="max-w-4xl mx-auto">
          <div 
            v-if="blocks.length === 0" 
            class="flex flex-col items-center justify-center h-64 text-gray-400"
          >
            <p class="text-lg mb-4">暂无内容</p>
            <p class="text-sm">点击上方工具栏添加块</p>
          </div>
          
          <div v-else class="space-y-4">
            <BlockItem
              v-for="block in blocks"
              :key="block.id"
              :block="block"
              :is-selected="selectedBlock?.id === block.id"
              @select="selectBlock"
              @delete="deleteBlock"
              @move-up="moveBlockUp"
              @move-down="moveBlockDown"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
