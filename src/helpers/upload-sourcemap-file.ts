import { publishSourcemap } from '@newrelic/publish-sourcemap';
import { NewRelicBrowserWebpackPluginOptions } from '../types';
import { JSFile } from './get-javascript-files';

type UploadSourcemapFileParams = {
  file: JSFile;
  options: NewRelicBrowserWebpackPluginOptions;
};

export const uploadSourcemapFile = ({
  file,
  options: { apiKey, applicationId, releaseInfo },
}: UploadSourcemapFileParams) => {
  return new Promise((resolve, reject) => {
    publishSourcemap(
      {
        sourcemapPath: file.sourcemap,
        // sourcemapUrl: 'https://example.com/sourcefile.js.map', // or from a URL
        javascriptUrl: 'https://example.com/assets/bundle.js',
        applicationId: applicationId,
        apiKey: apiKey,
        releaseName: releaseInfo.releaseName,
        releaseId: releaseInfo.releaseId,
        repoUrl: releaseInfo.repoUrl,
        buildCommit: releaseInfo.buildCommit,
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
