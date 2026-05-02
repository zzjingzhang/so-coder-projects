import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
