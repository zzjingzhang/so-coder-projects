import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Carousel from 'primevue/carousel'
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true
})

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Carousel', Carousel)
app.component('Dialog', Dialog)
app.component('Tag', Tag)
app.component('Rating', Rating)

app.mount('#app')
