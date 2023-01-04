export const PLUGIN_NAME = 'NewRelicSourcemapPlugin';

export type ReleaseInfo = {
  releaseId: string;
  releaseName?: string;
  repoUrl: 'auto' | string;
  buildCommit: 'auto' | string;
};

export type SourceMapPluginOptions = {
  applicationID: number;
  apiKey: string;
  releaseInfo: ReleaseInfo;
  sourcemapUploadHost: string;
  assetsUrl: string;
};
