/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'racing-red': '#E53E3E',
        'racing-blue': '#2B6CB0',
        'racing-yellow': '#ECC94B',
        'racing-dark': '#1A202C',
      },
      animation: {
        'speed-lines': 'speedLines 0.5s linear infinite',
        'pulse-fast': 'pulse 0.5s ease-in-out infinite',
      },
      keyframes: {
        speedLines: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
