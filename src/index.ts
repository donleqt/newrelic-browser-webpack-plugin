import { Compiler } from 'webpack';
import { CLIHelper, getJavascriptFiles, JSFile, uploadSourcemapFile } from './helpers';
import { NewRelicBrowserWebpackPluginOptions, ReleaseInfo } from './types';

export default class NewRelicBrowserWebpackPlugin {
  options: NewRelicBrowserWebpackPluginOptions;

  constructor(options: NewRelicBrowserWebpackPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
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
      repoUrl: releaseInfo.repoUrl === 'auto' ? await CLIHelper.getBuildCommit() : releaseInfo.repoUrl,
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
        }),
      ),
    );
  }
}
