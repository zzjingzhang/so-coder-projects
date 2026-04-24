<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            打造
            <span class="highlight">现代化</span>
            SaaS 营销网站
          </h1>
          <p class="hero-subtitle">
            Frisco 为您提供专业、简洁、具有科技感的 SaaS / App 官网解决方案。
            让您的产品在竞争中脱颖而出。
          </p>
          <div class="hero-actions">
            <RouterLink to="/contact" class="btn btn-primary btn-lg">
              立即开始
            </RouterLink>
            <RouterLink to="/about" class="btn btn-outline btn-lg">
              了解更多
            </RouterLink>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-value">500+</span>
              <span class="hero-stat-label">企业客户</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value">98%</span>
              <span class="hero-stat-label">满意度</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value">24h</span>
              <span class="hero-stat-label">技术支持</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img 
            src="https://picsum.photos/seed/frisco-hero/800/500" 
            alt="Frisco Dashboard" 
          />
        </div>
      </div>
    </section>
    
    <section class="features section">
      <div class="container">
        <h2 class="section-title">为什么选择 Frisco</h2>
        <p class="section-subtitle">
          我们提供全方位的解决方案，帮助您的 SaaS 产品获得更好的市场表现
        </p>
        <div class="features-grid">
          <div 
            v-for="feature in features" 
            :key="feature.id" 
            class="feature-card card"
          >
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="process section">
      <div class="container">
        <h2 class="section-title">工作流程</h2>
        <p class="section-subtitle">
          简单四步，让您的营销网站快速上线
        </p>
        <div class="process-steps">
          <div 
            v-for="step in processSteps" 
            :key="step.id" 
            class="process-step"
          >
            <div class="process-step-header">
              <span class="process-step-icon">{{ step.icon }}</span>
              <span class="process-step-number">0{{ step.step }}</span>
            </div>
            <h3 class="process-step-title">{{ step.title }}</h3>
            <p class="process-step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="testimonials section">
      <div class="container">
        <h2 class="section-title">客户评价</h2>
        <p class="section-subtitle">
          听听我们的客户怎么说
        </p>
        <div class="testimonials-grid">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id" 
            class="testimonial-card card"
          >
            <div class="testimonial-rating">
              <span v-for="star in 5" :key="star" class="star">
                ★
              </span>
            </div>
            <p class="testimonial-content">"{{ testimonial.content }}"</p>
            <div class="testimonial-author">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name" 
                class="testimonial-avatar" 
              />
              <div class="testimonial-info">
                <span class="testimonial-name">{{ testimonial.name }}</span>
                <span class="testimonial-role">{{ testimonial.role }} · {{ testimonial.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="faq section">
      <div class="container">
        <h2 class="section-title">常见问题</h2>
        <p class="section-subtitle">
          您可能想了解的一些问题
        </p>
        <div class="faq-list">
          <div 
            v-for="faq in faqs" 
            :key="faq.id" 
            class="faq-item card"
            :class="{ 'faq-item-open': openFaqId === faq.id }"
            @click="toggleFaq(faq.id)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">{{ openFaqId === faq.id ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-show="openFaqId === faq.id">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">准备好开始了吗？</h2>
          <p class="cta-description">
            加入 500+ 企业客户，开启您的数字化营销之旅
          </p>
          <div class="cta-actions">
            <RouterLink to="/contact" class="btn btn-primary btn-lg">
              联系我们
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
import { ref } from 'vue'
import { features, processSteps, testimonials, faqs } from '@/data/mockData'

const openFaqId = ref<number | null>(null)

const toggleFaq = (id: number) => {
  openFaqId.value = openFaqId.value === id ? null : id
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 70px;
  
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
      background: radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    }
  }
  
  &-container {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
  
  &-content {
    max-width: 560px;
  }
  
  &-title {
    font-size: var(--font-size-4xl);
    font-weight: 700;
    line-height: 1.2;
    color: white;
    margin-bottom: var(--spacing-lg);
    
    .highlight {
      color: var(--color-primary-light);
    }
    
    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }
  
  &-subtitle {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: var(--spacing-xl);
    
    @media (max-width: 1024px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  &-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    
    @media (max-width: 1024px) {
      justify-content: center;
    }
    
    @media (max-width: 480px) {
      flex-direction: column;
      
      .btn {
        width: 100%;
      }
    }
  }
  
  &-stats {
    display: flex;
    gap: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    @media (max-width: 1024px) {
      justify-content: center;
    }
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: var(--spacing-md);
    }
  }
  
  &-stat {
    display: flex;
    flex-direction: column;
  }
  
  &-stat-value {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: white;
  }
  
  &-stat-label {
    font-size: var(--font-size-sm);
    color: rgba(255, 255, 255, 0.6);
  }
  
  &-image {
    position: relative;
    
    img {
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
    }
  }
}

.features-grid {
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

.feature-card {
  padding: var(--spacing-xl);
  text-align: center;
}

.feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.feature-description {
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.process {
  background-color: var(--color-bg-secondary);
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.process-step {
  text-align: center;
  position: relative;
  padding: var(--spacing-lg);
  
  @media (min-width: 1025px) {
    &:not(:last-child)::after {
      content: '→';
      position: absolute;
      top: 50%;
      right: -30px;
      transform: translateY(-50%);
      font-size: var(--font-size-2xl);
      color: var(--color-border);
    }
  }
}

.process-step-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.process-step-icon {
  font-size: var(--font-size-2xl);
}

.process-step-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  opacity: 0.3;
}

.process-step-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.process-step-description {
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin: 0 auto;
  }
}

.testimonial-card {
  padding: var(--spacing-xl);
}

.testimonial-rating {
  margin-bottom: var(--spacing-md);
}

.star {
  color: #fbbf24;
  font-size: var(--font-size-lg);
}

.testimonial-content {
  font-size: var(--font-size-base);
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.testimonial-info {
  display: flex;
  flex-direction: column;
}

.testimonial-name {
  font-weight: 600;
  color: var(--color-text-primary);
}

.testimonial-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.faq {
  background-color: var(--color-bg-secondary);
}

.faq-list {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.faq-item {
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  
  h3 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-text-primary);
  }
}

.faq-toggle {
  font-size: var(--font-size-xl);
  font-weight: 300;
  color: var(--color-primary);
  flex-shrink: 0;
}

.faq-answer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  
  p {
    font-size: var(--font-size-sm);
    line-height: 1.8;
    color: var(--color-text-secondary);
  }
}

.cta {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
}

.cta-description {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--spacing-xl);
}

.cta-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    .btn {
      width: 100%;
    }
  }
  
  .btn-primary {
    background-color: white;
    color: var(--color-primary);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  }
  
  .btn-secondary {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
