const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/blocks.css',
});
const editBlocksCSSPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/blocks.editor.css',
});


module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    editor: { import: './blocks/index.js', filename: './js/blocks.editor.js' },
    frontend: { import: './blocks/frontend.js', filename: './js/blocks.js' }
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name]',
  },
  resolve: {
    extensions: ['.js']
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /style\.s?css$/,
        use: [
          // { loader: blocksCSSPlugin.loader },
          // { loader: 'raw-loader' },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: [require('autoprefixer')],
          //   },
          // },
          // "style-loader",
          // "css-loader",
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     // Prefer `dart-sass`
          //     implementation: require("sass"),
          //     sassOptions: {
          //       outputStyle: 'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
          //     }
          //   },
          // },
          'style-loader',
          {
            loader: "css-loader",
            options: {
              import: true,
              importLoaders: 1,
              modules: true
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")()
              ],
            },
          },
          'sass-loader',
        ],
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        test: /editor\.s?css$/,
        use: [
          // { loader: editBlocksCSSPlugin.loader },
          // { loader: 'raw-loader' },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: [require('autoprefixer')],
          //   },
          // },
          // "style-loader",
          // "css-loader",
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     // Prefer `dart-sass`
          //     implementation: require("sass"),
          //     sassOptions: {
          //       outputStyle: 'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
          //     }
          //   },
          // },
          'style-loader',
          {
            loader: "css-loader",
            options: {
              import: true,
              importLoaders: 1,
              modules: true
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")()
              ],
            },
          },
          'sass-loader',
        ],
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
  ],
};