/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-light': '#818cf8',
        'primary-dark': '#4f46e5',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        'accent-light': '#22d3ee',
        negative: '#f97316',
        'negative-light': '#fb923c',
        positive: '#0ea5e9',
        'positive-light': '#38bdf8',
        electron: '#fbbf24',
        proton: '#f97316',
        hydrogen: '#4ade80',
        oxygen: '#f472b6',
        water: '#22d3ee',
        surface: '#1e293b',
        'surface-light': '#334155',
        'surface-dark': '#0f172a',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flow-line': 'flow-animation 1s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px currentColor)' },
          '50%': { filter: 'drop-shadow(0 0 20px currentColor)' },
        },
        'flow-animation': {
          '0%': { 'stroke-dashoffset': '20' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
