<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface DataItem {
  id: number
  content: string
}

const columnCount = 4
const totalItems = 1000
const itemHeight = 40

const containerRef = ref<HTMLDivElement | null>(null)

const columnWidths = ref<number[]>(Array(columnCount).fill(25))
const scrollOffset = ref(0)
const containerHeight = ref(0)

const generateChineseText = (length: number): string => {
  const chars = '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩壹体率宾归王鸣凤在竹白驹食场化被草木赖及万方盖此身发四大五常恭惟鞠养岂敢毁伤女慕贞洁男效才良知过必改得能莫忘罔谈彼短靡恃己长信使可覆器欲难量墨悲丝染诗赞羔羊景行维贤克念作圣德建名立形端表正空谷传声虚堂习听祸因恶积福缘善庆尺璧非宝寸阴是竞资父事君曰严与敬孝当竭力忠则尽命临深履薄夙兴温凊似兰斯馨如松之盛川流不息渊澄取映容止若思言辞安定笃初诚美慎终宜令荣业所基籍甚无竟学优登仕摄职从政存以甘棠去而益咏'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const generateData = (): DataItem[] => {
  const data: DataItem[] = []
  for (let i = 1; i <= totalItems; i++) {
    data.push({
      id: i,
      content: generateChineseText(40)
    })
  }
  return data
}

const allData = ref<DataItem[]>(generateData())

const itemsPerColumn = computed(() => {
  const rows = Math.ceil(containerHeight.value / itemHeight)
  return Math.max(rows, 1)
})

const totalVisibleItems = computed(() => itemsPerColumn.value * columnCount)

const columnData = computed(() => {
  const startIndex = Math.floor(scrollOffset.value / itemHeight) * columnCount
  const maxStart = Math.max(0, totalItems - totalVisibleItems.value)
  const actualStart = Math.min(startIndex, maxStart)
  
  const columns: DataItem[][] = Array(columnCount).fill(null).map(() => [])
  
  for (let i = 0; i < totalVisibleItems.value && actualStart + i < totalItems; i++) {
    const dataIndex = actualStart + i
    const columnIndex = i % columnCount
    columns[columnIndex].push(allData.value[dataIndex])
  }
  
  return columns
})

const isResizing = ref(false)
const resizeColumnIndex = ref(-1)
const startX = ref(0)
const startWidths = ref<number[]>([])

const startResize = (index: number, event: MouseEvent) => {
  if (index >= columnCount - 1) return
  event.preventDefault()
  event.stopPropagation()
  isResizing.value = true
  resizeColumnIndex.value = index
  startX.value = event.clientX
  startWidths.value = [...columnWidths.value]
  
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

const handleResize = (event: MouseEvent) => {
  if (!isResizing.value) return
  
  const deltaX = event.clientX - startX.value
  const containerWidth = containerRef.value?.clientWidth || window.innerWidth
  const deltaPercent = (deltaX / containerWidth) * 100
  
  const newWidths = [...startWidths.value]
  const currentWidth = newWidths[resizeColumnIndex.value]
  const nextWidth = newWidths[resizeColumnIndex.value + 1]
  
  const minWidth = 10
  if (currentWidth + deltaPercent >= minWidth && nextWidth - deltaPercent >= minWidth) {
    newWidths[resizeColumnIndex.value] = currentWidth + deltaPercent
    newWidths[resizeColumnIndex.value + 1] = nextWidth - deltaPercent
    columnWidths.value = newWidths
  }
}

const stopResize = () => {
  isResizing.value = false
  resizeColumnIndex.value = -1
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

const handleWheel = (event: WheelEvent) => {
  event.preventDefault()
  const delta = event.deltaY > 0 ? itemHeight : -itemHeight
  const maxScroll = Math.max(0, (totalItems / columnCount - itemsPerColumn.value) * itemHeight)
  scrollOffset.value = Math.max(0, Math.min(scrollOffset.value + delta, maxScroll))
}

const updateContainerSize = () => {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight
  }
}

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)
  
  const container = containerRef.value
  if (container) {
    container.addEventListener('wheel', handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerSize)
  
  const container = containerRef.value
  if (container) {
    container.removeEventListener('wheel', handleWheel)
  }
  
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
})

watch(columnWidths, () => {}, { deep: true })
</script>

<template>
  <div class="w-full h-screen bg-gray-900 flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 shrink-0">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold text-white">多栏数据展示</h1>
        <span class="text-sm text-gray-400">共 {{ totalItems }} 条数据</span>
      </div>
      <div class="flex items-center gap-6">
        <a-button type="primary" class="bg-blue-600 hover:bg-blue-700 border-none !flex !items-center !justify-center">
          <span class="text-white">刷新数据</span>
        </a-button>
        <a-button class="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300 !flex !items-center !justify-center">
          <span>导出数据</span>
        </a-button>
      </div>
    </div>
    
    <!-- Main Content -->
    <div 
      ref="containerRef" 
      class="flex-1 flex overflow-hidden select-none"
      :class="{ 'cursor-col-resize': isResizing }"
    >
      <div 
        v-for="(column, colIndex) in columnData" 
        :key="colIndex" 
        class="h-full overflow-hidden flex flex-col"
        :style="{ width: `${columnWidths[colIndex]}%` }"
      >
        <!-- Column Header -->
        <div class="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 shrink-0">
          <span class="text-white font-semibold">第 {{ colIndex + 1 }} 栏</span>
        </div>
        
        <!-- Column Content -->
        <div class="flex-1 overflow-hidden">
          <div 
            v-for="item in column" 
            :key="item.id"
            class="flex items-start px-4 py-2 border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150"
            :style="{ height: `${itemHeight}px` }"
          >
            <span class="text-blue-400 font-mono text-sm mr-3 shrink-0 min-w-[40px]">
              {{ item.id }}.
            </span>
            <span class="text-gray-300 text-sm leading-tight overflow-hidden whitespace-nowrap text-ellipsis flex-1" :title="item.content">
              {{ item.content }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Resizable Handles -->
      <div 
        v-for="(_, index) in columnCount - 1" 
        :key="`handle-${index}`"
        class="w-3 cursor-col-resize shrink-0 relative flex items-center justify-center group"
        @mousedown="(e: MouseEvent) => startResize(index, e)"
      >
        <div 
          class="w-1 h-full bg-gray-700 transition-colors duration-150 rounded-full"
          :class="{ 'bg-blue-500': isResizing && resizeColumnIndex === index, 'group-hover:bg-blue-500': !isResizing }"
        ></div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="h-10 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-6 shrink-0">
      <div class="flex items-center gap-4 text-sm text-gray-400">
        <span>当前显示: {{ Math.floor(scrollOffset / itemHeight) * columnCount + 1 }} - {{ Math.min(Math.floor(scrollOffset / itemHeight) * columnCount + totalVisibleItems, totalItems) }} 条</span>
        <span>|</span>
        <span>每栏显示: {{ itemsPerColumn }} 条</span>
      </div>
      <div class="flex items-center gap-2">
        <a-button size="small" class="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300">
          <span class="text-xs">上一页</span>
        </a-button>
        <span class="text-sm text-gray-400 px-2">
          {{ Math.floor(scrollOffset / (itemsPerColumn * itemHeight)) + 1 }} / {{ Math.ceil(totalItems / totalVisibleItems) }}
        </span>
        <a-button size="small" class="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300">
          <span class="text-xs">下一页</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-none {
  user-select: none;
}

.cursor-col-resize {
  cursor: col-resize;
}
</style>
