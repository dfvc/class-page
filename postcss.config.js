/* eslint-disable @typescript-eslint/no-var-requires */
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.vue',
    './src/**/*.scss',
  ],
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
});
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  plugins: [
    tailwind,
    autoprefixer,
    ...process.env.NODE_ENV === 'production' ? [purgecss] : [],
  ],
};
