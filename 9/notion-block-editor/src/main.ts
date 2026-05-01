import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Divider from 'primevue/divider'
import Tooltip from 'primevue/tooltip'
import ContextMenu from 'primevue/contextmenu'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.p-dark'
    }
  }
})

app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputSwitch', InputSwitch)
app.component('Dialog', Dialog)
app.component('Select', Select)
app.component('Divider', Divider)
app.component('ContextMenu', ContextMenu)

app.directive('tooltip', Tooltip)

app.mount('#app')
