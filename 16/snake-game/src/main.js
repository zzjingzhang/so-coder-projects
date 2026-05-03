import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0a0a1a',
          surface: '#1a1a2e',
          primary: '#00d4ff',
          secondary: '#ff00ff',
          accent: '#00ff88',
          error: '#ff3366',
          info: '#00d4ff',
          success: '#00ff88',
          warning: '#ffaa00'
        }
      }
    }
  }
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
