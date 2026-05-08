/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        blush: {
          50: '#fff0f5',
          100: '#ffe0ec',
          200: '#ffc2d9',
          300: '#ff94bc',
          400: '#ff5c98',
          500: '#ff2d77',
          600: '#f00d5a',
          700: '#cb0048',
          800: '#a7003e',
          900: '#8a0037',
        },
        sage: {
          50: '#f0faf4',
          100: '#dff5ea',
          200: '#bbecce',
          300: '#86daa8',
          400: '#4ec17e',
          500: '#27a35f',
          600: '#1a844a',
          700: '#16693c',
          800: '#145431',
          900: '#124529',
        },
        cream: {
          50: '#fffdf7',
          100: '#fefaee',
          200: '#fdf4d6',
          300: '#fce9ae',
          400: '#fad881',
          500: '#f7c344',
        },
        lavender: {
          50: '#f8f5ff',
          100: '#f0eaff',
          200: '#e3d5ff',
          300: '#cfb5ff',
          400: '#b388ff',
          500: '#9b59ff',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,150,180,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(255,150,180,0.7)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
