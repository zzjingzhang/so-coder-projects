/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1a1a2e',
        'medium-blue': '#16213e',
        'light-blue': '#0f3460',
        'orange-accent': '#f97316',
        'orange-hover': '#ea580c',
      },
    },
  },
  plugins: [],
}
