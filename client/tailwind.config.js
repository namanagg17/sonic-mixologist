/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cocktail-dark': '#0a0a0a',
        'cocktail-darker': '#050505',
        'cocktail-gold': '#d4af37',
        'cocktail-amber': '#ff6b35',
        'cocktail-rose': '#e63946',
        'cocktail-mint': '#52b788',
        'cocktail-purple': '#7209b7',
        'cocktail-blue': '#4361ee',
      },
      fontFamily: {
        'cocktail': ['Georgia', 'serif'],
        'modern': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
        'stir': 'stir 2s ease-in-out infinite',
        'pour': 'pour 1.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        stir: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pour: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.4)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
