// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./config/app.config');

const customBorderRadius = {
  none: {
    sm: 0,
    default: 0,
    md: 0,
    lg: 0,
  },
  smooth: {
    sm: '0.0625rem',
    default: '0.125rem',
    md: '0.1875rem',
    lg: '0.25rem',
  },
  intense: {
    sm: '0.25rem',
    default: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
};

module.exports = {
  theme: {
    extend: {
      spacing: {
        '1/2': '0.125rem',
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        ...customBorderRadius[appConfig.theme.corners] ? customBorderRadius[appConfig.theme.corners] : {},
      },
      colors: {
        main: defaultTheme.colors[appConfig.theme.mainColor],
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    padding: ['responsive', 'group-hover'],
  },
  plugins: [],
};
