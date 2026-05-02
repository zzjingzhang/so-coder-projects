<script setup>
import { ref, onMounted } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent, NButton, NButtonGroup, NCard, NText, NDivider, NInput, NSelect, NColorPicker, NSlider, NIcon, NUpload, NUploadDragger, NModal, NSpace, NInputNumber } from 'naive-ui'
import { ImagesOutline } from '@vicons/ionicons5'
import CanvasLayer from '../components/CanvasLayer.vue'
import LayerPanel from '../components/LayerPanel.vue'
import Toolbar from '../components/Toolbar.vue'
import PropertyPanel from '../components/PropertyPanel.vue'

const activeTool = ref('brush')
const brushColor = ref('#000000')
const brushSize = ref(5)
const fillColor = ref('#000000')
const strokeColor = ref('#000000')
const strokeWidth = ref(2)
const fillEnabled = ref(true)
const fontSize = ref(24)
const fontFamily = ref('Arial')
const textContent = ref('')
const selectedLayerId = ref(null)
const layers = ref([
  { id: 1, name: '图层 1', type: 'canvas', visible: true, opacity: 1, zIndex: 0 }
])
const nextLayerId = ref(2)

const toolSettings = ref({
  brush: { color: '#000000', size: 5 },
  shape: { fillColor: '#000000', strokeColor: '#000000', strokeWidth: 2, fillEnabled: true },
  text: { content: '', fontFamily: 'Arial', fontSize: 24, color: '#000000' },
  select: {}
})

const showImportModal = ref(false)
const showExportModal = ref(false)

function handleToolChange(tool) {
  activeTool.value = tool
}

function handleToolSettingsChange(settings) {
  toolSettings.value = { ...toolSettings.value, ...settings }
  
  if (settings.brush) {
    brushColor.value = settings.brush.color || brushColor.value
    brushSize.value = settings.brush.size || brushSize.value
  }
  if (settings.shape) {
    fillColor.value = settings.shape.fillColor || fillColor.value
    strokeColor.value = settings.shape.strokeColor || strokeColor.value
    strokeWidth.value = settings.shape.strokeWidth || strokeWidth.value
    fillEnabled.value = settings.shape.fillEnabled !== undefined ? settings.shape.fillEnabled : fillEnabled.value
  }
  if (settings.text) {
    textContent.value = settings.text.content || textContent.value
    fontFamily.value = settings.text.fontFamily || fontFamily.value
    fontSize.value = settings.text.fontSize || fontSize.value
  }
}

function addLayer(type = 'canvas') {
  const newLayer = {
    id: nextLayerId.value++,
    name: `图层 ${nextLayerId.value - 1}`,
    type: type,
    visible: true,
    opacity: 1,
    zIndex: layers.value.length
  }
  layers.value.push(newLayer)
  selectedLayerId.value = newLayer.id
}

function deleteLayer(id) {
  const index = layers.value.findIndex(layer => layer.id === id)
  if (index > -1 && layers.value.length > 1) {
    layers.value.splice(index, 1)
    layers.value.forEach((layer, i) => {
      layer.zIndex = i
    })
    if (selectedLayerId.value === id) {
      selectedLayerId.value = layers.value[0]?.id || null
    }
  }
}

function toggleLayerVisibility(id) {
  const layer = layers.value.find(layer => layer.id === id)
  if (layer) {
    layer.visible = !layer.visible
  }
}

function moveLayerUp(id) {
  const index = layers.value.findIndex(layer => layer.id === id)
  if (index < layers.value.length - 1) {
    const temp = layers.value[index].zIndex
    layers.value[index].zIndex = layers.value[index + 1].zIndex
    layers.value[index + 1].zIndex = temp
    ;[layers.value[index], layers.value[index + 1]] = [layers.value[index + 1], layers.value[index]]
  }
}

function moveLayerDown(id) {
  const index = layers.value.findIndex(layer => layer.id === id)
  if (index > 0) {
    const temp = layers.value[index].zIndex
    layers.value[index].zIndex = layers.value[index - 1].zIndex
    layers.value[index - 1].zIndex = temp
    ;[layers.value[index], layers.value[index - 1]] = [layers.value[index - 1], layers.value[index]]
  }
}

function selectLayer(id) {
  selectedLayerId.value = id
}

function handleImageImport(file) {
  addLayer('image')
  showImportModal.value = false
  return false
}

function exportImage(format = 'png') {
  showExportModal.value = false
}
</script>

<template>
  <NLayout has-sider class="h-screen w-screen bg-gray-100">
    <NLayoutSider bordered width="240" class="bg-white">
      <div class="p-4">
        <NText type="primary" class="text-lg font-bold mb-4 block">图层管理</NText>
        <LayerPanel 
          :layers="layers"
          :selected-layer-id="selectedLayerId"
          @select-layer="selectLayer"
          @add-layer="addLayer"
          @delete-layer="deleteLayer"
          @toggle-visibility="toggleLayerVisibility"
          @move-up="moveLayerUp"
          @move-down="moveLayerDown"
        />
      </div>
    </NLayoutSider>

    <NLayout>
      <NLayoutContent class="flex flex-col">
        <div class="bg-white border-b border-gray-200 p-2">
          <Toolbar 
            :active-tool="activeTool"
            :tool-settings="toolSettings"
            @tool-change="handleToolChange"
            @settings-change="handleToolSettingsChange"
            @import-image="() => showImportModal = true"
            @export-image="() => showExportModal = true"
          />
        </div>
        
        <div class="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-200">
          <div class="bg-white shadow-lg" style="width: 800px; height: 600px;">
            <CanvasLayer 
              :layers="layers"
              :selected-layer-id="selectedLayerId"
              :active-tool="activeTool"
              :brush-color="brushColor"
              :brush-size="brushSize"
              :fill-color="fillColor"
              :stroke-color="strokeColor"
              :stroke-width="strokeWidth"
              :fill-enabled="fillEnabled"
              :font-family="fontFamily"
              :font-size="fontSize"
              :text-content="textContent"
            />
          </div>
        </div>
      </NLayoutContent>
    </NLayout>

    <NLayoutSider bordered width="280" class="bg-white">
      <div class="p-4">
        <NText type="primary" class="text-lg font-bold mb-4 block">属性设置</NText>
        <PropertyPanel 
          :active-tool="activeTool"
          :tool-settings="toolSettings"
          @settings-change="handleToolSettingsChange"
        />
      </div>
    </NLayoutSider>
  </NLayout>

  <NModal v-model:show="showImportModal" preset="card" title="导入图像" style="width: 500px;">
    <NUpload
      accept="image/*"
      :max="1"
      @before-upload="handleImageImport"
    >
      <NUploadDragger>
        <div class="py-8">
          <NIcon size="48" class="mx-auto mb-2 text-gray-400">
            <ImagesOutline />
          </NIcon>
          <NText>点击或拖拽图像文件到此处</NText>
          <NText depth="3" class="block mt-1">支持 JPG、PNG、GIF 格式</NText>
        </div>
      </NUploadDragger>
    </NUpload>
  </NModal>

  <NModal v-model:show="showExportModal" preset="card" title="导出图像" style="width: 400px;">
    <NSpace vertical class="w-full">
      <NText>选择导出格式：</NText>
      <NButtonGroup>
        <NButton @click="exportImage('png')">PNG</NButton>
        <NButton @click="exportImage('jpg')">JPG</NButton>
        <NButton @click="exportImage('webp')">WebP</NButton>
      </NButtonGroup>
    </NSpace>
  </NModal>
</template>

<style scoped>
</style>
