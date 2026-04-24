import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import ContactSuccess from '@/views/ContactSuccess.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import Archive from '@/views/Archive.vue'
import NotFound from '@/views/NotFound.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Frisco - 现代化 SaaS 应用营销平台',
      description: 'Frisco 是一个现代化、专业、简洁、具有科技感的 SaaS 应用营销网站模板',
      keywords: 'Frisco, SaaS, 应用营销, 网站模板'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们 - Frisco',
      description: '了解 Frisco 品牌故事、团队理念和产品愿景',
      keywords: 'Frisco, 关于我们, 品牌故事, 团队'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: '联系我们 - Frisco',
      description: '与 Frisco 团队取得联系，获取支持或咨询产品信息',
      keywords: 'Frisco, 联系我们, 客服, 咨询'
    }
  },
  {
    path: '/contact-success',
    name: 'ContactSuccess',
    component: ContactSuccess,
    meta: {
      title: '提交成功 - Frisco',
      description: '您的消息已成功提交',
      keywords: 'Frisco, 提交成功, 感谢'
    }
  },
  {
    path: '/blog',
    name: 'BlogList',
    component: BlogList,
    meta: {
      title: '博客 - Frisco',
      description: '探索 Frisco 博客，了解最新的行业资讯、产品更新和使用技巧',
      keywords: 'Frisco, 博客, 资讯, 教程'
    }
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail,
    meta: {
      title: '文章详情 - Frisco',
      description: '阅读 Frisco 博客文章',
      keywords: 'Frisco, 博客, 文章'
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    meta: {
      title: '归档 - Frisco',
      description: '浏览 Frisco 博客文章归档',
      keywords: 'Frisco, 归档, 博客存档'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面不存在 - Frisco',
      description: '您访问的页面不存在',
      keywords: 'Frisco, 404, 页面不存在'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.setAttribute('name', 'description')
    document.head.appendChild(description)
  }
  description.setAttribute('content', to.meta.description as string || '')
  
  let keywords = document.querySelector('meta[name="keywords"]')
  if (!keywords) {
    keywords = document.createElement('meta')
    keywords.setAttribute('name', 'keywords')
    document.head.appendChild(keywords)
  }
  keywords.setAttribute('content', to.meta.keywords as string || '')
  
  next()
})

export default router
