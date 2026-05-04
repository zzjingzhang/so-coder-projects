import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'

const theme = {
  token: {
    colorPrimary: '#ec4899',
    colorPrimaryHover: '#f472b6',
    colorPrimaryActive: '#db2777',
    fontFamily: 'Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
  },
  components: {
    Button: {
      colorPrimary: '#ec4899',
      colorPrimaryHover: '#f472b6',
      colorPrimaryActive: '#db2777',
      borderRadius: 8,
      controlHeight: 44,
    },
    Card: {
      colorBgContainer: '#111111',
      colorBorderSecondary: '#374151',
      borderRadiusLG: 12,
    },
    Calendar: {
      colorBgContainer: '#111111',
      colorBorderSecondary: '#374151',
      borderRadiusLG: 12,
    },
    Select: {
      colorBgContainer: '#1f1f1f',
      colorBorder: '#374151',
      borderRadiusLG: 8,
    },
    Input: {
      colorBgContainer: '#1f1f1f',
      colorBorder: '#374151',
      borderRadiusLG: 8,
    },
    Modal: {
      colorBgContainer: '#111111',
      colorBorderSecondary: '#374151',
    },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
