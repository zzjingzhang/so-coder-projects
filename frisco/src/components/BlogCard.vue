<template>
  <RouterLink :to="`/blog/${post.id}`" class="blog-card card">
    <div class="blog-card-image">
      <img :src="post.coverImage" :alt="post.title" />
      <span class="blog-card-category">{{ post.category }}</span>
    </div>
    <div class="blog-card-content">
      <div class="blog-card-meta">
        <span class="blog-card-date">{{ formattedDate }}</span>
        <span class="blog-card-dot">·</span>
        <span class="blog-card-read">{{ post.readTime }}</span>
      </div>
      <h3 class="blog-card-title">{{ post.title }}</h3>
      <p class="blog-card-excerpt">{{ post.excerpt }}</p>
      <div class="blog-card-tags">
        <span 
          v-for="tag in post.tags.slice(0, 2)" 
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BlogPost } from '@/types'

const props = defineProps<{
  post: BlogPost
}>()

const formattedDate = computed(() => {
  const date = new Date(props.post.publishDate)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style lang="scss" scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    .blog-card-title {
      color: var(--color-primary);
    }
  }
}

.blog-card-image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.blog-card-category {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: white;
  background-color: var(--color-primary);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.blog-card-content {
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.blog-card-dot {
  color: var(--color-border);
}

.blog-card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  transition: color var(--transition-fast);
}

.blog-card-excerpt {
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  flex: 1;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
