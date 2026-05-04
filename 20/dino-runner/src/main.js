import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import './style.css'
import App from './App.vue'
import GamePage from './pages/GamePage.vue'

const routes = [
  { path: '/', component: GamePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.mount('#app')
