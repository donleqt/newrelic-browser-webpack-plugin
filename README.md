# New Relic Browser Webpack Plugin

Upload sourcemaps to New Relic via `NewRelicSourcemapPlugin`

Inject New Relic script to HTML template via `NewRelicHtmlPlugin`

## Installation

```
npm i -D newrelic-browser-webpack-plugin
```
or
```
yarn add -D newrelic-browser-webpack-plugin
```

## Getting started

`newrelic-browser-webpack-plugin` exposes two plugins:

- `NewRelicHtmlPlugin`: Used to inject HTML script tag of New Relic Browser monitering.
- `NewRelicSourcemapPlugin`: Auto upload sourcemaps generated by webpack on new builds.

Require the plugin in your webpack config:

```javascript
const { NewRelicHtmlPlugin, NewRelicSourcemapPlugin } = require('newrelic-browser-webpack-plugin');
```

Add the plugin to your webpack config:

#### Inject New Relic Browser Code to index.html:

```javascript
plugins: [
    new NewRelicHtmlPlugin({
      applicationID: 100,
      licenseKey: 'LSK-2022',
      trustKey: 'TRUST-7777',
      accountID: 999,
      agentID: 'AGENT-127',
    }),
  ],
```

#### Upload sourcemaps:
```javascript
plugins: [
    new NewRelicSourcemapPlugin({
      apiKey: '',
      applicationID: '',
      assetsUrl: 'http://mywebsite.com/static',
    }),
  ],
```


