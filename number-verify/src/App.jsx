import { useState, useCallback } from 'react'
import { ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Sidebar } from './components/layout/Sidebar'
import { AppRouter } from './router'
import { NotificationProvider } from './contexts/NotificationContext'
import { useViewport } from './hooks/useViewport'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('verify')
  const { isMobile } = useViewport()
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <Flex direction="column" minH="100vh" bg={bgColor}>
      <Header onToggleSidebar={toggleSidebar} />
      
      <Flex flex="1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          onToggle={toggleSidebar}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <Flex
          as="main"
          flex="1"
          overflow="auto"
          transition="margin-left 0.3s ease"
        >
          <AppRouter />
        </Flex>
      </Flex>
      
      <Footer />
    </Flex>
  )
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
