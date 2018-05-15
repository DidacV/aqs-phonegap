const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const paths = require('./paths')

module.exports = {
  context: __dirname,
  entry: [
    paths.appIndexJs
  ],
  output: {
    path: paths.appWWW,
    filename: 'bundle.js',
    publicPath: paths.WWW
  },
  module: {
    rules: [
      {
        oneOf: [
          // {
          //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          //   loader: 'url-loader?limit=10000&minetype=application/font-woff'
          // },
          // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          //   loader: 'file-loader'
          // },
          // {
          //   test: /\.json$/,
          //   loader: 'json'
          // },
          {
            test: /\.js$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            query: {
              'presets': ['react-app'],
              // 'plugins': ['react-hot-loader/babel']
            }
          },
          {
            test: /\.css$/,
            include: paths.appSrc,
            loader: 'style-loader!css-loader'
          },
          // {
          //   test: /\.styl$/,
          //   loader: 'style!css!postcss!stylus?paths=node_modules'
          // },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  performance: { hints: false }
};