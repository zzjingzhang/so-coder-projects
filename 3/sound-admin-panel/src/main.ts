import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Card from 'primevue/card'
import Sidebar from 'primevue/sidebar'
import Toolbar from 'primevue/toolbar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import Skeleton from 'primevue/skeleton'
import ProgressSpinner from 'primevue/progressspinner'
import Badge from 'primevue/badge'
import InputSwitch from 'primevue/inputswitch'
import Avatar from 'primevue/avatar'
import Divider from 'primevue/divider'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.app-dark'
    }
  }
})
app.use(ToastService)
app.use(ConfirmationService)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Card', Card)
app.component('Sidebar', Sidebar)
app.component('Toolbar', Toolbar)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('Tag', Tag)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Skeleton', Skeleton)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Badge', Badge)
app.component('InputSwitch', InputSwitch)
app.component('Avatar', Avatar)
app.component('Divider', Divider)
app.component('Textarea', Textarea)
app.component('Checkbox', Checkbox)
app.component('Message', Message)
app.component('InlineMessage', InlineMessage)

app.mount('#app')
