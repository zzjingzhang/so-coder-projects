import { useState, useCallback } from 'react'
import { verifyPhoneNumber } from '../services/mockApi'
import { withCache, cacheManager } from '../utils/cache'
import { STATUS } from '../constants/status'

export const usePhoneVerification = () => {
  const [state, setState] = useState({
    isLoading: false,
    result: null,
    error: null,
    status: STATUS.IDLE,
  })
  const [history, setHistory] = useState([])

  const verify = useCallback(
    async (phoneNumber, countryCode = 'CN') => {
      if (!phoneNumber || phoneNumber.trim() === '') {
        setState({
          isLoading: false,
          result: null,
          error: '请输入电话号码',
          status: STATUS.IDLE,
        })
        return
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null, status: STATUS.PENDING }))

      try {
        const cacheKey = `verify:${countryCode}:${phoneNumber.trim()}`
        
        const { data, fromCache } = await withCache(
          cacheKey,
          () => verifyPhoneNumber(phoneNumber.trim(), countryCode),
          5 * 60 * 1000
        )

        setState({
          isLoading: false,
          result: data,
          error: null,
          status: data.status,
        })

        if (!fromCache) {
          setHistory((prev) => [
            {
              ...data,
              queriedAt: new Date().toISOString(),
            },
            ...prev.slice(0, 9),
          ])
        }
      } catch (err) {
        setState({
          isLoading: false,
          result: null,
          error: err.message || '验证失败，请稍后重试',
          status: STATUS.INVALID,
        })
      }
    },
    []
  )

  const clearCache = useCallback(() => {
    cacheManager.clear()
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      result: null,
      error: null,
      status: STATUS.IDLE,
    })
  }, [])

  return {
    ...state,
    history,
    verify,
    clearCache,
    clearHistory,
    reset,
  }
}
