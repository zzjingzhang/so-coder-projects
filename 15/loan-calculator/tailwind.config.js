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
        'primary-dark': '#4f46e5',
        secondary: '#10b981',
        accent: '#f59e0b',
        danger: '#ef4444',
        'bg-dark': '#0f172a',
        'bg-card': '#1e293b',
        'border-color': '#334155',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

