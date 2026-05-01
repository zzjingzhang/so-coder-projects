/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'secondary': '#6366f1',
        'success': '#22c55e',
        'warning': '#eab308',
        'danger': '#ef4444',
      },
    },
  },
  plugins: [],
};
