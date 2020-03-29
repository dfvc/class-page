module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/globals.scss";',
      },
    },
  },
  transpileDependencies: [
    'vue-clamp',
    'resize-detector',
  ],
};
