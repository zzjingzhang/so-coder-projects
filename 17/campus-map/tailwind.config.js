/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        building: {
          academic: '#3b82f6',
          dormitory: '#10b981',
          library: '#f59e0b',
          sports: '#ef4444',
          admin: '#8b5cf6',
          dining: '#ec4899',
        },
      },
    },
  },
  plugins: [],
}
