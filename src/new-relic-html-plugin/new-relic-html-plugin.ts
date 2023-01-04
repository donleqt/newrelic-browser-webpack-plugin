import { NewRelicHtmlPluginOptions, PLUGIN_NAME } from './types';
import { Compiler } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getNewRelicScript } from './get-new-relic-script';

export class NewRelicHtmlPlugin {
  options: NewRelicHtmlPluginOptions;

  constructor(options: NewRelicHtmlPluginOptions) {
    this.options = options;
  }

  parseScriptContent() {
    if (this.options.newRelicScript) {
      return this.options.newRelicScript;
    } else {
      return getNewRelicScript(this.options);
    }
  }

  apply(compiler: Compiler) {
    const newRelicScriptContent = this.parseScriptContent();

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(PLUGIN_NAME, (data) => {
        const newRelicScriptTag = HtmlWebpackPlugin.createHtmlTagObject(
          'script',
          { type: 'text/javascript' },
          newRelicScriptContent,
        );

        data.headTags.push(newRelicScriptTag);

        return data;
      });
    });
  }
}
