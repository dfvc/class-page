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
        args[0].title = '5º C | Tarefas Escolares';
        args[0].mainColor = '#4fd1c5';

        return args;
      });
  },
};
