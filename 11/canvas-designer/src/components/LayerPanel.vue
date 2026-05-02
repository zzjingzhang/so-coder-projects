<script setup>
import { ref, computed } from 'vue'
import { NButton, NButtonGroup, NIcon, NCard, NText, NDivider, NInput, NTooltip } from 'naive-ui'
import { 
  AddCircleOutline, 
  TrashBinOutline, 
  EyeOutline, 
  EyeOffOutline, 
  ChevronUpOutline, 
  ChevronDownOutline,
  SquareOutline
} from '@vicons/ionicons5'

const props = defineProps({
  layers: {
    type: Array,
    required: true
  },
  selectedLayerId: {
    type: [Number, null],
    default: null
  }
})

const emit = defineEmits([
  'select-layer', 
  'add-layer', 
  'delete-layer', 
  'toggle-visibility', 
  'move-up', 
  'move-down'
])

const sortedLayers = computed(() => {
  return [...props.layers].sort((a, b) => b.zIndex - a.zIndex)
})

function isLayerSelected(id) {
  return props.selectedLayerId === id
}

function getLayerIcon(type) {
  switch (type) {
    case 'canvas':
      return SquareOutline
    case 'image':
      return EyeOutline
    default:
      return SquareOutline
  }
}
</script>

<template>
  <div class="layer-panel">
    <div class="mb-4">
      <NButtonGroup class="w-full">
        <NButton 
          class="flex-1" 
          @click="() => emit('add-layer', 'canvas')"
        >
          <NIcon><AddCircleOutline /></NIcon>
          <span class="ml-1">新建图层</span>
        </NButton>
      </NButtonGroup>
    </div>

    <div class="space-y-2 max-h-96 overflow-y-auto">
      <div
        v-for="layer in sortedLayers"
        :key="layer.id"
        class="layer-item cursor-pointer"
        :class="{ 'bg-blue-50 border-blue-300': isLayerSelected(layer.id) }"
        @click="() => emit('select-layer', layer.id)"
      >
        <NCard 
          size="small" 
          :bordered="isLayerSelected(layer.id)"
          class="p-2"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <NIcon class="text-gray-500">
                <component :is="getLayerIcon(layer.type)" />
              </NIcon>
              <NText class="text-sm truncate max-w-24">{{ layer.name }}</NText>
            </div>
            <div class="flex items-center gap-1">
              <NTooltip :trigger="'hover'" :placement="'top'">
                <template #trigger>
                  <NButton 
                    size="tiny" 
                    quaternary 
                    @click.stop="() => emit('toggle-visibility', layer.id)"
                  >
                    <NIcon>
                      <EyeOutline v-if="layer.visible" />
                      <EyeOffOutline v-else />
                    </NIcon>
                  </NButton>
                </template>
                <span>{{ layer.visible ? '隐藏图层' : '显示图层' }}</span>
              </NTooltip>

              <NTooltip :trigger="'hover'" :placement="'top'">
                <template #trigger>
                  <NButton 
                    size="tiny" 
                    quaternary 
                    @click.stop="() => emit('move-up', layer.id)"
                  >
                    <NIcon><ChevronUpOutline /></NIcon>
                  </NButton>
                </template>
                <span>上移图层</span>
              </NTooltip>

              <NTooltip :trigger="'hover'" :placement="'top'">
                <template #trigger>
                  <NButton 
                    size="tiny" 
                    quaternary 
                    @click.stop="() => emit('move-down', layer.id)"
                  >
                    <NIcon><ChevronDownOutline /></NIcon>
                  </NButton>
                </template>
                <span>下移图层</span>
              </NTooltip>

              <NTooltip :trigger="'hover'" :placement="'top'">
                <template #trigger>
                  <NButton 
                    size="tiny" 
                    quaternary 
                    @click.stop="() => emit('delete-layer', layer.id)"
                    :disabled="layers.length <= 1"
                  >
                    <NIcon><TrashBinOutline /></NIcon>
                  </NButton>
                </template>
                <span>删除图层</span>
              </NTooltip>
            </div>
          </div>
        </NCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layer-item {
  transition: all 0.2s;
}

.layer-item:hover {
  transform: translateX(2px);
}
</style>
