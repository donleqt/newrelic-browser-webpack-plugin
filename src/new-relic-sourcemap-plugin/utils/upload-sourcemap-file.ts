import { publishSourcemap } from '@newrelic/publish-sourcemap';
import { ReleaseInfo, SourceMapPluginOptions } from '../types';
import { JSFile } from './get-javascript-files';
import { join } from 'path';

type UploadSourcemapFileParams = {
  file: JSFile;
  options: SourceMapPluginOptions;
  releaseInfo: ReleaseInfo;
};

export const uploadSourcemapFile = ({
  file,
  options: { apiKey, applicationID, sourcemapUploadHost, assetsUrl },
  releaseInfo,
}: UploadSourcemapFileParams) => {
  return new Promise((resolve, reject) => {
    publishSourcemap(
      {
        sourcemapPath: file.sourcemap,
        javascriptUrl: join(assetsUrl, file.file),
        applicationID: applicationID,
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
