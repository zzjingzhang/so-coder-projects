import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import SelectButton from 'primevue/selectbutton'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  unstyled: true
})

app.component('Button', Button)
app.component('Slider', Slider)
app.component('SelectButton', SelectButton)

app.mount('#app')
