/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2acfcf',
        'primary-hover': '#9be3e3',
        secondary: '#3b3054',
        'secondary-dark': '#232127',
        'secondary-darker': '#35323e',
        'secondary-darkest': '#1e1a27',
        gray: {
          100: '#bfbfbf',
          200: '#9e9aa7',
          300: '#54525a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
