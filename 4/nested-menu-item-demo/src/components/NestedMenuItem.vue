<script setup>
import { ref, computed, useSlots, watch, onUnmounted } from 'vue'

/**
 * @typedef {Object} Props
 * @property {boolean} [parentMenuOpen=false] - 父菜单是否打开
 * @property {string} label - 菜单标签
 * @property {import('vue').Component} [rightIcon] - 右侧图标，默认为箭头
 * @property {Object} [containerProps={}] - 容器元素的 props
 * @property {Object} [menuProps={}] - 子菜单的 props
 * @property {boolean} [button=false] - 是否作为按钮
 * @property {string} [tag='div'] - 容器标签
 */

const props = defineProps({
  parentMenuOpen: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  rightIcon: {
    type: [Object, Function],
    default: null
  },
  containerProps: {
    type: Object,
    default: () => ({})
  },
  menuProps: {
    type: Object,
    default: () => ({})
  },
  button: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  }
})

const emit = defineEmits(['click', 'mouseenter', 'mouseleave', 'focus', 'blur'])

const isOpen = ref(false)
const containerRef = ref(null)
const menuRef = ref(null)
const isHovering = ref(false)
let closeTimer = null

const slots = useSlots()

const hasChildren = computed(() => {
  return !!slots.default
})

// 清理定时器
const clearCloseTimer = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

// 打开菜单
const openMenu = () => {
  clearCloseTimer()
  if (hasChildren.value) {
    console.log(`打开子菜单: ${props.label}`)
    isOpen.value = true
  }
}

// 关闭菜单（带延迟）
const closeMenu = (delay = 200) => {
  clearCloseTimer()
  if (hasChildren.value) {
    closeTimer = setTimeout(() => {
      console.log(`关闭子菜单: ${props.label}`)
      isOpen.value = false
    }, delay)
  }
}

// 立即关闭菜单
const closeMenuNow = () => {
  clearCloseTimer()
  isOpen.value = false
}

// 切换菜单
const toggleMenu = () => {
  if (hasChildren.value) {
    if (isOpen.value) {
      closeMenuNow()
    } else {
      openMenu()
    }
  }
}

// 鼠标进入
const handleMouseEnter = (e) => {
  console.log(`鼠标进入: ${props.label}, hasChildren: ${hasChildren.value}`)
  isHovering.value = true
  clearCloseTimer()
  
  // 只要有子菜单，悬停时就打开
  if (hasChildren.value) {
    openMenu()
  }
  
  emit('mouseenter', e)
}

// 鼠标离开
const handleMouseLeave = (e) => {
  console.log(`鼠标离开: ${props.label}`)
  isHovering.value = false
  
  // 延迟关闭，允许用户移动到子菜单
  if (hasChildren.value) {
    closeMenu(300)
  }
  
  emit('mouseleave', e)
}

// 子菜单鼠标进入
const handleSubmenuMouseEnter = () => {
  console.log(`子菜单鼠标进入: ${props.label}`)
  clearCloseTimer()
}

// 子菜单鼠标离开
const handleSubmenuMouseLeave = () => {
  console.log(`子菜单鼠标离开: ${props.label}`)
  closeMenu(300)
}

// 聚焦
const handleFocus = (e) => {
  emit('focus', e)
}

// 失焦
const handleBlur = (e) => {
  emit('blur', e)
}

// 点击
const handleClick = (e) => {
  console.log(`点击菜单项: ${props.label}, hasChildren: ${hasChildren.value}`)
  e.stopPropagation()
  
  if (!hasChildren.value) {
    // 没有子菜单，触发点击事件
    emit('click', e)
  } else {
    // 有子菜单，切换打开/关闭
    toggleMenu()
  }
}

// 键盘事件
const handleKeydown = (e) => {
  console.log(`键盘事件: ${e.key}, 菜单项: ${props.label}`)
  
  switch (e.key) {
    case 'ArrowRight':
      if (hasChildren.value) {
        e.preventDefault()
        e.stopPropagation()
        openMenu()
      }
      break
    case 'ArrowLeft':
      if (isOpen.value) {
        e.preventDefault()
        e.stopPropagation()
        closeMenuNow()
      }
      break
    case 'Escape':
      e.preventDefault()
      e.stopPropagation()
      closeMenuNow()
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      e.stopPropagation()
      handleClick(e)
      break
  }
}

// 计算类名
const containerClasses = computed(() => {
  const base = [
    'relative',
    'flex',
    'items-center',
    'justify-between',
    'px-4',
    'py-2',
    'cursor-pointer',
    'transition-colors',
    'duration-150',
    'outline-none',
    'text-gray-700',
    'dark:text-gray-200',
    'select-none'
  ]

  // 悬停和聚焦样式
  if (isHovering.value || isOpen.value) {
    base.push(
      'bg-gray-100',
      'dark:bg-gray-800'
    )
  }

  // 合并用户自定义类
  if (props.containerProps.class) {
    base.push(props.containerProps.class)
  }

  return base.join(' ')
})

const menuClasses = computed(() => {
  const base = [
    'absolute',
    'top-0',
    'left-full',
    'ml-1',
    'min-w-48',
    'bg-white',
    'dark:bg-gray-900',
    'border',
    'border-gray-200',
    'dark:border-gray-700',
    'rounded-md',
    'shadow-lg',
    'z-50',
    'py-1'
  ]

  if (props.menuProps.class) {
    base.push(props.menuProps.class)
  }

  return base.join(' ')
})

// 监听 parentMenuOpen 变化
watch(() => props.parentMenuOpen, (newVal) => {
  if (!newVal) {
    // 父菜单关闭时，子菜单也关闭
    closeMenuNow()
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  clearCloseTimer()
})
</script>

<template>
  <div class="nested-menu-item-wrapper">
    <!-- 菜单项容器 -->
    <component
      :is="button ? 'button' : tag"
      ref="containerRef"
      :class="containerClasses"
      :tabindex="0"
      role="menuitem"
      :aria-haspopup="hasChildren ? 'true' : 'false'"
      :aria-expanded="isOpen"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick"
      @keydown="handleKeydown"
      v-bind="containerProps"
    >
      <span>{{ label }}</span>
      <!-- 右侧箭头图标 -->
      <component
        v-if="hasChildren"
        :is="rightIcon || 'div'"
        class="w-4 h-4 ml-2 text-gray-500 flex-shrink-0"
      >
        <svg
          v-if="!rightIcon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </component>
    </component>

    <!-- 子菜单 -->
    <div
      v-if="hasChildren && isOpen"
      ref="menuRef"
      :class="menuClasses"
      role="menu"
      @mouseenter="handleSubmenuMouseEnter"
      @mouseleave="handleSubmenuMouseLeave"
      v-bind="menuProps"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* 子菜单过渡动画 */
.nested-menu-item-wrapper {
  position: relative;
}

/* 确保子菜单显示 */
[role="menu"] {
  display: block;
  animation: slideIn 0.15s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
