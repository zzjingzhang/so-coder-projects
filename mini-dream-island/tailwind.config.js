/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4ade80',
        secondary: '#60a5fa',
        accent: '#f97316',
        background: '#f0fdf4',
        surface: '#ffffff',
        text: '#1f2937',
      },
    },
  },
  plugins: [],
}
