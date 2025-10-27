/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "cozy-brown": '#2A2626',
        "cozy-cream": '#F6ECE3',
        "cozy-blush": '#D8A7B1',
        "cozy-shadow": '#1C1A1A',
      },
      backgroundImage: {
        "cozy-gradient": 'radial-gradient(circle at top, rgba(216,167,177,0.35), rgba(26,22,22,0.9))',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(216, 167, 177, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'pulse-soft': 'pulseSoft 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.92 },
        },
      },
      blur: {
        cozy: '18px',
      },
    },
  },
  plugins: [],
};
