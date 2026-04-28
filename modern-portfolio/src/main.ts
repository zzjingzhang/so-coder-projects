import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import Blog from './views/Blog.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Legal from './views/Legal.vue'
import NotFound from './views/NotFound.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/blog', component: Blog },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/legal', component: Legal },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')