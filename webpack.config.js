const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin( {
  filename: './assets/css/countdown.css',
} );
const editBlocksCSSPlugin = new ExtractTextPlugin( {
  filename: './assets/css/countdown.editor.css',
} );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle:
          'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
      },
    },
  ],
};


module.exports = {
  mode: 'development',
  entry: {
    './assets/js/countdown.editor.build' : './block/js/countdown.editor.js',
    './assets/js/countdown.build' : './block/js/countdown.js',
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
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
        test: /countdown\.s?css$/,
        use: blocksCSSPlugin.extract( extractConfig ),
      },
      {
        test: /countdown.editor\.s?css$/,
        use: editBlocksCSSPlugin.extract( extractConfig ),
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
  ],
};
