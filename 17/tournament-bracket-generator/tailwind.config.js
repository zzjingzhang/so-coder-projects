/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1976d2',
        'accent': '#ff4081',
        'warn': '#f44336',
        'dark': '#212121',
        'light': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
