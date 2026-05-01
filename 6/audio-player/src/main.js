import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import naive from 'naive-ui'
import './style.css'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'Player',
    component: () => import('./views/PlayerView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(naive)

app.mount('#app')
