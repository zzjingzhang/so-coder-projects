/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#0a0a0f',
        'game-light': '#1a1a2e',
        'player-cyan': '#00ffff',
        'node-yellow': '#ffff00',
        'exit-purple': '#ff00ff',
      }
    },
  },
  plugins: [],
}
