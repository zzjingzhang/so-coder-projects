<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NestedMenuItem from '../components/NestedMenuItem.vue'

const contextMenuVisible = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })

const showContextMenu = (e) => {
  e.preventDefault()
  e.stopPropagation()
  console.log('右键点击，显示菜单')
  contextMenuPosition.value = { x: e.clientX, y: e.clientY }
  contextMenuVisible.value = true
}

const hideContextMenu = (e) => {
  // 如果点击的是菜单内部，不关闭
  if (e && e.target && e.target.closest('.context-menu-container')) {
    return
  }
  contextMenuVisible.value = false
}

const handleMenuItemClick = (itemName) => {
  console.log(`点击菜单项: ${itemName}`)
  alert(`您点击了: ${itemName}`)
  contextMenuVisible.value = false
}

const handleKeydown = (e) => {
  console.log('键盘事件:', e.key)
  if (e.key === 'Escape' && contextMenuVisible.value) {
    contextMenuVisible.value = false
  }
}

onMounted(() => {
  console.log('Demo 页面挂载，绑定全局事件')
  document.addEventListener('click', hideContextMenu)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', hideContextMenu)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 cursor-default"
    @contextmenu="showContextMenu"
  >
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        NestedMenuItem 组件演示
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        右键点击任意位置打开上下文菜单，体验无限深度的嵌套菜单功能。
        同时支持键盘导航：右箭头打开子菜单，左箭头关闭，Escape 键隐藏菜单。
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">操作提示</h2>
      <ul class="text-gray-600 space-y-2">
        <li class="flex items-start">
          <span class="text-purple-600 mr-2">→</span>
          <span>右键点击打开菜单</span>
        </li>
        <li class="flex items-start">
          <span class="text-purple-600 mr-2">→</span>
          <span>悬停或点击展开子菜单</span>
        </li>
        <li class="flex items-start">
          <span class="text-purple-600 mr-2">→</span>
          <span>使用方向键导航</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- 上下文菜单 -->
  <Teleport to="body">
    <div
      v-if="contextMenuVisible"
      class="context-menu-container fixed z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg min-w-48 py-1"
      :style="{ left: `${contextMenuPosition.x}px`, top: `${contextMenuPosition.y}px` }"
      @click.stop
    >
      <NestedMenuItem label="新建" @click="handleMenuItemClick('新建')" />
      <NestedMenuItem label="打开" @click="handleMenuItemClick('打开')" />
      
      <NestedMenuItem label="导出">
        <NestedMenuItem label="PDF" @click="handleMenuItemClick('导出 PDF')" />
        <NestedMenuItem label="Word" @click="handleMenuItemClick('导出 Word')" />
        <NestedMenuItem label="图片">
          <NestedMenuItem label="PNG" @click="handleMenuItemClick('导出 PNG')" />
          <NestedMenuItem label="JPG" @click="handleMenuItemClick('导出 JPG')" />
          <NestedMenuItem label="SVG" @click="handleMenuItemClick('导出 SVG')" />
        </NestedMenuItem>
      </NestedMenuItem>
      
      <div class="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
      
      <NestedMenuItem label="设置">
        <NestedMenuItem label="常规" @click="handleMenuItemClick('常规设置')" />
        <NestedMenuItem label="外观">
          <NestedMenuItem label="主题">
            <NestedMenuItem label="浅色" @click="handleMenuItemClick('浅色主题')" />
            <NestedMenuItem label="深色" @click="handleMenuItemClick('深色主题')" />
            <NestedMenuItem label="自动" @click="handleMenuItemClick('自动主题')" />
          </NestedMenuItem>
          <NestedMenuItem label="字体" @click="handleMenuItemClick('字体设置')" />
        </NestedMenuItem>
        <NestedMenuItem label="高级" @click="handleMenuItemClick('高级设置')" />
      </NestedMenuItem>
      
      <div class="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
      
      <NestedMenuItem label="帮助" @click="handleMenuItemClick('帮助')" />
      <NestedMenuItem label="退出" @click="handleMenuItemClick('退出')" />
    </div>
  </Teleport>
</template>
