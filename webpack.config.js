const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/blocks.css',
});
const editBlocksCSSPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/blocks.editor.css',
});


module.exports = {
  mode: 'development',
  entry: {
    './assets/js/blocks.editor': './blocks/index.js',
    './assets/js/blocks': './blocks/frontend.js',
  },
  output: {
    // path: path.resolve(__dirname),
    path: __dirname,
    filename: '[name].js',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /style\.s?css$/,
        use: [
          { loader: blocksCSSPlugin.loader },
          { loader: 'raw-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
              }
            },
          },
        ],
      },
      {
        test: /editor\.s?css$/,
        use: [
          { loader: editBlocksCSSPlugin.loader },

          { loader: 'raw-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
              }
            },
          },
        ],
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
  ],
};
