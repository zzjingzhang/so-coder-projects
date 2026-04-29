import { createContext, useContext, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

const NotificationContext = createContext()

const DEFAULT_DURATION = 5000

const notificationTypeMap = {
  success: {
    title: '成功',
    status: 'success',
  },
  error: {
    title: '错误',
    status: 'error',
  },
  warning: {
    title: '警告',
    status: 'warning',
  },
  info: {
    title: '信息',
    status: 'info',
  },
}

export const NotificationProvider = ({ children }) => {
  const toast = useToast()

  const showNotification = useCallback(
    (message, type = 'info', options = {}) => {
      const config = notificationTypeMap[type] || notificationTypeMap.info
      
      toast({
        title: options.title || config.title,
        description: message,
        status: config.status,
        duration: options.duration || DEFAULT_DURATION,
        isClosable: true,
        position: options.position || 'top-right',
        ...options,
      })
    },
    [toast]
  )

  const showSuccess = useCallback(
    (message, options) => showNotification(message, 'success', options),
    [showNotification]
  )

  const showError = useCallback(
    (message, options) => showNotification(message, 'error', options),
    [showNotification]
  )

  const showWarning = useCallback(
    (message, options) => showNotification(message, 'warning', options),
    [showNotification]
  )

  const showInfo = useCallback(
    (message, options) => showNotification(message, 'info', options),
    [showNotification]
  )

  const value = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  
  return context
}
