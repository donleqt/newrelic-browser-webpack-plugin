const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { NewRelicHtmlPlugin } = require('../lib');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  stats: 'errors-only',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new NewRelicHtmlPlugin({
      applicationID: 100,
      licenseKey: 'LSK-2022',
      trustKey: 'TRUST-7777',
      accountID: 999,
      agentID: 'AGENT-127',
      distributedTracing: true,
      cookieEnabled: true,
    }),
  ],

  devtool: 'source-map',
};
