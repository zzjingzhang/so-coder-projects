import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import ProgressBar from 'primevue/progressbar'
import Badge from 'primevue/badge'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import PopulationRaceView from './views/PopulationRaceView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PopulationRaceView
    }
  ]
})

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('Button', Button)
app.component('Slider', Slider)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('ProgressBar', ProgressBar)
app.component('Badge', Badge)

app.mount('#app')
