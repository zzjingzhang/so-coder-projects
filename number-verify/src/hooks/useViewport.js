import { useState, useEffect } from 'react'

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: 'lg',
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      const isMobile = width < BREAKPOINTS.md
      const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg
      const isDesktop = width >= BREAKPOINTS.lg
      
      let breakpoint = 'lg'
      if (width < BREAKPOINTS.sm) breakpoint = 'xs'
      else if (width < BREAKPOINTS.md) breakpoint = 'sm'
      else if (width < BREAKPOINTS.lg) breakpoint = 'md'
      else if (width < BREAKPOINTS.xl) breakpoint = 'lg'
      else if (width < BREAKPOINTS['2xl']) breakpoint = 'xl'
      else breakpoint = '2xl'

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        breakpoint,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return viewport
}

export const useBreakpoint = (breakpoint) => {
  const { breakpoint: currentBreakpoint } = useViewport()
  
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint)
  const targetIndex = breakpointOrder.indexOf(breakpoint)
  
  return currentIndex >= targetIndex
}
