/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './docs/**/*.{md,mdx}',
    './blog/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Tailwind's blue-500
          dark: '#2563eb',   // Tailwind's blue-600
          light: '#60a5fa',  // Tailwind's blue-400
        },
        secondary: {
          DEFAULT: '#64748b', // Tailwind's slate-500
          dark: '#475569',    // Tailwind's slate-600
          light: '#94a3b8',   // Tailwind's slate-400
        },
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        zoomIn: 'zoomIn 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}