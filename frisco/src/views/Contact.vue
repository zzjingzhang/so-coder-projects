<template>
  <div class="contact">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container page-hero-content">
        <h1 class="page-hero-title">联系我们</h1>
        <p class="page-hero-subtitle">
          无论您有什么问题或需求，我们都很乐意为您提供帮助
        </p>
      </div>
    </section>
    
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2 class="contact-section-title">联系方式</h2>
            <p class="contact-section-desc">
              您可以通过以下方式与我们取得联系。我们的团队将在 24 小时内回复您的消息。
            </p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <span class="contact-method-icon">📧</span>
                <div class="contact-method-content">
                  <h3 class="contact-method-title">电子邮件</h3>
                  <a :href="'mailto:' + contactInfo.email" class="contact-method-link">
                    {{ contactInfo.email }}
                  </a>
                </div>
              </div>
              
              <div class="contact-method">
                <span class="contact-method-icon">📞</span>
                <div class="contact-method-content">
                  <h3 class="contact-method-title">电话</h3>
                  <a :href="'tel:' + contactInfo.phone" class="contact-method-link">
                    {{ contactInfo.phone }}
                  </a>
                </div>
              </div>
              
              <div class="contact-method">
                <span class="contact-method-icon">📍</span>
                <div class="contact-method-content">
                  <h3 class="contact-method-title">地址</h3>
                  <p class="contact-method-text">{{ contactInfo.address }}</p>
                </div>
              </div>
            </div>
            
            <div class="contact-social">
              <h3 class="contact-social-title">关注我们</h3>
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
            
            <div class="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.123456789!2d121.4737!3d31.2304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEzJzQ5LjQiTiAxMjHCsDI4JzI1LjMiRQ!5e0!3m2!1sen!2scn!4v1234567890123"
                width="100%"
                height="200"
                style="border: 0; border-radius: var(--radius-lg);"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Frisco 公司地址"
              ></iframe>
            </div>
          </div>
          
          <div class="contact-form-wrapper">
            <h2 class="contact-section-title">发送消息</h2>
            <p class="contact-section-desc">
              填写下方表单，我们将尽快与您联系
            </p>
            
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">姓名 *</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.name }"
                  placeholder="请输入您的姓名"
                  @blur="validateField('name')"
                />
                <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">邮箱 *</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.email }"
                  placeholder="请输入您的邮箱"
                  @blur="validateField('email')"
                />
                <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
              </div>
              
              <div class="form-group">
                <label for="subject" class="form-label">主题 *</label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.subject }"
                  placeholder="请输入消息主题"
                  @blur="validateField('subject')"
                />
                <p v-if="errors.subject" class="form-error">{{ errors.subject }}</p>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">留言 *</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  class="form-textarea"
                  :class="{ 'error': errors.message }"
                  placeholder="请输入您的留言内容"
                  rows="5"
                  @blur="validateField('message')"
                ></textarea>
                <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
              </div>
              
              <button type="submit" class="btn btn-primary btn-lg btn-full" :disabled="isSubmitting">
                {{ isSubmitting ? '提交中...' : '发送消息' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { contactInfo } from '@/data/mockData'
import type { FormData, FormErrors } from '@/types'

const router = useRouter()
const isSubmitting = ref(false)

const formData = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive<FormErrors>({})

const validateField = (field: keyof FormData): boolean => {
  errors[field] = undefined
  
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = '请输入您的姓名'
        return false
      }
      if (formData.name.trim().length < 2) {
        errors.name = '姓名至少需要 2 个字符'
        return false
      }
      break
    case 'email':
      if (!formData.email.trim()) {
        errors.email = '请输入您的邮箱'
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = '请输入有效的邮箱地址'
        return false
      }
      break
    case 'subject':
      if (!formData.subject.trim()) {
        errors.subject = '请输入消息主题'
        return false
      }
      if (formData.subject.trim().length < 5) {
        errors.subject = '主题至少需要 5 个字符'
        return false
      }
      break
    case 'message':
      if (!formData.message.trim()) {
        errors.message = '请输入您的留言内容'
        return false
      }
      if (formData.message.trim().length < 10) {
        errors.message = '留言内容至少需要 10 个字符'
        return false
      }
      break
  }
  return true
}

const validateAll = (): boolean => {
  let isValid = true
  const fields: (keyof FormData)[] = ['name', 'email', 'subject', 'message']
  
  for (const field of fields) {
    if (!validateField(field)) {
      isValid = false
    }
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateAll()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/contact-success')
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    isSubmitting.value = false
  }
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.contact-section-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.contact-section-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.contact-method {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.contact-method-icon {
  font-size: var(--font-size-2xl);
}

.contact-method-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
}

.contact-method-link {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-primary);
  
  &:hover {
    text-decoration: underline;
  }
}

.contact-method-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.contact-social {
  margin-bottom: var(--spacing-xl);
}

.contact-social-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-2px);
  }
}

.contact-map {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.contact-form-wrapper {
  padding: var(--spacing-2xl);
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl);
  }
}

.contact-form {
  .btn {
    margin-top: var(--spacing-md);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
