/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#49D9A0',
        'dark-bg': '#1a1a2e',
        'dark-secondary': '#16213e',
        'dark-tertiary': '#0f3460',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
