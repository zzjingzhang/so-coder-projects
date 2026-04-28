/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'incense-brown': '#8B4513',
        'incense-light': '#D2B48C',
        'incense-dark': '#5D4037',
        'incense-gold': '#DAA520',
        'incense-cream': '#F5F5DC',
      }
    },
  },
  plugins: [],
}
