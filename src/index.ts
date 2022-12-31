import { Compiler } from 'webpack';
import { CLIHelper, getJavascriptFiles, JSFile, uploadSourcemapFile } from './helpers';
import { NewRelicBrowserWebpackPluginOptions, ReleaseInfo } from './types';

export default class NewRelicBrowserWebpackPlugin {
  options: NewRelicBrowserWebpackPluginOptions;
  compiler?: Compiler;

  static defaultOptions: Partial<NewRelicBrowserWebpackPluginOptions> = {
    sourcemapUploadHost: 'https://sourcemaps.service.eu.newrelic.com',
  };

  constructor(options: NewRelicBrowserWebpackPluginOptions) {
    this.options = {
      ...NewRelicBrowserWebpackPlugin.defaultOptions,
      ...options,
    };
  }

  apply(compiler: Compiler) {
    this.compiler = compiler;
    this.compilerDoneHook(compiler);
  }

  compilerDoneHook(compiler: Compiler) {
    compiler.hooks.done.tapAsync(NewRelicBrowserWebpackPlugin.name, async (stats, callback) => {
      const jsFiles = getJavascriptFiles(compiler, stats);
      const releaseInfo = await this.getReleaseInfo();

      await this.uploadAllSourcemaps(jsFiles, releaseInfo);

      callback();
    });
  }

  async getReleaseInfo(): Promise<ReleaseInfo> {
    const { releaseInfo } = this.options;

    return {
      ...releaseInfo,
      releaseName: releaseInfo.releaseName || releaseInfo.releaseId,
      buildCommit: releaseInfo.buildCommit === 'auto' ? await CLIHelper.getBuildCommit() : releaseInfo.buildCommit,
      repoUrl: releaseInfo.repoUrl === 'auto' ? await CLIHelper.getRepoUrl() : releaseInfo.repoUrl,
    };
  }

  async uploadAllSourcemaps(jsFiles: JSFile[], releaseInfo: ReleaseInfo) {
    return await Promise.all(
      jsFiles.map((file) =>
        uploadSourcemapFile({
          file,
          options: {
            ...this.options,
            releaseInfo,
          },
        }).catch(this.handleError),
      ),
    );
  }

  handleError = (error) => {
    let errorData = error;

    if (error.response?.text) {
      try {
        errorData = JSON.parse(error.response.text).errors;
      } catch (err) {
        //
      }
    }

    if (this.compiler) {
      const logger = this.compiler.getInfrastructureLogger(NewRelicBrowserWebpackPlugin.name);
      logger.warn('sourcemap upload error', errorData);
    }
  };
}
