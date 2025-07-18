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
    chunkFilename: 'threeimporter/[name].js', // 👈 Ensures dynamic chunks are in correct folder
    assetModuleFilename: 'threeimporter/[name][ext]', // 👈 For assets like RTL CSS
  },

  plugins: [
    // Remove old MiniCssExtractPlugin so we can replace it
    ...defaultConfig.plugins.filter(
      plugin => !(plugin instanceof MiniCssExtractPlugin)
    ),

    // Re-add MiniCssExtractPlugin with correct CSS output path
    new MiniCssExtractPlugin({
      filename: 'threeimporter/[name].css',
      chunkFilename: 'threeimporter/[name].css',
    }),

    // Copy static files (PHP + block.json)
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
