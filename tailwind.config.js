/** @type {import('tailwindcss').Config} */

const colors = require('./src/presentation/style/palette/colors.json');
const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.tsx'],
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
      }
    },
    screens: {
      tablet: '768px',
      laptop: '1280px',
      desktop: '1540px'
    }
  }
};
