<template>
  <div class="min-h-screen bg-white">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">N</span>
            </div>
            <h1 class="text-xl font-semibold text-gray-800">
              Notion 风格编辑器
            </h1>
          </div>
          <div class="flex items-center gap-2">
            <Button
              label="清空"
              severity="secondary"
              text
              @click="clearBlocks"
            />
            <Button label="保存" icon="pi pi-save" @click="saveContent" />
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8">
      <BlockEditor v-model:blocks="blocks" />
    </main>

    <Dialog v-model:visible="saveDialogVisible" header="保存成功" modal>
      <p class="text-gray-600">内容已保存到本地存储！</p>
      <template #footer>
        <Button label="确定" @click="saveDialogVisible = false" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Block } from "@/types";
import BlockEditor from "@/components/BlockEditor.vue";

const blocks = ref<Block[]>([]);
const saveDialogVisible = ref(false);

const defaultBlocks: Block[] = [
  {
    id: generateId(),
    type: "heading1",
    content: "欢迎使用 Notion 风格编辑器",
    config: {},
  },
  {
    id: generateId(),
    type: "paragraph",
    content:
      "这是一个基于 Vue 3、TypeScript 和 Tailwind CSS 构建的块编辑器。你可以通过点击加号按钮添加不同类型的块，也可以通过拖拽来重新排序。",
    config: {},
  },
  {
    id: generateId(),
    type: "heading2",
    content: "待办事项示例",
    config: {},
  },
  {
    id: generateId(),
    type: "todo",
    content: "学习 Vue 3 组合式 API",
    config: { checked: true },
  },
  {
    id: generateId(),
    type: "todo",
    content: "熟悉 TypeScript 类型系统",
    config: { checked: false },
  },
  {
    id: generateId(),
    type: "todo",
    content: "完成块编辑器开发",
    config: { checked: false },
  },
  {
    id: generateId(),
    type: "divider",
    content: "",
    config: {},
  },
  {
    id: generateId(),
    type: "heading2",
    content: "表格示例",
    config: {},
  },
  {
    id: generateId(),
    type: "table",
    content: "",
    config: { rows: 3, cols: 3 },
  },
];

function generateId(): string {
  return "block_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

function isValidBlock(block: unknown): boolean {
  if (!block || typeof block !== "object") return false;
  const b = block as Record<string, unknown>;
  return (
    typeof b.id === "string" &&
    typeof b.type === "string" &&
    typeof b.content === "string" &&
    typeof b.config === "object" &&
    b.config !== null
  );
}

function loadFromStorage() {
  const saved = localStorage.getItem("notion-blocks");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every(isValidBlock)
      ) {
        blocks.value = parsed;
      } else {
        blocks.value = defaultBlocks;
      }
    } catch {
      blocks.value = defaultBlocks;
    }
  } else {
    blocks.value = defaultBlocks;
  }
}

function saveContent() {
  localStorage.setItem("notion-blocks", JSON.stringify(blocks.value));
  saveDialogVisible.value = true;
}

function clearBlocks() {
  blocks.value = [
    {
      id: generateId(),
      type: "paragraph",
      content: "",
      config: {},
    },
  ];
}

onMounted(() => {
  loadFromStorage();
});

watch(
  blocks,
  () => {
    localStorage.setItem("notion-blocks", JSON.stringify(blocks.value));
  },
  { deep: true },
);
</script>
