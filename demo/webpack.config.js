const path = require('path');
const NewRelicBrowserWebpackPlugin = require('../lib');

module.exports = {
  mode: 'development',
  stats: 'errors-only',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  plugins: [new NewRelicBrowserWebpackPlugin()],
};
