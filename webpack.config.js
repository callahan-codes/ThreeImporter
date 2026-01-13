const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  ...defaultConfig,

  entry: {
    index: path.resolve(__dirname, 'src/three-importer/index.js'),
    sceneinject: path.resolve(__dirname, 'src/three-importer/sceneinject.js'),
    view: path.resolve(__dirname, 'src/three-importer/view.js'),
  },

  output: {
    ...defaultConfig.output,
    path: buildPath,
    filename: 'three-importer/[name].js',
    chunkFilename: 'three-importer/[name].js',
    assetModuleFilename: 'three-importer/[name][ext]',
  },

  plugins: [
    ...defaultConfig.plugins.filter(
      plugin => !(plugin instanceof MiniCssExtractPlugin)
    ),

    new MiniCssExtractPlugin({
      filename: 'three-importer/[name].css',
      chunkFilename: 'three-importer/[name].css',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'src/three-importer/block.json',
          to: 'three-importer/block.json',
        },
        {
          from: 'src/three-importer/render.php',
          to: 'three-importer/render.php',
        },
      ],
    }),
  ],
};
