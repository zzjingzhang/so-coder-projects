<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <a-input-search
        v-model:value="searchKeyword"
        placeholder="请输入搜索关键字"
        size="large"
        @search="handleSearch"
      >
        <template #enterButton>
          <a-button type="primary" size="large">搜索</a-button>
        </template>
      </a-input-search>
    </div>

    <div class="bg-white rounded-lg shadow-md">
      <a-tabs
        v-model:activeKey="activeTab"
        :tabBarStyle="{ paddingLeft: '24px' }"
        @change="handleTabChange"
      >
        <a-tab-pane key="post" tab="文章">
          <div class="px-6 py-8 text-center text-gray-500">
            <p class="text-lg">文章列表</p>
            <p v-if="searchKeyword" class="mt-2 text-gray-400">
              搜索关键字: {{ searchKeyword }}
            </p>
            <p v-else class="mt-2 text-gray-400">
              请输入搜索关键字进行搜索
            </p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="img" tab="图片">
          <div class="px-6 py-8 text-center text-gray-500">
            <p class="text-lg">图片列表</p>
            <p v-if="searchKeyword" class="mt-2 text-gray-400">
              搜索关键字: {{ searchKeyword }}
            </p>
            <p v-else class="mt-2 text-gray-400">
              请输入搜索关键字进行搜索
            </p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="user" tab="用户">
          <div class="px-6 py-8 text-center text-gray-500">
            <p class="text-lg">用户列表</p>
            <p v-if="searchKeyword" class="mt-2 text-gray-400">
              搜索关键字: {{ searchKeyword }}
            </p>
            <p v-else class="mt-2 text-gray-400">
              请输入搜索关键字进行搜索
            </p>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  tab: {
    type: String,
    default: 'post'
  }
})

const router = useRouter()
const route = useRoute()

const searchKeyword = ref('')
const activeTab = ref(props.tab)

onMounted(() => {
  if (route.query.keyword) {
    searchKeyword.value = route.query.keyword
  }
})

watch(() => route.query.keyword, (newKeyword) => {
  if (newKeyword) {
    searchKeyword.value = newKeyword
  }
})

watch(() => props.tab, (newTab) => {
  activeTab.value = newTab
})

const handleSearch = () => {
  const query = { ...route.query }
  if (searchKeyword.value) {
    query.keyword = searchKeyword.value
  } else {
    delete query.keyword
  }
  router.replace({ query })
}

const handleTabChange = (key) => {
  const query = { ...route.query }
  router.push({ path: `/${key}`, query })
}
</script>