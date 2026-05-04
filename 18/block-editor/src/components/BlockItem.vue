<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'delete', 'move-up', 'move-down'])

const showActions = ref(false)

const blockTypeIcons = {
  paragraph: 'mdi-format-paragraph',
  heading: 'mdi-format-header',
  image: 'mdi-image',
  quote: 'mdi-format-quote-close'
}

const blockTypeLabels = {
  paragraph: '段落',
  heading: '标题',
  image: '图片',
  quote: '引用'
}

const blockStyles = computed(() => {
  const styles = { ...props.block.styles }
  if (styles.textAlign) {
    styles.textAlign = styles.textAlign
  }
  return styles
})

const handleSelect = () => {
  emit('select', props.block)
}

const handleDelete = (e) => {
  e.stopPropagation()
  emit('delete', props.block.id)
}

const handleMoveUp = (e) => {
  e.stopPropagation()
  emit('move-up', props.block.id)
}

const handleMoveDown = (e) => {
  e.stopPropagation()
  emit('move-down', props.block.id)
}
</script>

<template>
  <div
    class="relative rounded-lg transition-all duration-200"
    :class="[
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50/30' : 'hover:bg-gray-50',
      'p-4'
    ]"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
    @click="handleSelect"
  >
    <div 
      v-if="showActions"
      class="absolute -top-3 right-4 flex gap-1 z-10"
    >
      <v-btn
        size="small"
        variant="flat"
        color="secondary"
        icon="mdi-chevron-up"
        @click="handleMoveUp"
        title="上移"
      />
      <v-btn
        size="small"
        variant="flat"
        color="secondary"
        icon="mdi-chevron-down"
        @click="handleMoveDown"
        title="下移"
      />
      <v-btn
        size="small"
        variant="flat"
        color="error"
        icon="mdi-delete"
        @click="handleDelete"
        title="删除"
      />
    </div>

    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 mt-1">
        <v-icon 
          :color="isSelected ? 'primary' : 'secondary'"
          size="small"
        >
          {{ blockTypeIcons[block.type] }}
        </v-icon>
      </div>
      
      <div class="flex-1 min-w-0">
        <div v-if="block.type === 'paragraph'" class="w-full">
          <v-textarea
            v-model="block.content"
            variant="plain"
            placeholder="输入段落内容..."
            auto-grow
            hide-details
            class="w-full"
            :style="blockStyles"
            @click.stop
          />
        </div>
        
        <div v-else-if="block.type === 'heading'" class="w-full">
          <v-text-field
            v-model="block.content"
            variant="plain"
            placeholder="输入标题..."
            hide-details
            class="w-full"
            :style="blockStyles"
            @click.stop
          />
        </div>
        
        <div v-else-if="block.type === 'image'" class="w-full">
          <div v-if="block.url" class="mb-3">
            <img 
              :src="block.url" 
              :alt="block.alt || '图片'"
              class="max-w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          <v-text-field
            v-model="block.url"
            variant="outlined"
            label="图片URL"
            placeholder="https://example.com/image.jpg"
            density="compact"
            class="mb-2"
            @click.stop
          />
          <v-text-field
            v-model="block.alt"
            variant="outlined"
            label="图片描述（可选）"
            placeholder="输入图片描述..."
            density="compact"
            @click.stop
          />
        </div>
        
        <div v-else-if="block.type === 'quote'" class="w-full">
          <div 
            class="border-l-4 pl-4 py-2 rounded-r-lg"
            :style="{ borderColor: blockStyles.borderColor || '#3b82f6', backgroundColor: '#f8fafc' }"
          >
            <v-textarea
              v-model="block.content"
              variant="plain"
              placeholder="输入引用内容..."
              auto-grow
              hide-details
              class="w-full"
              :style="blockStyles"
              @click.stop
            />
            <div class="mt-2">
              <v-text-field
                v-model="block.author"
                variant="plain"
                placeholder="— 作者名"
                hide-details
                class="w-full text-sm text-gray-500"
                @click.stop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
      <v-icon size="x-small">
        {{ blockTypeIcons[block.type] }}
      </v-icon>
      <span>{{ blockTypeLabels[block.type] }}</span>
    </div>
  </div>
</template>
