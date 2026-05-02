/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        danger: '#ff4d4f',
        'primary-light': '#e6f7ff',
        'success-light': '#f6ffed',
        'warning-light': '#fffbe6',
        'danger-light': '#fff2f0',
      }
    },
  },
  plugins: [],
}