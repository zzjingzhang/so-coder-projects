<template>
  <div class="about">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container page-hero-content">
        <h1 class="page-hero-title">关于 Frisco</h1>
        <p class="page-hero-subtitle">
          我们致力于帮助 SaaS 企业打造专业的数字化品牌形象
        </p>
      </div>
    </section>
    
    <section class="story section">
      <div class="container">
        <div class="story-grid">
          <div class="story-content">
            <h2 class="section-title">我们的故事</h2>
            <p class="story-text">
              Frisco 成立于 2019 年，由一群热爱技术和设计的创业者创建。我们深知，对于 SaaS 企业来说，一个专业、美观、高性能的网站至关重要——它不仅是品牌形象的窗口，更是转化客户的关键环节。
            </p>
            <p class="story-text">
              在过去的五年里，我们服务了超过 500 家企业客户，帮助他们从零开始构建品牌网站，或是对现有网站进行升级改造。我们的客户涵盖了从初创公司到上市公司的各个阶段，覆盖了金融、医疗、教育、电商等多个行业。
            </p>
            <p class="story-text">
              我们相信，好的设计不应该是奢侈品。每一个 SaaS 产品都值得拥有一个与其品质相匹配的网站。这就是 Frisco 存在的意义——让专业的网站建设变得简单、高效、可负担。
            </p>
          </div>
          <div class="story-image">
            <img 
              src="https://picsum.photos/seed/frisco-team/800/500" 
              alt="Frisco 团队" 
            />
          </div>
        </div>
      </div>
    </section>
    
    <section class="stats section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.id" class="stat-item">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="values section">
      <div class="container">
        <h2 class="section-title">我们的价值观</h2>
        <p class="section-subtitle">
          这些价值观指导着我们的每一个决策和行动
        </p>
        <div class="values-grid">
          <div class="value-card card">
            <div class="value-icon">🎯</div>
            <h3 class="value-title">用户至上</h3>
            <p class="value-description">
              我们的每一个设计和功能都始于用户需求。深入理解用户、为用户创造价值，是我们一切工作的出发点。
            </p>
          </div>
          <div class="value-card card">
            <div class="value-icon">⚡</div>
            <h3 class="value-title">追求卓越</h3>
            <p class="value-description">
              我们不满足于"过得去"。无论是代码质量、用户体验还是客户服务，我们都追求行业最高标准。
            </p>
          </div>
          <div class="value-card card">
            <div class="value-icon">🤝</div>
            <h3 class="value-title">诚信透明</h3>
            <p class="value-description">
              我们相信，长期的合作关系建立在信任之上。我们坦诚沟通、透明定价、信守承诺。
            </p>
          </div>
          <div class="value-card card">
            <div class="value-icon">🌱</div>
            <h3 class="value-title">持续创新</h3>
            <p class="value-description">
              技术在发展，用户期望在提升。我们保持学习、拥抱变化，不断为客户带来更好的解决方案。
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="team section">
      <div class="container">
        <h2 class="section-title">核心团队</h2>
        <p class="section-subtitle">
          来自顶尖科技公司的专业团队，为您提供最优质的服务
        </p>
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.id" class="team-card card">
            <img 
              :src="member.avatar" 
              :alt="member.name" 
              class="team-avatar" 
            />
            <h3 class="team-name">{{ member.name }}</h3>
            <span class="team-role">{{ member.role }}</span>
            <p class="team-bio">{{ member.bio }}</p>
            <div class="team-social">
              <a 
                v-if="member.social.twitter" 
                :href="member.social.twitter" 
                class="social-link"
                target="_blank"
              >
                𝕏
              </a>
              <a 
                v-if="member.social.linkedin" 
                :href="member.social.linkedin" 
                class="social-link"
                target="_blank"
              >
                in
              </a>
              <a 
                v-if="member.social.github" 
                :href="member.social.github" 
                class="social-link"
                target="_blank"
              >
                ⌘
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">想要了解更多？</h2>
          <p class="cta-description">
            我们期待与您交流，探索如何帮助您的产品获得更好的市场表现
          </p>
          <RouterLink to="/contact" class="btn btn-primary btn-lg">
            联系我们
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { stats, teamMembers } from '@/data/mockData'
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

.story {
  &-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  
  &-content {
    .section-title {
      text-align: left;
    }
  }
  
  &-text {
    font-size: var(--font-size-base);
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }
  
  &-image {
    img {
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
    }
  }
}

.stats {
  background-color: var(--color-bg-secondary);
  
  &-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-xl);
    
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
}

.stat-value {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.values {
  &-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xl);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.value-card {
  padding: var(--spacing-xl);
}

.value-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.value-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.value-description {
  font-size: var(--font-size-base);
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.team {
  background-color: var(--color-bg-secondary);
  
  &-grid {
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
}

.team-card {
  padding: var(--spacing-xl);
  text-align: center;
}

.team-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  margin: 0 auto var(--spacing-md);
}

.team-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.team-role {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.team-bio {
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.team-social {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
}

.cta {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  text-align: center;
  
  &-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  &-title {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: white;
    margin-bottom: var(--spacing-md);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-2xl);
    }
  }
  
  &-description {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: var(--spacing-xl);
  }
}
</style>
