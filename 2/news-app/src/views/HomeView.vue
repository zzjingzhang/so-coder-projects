<template>
  <a-layout class="min-h-screen bg-gray-50">
    <NavigationDrawer
      v-model:open="drawerOpen"
      v-model:selectedSource="selectedSource"
      @sourceChange="handleSourceChange"
      @search="handleSearch"
    />
    
    <a-layout-content
      class="pt-16 min-h-screen flex flex-col px-4 md:px-6 lg:px-8"
    >
      <div class="flex-1">
        <div class="max-w-7xl mx-auto">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{ currentTitle }}
            </h2>
            <p class="text-gray-600">
              {{ currentDescription }}
            </p>
          </div>
          
          <a-alert
            v-if="showApiKeyAlert"
            message="API 密钥提示"
            description="当前使用模拟数据展示。请在 src/services/newsApi.ts 文件中替换 YOUR_NEWSAPI_KEY_HERE 为您的实际 NewsAPI 密钥，以获取真实新闻数据。"
            type="info"
            show-icon
            class="mb-6"
          />
          
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="i in 6"
              :key="i"
              class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div class="h-48 bg-gray-200"></div>
              <div class="p-4">
                <div class="h-6 bg-gray-200 rounded mb-3"></div>
                <div class="h-4 bg-gray-200 rounded mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
          
          <div
            v-else-if="articles.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ArticleCard
              v-for="(article, index) in articles"
              :key="`${article.url}-${index}`"
              :article="article"
              :index="index"
            />
          </div>
          
          <div v-else class="text-center py-16">
            <InboxOutlined class="text-6xl text-gray-300 mb-4" />
            <h3 class="text-xl font-semibold text-gray-600 mb-2">暂无新闻</h3>
            <p class="text-gray-500">当前新闻源没有可用的文章</p>
          </div>
        </div>
      </div>
      
      <AppFooter />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import NavigationDrawer from '../components/NavigationDrawer.vue';
import ArticleCard from '../components/ArticleCard.vue';
import AppFooter from '../components/AppFooter.vue';
import { newsApiService } from '../services/newsApi';
import type { Article, Source } from '../types';

const drawerOpen = ref(false);
const selectedSource = ref<string | null>(null);
const loading = ref(false);
const articles = ref<Article[]>([]);
const sources = ref<Source[]>([]);

const showApiKeyAlert = computed(() => {
  return true; // 始终显示提示，引导用户配置 API 密钥
});

const currentTitle = computed(() => {
  if (selectedSource.value) {
    const source = sources.value.find(s => s.id === selectedSource.value);
    return source ? source.name : '新闻';
  }
  return '热门头条';
});

const currentDescription = computed(() => {
  if (selectedSource.value) {
    const source = sources.value.find(s => s.id === selectedSource.value);
    return source?.description || '浏览最新新闻';
  }
  return '浏览来自世界各地的最新热门头条新闻';
});

const loadArticles = async (sourceId?: string) => {
  loading.value = true;
  
  try {
    articles.value = await newsApiService.getTopHeadlines(sourceId || undefined);
  } catch (error) {
    console.error('Error loading articles:', error);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

const loadSources = async () => {
  try {
    sources.value = await newsApiService.getSources();
  } catch (error) {
    console.error('Error loading sources:', error);
  }
};

const handleSourceChange = (sourceId: string | null) => {
  selectedSource.value = sourceId;
};

const handleSearch = (query: string) => {
  console.log('Search query:', query);
  // 这里可以实现搜索功能
};

watch(selectedSource, (newSource) => {
  loadArticles(newSource || undefined);
});

onMounted(async () => {
  await loadSources();
  await loadArticles();
});
</script>

<style scoped>
:deep(.ant-layout) {
  background: #f5f5f5;
}

:deep(.ant-layout-content) {
  background: #f5f5f5;
}
</style>
