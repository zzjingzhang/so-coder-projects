import { useUserStore } from '@/store'

export function setupPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    console.log(`路由跳转前: ${from.path} -> ${to.path}`)
    
    const userStore = useUserStore()
    
    if (to.path === '/login') {
      if (userStore.isLoggedIn) {
        next('/dashboard')
      } else {
        next()
      }
    } else {
      if (userStore.isLoggedIn) {
        next()
      } else {
        next('/login')
      }
    }
  })

  router.afterEach((to, from) => {
    console.log(`路由跳转后: ${from.path} -> ${to.path}`)
  })
}