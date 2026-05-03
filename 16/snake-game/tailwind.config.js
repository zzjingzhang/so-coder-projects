/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-blue': '#00ffff',
        'neon-pink': '#ff00ff',
        'dark-bg': '#0a0a1a',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #39ff14, 0 0 10px #39ff14' },
          '100%': { boxShadow: '0 0 20px #39ff14, 0 0 30px #39ff14' },
        },
      },
    },
  },
  plugins: [],
}
