/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'planet': {
          'ocean': '#1e3a8a',
          'deep-ocean': '#0c1c3a',
          'land': '#059669',
          'mountain': '#78716c',
          'desert': '#d97706',
          'ice': '#e0f2fe',
          'atmosphere': 'rgba(59, 130, 246, 0.3)',
        }
      }
    },
  },
  plugins: [],
}
