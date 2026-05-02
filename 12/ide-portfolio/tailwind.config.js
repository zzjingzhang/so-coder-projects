/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ide-dark': '#1e1e1e',
        'ide-sidebar': '#333333',
        'ide-active': '#094771',
        'ide-text': '#cccccc',
        'ide-accent': '#569cd6',
        'ide-green': '#4ec9b0',
        'ide-yellow': '#dcdcaa',
        'ide-orange': '#ce9178',
        'ide-purple': '#c586c0',
      },
      fontFamily: {
        'mono': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
