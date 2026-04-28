/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'fleet-bg': '#F7F9FB',
        'fleet-critical': '#D64545',
        'fleet-warning': '#F2A93B',
        'fleet-info': '#475569',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
