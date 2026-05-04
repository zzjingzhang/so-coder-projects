import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'
import GeometryTransformer from './components/GeometryTransformer.vue'

const routes = [
  { path: '/', component: GeometryTransformer }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
