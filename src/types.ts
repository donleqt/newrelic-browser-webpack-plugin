export type ReleaseInfo = {
  releaseId: string;
  releaseName?: string;
  repoUrl: 'auto' | string;
  buildCommit: 'auto' | string;
};

export type NewRelicBrowserWebpackPluginOptions = {
  applicationId: number;
  apiKey: string;
  releaseInfo: ReleaseInfo;
  sourcemapUploadHost: string;
  assetsUrl: string;
};
