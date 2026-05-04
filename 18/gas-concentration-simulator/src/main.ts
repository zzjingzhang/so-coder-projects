import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import ProgressBar from 'primevue/progressbar'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import './styles/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('Button', Button)
app.component('Card', Card)
app.component('Badge', Badge)
app.component('ProgressBar', ProgressBar)

app.mount('#app')
