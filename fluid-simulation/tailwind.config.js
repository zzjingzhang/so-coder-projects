/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#0ea5e9',
        water: '#06b6d4',
        'water-dark': '#0891b2',
        'water-light': '#22d3ee',
        surface: '#0f172a',
        'surface-light': '#1e293b',
        'surface-dark': '#020617',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
    },
  },
  plugins: [],
}
