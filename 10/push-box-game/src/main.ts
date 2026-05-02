import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#4CAF50',
          secondary: '#FF9800',
          background: '#F5F5F5',
          surface: '#FFFFFF',
          error: '#E53935',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  }
})

createApp(App).use(router).use(vuetify).mount('#app')
