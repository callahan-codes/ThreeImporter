const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  ...defaultConfig,

  entry: {
    index: path.resolve(__dirname, 'src/threeimporter/index.js'),
    sceneinject: path.resolve(__dirname, 'src/threeimporter/sceneinject.js'),
    view: path.resolve(__dirname, 'src/threeimporter/view.js'),
  },

  output: {
    ...defaultConfig.output,
    path: buildPath,
    filename: 'threeimporter/[name].js',
    chunkFilename: 'threeimporter/[name].js',
    assetModuleFilename: 'threeimporter/[name][ext]',
  },

  plugins: [
    ...defaultConfig.plugins.filter(
      plugin => !(plugin instanceof MiniCssExtractPlugin)
    ),

    new MiniCssExtractPlugin({
      filename: 'threeimporter/[name].css',
      chunkFilename: 'threeimporter/[name].css',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'src/threeimporter/block.json',
          to: 'threeimporter/block.json',
        },
        {
          from: 'src/threeimporter/render.php',
          to: 'threeimporter/render.php',
        },
      ],
    }),
  ],
};
