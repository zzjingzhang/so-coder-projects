<template>
  <div class="element-table">
    <table v-if="element.tableData">
      <thead>
        <tr>
          <th
            v-for="(header, index) in element.tableData.headers"
            :key="index"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in element.tableData.rows" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { PrintElement } from '../../types'

defineProps<{
  element: PrintElement
}>()
</script>

<style scoped>
.element-table {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.element-table table {
  width: 100%;
  border-collapse: collapse;
}

.element-table th,
.element-table td {
  border: 1px solid #333;
  padding: 4px 8px;
  text-align: left;
  font-size: 12px;
}

.element-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
