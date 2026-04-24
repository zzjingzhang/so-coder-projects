<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <div class="not-found-image">
          <span class="error-code">404</span>
        </div>
        <h1 class="not-found-title">页面不存在</h1>
        <p class="not-found-description">
          抱歉，您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页继续浏览。
        </p>
        <div class="not-found-actions">
          <RouterLink to="/" class="btn btn-primary btn-lg">
            返回首页
          </RouterLink>
          <RouterLink to="/blog" class="btn btn-secondary btn-lg">
            浏览博客
          </RouterLink>
        </div>
        
        <div class="suggestions">
          <h3 class="suggestions-title">您可能想访问：</h3>
          <div class="suggestions-grid">
            <RouterLink to="/about" class="suggestion-card card">
              <span class="suggestion-icon">🏢</span>
              <span class="suggestion-label">关于我们</span>
            </RouterLink>
            <RouterLink to="/blog" class="suggestion-card card">
              <span class="suggestion-icon">📚</span>
              <span class="suggestion-label">博客文章</span>
            </RouterLink>
            <RouterLink to="/contact" class="suggestion-card card">
              <span class="suggestion-icon">📧</span>
              <span class="suggestion-label">联系我们</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.not-found {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) 0;
  padding-top: calc(70px + var(--spacing-3xl));
  background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.not-found-image {
  margin-bottom: var(--spacing-xl);
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  color: var(--color-primary);
  opacity: 0.2;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
}

.not-found-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
}

.not-found-description {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.not-found-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-3xl);
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    .btn {
      width: 100%;
    }
  }
}

.suggestions {
}

.suggestions-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.suggestion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-4px);
    
    .suggestion-icon {
      transform: scale(1.1);
    }
  }
}

.suggestion-icon {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
  transition: transform var(--transition-fast);
}

.suggestion-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>
