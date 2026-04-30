/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#409eff',
          light: '#ecf5ff',
          dark: '#337ecc',
        },
        success: {
          DEFAULT: '#67c23a',
          light: '#f0f9eb',
        },
        warning: {
          DEFAULT: '#e6a23c',
          light: '#fdf6ec',
        },
        danger: {
          DEFAULT: '#f56c6c',
          light: '#fef0f0',
        },
        info: {
          DEFAULT: '#909399',
          light: '#f4f4f5',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
