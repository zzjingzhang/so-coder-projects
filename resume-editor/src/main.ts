import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router'
import './style.css'
import dayjs from 'dayjs'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const app = createApp(App)

app.use(router)
app.use(Antd, { locale: zhCN })

app.mount('#app')
