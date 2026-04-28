/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sleep-primary': '#4F46E5',
        'sleep-secondary': '#818CF8',
        'sleep-dark': '#1E1B4B',
        'sleep-light': '#EEF2FF',
        'sleep-success': '#10B981',
        'sleep-warning': '#F59E0B',
        'sleep-danger': '#EF4444',
      }
    },
  },
  plugins: [],
}
