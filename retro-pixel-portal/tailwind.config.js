/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-black': '#000000',
        'retro-white': '#ffffff',
        'retro-gray': '#808080',
        'retro-light-gray': '#c0c0c0',
        'retro-dark-gray': '#404040',
        'retro-blue': '#000080',
        'retro-light-blue': '#0000ff',
        'retro-cyan': '#008080',
        'retro-light-cyan': '#00ffff',
        'retro-green': '#008000',
        'retro-light-green': '#00ff00',
        'retro-yellow': '#808000',
        'retro-light-yellow': '#ffff00',
        'retro-red': '#800000',
        'retro-light-red': '#ff0000',
        'retro-magenta': '#800080',
        'retro-light-magenta': '#ff00ff',
        'retro-orange': '#ff8000',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
        'dos': ['"Courier New"', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 2s linear infinite',
        'flicker': 'flicker 0.5s infinite',
        'glitch': 'glitch 2s infinite',
        'typewriter': 'typewriter 2s steps(20) infinite',
        'cursor-blink': 'cursor-blink 0.7s infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'cursor-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'pixel-pattern': 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'retro': '4px 4px 0px #000000',
        'retro-inset': 'inset 4px 4px 0px #000000',
        'pixel': '2px 2px 0px #000000, 4px 4px 0px #000000',
        'neon': '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff',
        'crt': 'inset 0 0 100px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
