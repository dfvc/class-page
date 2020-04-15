// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./config/app.config');

module.exports = {
  publicPath: '',
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
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = appConfig.title;
        args[0].mainColor = '#4fd1c5';

        return args;
      });
  },
};
