/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'moon-light': '#F5F5DC',
        'moon-dark': '#1a1a2e',
        'moon-gray': '#4a4a6a',
      }
    },
  },
  plugins: [],
}
