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
      apiKey: 'NRAK-5YY3LEJWZZ93ZBRMMBFGDZ9DEWF',
      applicationId: '535898923',
      assetsUrl: 'https://example.com/assets',
      releaseInfo: {
        releaseId: require('../package.json').version,
        buildCommit: 'auto',
        repoUrl: 'auto',
      },
    }),
  ],
  devtool: 'source-map',
};
