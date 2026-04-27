/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        'table-blue': '#1e40af',
        'table-light': '#3b82f6',
        'player-red': '#ef4444',
        'player-blue': '#3b82f6',
        'ball-yellow': '#fbbf24',
        'court-green': '#10b981',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
