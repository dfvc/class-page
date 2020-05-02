/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const appConfig = require('./config/app.config');
/* eslint-enable @typescript-eslint/no-var-requires */

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
  purge: {
    content: [
      './src/**/*.vue',
      './src/**/*.scss',
    ],
    options: {
      whitelistPatterns: [
        // Vue transition related
        /-(leave|enter|appear)(|-(to|from|active))$/,
        // Vue transition-group related
        /^(?!cursor-move).+-move$/,
        // Vue-router default classes
        /^router-link(|-exact)-active$/,
        // vue-select
        /vs.*/,
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
  },
  theme: {
    extend: {
      spacing: {
        '1/2': '0.125rem',
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        ...customBorderRadius[appConfig.theme.corners]
          ? customBorderRadius[appConfig.theme.corners]
          : {},
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
