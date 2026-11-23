/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFCF7',
          100: '#FFF8ED',
          200: '#FBEFD9',
          300: '#F5E2C0',
        },
        maroon: {
          50: '#FBEEEE',
          100: '#F4D4D4',
          200: '#E2A6A6',
          300: '#C76E6E',
          400: '#A33F3F',
          500: '#7A1717',
          600: '#6A1212',
          700: '#540C0C',
          800: '#3E0808',
          900: '#2A0505',
        },
        gold: {
          50: '#FDF8EC',
          100: '#FAEFC8',
          200: '#F2DC97',
          300: '#E9C861',
          400: '#D9A441',
          500: '#C2892A',
          600: '#A06B1E',
          700: '#7C511A',
          800: '#5C3C17',
          900: '#432C13',
        },
        brown: {
          50: '#FAF6F2',
          100: '#F0E8E0',
          200: '#D9C9B8',
          300: '#B8967A',
          400: '#8A6447',
          500: '#6B4A30',
          600: '#553A26',
          700: '#422D1E',
          800: '#33231A',
          900: '#261A13',
        },
        veg: {
          500: '#1B7A3D',
          600: '#155E30',
        },
        nonveg: {
          500: '#8B2A2A',
          600: '#6E1F1F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(122,23,23,0.06), 0 8px 24px rgba(122,23,23,0.08)',
        cardHover: '0 4px 12px rgba(122,23,23,0.10), 0 18px 40px rgba(122,23,23,0.14)',
        glow: '0 0 0 3px rgba(217,164,65,0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out both',
        scaleIn: 'scaleIn 0.4s ease-out both',
        shimmer: 'shimmer 2s linear infinite',
        floaty: 'floaty 3s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
