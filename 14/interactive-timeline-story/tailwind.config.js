/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
        'text-muted': '#94a3b8',
      },
      fontFamily: {
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
