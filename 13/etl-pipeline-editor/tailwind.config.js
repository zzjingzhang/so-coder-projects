/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'node-source': '#3b82f6',
        'node-transform': '#10b981',
        'node-sink': '#f59e0b',
      },
    },
  },
  plugins: [],
}
