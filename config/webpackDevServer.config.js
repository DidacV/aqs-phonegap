const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = {
  // module.exports = function(proxy, allowedHost) {
    // Enable gzip compression of generated files.
    compress: true,
    clientLogLevel: 'none',
    // contentBase: paths.publicDir,
    // By default files from `contentBase` will not trigger a page reload.
    contentBase: paths.appWWW,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    // proxy: {
    //   '/': proxy
    // }
  };