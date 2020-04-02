const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/components/**/*.vue',
    './src/styles/**/*.scss',
  ],
  whitelistPatterns: [
    // Vue transition related
    /-(leave|enter|appear)(|-(to|from|active))$/,
    // Vue transition-group related
    /^(?!cursor-move).+-move$/,
    // Vue-router default classes
    /^router-link(|-exact)-active$/,
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    tailwind,
    autoprefixer,
    ...process.env.NODE_ENV === 'production' ? [purgecss] : [],
  ],
};
