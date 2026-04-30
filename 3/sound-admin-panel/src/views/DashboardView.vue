<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { useSoundsStore } from '@/stores/sounds'

const categoriesStore = useCategoriesStore()
const soundsStore = useSoundsStore()

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(async () => {
  if (categoriesStore.categories.length === 0) {
    await categoriesStore.fetchCategories()
  }
  if (soundsStore.sounds.length === 0) {
    await soundsStore.fetchSounds()
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="dashboard-card">
        <template #header>
          <div class="p-4 flex items-center justify-between">
            <div>
              <p class="text-sm opacity-70">总声音数</p>
              <p class="text-3xl font-bold mt-1">{{ soundsStore.totalSounds }}</p>
            </div>
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center"
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
            >
              <i class="pi pi-volume-up text-2xl text-white"></i>
            </div>
          </div>
        </template>
      </Card>

      <Card class="dashboard-card">
        <template #header>
          <div class="p-4 flex items-center justify-between">
            <div>
              <p class="text-sm opacity-70">活跃声音</p>
              <p class="text-3xl font-bold mt-1">{{ soundsStore.activeSounds }}</p>
            </div>
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center"
              style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"
            >
              <i class="pi pi-check-circle text-2xl text-white"></i>
            </div>
          </div>
        </template>
      </Card>

      <Card class="dashboard-card">
        <template #header>
          <div class="p-4 flex items-center justify-between">
            <div>
              <p class="text-sm opacity-70">类别数量</p>
              <p class="text-3xl font-bold mt-1">{{ categoriesStore.totalCategories }}</p>
            </div>
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center"
              style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);"
            >
              <i class="pi pi-tags text-2xl text-white"></i>
            </div>
          </div>
        </template>
      </Card>

      <Card class="dashboard-card">
        <template #header>
          <div class="p-4 flex items-center justify-between">
            <div>
              <p class="text-sm opacity-70">有声类别</p>
              <p class="text-3xl font-bold mt-1">{{ categoriesStore.categoriesWithSounds.length }}</p>
            </div>
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center"
              style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);"
            >
              <i class="pi pi-chart-bar text-2xl text-white"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="font-semibold text-lg">类别声音统计</h3>
          <p class="text-sm opacity-70 mt-1">每个类别的声音数量分布</p>
        </div>
      </template>

      <div v-if="soundsStore.isLoading || categoriesStore.isLoading">
        <div class="space-y-3 p-4">
          <Skeleton height="2rem" class="mb-2" />
          <Skeleton height="4rem" />
          <Skeleton height="4rem" />
          <Skeleton height="4rem" />
        </div>
      </div>

      <DataTable 
        v-else
        :value="soundsStore.soundsByCategory" 
        :paginator="true" 
        :rows="10"
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="categoryName" header="类别名称" style="min-width: 15rem">
          <template #body="slotProps">
            <div class="flex items-center gap-3">
              <Avatar 
                :label="slotProps.data.categoryName.charAt(0)" 
                shape="circle"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
              />
              <span class="font-medium">{{ slotProps.data.categoryName }}</span>
            </div>
          </template>
        </Column>
        <Column field="soundCount" header="声音数量" style="min-width: 12rem">
          <template #body="slotProps">
            <Badge 
              :value="slotProps.data.soundCount" 
              :severity="slotProps.data.soundCount > 5 ? 'success' : 'secondary'"
              class="text-base px-4 py-1"
            />
          </template>
        </Column>
        <Column header="占比" style="min-width: 15rem">
          <template #body="slotProps">
            <div class="flex items-center gap-3">
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  class="h-2.5 rounded-full transition-all duration-500"
                  :style="{ 
                    width: `${(slotProps.data.soundCount / soundsStore.totalSounds) * 100}%`,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }"
                ></div>
              </div>
              <span class="text-sm font-medium w-12 text-right">
                {{ Math.round((slotProps.data.soundCount / soundsStore.totalSounds) * 100) }}%
              </span>
            </div>
          </template>
        </Column>
      </DataTable>

      <Message 
        v-if="soundsStore.soundsByCategory.length === 0 && !soundsStore.isLoading"
        severity="info" 
        class="mt-4"
      >
        <div class="flex items-center gap-2">
          <i class="pi pi-info-circle"></i>
          <span>暂无数据</span>
        </div>
      </Message>
    </Card>

    <Card>
      <template #header>
        <div class="p-4">
          <h3 class="font-semibold text-lg">最近声音</h3>
          <p class="text-sm opacity-70 mt-1">最近添加的声音</p>
        </div>
      </template>

      <DataTable 
        :value="soundsStore.sounds.slice(0, 5)" 
        responsiveLayout="scroll"
      >
        <Column field="name" header="声音名称" style="min-width: 15rem" />
        <Column field="categoryName" header="类别" style="min-width: 10rem">
          <template #body="slotProps">
            <Tag :value="slotProps.data.categoryName" severity="secondary" />
          </template>
        </Column>
        <Column field="duration" header="时长" style="min-width: 8rem">
          <template #body="slotProps">
            {{ formatDuration(slotProps.data.duration) }}
          </template>
        </Column>
        <Column field="status" header="状态" style="min-width: 8rem">
          <template #body="slotProps">
            <Tag 
              :value="slotProps.data.status === 'active' ? '活跃' : '停用'" 
              :severity="slotProps.data.status === 'active' ? 'success' : 'danger'"
            />
          </template>
        </Column>
      </DataTable>
    </Card>
  </div>
</template>
