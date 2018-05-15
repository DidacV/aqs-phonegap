process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../config/webpack.config.prod');


webpack(config).run((err, stats) => {
  if (err) console.log(err);
  // console.log(stats);
});
