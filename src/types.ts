export type ReleaseInfo = {
  releaseName: string;
  repoUrl: string;
  buildCommit: string;
  releaseId: string;
};

export type NewRelicBrowserWebpackPluginOptions = {
  applicationId: number;
  apiKey: string;
  releaseInfo: ReleaseInfo;
};
