// 'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const WebPackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const devServerConfig = require('../config/webpackDevServer.config');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

webpack(config).run((err, stats) => {
  if (err) console.log(err);
  // console.log(stats);
});
const compiler = webpack(config);
const devServer = new WebPackDevServer(compiler, devServerConfig);
// const devServer = new WebPackDevServer();

devServer.listen(DEFAULT_PORT, HOST, (err) => {
  if (err) return console.log(err);
  console.log('Starting dev server at...\n' + HOST + ':' + DEFAULT_PORT);
});
