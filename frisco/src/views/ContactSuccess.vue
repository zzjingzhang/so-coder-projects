<template>
  <div class="contact-success">
    <section class="success-section">
      <div class="container">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h1 class="success-title">提交成功！</h1>
          <p class="success-description">
            感谢您的留言，我们已收到您的消息。我们的团队将在 24 小时内与您联系。
          </p>
          <div class="success-actions">
            <RouterLink to="/" class="btn btn-primary btn-lg">
              返回首页
            </RouterLink>
            <RouterLink to="/blog" class="btn btn-secondary btn-lg">
              浏览博客
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.contact-success {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
}

.success-section {
  padding: var(--spacing-3xl) 0;
}

.success-content {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  padding: var(--spacing-3xl);
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.success-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-xl);
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-full);
  font-size: var(--font-size-3xl);
  color: var(--color-success);
}

.success-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
}

.success-description {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.success-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    .btn {
      width: 100%;
    }
  }
}
</style>
