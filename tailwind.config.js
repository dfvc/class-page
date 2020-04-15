// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./config/app.config');

module.exports = {
  theme: {
    extend: {
      spacing: {
        '1/2': '0.125rem',
      },
      borderRadius: {
        xl: '1rem',
        xxl: '2rem',
      },
      colors: {
        main: defaultTheme.colors[appConfig.theme],
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    padding: ['responsive', 'group-hover'],
  },
  plugins: [],
};
