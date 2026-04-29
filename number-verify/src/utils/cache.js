class CacheManager {
  constructor(defaultTTL = 5 * 60 * 1000) {
    this.cache = new Map()
    this.defaultTTL = defaultTTL
  }

  set(key, value, ttl = this.defaultTTL) {
    const now = Date.now()
    const expiry = now + ttl
    
    this.cache.set(key, {
      value,
      expiry,
      createdAt: now,
    })
  }

  get(key) {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    const now = Date.now()
    if (now > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  has(key) {
    return this.get(key) !== null
  }

  delete(key) {
    return this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  getStats() {
    const now = Date.now()
    let valid = 0
    let expired = 0

    for (const [key, item] of this.cache) {
      if (now > item.expiry) {
        expired++
      } else {
        valid++
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
    }
  }
}

export const cacheManager = new CacheManager()

export const withCache = async (key, fetcher, ttl) => {
  const cached = cacheManager.get(key)
  
  if (cached !== null) {
    return {
      data: cached,
      fromCache: true,
    }
  }

  const data = await fetcher()
  cacheManager.set(key, data, ttl)

  return {
    data,
    fromCache: false,
  }
}
