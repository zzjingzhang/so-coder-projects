/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00ff',
        'neon-blue': '#00ffff',
        'neon-green': '#00ff00',
        'neon-yellow': '#ffff00',
        'neon-orange': '#ff6600',
        'dark-bg': '#0a0a0a',
        'dark-card': '#111111',
        'dark-border': '#222222',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Orbitron', 'system-ui', 'sans-serif'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'neon-flicker': 'neon-flicker 3s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor' },
          '100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor' },
        },
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff',
        'neon-blue': '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff',
        'neon-green': '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 20px #00ff00',
      },
    },
  },
  plugins: [],
}
