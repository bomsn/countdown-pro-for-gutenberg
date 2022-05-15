const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const { hasCssnanoConfig, hasPostCSSConfig } = require('@wordpress/scripts/utils');
const postcssPlugins = require('@wordpress/postcss-plugins-preset');
const isProduction = defaultConfig.mode === 'production';


// Prepare CSS loaders
const cssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap: !isProduction,
      modules: {
        auto: true,
      },
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      // Provide a fallback configuration if there's not
      // one explicitly available in the project.
      ...(!hasPostCSSConfig() && {
        postcssOptions: {
          ident: 'postcss',
          sourceMap: !isProduction,
          plugins: isProduction
            ? [
              ...postcssPlugins,
              require('cssnano')({
                // Provide a fallback configuration if there's not
                // one explicitly available in the project.
                ...(!hasCssnanoConfig() && {
                  preset: [
                    'default',
                    {
                      discardComments: {
                        removeAll: true,
                      },
                    },
                  ],
                }),
              }),
            ]
            : postcssPlugins,
        },
      }),
    },
  },
  {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: !isProduction,
    },
  },
];

module.exports = {
  ...defaultConfig,
  entry: {
    editor: { import: './blocks/index', filename: './js/blocks.editor.js' },
    frontend: { import: './blocks/frontend', filename: './js/blocks.js' }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'assets'),
  },
  module: {
    ...defaultConfig.module,
    rules: [
      defaultConfig.module.rules[0],
      {
        test: /\.(sc|sa)ss$/,
        use: [
          ...cssLoaders,

        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  ],
};