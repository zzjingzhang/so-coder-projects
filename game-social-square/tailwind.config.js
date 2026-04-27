/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        surface: '#ffffff',
        'surface-dark': '#1e1e2e',
        'text-primary': '#1f2937',
        'text-secondary': '#6b7280',
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
}
