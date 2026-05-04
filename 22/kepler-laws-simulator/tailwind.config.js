/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0e27',
        'space-blue': '#1a1f3a',
        'earth-blue': '#4a90e2',
        'satellite-gold': '#ffd700',
        'orbit-cyan': '#00d4ff',
      },
    },
  },
  plugins: [],
}
