import { publishSourcemap } from '@newrelic/publish-sourcemap';
import { NewRelicBrowserWebpackPluginOptions } from '../types';
import { JSFile } from './get-javascript-files';
import { join } from 'path';

type UploadSourcemapFileParams = {
  file: JSFile;
  options: NewRelicBrowserWebpackPluginOptions;
};

export const uploadSourcemapFile = ({
  file,
  options: { apiKey, applicationId, releaseInfo, sourcemapUploadHost, assetsUrl },
}: UploadSourcemapFileParams) => {
  return new Promise((resolve, reject) => {
    publishSourcemap(
      {
        sourcemapPath: file.sourcemap,
        javascriptUrl: join(assetsUrl, file.file),
        applicationId: applicationId,
        apiKey: apiKey,
        releaseName: releaseInfo.releaseName,
        releaseId: releaseInfo.releaseId,
        repoUrl: releaseInfo.repoUrl,
        buildCommit: releaseInfo.buildCommit,
        sourcemapUploadHost: sourcemapUploadHost,
      },
      (err: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      },
    );
  });
};
