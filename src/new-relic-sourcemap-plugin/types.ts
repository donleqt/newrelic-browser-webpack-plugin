export const PLUGIN_NAME = 'NewRelicSourcemapPlugin';

export type ReleaseInfo = {
  releaseId: string;
  releaseName: string;
  repoUrl: string;
  buildCommit: string;
};

export type SourceMapPluginOptions = {
  applicationID: number;
  apiKey: string;
  assetsUrl: string;
  releaseInfo?: ReleaseInfo;
  sourcemapUploadHost?: string;
};
