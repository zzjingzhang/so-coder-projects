import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0f172a',
          surface: '#1e293b',
          primary: '#22d3ee',
          'primary-darken-1': '#06b6d4',
          secondary: '#14b8a6',
          accent: '#3b82f6',
          error: '#f43f5e',
          info: '#0ea5e9',
          success: '#10b981',
          warning: '#f59e0b',
        }
      }
    }
  }
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
