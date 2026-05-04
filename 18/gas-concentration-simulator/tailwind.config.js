/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gas: {
          n2: '#3b82f6',
          h2: '#ef4444',
          he: '#22c55e',
        },
      },
    },
  },
  plugins: [],
};
