<template>
  <v-card class="h-full" elevation="2">
    <v-toolbar color="grey lighten-2" flat>
      <v-toolbar-title class="text-sm font-bold">打印元素</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="pa-2">
      <v-container fluid class="pa-0">
        <v-row>
          <v-col
            cols="6"
            v-for="element in draggableElements"
            :key="element.type"
          >
            <v-card
              class="cursor-grab hover:elevation-4 transition-elevation text-center pa-2"
              elevation="1"
              draggable="true"
              @dragstart="handleDragStart($event, element.type)"
            >
              <v-icon size="24" :color="element.color">{{
                element.icon
              }}</v-icon>
              <div class="text-xs mt-1">{{ element.label }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider class="my-3"></v-divider>

      <v-toolbar color="grey lighten-2" flat class="mb-2">
        <v-toolbar-title class="text-sm font-bold">元素列表</v-toolbar-title>
      </v-toolbar>

      <v-list density="compact" class="overflow-auto" style="max-height: 400px">
        <v-list-item
          v-for="element in elements"
          :key="element.id"
          :active="selectedElement?.id === element.id"
          @click="selectElement(element)"
          class="mb-1"
        >
          <template #prepend>
            <v-icon size="16">{{ getElementIcon(element.type) }}</v-icon>
          </template>
          <v-list-item-title class="text-sm">
            {{ getElementLabel(element.type) }}
          </v-list-item-title>
          <template #append>
            <v-btn
              icon="mdi-content-copy"
              size="x-small"
              variant="text"
              @click.stop="copyElement(element)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              size="x-small"
              variant="text"
              color="error"
              @click.stop="deleteElement(element.id)"
            ></v-btn>
          </template>
        </v-list-item>
        <v-alert
          v-if="elements.length === 0"
          type="info"
          variant="text"
          density="compact"
        >
          拖拽元素到画布中
        </v-alert>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ElementType, PrintElement } from "../types";

interface DraggableElement {
  type: ElementType;
  label: string;
  icon: string;
  color: string;
}

const props = defineProps<{
  elements: PrintElement[];
  selectedElement: PrintElement | null;
}>();

const emit = defineEmits<{
  (e: "element-drag-start", type: ElementType): void;
  (e: "select-element", element: PrintElement): void;
  (e: "delete-element", id: string): void;
  (e: "copy-element", element: PrintElement): void;
}>();

const draggableElements: DraggableElement[] = [
  { type: "text", label: "文本", icon: "mdi-text", color: "primary" },
  {
    type: "longText",
    label: "长文本",
    icon: "mdi-text-box",
    color: "secondary",
  },
  { type: "image", label: "图片", icon: "mdi-image", color: "info" },
  { type: "table", label: "表格", icon: "mdi-table", color: "success" },
  { type: "html", label: "HTML", icon: "mdi-web", color: "warning" },
  { type: "barcode", label: "条码", icon: "mdi-barcode", color: "purple" },
  { type: "qrcode", label: "二维码", icon: "mdi-qrcode", color: "indigo" },
];

function handleDragStart(event: DragEvent, type: ElementType): void {
  if (event.dataTransfer) {
    event.dataTransfer.setData("elementType", type);
    emit("element-drag-start", type);
  }
}

function getElementIcon(type: ElementType): string {
  const elem = draggableElements.find((e) => e.type === type);
  return elem?.icon || "mdi-question";
}

function getElementLabel(type: ElementType): string {
  const elem = draggableElements.find((e) => e.type === type);
  return elem?.label || type;
}

function selectElement(element: PrintElement): void {
  emit("select-element", element);
}

function deleteElement(id: string): void {
  emit("delete-element", id);
}

function copyElement(element: PrintElement): void {
  emit("copy-element", element);
}
</script>

<style scoped></style>
