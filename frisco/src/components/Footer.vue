<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <div class="footer-brand">
          <RouterLink to="/" class="logo">
            <span class="logo-text">Frisco</span>
          </RouterLink>
          <p class="footer-description">
            现代化 SaaS 应用营销平台，帮助企业打造专业的数字化品牌形象。
          </p>
          <div class="social-links">
            <a 
              v-for="social in contactInfo.social" 
              :key="social.name" 
              :href="social.url" 
              class="social-link"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ social.icon }}
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-column">
            <h3 class="footer-title">产品</h3>
            <ul>
              <li><RouterLink to="/">首页</RouterLink></li>
              <li><RouterLink to="/about">关于我们</RouterLink></li>
              <li><RouterLink to="/blog">博客</RouterLink></li>
              <li><RouterLink to="/contact">联系我们</RouterLink></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3 class="footer-title">资源</h3>
            <ul>
              <li><RouterLink to="/archive">文章归档</RouterLink></li>
              <li><a href="#">文档中心</a></li>
              <li><a href="#">API 文档</a></li>
              <li><a href="#">帮助中心</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3 class="footer-title">联系</h3>
            <ul class="contact-list">
              <li>
                <span class="contact-icon">📧</span>
                <a :href="'mailto:' + contactInfo.email">{{ contactInfo.email }}</a>
              </li>
              <li>
                <span class="contact-icon">📞</span>
                <a :href="'tel:' + contactInfo.phone">{{ contactInfo.phone }}</a>
              </li>
              <li>
                <span class="contact-icon">📍</span>
                <span class="contact-text">{{ contactInfo.address }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} Frisco. 保留所有权利。
        </p>
        <div class="footer-bottom-links">
          <a href="#">隐私政策</a>
          <a href="#">服务条款</a>
          <a href="#">Cookie 政策</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { contactInfo } from '@/data/mockData'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--color-text-primary);
  color: white;
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
  
  a {
    color: var(--color-text-tertiary);
    transition: color var(--transition-fast);
    
    &:hover {
      color: white;
    }
  }
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-3xl);
  margin-bottom: var(--spacing-2xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}

.footer-brand {
  max-width: 300px;
}

.logo {
  display: inline-flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: white;
}

.footer-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-2px);
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.footer-column {
  ul {
    li {
      margin-bottom: var(--spacing-sm);
      
      a {
        font-size: var(--font-size-sm);
      }
    }
  }
}

.footer-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
}

.contact-list {
  li {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
  }
}

.contact-icon {
  font-size: var(--font-size-base);
  margin-top: 2px;
}

.contact-text {
  line-height: 1.6;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}

.copyright {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.footer-bottom-links {
  display: flex;
  gap: var(--spacing-lg);
  
  a {
    font-size: var(--font-size-sm);
  }
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-md);
  }
}
</style>
