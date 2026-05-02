/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'racing-dark': '#1a1a2e',
        'racing-blue': '#16213e',
        'racing-red': '#e94560',
        'racing-yellow': '#ffd700',
        'racing-green': '#00ff88',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
