/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#e6f1ff',
          100: '#b3d3ff',
          200: '#80b5ff',
          300: '#4d97ff',
          400: '#1a79ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        neon: {
          blue: '#00f3ff',
          purple: '#bd00ff',
          pink: '#ff00aa',
        },
        glass: {
          bg: 'rgba(15, 23, 42, 0.7)',
          border: 'rgba(0, 243, 255, 0.3)',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
          '50%': { boxShadow: '0 0 20px #00f3ff, 0 0 40px #00f3ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
      },
      boxShadow: {
        'neon': '0 0 5px #00f3ff, 0 0 10px #00f3ff, 0 0 20px #00f3ff',
        'neon-purple': '0 0 5px #bd00ff, 0 0 10px #bd00ff, 0 0 20px #bd00ff',
        'neon-pink': '0 0 5px #ff00aa, 0 0 10px #ff00aa, 0 0 20px #ff00aa',
        'glass': '0 8px 32px 0 rgba(0, 243, 255, 0.37)',
      }
    },
  },
  plugins: [],
}
