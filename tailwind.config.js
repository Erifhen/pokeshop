/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite', // adiciona a animação shimmer
      },
      keyframes: {
        shimmer: {
          '0%': { left: '-150%' },
          '100%': { left: '150%' },
        },
      },
      backgroundImage: {
        'galaxy-gradient': 'radial-gradient(circle at center, #1e1338 0%, #0a0a0a 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.shimmer': {
          position: 'relative',
          overflow: 'hidden',
        },
        '.shimmer::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '-150%',
          width: '200%',
          height: '100%',
          background:
            'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
          animation: 'shimmer 2s infinite',
        },
      });
    },
  ],
}
