import { Compiler } from 'webpack';
import { getJavascriptFiles, uploadSourcemapFile } from './helpers';
import { NewRelicBrowserWebpackPluginOptions } from './types';

export default class NewRelicBrowserWebpackPlugin {
  options: NewRelicBrowserWebpackPluginOptions;

  constructor(options: NewRelicBrowserWebpackPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    this.compilerDoneHook(compiler);
  }

  compilerDoneHook(compiler: Compiler) {
    const { name: pluginName } = NewRelicBrowserWebpackPlugin;

    compiler.hooks.done.tapAsync(pluginName, (stats, callback) => {
      const jsFiles = getJavascriptFiles(compiler, stats);

      jsFiles.forEach((file) => {
        console.log({ file });

        // uploadSourcemapFile({
        //   file,
        //   options: this.options,
        // });
      });

      callback();
    });
  }
}
