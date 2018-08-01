module.exports = function(host) {
  return {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // Enable gzip compression of generated files.
    compress: true,
    // This is the path where webpack will serve the site from
    contentBase: './docs',
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true
    },
    host,
    // enable Hot Module Reloading
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // do not print bundle build stats
    noInfo: true,
    // display webpack errors as an overlay within browser
    overlay: true,
    port: 3000,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified earlier in the config.
    publicPath: '/',
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/
    }
  };
};
