/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
        'water-blue': '#0066cc',
        'water-light': '#3399ff',
        'algae-green': '#228B22',
        'fish-orange': '#FF6B35',
      },
      animation: {
        'bubble': 'bubble 3s ease-in infinite',
        'swim': 'swim 4s ease-in-out infinite',
        'float': 'float 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '100%': { transform: 'translateY(-100px) scale(0.5)', opacity: '0' },
        },
        swim: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
