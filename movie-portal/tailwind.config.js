/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a1a2e',
        'secondary': '#16213e',
        'accent': '#e94560',
        'dark': '#0f0f1e',
      }
    },
  },
  plugins: [],
}
