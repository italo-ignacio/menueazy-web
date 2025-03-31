/** @type {import('tailwindcss').Config} */

const colors = require('./src/presentation/style/palette/colors.json');
const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.tsx'],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('scrollbar', '&::-webkit-scrollbar');
    })
  ],
  theme: {
    colors,
    extend: {
      boxShadow: {
        base: '0px 8px 20px 0px rgba(0,0,0,0.1)'
      },
      backgroundImage: {
        'gradient-black': 'linear-gradient(90deg, #191A1B 19%, #363637 50%, #5D5D5D 79%)',
        'gradient-black-hover': 'linear-gradient(180deg, #191A1B 19%, #363637 50%, #5D5D5D 79%)',
        'gradient-primary': 'linear-gradient(90deg, #5E17EB 0%, #C8BAE4 57%, #FBFBFB 88%)',
        'gradient-primary-hover': 'linear-gradient(180deg, #5E17EB 0%, #C8BAE4 57%, #FBFBFB 88%)',
        'gradient-angular-primary':
          'conic-gradient(#5E17EB 12%, #E8E8E8 40%, #E8E8E8 2%, #5E17EB 100%)'
      },
      keyframes: {
        'bg-rotate': {
          '0%': { background: 'linear-gradient(0deg, #191A1B 19%, #363637 50%, #5D5D5D 79%)' },
          '100%': { background: 'linear-gradient(360deg, #191A1B 19%, #363637 50%, #5D5D5D 79%)' }
        }
      },
      animation: {
        rotate: 'animation 3s ease infinite'
      }
    },
    screens: {
      tablet: '768px',
      laptop: '1280px',
      desktop: '1540px'
    }
  }
};
