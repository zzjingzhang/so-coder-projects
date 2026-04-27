<template>
  <v-card class="rounded-xl" flat>
    <v-card-title class="pb-2">
      <div class="flex items-center gap-2">
        <v-icon color="secondary">mdi-tag-multiple</v-icon>
        <span class="font-bold text-lg">热门标签</span>
      </div>
    </v-card-title>

    <v-card-text class="pt-0">
      <v-btn
        variant="text"
        size="small"
        class="mb-2 w-full justify-start"
        :color="!selectedTag ? 'primary' : 'default'"
        @click="clearSelection"
      >
        <v-icon size="18">mdi-refresh</v-icon>
        <span class="ml-1">全部动态</span>
      </v-btn>

      <div class="tag-cloud">
        <v-chip
          v-for="tag in displayTags"
          :key="tag.id"
          :size="getTagSize(tag.count)"
          :color="tag.color"
          variant="flat"
          class="tag-item cursor-pointer"
          :class="{ 'active': selectedTag === tag.name }"
          @click="selectTag(tag.name)"
        >
          #{{ tag.name }}
          <span class="text-xs opacity-70 ml-1">({{ tag.count }})</span>
        </v-chip>
      </div>

      <v-divider class="my-3"></v-divider>

      <v-expansion-panels variant="accordion">
        <v-expansion-panel>
          <v-expansion-panel-title class="px-0">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <v-icon size="16">mdi-dots-horizontal</v-icon>
              <span>查看更多标签</span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="px-0">
            <div class="tag-cloud mt-2">
              <v-chip
                v-for="tag in moreTags"
                :key="tag.id"
                size="small"
                :color="tag.color"
                variant="outlined"
                class="tag-item cursor-pointer"
                :class="{ 'active': selectedTag === tag.name }"
                @click="selectTag(tag.name)"
              >
                #{{ tag.name }}
                <span class="text-xs opacity-70 ml-1">({{ tag.count }})</span>
              </v-chip>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { tags } from '../mock/data'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedTag = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const displayTags = computed(() => {
  return tags.slice(0, 8)
})

const moreTags = computed(() => {
  return tags.slice(8)
})

function getTagSize(count) {
  if (count > 300) return 'large'
  if (count > 200) return 'default'
  if (count > 100) return 'small'
  return 'x-small'
}

function selectTag(tagName) {
  selectedTag.value = selectedTag.value === tagName ? '' : tagName
}

function clearSelection() {
  selectedTag.value = ''
}
</script>
