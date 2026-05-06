/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#0f172a',
        surfaceLight: '#1e293b',
        primary: '#6366f1',
        primaryHover: '#818cf8',
        accent: '#22d3ee',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        text: '#e2e8f0',
        textMuted: '#64748b',
        border: '#1e293b',
        purple: '#8b5cf6',
        blue: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
