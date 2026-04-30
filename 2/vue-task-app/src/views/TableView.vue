<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4 font-bold">数据表格</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-card-title>甜点营养数据</v-card-title>
          <v-divider></v-divider>

          <v-card-text class="pt-4 pb-0">
            <v-text-field
              v-model="search"
              label="搜索"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              class="mb-4"
              hide-details
            ></v-text-field>
          </v-card-text>

          <v-data-table
            v-model:items-per-page="itemsPerPage"
            v-model:page="page"
            :headers="headers as any"
            :items="desserts"
            :search="search"
            :sort-by="sortBy as any"
            class="elevation-0"
            fixed-header
          >
            <template v-slot:item.calories="{ item }">
              <v-chip size="small" :color="getCaloriesColor(item.calories)" variant="outlined">
                {{ item.calories }}
              </v-chip>
            </template>

            <template v-slot:item.fat="{ item }"> {{ item.fat }}g </template>

            <template v-slot:item.carbs="{ item }"> {{ item.carbs }}g </template>

            <template v-slot:item.protein="{ item }"> {{ item.protein }}g </template>

            <template v-slot:item.iron="{ item }">
              <v-chip size="small" variant="outlined" color="secondary">
                {{ item.iron }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DessertItem } from '@/types'

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref([{ key: 'name', order: 'asc' }])

const headers = [
  { title: '甜点名称', align: 'start', key: 'name' },
  { title: '卡路里 (Cal)', align: 'start', sortable: true, key: 'calories' },
  { title: '脂肪 (g)', align: 'start', sortable: true, key: 'fat' },
  { title: '碳水化合物 (g)', align: 'start', sortable: true, key: 'carbs' },
  { title: '蛋白质 (g)', align: 'start', sortable: true, key: 'protein' },
  { title: '铁含量', align: 'start', sortable: true, key: 'iron' }
]

const desserts: DessertItem[] = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%'
  }
]

const getCaloriesColor = (calories: number): string => {
  if (calories < 200) return 'success'
  if (calories < 350) return 'warning'
  return 'error'
}
</script>
