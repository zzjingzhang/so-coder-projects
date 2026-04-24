<template>
  <header 
    class="header" 
    :class="{ 'header-scrolled': isScrolled, 'mobile-menu-open': isMobileMenuOpen }"
  >
    <div class="container header-container">
      <RouterLink to="/" class="logo">
        <span class="logo-text">Frisco</span>
      </RouterLink>
      
      <nav class="nav-desktop">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="nav-link"
          :class="{ 'nav-link-active': isActiveRoute(item.path) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      
      <div class="header-actions">
        <RouterLink to="/contact" class="btn btn-primary">联系我们</RouterLink>
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span class="menu-icon"></span>
          <span class="menu-icon"></span>
          <span class="menu-icon"></span>
        </button>
      </div>
    </div>
    
    <nav class="nav-mobile" v-show="isMobileMenuOpen">
      <div class="container">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="nav-link-mobile"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink 
          to="/contact" 
          class="btn btn-primary btn-full"
          @click="closeMobileMenu"
        >
          联系我们
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于' },
  { path: '/blog', label: '博客' },
  { path: '/archive', label: '归档' },
  { path: '/contact', label: '联系' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const isActiveRoute = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: transparent;
  transition: background-color var(--transition-base), box-shadow var(--transition-base);
  
  &-scrolled {
    background-color: var(--color-bg-primary);
    box-shadow: var(--shadow-md);
  }
  
  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  &-text {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-text-primary);
    
    .header:not(.header-scrolled) & {
      color: white;
    }
  }
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  position: relative;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  
  .header:not(.header-scrolled) & {
    color: rgba(255, 255, 255, 0.8);
    
    &:hover,
    &-active {
      color: white;
    }
  }
  
  &:hover,
  &-active {
    color: var(--color-primary);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: width var(--transition-fast);
  }
  
  &-active::after,
  &:hover::after {
    width: 100%;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    .btn {
      display: none;
    }
  }
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--spacing-sm);
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  .menu-icon {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-text-primary);
    transition: all var(--transition-fast);
    
    .header:not(.header-scrolled) & {
      background-color: white;
    }
    
    .mobile-menu-open & {
      background-color: var(--color-text-primary);
      
      &:first-child {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      &:nth-child(2) {
        opacity: 0;
      }
      
      &:last-child {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  }
}

.nav-mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-bg-primary);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-lg) 0;
  
  @media (min-width: 769px) {
    display: none !important;
  }
  
  .nav-link-mobile {
    display: block;
    padding: var(--spacing-md) 0;
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-border-light);
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary);
    }
  }
  
  .btn {
    margin-top: var(--spacing-md);
  }
}
</style>
