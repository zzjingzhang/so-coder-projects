import { createApp } from 'vue'
import { create, NButton, NCard, NModal, NProgress, NSpace, NStatistic, NAlert } from 'naive-ui'
import router from './router'
import App from './App.vue'
import './styles/main.css'

const naive = create({
  components: [
    NButton,
    NCard,
    NModal,
    NProgress,
    NSpace,
    NStatistic,
    NAlert
  ]
})

const app = createApp(App)

app.use(naive)
app.use(router)
app.mount('#app')
