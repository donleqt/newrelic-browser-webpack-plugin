import { PLUGIN_NAME, SourceMapPluginOptions } from './types';
import { Compiler } from 'webpack';
import { getReleaseInfo, handleError, uploadAllSourcemaps, getJavascriptFiles } from './utils';

export class NewRelicSourcemapPlugin {
  options: SourceMapPluginOptions;

  static defaultOptions: Partial<SourceMapPluginOptions> = {
    sourcemapUploadHost: 'https://sourcemaps.service.eu.newrelic.com',
  };

  constructor(options: SourceMapPluginOptions) {
    this.options = {
      ...NewRelicSourcemapPlugin.defaultOptions,
      ...options,
    };
  }

  apply(compiler: Compiler) {
    const { options } = this;

    compiler.hooks.done.tapAsync(PLUGIN_NAME, async (stats, callback) => {
      const jsFiles = getJavascriptFiles(compiler, stats);
      const releaseInfo = options.releaseInfo || (await getReleaseInfo());

      await uploadAllSourcemaps({
        jsFiles,
        releaseInfo,
        onError: (error) => handleError(error, compiler),
        options: {
          ...options,
          releaseInfo,
        },
      });

      callback();
    });
  }
}
