<template>
  <div class="block-todo flex items-start gap-2">
    <button
      class="mt-1 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
      :class="[
        isChecked
          ? 'bg-blue-500 border-blue-500'
          : 'bg-transparent border-gray-300 hover:border-gray-400',
      ]"
      @click="toggleChecked"
    >
      <svg
        v-if="isChecked"
        class="w-3 h-3 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
    <div
      ref="contentRef"
      contenteditable="true"
      class="flex-1 outline-none min-h-[1.5rem] leading-relaxed"
      :class="isChecked ? 'text-gray-400 line-through' : 'text-gray-700'"
      data-placeholder="待办事项"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from "vue";
import type { Block } from "@/types";

const props = defineProps<{
  modelValue: Block;
}>();

const emit = defineEmits<{
  "update:modelValue": [block: Block];
  update: [block: Block];
  delete: [];
  "add-block-after": [];
}>();

const contentRef = ref<HTMLElement | null>(null);

const isChecked = computed({
  get: () => props.modelValue.config.checked ?? false,
  set: (value) => {
    const newBlock = {
      ...props.modelValue,
      config: {
        ...props.modelValue.config,
        checked: value,
      },
    };
    emit("update:modelValue", newBlock);
    emit("update", newBlock);
  },
});

function toggleChecked() {
  isChecked.value = !isChecked.value;
}

function updateContent() {
  if (
    contentRef.value &&
    contentRef.value.innerText !== props.modelValue.content
  ) {
    contentRef.value.innerText = props.modelValue.content;
  }
}

function handleInput() {
  if (!contentRef.value) return;
  const newBlock = {
    ...props.modelValue,
    content: contentRef.value.innerText,
  };
  emit("update:modelValue", newBlock);
  emit("update", newBlock);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    emit("add-block-after");
  }

  if (e.key === "Backspace") {
    const text = contentRef.value?.innerText || "";
    if (text.length === 0) {
      e.preventDefault();
      emit("delete");
    }
  }
}

function handleBlur() {
  if (!contentRef.value) return;
  const newBlock = {
    ...props.modelValue,
    content: contentRef.value.innerText,
  };
  emit("update:modelValue", newBlock);
  emit("update", newBlock);
}

watch(
  () => props.modelValue.content,
  () => {
    updateContent();
  },
  { deep: true },
);

watch(
  () => props.modelValue.config,
  () => {},
  { deep: true },
);

onMounted(() => {
  nextTick(() => {
    updateContent();
  });
});
</script>

<style scoped>
[contenteditable]:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
}

[contenteditable]:focus {
  color: #111827;
}

.line-through [contenteditable]:focus {
  color: #6b7280;
}
</style>
