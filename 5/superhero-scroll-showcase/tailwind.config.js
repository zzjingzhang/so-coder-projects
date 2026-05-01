/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'hero-red': '#ef4444',
        'hero-blue': '#3b82f6',
        'hero-yellow': '#eab308',
        'hero-purple': '#8b5cf6',
        'hero-green': '#22c55e',
      },
    },
  },
  plugins: [],
};
