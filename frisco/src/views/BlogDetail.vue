<template>
  <div class="blog-detail" v-if="post">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container page-hero-content">
        <div class="hero-meta">
          <span class="hero-category">{{ post.category }}</span>
          <span class="hero-dot">·</span>
          <span class="hero-date">{{ formattedDate }}</span>
          <span class="hero-dot">·</span>
          <span class="hero-read">{{ post.readTime }}</span>
        </div>
        <h1 class="page-hero-title">{{ post.title }}</h1>
        <div class="hero-author">
          <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar" />
          <div class="author-info">
            <span class="author-name">{{ post.author.name }}</span>
            <span class="author-role">{{ post.author.role }}</span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="post-cover">
      <div class="container">
        <img :src="post.coverImage" :alt="post.title" class="cover-image" />
      </div>
    </section>
    
    <section class="post-content section">
      <div class="container post-container">
        <article class="post-body" v-html="post.content"></article>
        
        <div class="post-tags">
          <span class="tags-label">标签：</span>
          <RouterLink
            v-for="tag in post.tags"
            :key="tag"
            :to="`/blog?tag=${encodeURIComponent(tag)}`"
            class="tag"
          >
            {{ tag }}
          </RouterLink>
        </div>
        
        <div class="post-navigation">
          <RouterLink v-if="prevPost" :to="`/blog/${prevPost.id}`" class="nav-link nav-prev">
            <span class="nav-label">← 上一篇</span>
            <span class="nav-title">{{ prevPost.title }}</span>
          </RouterLink>
          <RouterLink v-if="nextPost" :to="`/blog/${nextPost.id}`" class="nav-link nav-next">
            <span class="nav-label">下一篇 →</span>
            <span class="nav-title">{{ nextPost.title }}</span>
          </RouterLink>
        </div>
      </div>
    </section>
    
    <section class="related-posts section" v-if="relatedPosts.length > 0">
      <div class="container">
        <h2 class="section-title">相关文章</h2>
        <div class="related-grid">
          <BlogCard
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.id"
            :post="relatedPost"
          />
        </div>
      </div>
    </section>
  </div>
  
  <div v-else class="post-not-found">
    <p>文章不存在</p>
    <RouterLink to="/blog" class="btn btn-primary">返回博客列表</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BlogCard from '@/components/BlogCard.vue'
import { blogPosts } from '@/data/mockData'
import type { BlogPost } from '@/types'

const route = useRoute()
const router = useRouter()
const post = ref<BlogPost | null>(null)

const formattedDate = computed(() => {
  if (!post.value) return ''
  const date = new Date(post.value.publishDate)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const postIndex = computed(() => {
  if (!post.value) return -1
  return blogPosts.findIndex(p => p.id === post.value?.id)
})

const prevPost = computed(() => {
  if (postIndex.value < blogPosts.length - 1) {
    return blogPosts[postIndex.value + 1]
  }
  return null
})

const nextPost = computed(() => {
  if (postIndex.value > 0) {
    return blogPosts[postIndex.value - 1]
  }
  return null
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  const currentTags = post.value.tags
  const related = blogPosts
    .filter(p => p.id !== post.value!.id)
    .filter(p => p.tags.some(tag => currentTags.includes(tag)))
    .slice(0, 3)
  
  if (related.length < 3) {
    const remaining = blogPosts
      .filter(p => p.id !== post.value!.id && !related.includes(p))
      .slice(0, 3 - related.length)
    return [...related, ...remaining]
  }
  
  return related
})

const loadPost = () => {
  const postId = Number(route.params.id)
  const foundPost = blogPosts.find(p => p.id === postId)
  
  if (foundPost) {
    post.value = foundPost
    document.title = `${foundPost.title} - Frisco`
  } else {
    post.value = null
  }
}

onMounted(() => {
  loadPost()
})

watch(() => route.params.id, () => {
  loadPost()
})
</script>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  padding: 160px 0 100px;
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
    max-width: 720px;
    margin: 0 auto;
  }
}

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
}

.hero-category {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.hero-dot {
  color: rgba(255, 255, 255, 0.3);
}

.page-hero-title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-xl);
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
}

.hero-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.author-name {
  font-weight: 600;
  color: white;
}

.author-role {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
}

.post-cover {
  margin-top: -60px;
  position: relative;
  z-index: 2;
}

.cover-image {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}

.post-container {
  max-width: 720px;
  margin: 0 auto;
}

.post-body {
  font-size: var(--font-size-base);
  line-height: 2;
  color: var(--color-text-secondary);
  
  :deep(h2) {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: var(--spacing-2xl) 0 var(--spacing-md);
  }
  
  :deep(p) {
    margin-bottom: var(--spacing-lg);
  }
  
  :deep(ul) {
    margin-bottom: var(--spacing-lg);
    padding-left: var(--spacing-xl);
    
    li {
      list-style: disc;
      margin-bottom: var(--spacing-sm);
    }
  }
}

.post-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
}

.tags-label {
  font-weight: 600;
  color: var(--color-text-primary);
}

.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.nav-link {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-bg-tertiary);
    transform: translateY(-2px);
  }
}

.nav-prev {
  text-align: left;
}

.nav-next {
  text-align: right;
}

.nav-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xs);
}

.nav-title {
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: var(--font-size-sm);
  }
}

.related-posts {
  background-color: var(--color-bg-secondary);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.post-not-found {
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  text-align: center;
  
  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }
}
</style>
