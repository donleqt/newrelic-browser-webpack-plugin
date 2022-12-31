import { Compiler } from 'webpack';
import { publishSourcemap } from '@newrelic/publish-sourcemap';

type NewRelicSourcemapOptions = {
  releaseName: string;
  repoUrl: string;
  buildCommit: string;
  releaseId: string;
};

type NewRelicBrowserWebpackPluginOptions = {
  applicationId: number;
  apiKey: string;
  sourcemapOptions: NewRelicSourcemapOptions;
};

export default class NewRelicBrowserWebpackPlugin {
  options: NewRelicBrowserWebpackPluginOptions;

  constructor(options: NewRelicBrowserWebpackPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    const { name: pluginName } = NewRelicBrowserWebpackPlugin;
    compiler.hooks.done.tap(pluginName, (stats) => {});
  }

  uploadSingleSourcemapFile({
    sourcemapPah,
    releaseName,
    repoUrl,
    buildCommit,
    releaseId,
  }: NewRelicSourcemapOptions & { sourcemapPah: string }) {
    return new Promise((resolve, reject) => {
      publishSourcemap(
        {
          sourcemapPath: sourcemapPah,
          // sourcemapUrl: 'https://example.com/sourcefile.js.map', // or from a URL
          javascriptUrl: 'https://example.com/assets/bundle.js',
          applicationId: this.options.applicationId,
          apiKey: this.options.applicationId,
          releaseName: releaseName,
          releaseId: releaseId,
          repoUrl: repoUrl,
          buildCommit: buildCommit,
        },
        (err: unknown) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        },
      );
    });
  }
}
