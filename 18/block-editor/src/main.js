import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#8b5cf6',
          error: '#ef4444',
          info: '#06b6d4',
          success: '#10b981',
          warning: '#f59e0b'
        }
      }
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
