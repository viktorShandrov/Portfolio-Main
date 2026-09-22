/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#040b14",
        brand: {
          cyan: "#22d3ee",
          teal: "#0d9488",
          glow: "#06b6d4",
          crimson: "#4a1525",
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.4), 0 0 50px rgba(6, 182, 212, 0.2)',
        'glow-teal': '0 0 35px rgba(20, 184, 166, 0.35)',
        'tablet': '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(14, 165, 233, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
