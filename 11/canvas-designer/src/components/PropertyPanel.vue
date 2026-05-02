<script setup>
import { ref, watch, computed } from 'vue'
import { NInput, NSelect, NColorPicker, NSlider, NText, NDivider, NSpace, NCheckbox } from 'naive-ui'

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

const emit = defineEmits(['settings-change'])

const brushColor = ref('#000000')
const brushSize = ref(5)
const fillColor = ref('#000000')
const strokeColor = ref('#000000')
const strokeWidth = ref(2)
const fillEnabled = ref(true)
const textContent = ref('')
const fontFamily = ref('Arial')
const fontSize = ref(24)
const textColor = ref('#000000')

const fontOptions = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Microsoft YaHei', value: 'Microsoft YaHei' }
]

watch(() => props.toolSettings, (newSettings) => {
  if (newSettings.brush) {
    brushColor.value = newSettings.brush.color || brushColor.value
    brushSize.value = newSettings.brush.size || brushSize.value
  }
  if (newSettings.shape) {
    fillColor.value = newSettings.shape.fillColor || fillColor.value
    strokeColor.value = newSettings.shape.strokeColor || strokeColor.value
    strokeWidth.value = newSettings.shape.strokeWidth || strokeWidth.value
    fillEnabled.value = newSettings.shape.fillEnabled !== undefined ? newSettings.shape.fillEnabled : fillEnabled.value
  }
  if (newSettings.text) {
    textContent.value = newSettings.text.content || textContent.value
    fontFamily.value = newSettings.text.fontFamily || fontFamily.value
    fontSize.value = newSettings.text.fontSize || fontSize.value
    textColor.value = newSettings.text.color || textColor.value
  }
}, { deep: true })

function updateBrushSettings() {
  emit('settings-change', {
    brush: {
      color: brushColor.value,
      size: brushSize.value
    }
  })
}

function updateShapeSettings() {
  emit('settings-change', {
    shape: {
      fillColor: fillColor.value,
      strokeColor: strokeColor.value,
      strokeWidth: strokeWidth.value,
      fillEnabled: fillEnabled.value
    }
  })
}

function updateTextSettings() {
  emit('settings-change', {
    text: {
      content: textContent.value,
      fontFamily: fontFamily.value,
      fontSize: fontSize.value,
      color: textColor.value
    }
  })
}

watch(brushColor, updateBrushSettings)
watch(brushSize, updateBrushSettings)
watch(fillColor, updateShapeSettings)
watch(strokeColor, updateShapeSettings)
watch(strokeWidth, updateShapeSettings)
watch(fillEnabled, updateShapeSettings)
watch(textContent, updateTextSettings)
watch(fontFamily, updateTextSettings)
watch(fontSize, updateTextSettings)
watch(textColor, updateTextSettings)
</script>

<template>
  <div class="property-panel">
    <!-- 画笔工具设置 -->
    <div v-if="activeTool === 'brush' || activeTool === 'eraser'" class="space-y-4">
      <NText type="primary" class="text-sm font-medium block mb-2">
        {{ activeTool === 'brush' ? '画笔设置' : '橡皮擦设置' }}
      </NText>
      
      <NSpace vertical class="w-full">
        <div>
          <NText depth="3" class="text-xs block mb-1">颜色</NText>
          <div class="w-full">
            <NColorPicker v-model:value="brushColor" />
          </div>
        </div>
        
        <div>
          <NText depth="3" class="text-xs block mb-1">大小: {{ brushSize }}px</NText>
          <NSlider 
            v-model:value="brushSize" 
            :min="1" 
            :max="50" 
            :step="1"
          />
        </div>
      </NSpace>
    </div>

    <!-- 形状工具设置 -->
    <div v-if="activeTool === 'rectangle' || activeTool === 'circle' || activeTool === 'line'" class="space-y-4">
      <NText type="primary" class="text-sm font-medium block mb-2">
        形状设置
      </NText>
      
      <NSpace vertical class="w-full">
        <NCheckbox v-model:checked="fillEnabled" v-if="activeTool !== 'line'">
          填充颜色
        </NCheckbox>
        
        <div v-if="fillEnabled && activeTool !== 'line'">
          <NText depth="3" class="text-xs block mb-1">填充颜色</NText>
          <div class="w-full">
            <NColorPicker v-model:value="fillColor" />
          </div>
        </div>
        
        <div>
          <NText depth="3" class="text-xs block mb-1">描边颜色</NText>
          <div class="w-full">
            <NColorPicker v-model:value="strokeColor" />
          </div>
        </div>
        
        <div>
          <NText depth="3" class="text-xs block mb-1">描边宽度: {{ strokeWidth }}px</NText>
          <NSlider 
            v-model:value="strokeWidth" 
            :min="1" 
            :max="20" 
            :step="1"
          />
        </div>
      </NSpace>
    </div>

    <!-- 文本工具设置 -->
    <div v-if="activeTool === 'text'" class="space-y-4">
      <NText type="primary" class="text-sm font-medium block mb-2">
        文本设置
      </NText>
      
      <NSpace vertical class="w-full">
        <div>
          <NText depth="3" class="text-xs block mb-1">文本内容</NText>
          <NInput 
            v-model:value="textContent" 
            placeholder="输入文本内容..."
            :rows="2"
            type="textarea"
          />
        </div>
        
        <div>
          <NText depth="3" class="text-xs block mb-1">字体</NText>
          <NSelect 
            v-model:value="fontFamily" 
            :options="fontOptions"
            placeholder="选择字体"
          />
        </div>
        
        <div>
          <NText depth="3" class="text-xs block mb-1">字号: {{ fontSize }}px</NText>
          <NSlider 
            v-model:value="fontSize" 
            :min="8" 
            :max="72" 
            :step="1"
          />
        </div>
        
        <div>
          <NText depth="3" class="text-xs block mb-1">颜色</NText>
          <div class="w-full">
            <NColorPicker v-model:value="textColor" />
          </div>
        </div>
      </NSpace>
    </div>

    <!-- 选择工具提示 -->
    <div v-if="activeTool === 'select'" class="space-y-4">
      <NText type="primary" class="text-sm font-medium block mb-2">
        选择工具
      </NText>
      <NText depth="3" class="text-xs">
        点击画布上的元素进行选择和移动。
      </NText>
    </div>

    <!-- 默认提示 -->
    <div v-if="!['brush', 'eraser', 'rectangle', 'circle', 'line', 'text', 'select'].includes(activeTool)" class="space-y-4">
      <NText depth="3" class="text-xs">
        请从上方工具栏选择一个工具。
      </NText>
    </div>
  </div>
</template>

<style scoped>
.property-panel {
  padding: 8px 0;
}
</style>
