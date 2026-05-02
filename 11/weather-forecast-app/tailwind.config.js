/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'weather-sunny': '#FFB74D',
        'weather-cloudy': '#90A4AE',
        'weather-rainy': '#64B5F6',
        'weather-night': '#5C6BC0',
      },
    },
  },
  plugins: [],
}
