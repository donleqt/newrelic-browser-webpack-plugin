export const PLUGIN_NAME = 'NewRelicHtmlPlugin';

export type NewRelicHtmlPluginOptions = {
  accountID: string;
  agentID: string;
  trustKey: string;
  licenseKey: string;
  applicationID: string;
  newRelicScript?: string;
};
