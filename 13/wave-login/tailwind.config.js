/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#a855f7',
      },
      animation: {
        'wave-letter': 'waveLetter 0.5s ease-out forwards',
      },
      keyframes: {
        waveLetter: {
          '0%': { transform: 'translateY(0)', color: 'inherit' },
          '50%': { transform: 'translateY(-12px)' },
          '100%': { transform: 'translateY(-8px)', color: '#8b5cf6' },
        },
      },
    },
  },
  plugins: [],
}
