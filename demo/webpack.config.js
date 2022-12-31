const path = require('path');
const NewRelicBrowserWebpackPlugin = require('../lib').default;

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
    new NewRelicBrowserWebpackPlugin({
      apiKey: '',
      applicationId: '',
      releaseInfo: {
        releaseId: '',
        releaseName: '',
        buildCommit: '',
        repoUrl: '',
      },
    }),
  ],
  devtool: 'source-map',
};
