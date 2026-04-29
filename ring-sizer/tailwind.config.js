/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{js,mjs}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',
        'secondary': '#8b5cf6',
        'accent': '#ec4899',
        'gold': '#d4af37',
        'silver': '#c0c0c0'
      }
    },
  },
  plugins: [],
}
