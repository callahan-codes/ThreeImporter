const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(__dirname, 'src/threeimporter/index.js'), // existing entry
    sceneinject: path.resolve(__dirname, 'src/threeimporter/sceneinject.js'), // updated path
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/threeimporter'),
  },
};
