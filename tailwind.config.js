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
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    padding: ['responsive', 'group-hover'],
  },
  plugins: [],
};
