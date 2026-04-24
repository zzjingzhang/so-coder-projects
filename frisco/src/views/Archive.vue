<template>
  <div class="archive">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container page-hero-content">
        <h1 class="page-hero-title">文章归档</h1>
        <p class="page-hero-subtitle">
          按时间浏览所有博客文章
        </p>
      </div>
    </section>
    
    <section class="archive-section section">
      <div class="container">
        <div class="archive-layout">
          <aside class="archive-sidebar">
            <div class="sidebar-card card">
              <h3 class="sidebar-title">快速筛选</h3>
              
              <div class="filter-section">
                <h4 class="filter-title">按分类</h4>
                <div class="filter-list">
                  <button
                    class="filter-item"
                    :class="{ 'active': selectedCategory === null }"
                    @click="selectCategory(null)"
                  >
                    全部
                  </button>
                  <button
                    v-for="category in categories"
                    :key="category.name"
                    class="filter-item"
                    :class="{ 'active': selectedCategory === category.name }"
                    @click="selectCategory(category.name)"
                  >
                    {{ category.name }} ({{ category.count }})
                  </button>
                </div>
              </div>
              
              <div class="filter-section">
                <h4 class="filter-title">按标签</h4>
                <div class="tags-list">
                  <button
                    v-for="tag in allTags"
                    :key="tag.name"
                    class="tag"
                    :class="{ 'active': selectedTag === tag.name }"
                    @click="selectTag(tag.name)"
                  >
                    {{ tag.name }}
                  </button>
                </div>
              </div>
            </div>
          </aside>
          
          <main class="archive-main">
            <div v-if="groupedPosts.length === 0" class="no-posts">
              <p>没有找到符合条件的文章</p>
              <button class="btn btn-secondary" @click="clearFilters">
                清除筛选
              </button>
            </div>
            
            <div v-else class="archive-groups">
              <div 
                v-for="group in groupedPosts" 
                :key="group.yearMonth" 
                class="archive-group"
              >
                <h2 class="group-title">{{ formatYearMonth(group.yearMonth) }}</h2>
                <div class="group-posts">
                  <RouterLink
                    v-for="post in group.posts"
                    :key="post.id"
                    :to="`/blog/${post.id}`"
                    class="post-item"
                  >
                    <span class="post-date">{{ formatDate(post.publishDate) }}</span>
                    <span class="post-title">{{ post.title }}</span>
                    <span class="post-category">{{ post.category }}</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { blogPosts, categories, tags } from '@/data/mockData'
import type { BlogPost } from '@/types'

const selectedCategory = ref<string | null>(null)
const selectedTag = ref<string>('全部')

const allTags = computed(() => tags)

const filteredPosts = computed(() => {
  let posts = [...blogPosts]
  
  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }
  
  if (selectedTag.value !== '全部') {
    posts = posts.filter(post => post.tags.includes(selectedTag.value))
  }
  
  return posts
})

const groupedPosts = computed(() => {
  const groupsMap = new Map<string, BlogPost[]>()
  
  filteredPosts.value.forEach(post => {
    const date = new Date(post.publishDate)
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!groupsMap.has(yearMonth)) {
      groupsMap.set(yearMonth, [])
    }
    groupsMap.get(yearMonth)!.push(post)
  })
  
  const sortedEntries = Array.from(groupsMap.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([yearMonth, posts]) => ({
      yearMonth,
      posts
    }))
  
  return sortedEntries
})

const formatYearMonth = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-')
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                      '七月', '八月', '九月', '十月', '十一月', '十二月']
  return `${year}年 ${monthNames[parseInt(month) - 1]}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

const selectCategory = (category: string | null) => {
  selectedCategory.value = category
}

const selectTag = (tagName: string) => {
  selectedTag.value = selectedTag.value === tagName ? '全部' : tagName
}

const clearFilters = () => {
  selectedCategory.value = null
  selectedTag.value = '全部'
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

.archive-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-3xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.archive-sidebar {
  height: fit-content;
  position: sticky;
  top: 100px;
}

.sidebar-card {
  padding: var(--spacing-lg);
}

.sidebar-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.filter-section {
  margin-bottom: var(--spacing-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
}

.filter-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.filter-item {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  
  &:hover,
  &.active {
    background-color: var(--color-bg-tertiary);
  }
  
  &.active {
    color: var(--color-primary);
    font-weight: 500;
  }
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.archive-groups {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.archive-group {
}

.group-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-primary);
}

.group-posts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.post-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-lg);
  align-items: center;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: var(--color-bg-secondary);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: auto 1fr;
    gap: var(--spacing-sm);
    
    .post-category {
      grid-column: 1 / -1;
    }
  }
}

.post-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

.post-title {
  font-weight: 500;
  color: var(--color-text-primary);
  
  .post-item:hover & {
    color: var(--color-primary);
  }
}

.post-category {
  font-size: var(--font-size-xs);
  padding: 2px 8px;
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  white-space: nowrap;
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
</style>
