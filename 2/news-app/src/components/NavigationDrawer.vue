<template>
  <div>
    <a-drawer
      v-model:open="isOpen"
      placement="left"
      :width="drawerWidth"
      :closable="false"
      class="navigation-drawer"
    >
      <template #title>
        <div class="drawer-header">
          <h2 class="text-xl font-bold text-gray-800">新闻来源</h2>
        </div>
      </template>
      
      <div class="sources-list">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleSourceClick"
          class="border-none"
        >
          <a-menu-item key="top-headlines">
            <template #icon>
              <FireOutlined />
            </template>
            热门头条
          </a-menu-item>
          
          <a-menu-divider />
          
          <template v-for="category in groupedSources" :key="category.name">
            <a-menu-item-group :title="getCategoryLabel(category.name)">
              <a-menu-item
                v-for="source in category.sources"
                :key="source.id"
              >
                {{ source.name }}
              </a-menu-item>
            </a-menu-item-group>
          </template>
        </a-menu>
      </div>
    </a-drawer>
    
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16">
      <div class="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <div class="flex items-center gap-4">
          <a-button
            type="text"
            @click="toggleDrawer"
            class="!h-10 !w-10 !flex !items-center !justify-center"
          >
            <template #icon>
              <MenuOutlined class="text-gray-700 text-lg" />
            </template>
          </a-button>
          
          <h1 class="text-xl font-bold text-gray-800 m-0 flex items-center leading-none">
            <ReadOutlined class="text-blue-600 mr-2 inline-flex items-center" />
            <span class="inline-flex items-center">新闻应用</span>
          </h1>
        </div>
        
        <div class="flex items-center gap-4">
          <a-input-search
            v-model:value="searchQuery"
            placeholder="搜索新闻..."
            @search="handleSearch"
            style="width: 200px"
            class="hidden sm:block"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { MenuOutlined, FireOutlined, ReadOutlined } from '@ant-design/icons-vue';
import { newsApiService } from '../services/newsApi';
import type { Source } from '../types';

interface Props {
  open: boolean;
  selectedSource: string | null;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'update:selectedSource', value: string | null): void;
  (e: 'sourceChange', sourceId: string | null): void;
  (e: 'search', query: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  selectedSource: null
});

const emit = defineEmits<Emits>();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

const sources = ref<Source[]>([]);
const searchQuery = ref('');

const selectedKeys = computed(() => {
  if (props.selectedSource) {
    return [props.selectedSource];
  }
  return ['top-headlines'];
});

const drawerWidth = computed(() => {
  if (window.innerWidth < 640) return '100%';
  if (window.innerWidth < 1024) return 280;
  return 300;
});

const groupedSources = computed(() => {
  const groups: Record<string, Source[]> = {};
  
  sources.value.forEach(source => {
    const category = source.category || 'other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(source);
  });
  
  return Object.entries(groups).map(([name, sources]) => ({
    name,
    sources
  }));
});

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    general: '综合',
    technology: '科技',
    business: '商业',
    sports: '体育',
    entertainment: '娱乐',
    health: '健康',
    science: '科学',
    other: '其他'
  };
  return labels[category] || category;
};

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

const handleSourceClick = ({ key }: { key: string }) => {
  if (key === 'top-headlines') {
    emit('update:selectedSource', null);
    emit('sourceChange', null);
  } else {
    emit('update:selectedSource', key);
    emit('sourceChange', key);
  }
  
  isOpen.value = false;
};

const handleSearch = (value: string) => {
  emit('search', value);
};

onMounted(async () => {
  sources.value = await newsApiService.getSources();
});

watch(() => props.selectedSource, () => {
  // 响应选中的新闻源变化
});
</script>

<style scoped>
.navigation-drawer :deep(.ant-drawer-body) {
  padding: 0;
}

.sources-list {
  padding: 16px;
}

:deep(.ant-menu-item) {
  margin: 4px 0;
}

:deep(.ant-menu-item-selected) {
  background-color: #e6f7ff !important;
}
</style>
