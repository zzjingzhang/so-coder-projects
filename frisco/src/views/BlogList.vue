<template>
  <div class="blog-list">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container page-hero-content">
        <h1 class="page-hero-title">博客</h1>
        <p class="page-hero-subtitle">
          探索最新的行业资讯、产品更新和实用技巧
        </p>
      </div>
    </section>
    
    <section class="blog-section section">
      <div class="container">
        <div class="blog-layout">
          <aside class="blog-sidebar">
            <div class="sidebar-card card">
              <h3 class="sidebar-title">搜索文章</h3>
              <div class="search-form">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-input"
                  placeholder="输入关键词搜索..."
                  @input="handleSearch"
                />
                <button class="search-btn" @click="handleSearch">
                  🔍
                </button>
              </div>
            </div>
            
            <div class="sidebar-card card">
              <h3 class="sidebar-title">标签</h3>
              <div class="tags-list">
                <button
                  v-for="tag in allTags"
                  :key="tag.name"
                  class="tag"
                  :class="{ 'active': selectedTag === tag.name }"
                  @click="selectTag(tag.name)"
                >
                  {{ tag.name }} ({{ tag.count }})
                </button>
              </div>
            </div>
            
            <div class="sidebar-card card">
              <h3 class="sidebar-title">分类</h3>
              <div class="categories-list">
                <button
                  v-for="category in categories"
                  :key="category.name"
                  class="category-item"
                  :class="{ 'active': selectedCategory === category.name }"
                  @click="selectCategory(category.name)"
                >
                  <span class="category-name">{{ category.name }}</span>
                  <span class="category-count">{{ category.count }}</span>
                </button>
              </div>
            </div>
          </aside>
          
          <main class="blog-main">
            <div v-if="filteredPosts.length === 0" class="no-posts">
              <p>没有找到符合条件的文章</p>
              <button class="btn btn-secondary" @click="clearFilters">
                清除筛选
              </button>
            </div>
            
            <div v-else class="blog-grid">
              <BlogCard
                v-for="post in paginatedPosts"
                :key="post.id"
                :post="post"
              />
            </div>
            
            <div v-if="totalPages > 1" class="pagination">
              <button
                class="pagination-btn"
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
              >
                ←
              </button>
              
              <button
                v-for="page in totalPages"
                :key="page"
                class="pagination-btn"
                :class="{ 'active': currentPage === page }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
              
              <button
                class="pagination-btn"
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
              >
                →
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BlogCard from '@/components/BlogCard.vue'
import { blogPosts, tags, categories } from '@/data/mockData'

const searchQuery = ref('')
const selectedTag = ref('全部')
const selectedCategory = ref<string | null>(null)
const currentPage = ref(1)
const postsPerPage = 3

const allTags = computed(() => tags)

const filteredPosts = computed(() => {
  let posts = [...blogPosts]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  if (selectedTag.value !== '全部') {
    posts = posts.filter(post => post.tags.includes(selectedTag.value))
  }
  
  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }
  
  return posts
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const handleSearch = () => {
  currentPage.value = 1
}

const selectTag = (tagName: string) => {
  selectedTag.value = tagName
  selectedCategory.value = null
  currentPage.value = 1
}

const selectCategory = (categoryName: string) => {
  selectedCategory.value = selectedCategory.value === categoryName ? null : categoryName
  selectedTag.value = '全部'
  currentPage.value = 1
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = '全部'
  selectedCategory.value = null
  currentPage.value = 1
}
</script>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  padding: 140px 0 100px;
  text-align: center;
  overflow: hidden;
  
  &-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, transparent 50%);
    }
  }
  
  &-content {
    position: relative;
    z-index: 1;
  }
  
  &-title {
    font-size: var(--font-size-4xl);
    font-weight: 700;
    color: white;
    margin-bottom: var(--spacing-md);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }
  
  &-subtitle {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
  }
}

.blog-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-3xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.sidebar-card {
  padding: var(--spacing-lg);
}

.sidebar-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.search-form {
  display: flex;
  gap: var(--spacing-xs);
}

.search-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  text-align: left;
  
  &:hover,
  &.active {
    background-color: var(--color-bg-tertiary);
  }
  
  &.active {
    .category-name {
      color: var(--color-primary);
    }
  }
}

.category-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.category-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  background-color: var(--color-bg-tertiary);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.no-posts {
  text-align: center;
  padding: var(--spacing-3xl);
  
  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-2xl);
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.active {
    background-color: var(--color-primary);
    color: white;
  }
}
</style>
