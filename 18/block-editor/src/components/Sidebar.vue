<script setup>
import { computed } from "vue";

const props = defineProps({
  selectedBlock: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update-styles"]);

const blockTypeLabels = {
  paragraph: "段落",
  heading: "标题",
  image: "图片",
  quote: "引用",
};

const fontSizes = [
  { value: "0.875rem", label: "小" },
  { value: "1rem", label: "中" },
  { value: "1.125rem", label: "大" },
  { value: "1.25rem", label: "特大" },
  { value: "1.5rem", label: "超大" },
  { value: "2rem", label: "巨大" },
  { value: "2.5rem", label: "特大号" },
];

const textColors = [
  { value: "#1e293b", label: "深灰" },
  { value: "#475569", label: "中灰" },
  { value: "#64748b", label: "浅灰" },
  { value: "#3b82f6", label: "蓝色" },
  { value: "#8b5cf6", label: "紫色" },
  { value: "#10b981", label: "绿色" },
  { value: "#f59e0b", label: "橙色" },
  { value: "#ef4444", label: "红色" },
];

const alignments = [
  { value: "left", icon: "mdi-format-align-left" },
  { value: "center", icon: "mdi-format-align-center" },
  { value: "right", icon: "mdi-format-align-right" },
  { value: "justify", icon: "mdi-format-align-justify" },
];

const headingLevels = [
  { value: 1, label: "H1" },
  { value: 2, label: "H2" },
  { value: 3, label: "H3" },
  { value: 4, label: "H4" },
];

const handleStyleChange = (key, value) => {
  emit("update-styles", { [key]: value });
};

const getHeadingLevelFontSize = (level) => {
  const sizes = {
    1: "2.5rem",
    2: "2rem",
    3: "1.5rem",
    4: "1.25rem",
  };
  return sizes[level] || "1.5rem";
};

const handleHeadingLevelChange = (level) => {
  if (props.selectedBlock) {
    props.selectedBlock.level = level;
    handleStyleChange("fontSize", getHeadingLevelFontSize(level));
  }
};

const styles = computed(() => props.selectedBlock?.styles || {});
</script>

<template>
  <v-navigation-drawer
    permanent
    location="right"
    width="300"
    class="border-l border-gray-200"
  >
    <v-card variant="flat" class="h-full">
      <v-card-title
        class="text-lg font-bold text-gray-800 border-b border-gray-200 px-4 py-3"
      >
        样式面板
      </v-card-title>

      <v-card-text class="p-4">
        <div v-if="!selectedBlock" class="text-center text-gray-400 py-8">
          <v-icon size="48" class="mb-2 text-gray-300"
            >mdi-cursor-default</v-icon
          >
          <p class="text-sm">请选择一个块来编辑样式</p>
        </div>

        <template v-else>
          <div class="mb-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-xs text-blue-600 font-medium mb-1">当前类型</p>
            <p class="text-sm font-bold text-blue-800">
              {{ blockTypeLabels[selectedBlock.type] || selectedBlock.type }}
            </p>
          </div>

          <v-divider class="my-4" />

          <div v-if="selectedBlock.type === 'heading'" class="mb-4">
            <p class="text-xs font-medium text-gray-600 mb-2">标题级别</p>
            <v-btn-group variant="outlined" size="small" class="w-full">
              <v-btn
                v-for="level in headingLevels"
                :key="level.value"
                :variant="
                  selectedBlock.level === level.value ? 'flat' : 'outlined'
                "
                :color="
                  selectedBlock.level === level.value ? 'primary' : 'secondary'
                "
                @click="handleHeadingLevelChange(level.value)"
              >
                {{ level.label }}
              </v-btn>
            </v-btn-group>
          </div>

          <div class="mb-4">
            <p class="text-xs font-medium text-gray-600 mb-2">字体大小</p>
            <v-select
              v-model="styles.fontSize"
              :items="fontSizes"
              item-value="value"
              item-title="label"
              variant="outlined"
              density="comfortable"
              hide-details
              @update:model-value="(val) => handleStyleChange('fontSize', val)"
            />
          </div>

          <div class="mb-4">
            <p class="text-xs font-medium text-gray-600 mb-2">字体粗细</p>
            <v-btn-group variant="outlined" size="small">
              <v-btn
                :variant="styles.fontWeight === 'normal' ? 'flat' : 'outlined'"
                :color="
                  styles.fontWeight === 'normal' ? 'primary' : 'secondary'
                "
                @click="handleStyleChange('fontWeight', 'normal')"
              >
                正常
              </v-btn>
              <v-btn
                :variant="styles.fontWeight === 'bold' ? 'flat' : 'outlined'"
                :color="styles.fontWeight === 'bold' ? 'primary' : 'secondary'"
                @click="handleStyleChange('fontWeight', 'bold')"
              >
                粗体
              </v-btn>
            </v-btn-group>
          </div>

          <div class="mb-4">
            <p class="text-xs font-medium text-gray-600 mb-2">文字颜色</p>
            <div class="flex flex-wrap gap-2">
              <v-btn
                v-for="color in textColors"
                :key="color.value"
                size="small"
                variant="outlined"
                :class="{
                  'ring-2 ring-offset-2 ring-blue-500':
                    styles.color === color.value,
                }"
                @click="handleStyleChange('color', color.value)"
              >
                <div
                  class="w-4 h-4 rounded"
                  :style="{ backgroundColor: color.value }"
                ></div>
              </v-btn>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-xs font-medium text-gray-600 mb-2">对齐方式</p>
            <v-btn-group variant="outlined" size="small">
              <v-btn
                v-for="align in alignments"
                :key="align.value"
                :icon="align.icon"
                :variant="
                  styles.textAlign === align.value ? 'flat' : 'outlined'
                "
                :color="
                  styles.textAlign === align.value ? 'primary' : 'secondary'
                "
                @click="handleStyleChange('textAlign', align.value)"
              />
            </v-btn-group>
          </div>

          <div v-if="selectedBlock.type === 'quote'" class="mb-4">
            <p class="text-xs font-medium text-gray-600 mb-2">边框颜色</p>
            <div class="flex flex-wrap gap-2">
              <v-btn
                v-for="color in textColors"
                :key="color.value"
                size="small"
                variant="outlined"
                :class="{
                  'ring-2 ring-offset-2 ring-blue-500':
                    styles.borderColor === color.value,
                }"
                @click="handleStyleChange('borderColor', color.value)"
              >
                <div
                  class="w-4 h-4 rounded"
                  :style="{ backgroundColor: color.value }"
                ></div>
              </v-btn>
            </div>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>
