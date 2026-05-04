import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import Badge from 'primevue/badge'
import ProgressBar from 'primevue/progressbar'
import Tooltip from 'primevue/tooltip'
import 'primeicons/primeicons.css'

import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true
})

app.use(router)

app.component('Button', Button)
app.component('Slider', Slider)
app.component('SelectButton', SelectButton)
app.component('Card', Card)
app.component('Panel', Panel)
app.component('Divider', Divider)
app.component('Badge', Badge)
app.component('ProgressBar', ProgressBar)
app.directive('tooltip', Tooltip)

app.mount('#app')
