/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a2e',
        'dark-surface': '#16213e',
        'dark-text': '#e0e0e0',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}