<script setup>
const emit = defineEmits(['add-block'])

const blockTypes = [
  { type: 'paragraph', label: '段落', icon: 'mdi-format-paragraph', color: 'primary' },
  { type: 'heading', label: '标题', icon: 'mdi-format-header', color: 'secondary' },
  { type: 'image', label: '图片', icon: 'mdi-image', color: 'success' },
  { type: 'quote', label: '引用', icon: 'mdi-format-quote-close', color: 'info' }
]
</script>

<template>
  <v-app-bar color="white" elevation="2" class="border-b border-gray-200">
    <v-toolbar-title class="text-gray-800 font-bold mr-8">
      <span class="text-blue-600">🧱</span> 块状编辑器
    </v-toolbar-title>
    
    <v-divider vertical class="mx-2" />
    
    <v-btn-group variant="outlined">
      <v-btn
        v-for="item in blockTypes"
        :key="item.type"
        :color="item.color"
        :prepend-icon="item.icon"
        variant="outlined"
        size="small"
        class="mx-1"
        @click="emit('add-block', item.type)"
      >
        {{ item.label }}
      </v-btn>
    </v-btn-group>
    
    <v-spacer />
    
    <v-btn 
      variant="text" 
      color="secondary" 
      prepend-icon="mdi-content-save"
      size="small"
    >
      保存
    </v-btn>
    
    <v-btn 
      variant="outlined" 
      color="primary" 
      prepend-icon="mdi-eye"
      size="small"
      class="ml-2"
    >
      预览
    </v-btn>
  </v-app-bar>
</template>
