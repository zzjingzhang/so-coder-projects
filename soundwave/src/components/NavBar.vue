<template>
  <nav class="navbar">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="logo flex items-center gap-2">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <span class="logo-text">SoundWave</span>
      </RouterLink>
      
      <div class="nav-links flex items-center gap-4">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path" 
          class="nav-link"
          :class="{ active: $route.path === link.path }"
        >
          {{ link.name }}
        </RouterLink>
      </div>
      
      <div class="nav-actions flex items-center gap-3">
        <RouterLink to="/search" class="search-btn btn-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 12.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </RouterLink>
        
        <RouterLink to="/profile" class="profile-btn">
          <img 
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20user%20avatar%20with%20headphones%20and%20music%20theme&image_size=square" 
            alt="Profile" 
            class="profile-avatar"
          />
        </RouterLink>
      </div>
      
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <svg v-if="!isMobileMenuOpen" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
    
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <RouterLink 
        v-for="link in navLinks" 
        :key="link.path"
        :to="link.path" 
        class="mobile-nav-link"
        @click="closeMobileMenu"
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Profile', path: '/profile' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  height: var(--nav-height);
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: var(--primary-color);
}

.logo-text {
  background: linear-gradient(135deg, var(--primary-color), #ff9933);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: none;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--text-primary);
  background-color: var(--bg-tertiary);
}

.nav-link.active {
  color: var(--primary-color);
}

.nav-actions {
  display: none;
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
}

.profile-btn:hover .profile-avatar {
  border-color: var(--primary-color);
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.mobile-menu-btn:hover {
  background-color: var(--bg-tertiary);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 8px 0;
}

.mobile-nav-link {
  display: block;
  padding: 12px 20px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover {
  color: var(--text-primary);
  background-color: var(--bg-tertiary);
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
  
  .nav-actions {
    display: flex;
  }
  
  .mobile-menu-btn {
    display: none;
  }
  
  .mobile-menu {
    display: none;
  }
}
</style>
