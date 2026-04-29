import { useEffect, useCallback } from 'react'

export const useKeyboardShortcut = (key, callback, options = {}) => {
  const { ctrlKey = false, metaKey = false, shiftKey = false, preventDefault = false } = options

  const handleKeyDown = useCallback(
    (event) => {
      const keysMatch = event.key.toLowerCase() === key.toLowerCase()
      const shiftMatches = !shiftKey || event.shiftKey

      let modifierMatches = false
      
      if (ctrlKey && metaKey) {
        modifierMatches = event.ctrlKey && event.metaKey
      } else if (ctrlKey || metaKey) {
        modifierMatches = event.ctrlKey || event.metaKey
      } else {
        modifierMatches = true
      }

      if (keysMatch && modifierMatches && shiftMatches) {
        if (preventDefault) {
          event.preventDefault()
        }
        callback(event)
      }
    },
    [key, callback, ctrlKey, metaKey, shiftKey, preventDefault]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export const useToggleSidebar = (onToggle) => {
  useKeyboardShortcut('b', onToggle, {
    ctrlKey: true,
    preventDefault: true,
  })
}
