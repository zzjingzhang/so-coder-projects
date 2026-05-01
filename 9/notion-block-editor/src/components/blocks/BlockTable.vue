<template>
  <div class="block-table">
    <div class="overflow-x-auto border border-gray-200 rounded-lg">
      <table class="w-full border-collapse">
        <tbody>
          <tr 
            v-for="(row, rowIndex) in tableData" 
            :key="rowIndex"
            :class="rowIndex === 0 ? 'bg-gray-50' : ''"
          >
            <td 
              v-for="(cell, colIndex) in row" 
              :key="colIndex"
              class="border border-gray-200 p-0"
            >
              <input
                type="text"
                :value="cell"
                @input="updateCell(rowIndex, colIndex, ($event.target as HTMLInputElement).value)"
                class="w-full h-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset bg-transparent text-sm"
                :class="rowIndex === 0 ? 'font-semibold' : ''"
                :placeholder="rowIndex === 0 ? '表头' : '内容'"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="flex items-center gap-2 mt-2">
      <Button 
        label="添加行" 
        text 
        size="small"
        icon="pi pi-plus"
        @click="addRow"
      />
      <Button 
        label="添加列" 
        text 
        size="small"
        icon="pi pi-plus"
        @click="addColumn"
      />
      <Button 
        v-if="tableData.length > 1"
        label="删除行" 
        text 
        severity="secondary"
        size="small"
        icon="pi pi-minus"
        @click="removeRow"
      />
      <Button 
        v-if="tableData[0]?.length > 1"
        label="删除列" 
        text 
        severity="secondary"
        size="small"
        icon="pi pi-minus"
        @click="removeColumn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Block } from '@/types'

const props = defineProps<{
  modelValue: Block
}>()

const emit = defineEmits<{
  'update:modelValue': [block: Block]
  'update': [block: Block]
}>()

const DEFAULT_ROWS = 3
const DEFAULT_COLS = 3

const tableData = ref<string[][]>([])

function initTable() {
  const rows = props.modelValue.config.rows || DEFAULT_ROWS
  const cols = props.modelValue.config.cols || DEFAULT_COLS
  
  let existingData: string[][] = []
  if (props.modelValue.content) {
    try {
      existingData = JSON.parse(props.modelValue.content)
    } catch {
      existingData = []
    }
  }
  
  tableData.value = []
  for (let i = 0; i < rows; i++) {
    const row: string[] = []
    for (let j = 0; j < cols; j++) {
      row.push(existingData[i]?.[j] || '')
    }
    tableData.value.push(row)
  }
}

function updateCell(row: number, col: number, value: string) {
  if (tableData.value[row]) {
    tableData.value[row][col] = value
    saveTableData()
  }
}

function addRow() {
  const cols = tableData.value[0]?.length || DEFAULT_COLS
  tableData.value.push(Array(cols).fill(''))
  saveTableData()
}

function addColumn() {
  for (const row of tableData.value) {
    row.push('')
  }
  saveTableData()
}

function removeRow() {
  if (tableData.value.length > 1) {
    tableData.value.pop()
    saveTableData()
  }
}

function removeColumn() {
  if (tableData.value[0]?.length > 1) {
    for (const row of tableData.value) {
      row.pop()
    }
    saveTableData()
  }
}

function saveTableData() {
  const newBlock = {
    ...props.modelValue,
    content: JSON.stringify(tableData.value),
    config: {
      ...props.modelValue.config,
      rows: tableData.value.length,
      cols: tableData.value[0]?.length || DEFAULT_COLS
    }
  }
  emit('update:modelValue', newBlock)
  emit('update', newBlock)
}

onMounted(() => {
  initTable()
})

watch(() => props.modelValue.config, () => {
  initTable()
}, { deep: true })
</script>
