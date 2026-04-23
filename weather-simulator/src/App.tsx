import { useState, useEffect, useCallback } from 'react'
import './App.css'

type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'stormy'

interface WeatherData {
  type: WeatherType
  temperature: number
  humidity: number
  windSpeed: number
  description: string
}

const weatherConfigs: Record<WeatherType, WeatherData> = {
  sunny: {
    type: 'sunny',
    temperature: 28,
    humidity: 45,
    windSpeed: 8,
    description: '晴朗'
  },
  cloudy: {
    type: 'cloudy',
    temperature: 22,
    humidity: 60,
    windSpeed: 12,
    description: '多云'
  },
  rainy: {
    type: 'rainy',
    temperature: 18,
    humidity: 85,
    windSpeed: 15,
    description: '下雨'
  },
  snowy: {
    type: 'snowy',
    temperature: -2,
    humidity: 70,
    windSpeed: 10,
    description: '下雪'
  },
  foggy: {
    type: 'foggy',
    temperature: 15,
    humidity: 90,
    windSpeed: 5,
    description: '有雾'
  },
  stormy: {
    type: 'stormy',
    temperature: 20,
    humidity: 95,
    windSpeed: 25,
    description: '暴风雨'
  }
}

const Sun = () => (
  <div className="absolute top-10 right-10 md:top-20 md:right-20">
    <div 
      className="relative w-32 h-32 md:w-48 md:h-48"
      style={{ animation: 'sunPulse 3s ease-in-out infinite' }}
    >
      <div className="absolute inset-0 rounded-full bg-yellow-300 shadow-lg shadow-yellow-400/50" />
      <div className="absolute inset-2 rounded-full bg-yellow-200" />
      <div className="absolute inset-4 rounded-full bg-yellow-100" />
      <div 
        className="absolute inset-0"
        style={{ animation: 'sunRotate 20s linear infinite' }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-12 md:w-4 md:h-16 bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '50% 50%',
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${window.innerWidth < 768 ? 80 : 120}px)`
            }}
          />
        ))}
      </div>
    </div>
  </div>
)

const Cloud = ({ delay = 0, size = 'normal', opacity = 1 }: { delay?: number; size?: 'small' | 'normal' | 'large'; opacity?: number }) => {
  const sizes = {
    small: { w: 100, h: 40 },
    normal: { w: 160, h: 60 },
    large: { w: 240, h: 90 }
  }
  const { w, h } = sizes[size]
  
  return (
    <div
      className="absolute"
      style={{
        top: `${Math.random() * 30 + 5}%`,
        animation: `cloudMove ${30 + delay * 5}s linear infinite`,
        animationDelay: `${-delay * 10}s`,
        opacity
      }}
    >
      <div className="relative" style={{ width: w, height: h }}>
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-white/80 rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-1/2 h-2/3 bg-white/80 rounded-full" />
        <div className="absolute bottom-1/2 left-1/2 w-1/3 h-1/2 bg-white/80 rounded-full" />
      </div>
    </div>
  )
}

const Raindrop = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="absolute w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-300 to-blue-500 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      animation: `rain 1s linear infinite`,
      animationDelay: `${delay * 0.1}s`
    }}
  />
)

const Snowflake = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="absolute w-3 h-3 bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      animation: `snow 4s linear infinite`,
      animationDelay: `${delay * 0.2}s`,
      boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
    }}
  />
)

const Fog = () => (
  <div
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(to bottom, transparent, rgba(200, 200, 200, 0.4), rgba(200, 200, 200, 0.6), rgba(200, 200, 200, 0.4), transparent)',
      animation: 'fog 4s ease-in-out infinite'
    }}
  />
)

const Lightning = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute inset-0 bg-white/20"
      style={{ animation: 'lightning 3s infinite' }}
    />
    <div className="absolute top-0 left-1/3">
      <svg width="60" height="200" viewBox="0 0 60 200" style={{ animation: 'lightning 3s infinite' }}>
        <path
          d="M30 0 L20 60 L40 60 L10 200 L50 80 L30 80"
          fill="#fff"
          filter="drop-shadow(0 0 10px rgba(255, 255, 100, 0.8))"
        />
      </svg>
    </div>
  </div>
)

const WeatherBackground = ({ weather }: { weather: WeatherType }) => {
  const backgrounds: Record<WeatherType, string> = {
    sunny: 'bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500',
    cloudy: 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500',
    rainy: 'bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700',
    snowy: 'bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400',
    foggy: 'bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200',
    stormy: 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900'
  }

  return (
    <div className={`absolute inset-0 ${backgrounds[weather]} transition-all duration-1000`}>
      {weather === 'sunny' && <Sun />}
      
      {['sunny', 'cloudy', 'rainy', 'stormy'].includes(weather) && (
        <>
          {[...Array(weather === 'sunny' ? 2 : 5)].map((_, i) => (
            <Cloud 
              key={i} 
              delay={i} 
              size={i % 3 === 0 ? 'large' : i % 2 === 0 ? 'small' : 'normal'}
              opacity={weather === 'sunny' ? 0.6 : 0.9}
            />
          ))}
        </>
      )}
      
      {['rainy', 'stormy'].includes(weather) && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(weather === 'stormy' ? 150 : 80)].map((_, i) => (
            <Raindrop key={i} delay={i % 20} />
          ))}
        </div>
      )}
      
      {weather === 'snowy' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <Snowflake key={i} delay={i % 15} />
          ))}
        </div>
      )}
      
      {weather === 'foggy' && <Fog />}
      
      {weather === 'stormy' && <Lightning />}
    </div>
  )
}

const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  const icons: Record<WeatherType, string> = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    foggy: '🌫️',
    stormy: '⛈️'
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full mx-4">
      <div className="text-center">
        <div className="text-6xl md:text-7xl mb-4">{icons[weather.type]}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{weather.description}</h2>
        <div className="text-5xl md:text-6xl font-thin text-gray-900 mb-6">
          {weather.temperature}°C
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-blue-400 text-sm mb-1">湿度</div>
            <div className="text-xl md:text-2xl font-semibold text-blue-600">{weather.humidity}%</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-green-400 text-sm mb-1">风速</div>
            <div className="text-xl md:text-2xl font-semibold text-green-600">{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WeatherButton = ({ 
  weather, 
  isActive, 
  onClick 
}: { 
  weather: { type: WeatherType; icon: string; label: string }
  isActive: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-xl transition-all duration-300 min-w-[80px] md:min-w-[100px] ${
      isActive
        ? 'bg-white/90 text-gray-800 shadow-lg scale-105'
        : 'bg-white/20 text-white hover:bg-white/40'
    }`}
  >
    <span className="text-2xl md:text-3xl mb-1">{weather.icon}</span>
    <span className="text-xs md:text-sm font-medium">{weather.label}</span>
  </button>
)

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherType>('sunny')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const weatherButtons = [
    { type: 'sunny' as WeatherType, icon: '☀️', label: '晴天' },
    { type: 'cloudy' as WeatherType, icon: '☁️', label: '多云' },
    { type: 'rainy' as WeatherType, icon: '🌧️', label: '下雨' },
    { type: 'snowy' as WeatherType, icon: '❄️', label: '下雪' },
    { type: 'foggy' as WeatherType, icon: '🌫️', label: '有雾' },
    { type: 'stormy' as WeatherType, icon: '⛈️', label: '暴风雨' }
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <WeatherBackground weather={currentWeather} />
      
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-4 md:p-8">
        <div className="text-center mb-8 md:mb-12 mt-4 md:mt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            天气模拟器
          </h1>
          <p className="text-white/80 text-sm md:text-lg drop-shadow">
            体验不同天气的视觉效果
          </p>
        </div>
        
        <div className="text-center mb-6 md:mb-8">
          <div className="text-white/90 text-sm md:text-base mb-1">
            {formatDate(currentTime)}
          </div>
          <div className="text-white text-4xl md:text-5xl font-light tabular-nums">
            {formatTime(currentTime)}
          </div>
        </div>
        
        <div className="mb-8 md:mb-12">
          <WeatherCard weather={weatherConfigs[currentWeather]} />
        </div>
        
        <div className="w-full max-w-4xl">
          <h3 className="text-white text-center mb-4 text-lg font-medium drop-shadow">
            切换天气类型
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {weatherButtons.map((weather) => (
              <WeatherButton
                key={weather.type}
                weather={weather}
                isActive={currentWeather === weather.type}
                onClick={() => setCurrentWeather(weather.type)}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-auto mb-4 md:mb-8">
          <p className="text-white/50 text-xs md:text-sm text-center">
            点击上方按钮切换不同天气效果
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
