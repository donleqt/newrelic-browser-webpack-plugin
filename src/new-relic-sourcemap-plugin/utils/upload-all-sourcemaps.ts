import { uploadSourcemapFile } from './upload-sourcemap-file';
import { ReleaseInfo, SourceMapPluginOptions } from '../types';
import { JSFile } from './get-javascript-files';

export const uploadAllSourcemaps = async ({
  jsFiles,
  options,
  onError,
  releaseInfo,
}: {
  jsFiles: JSFile[];
  options: SourceMapPluginOptions;
  releaseInfo: ReleaseInfo;
  onError: (error: unknown) => void;
}) => {
  return await Promise.all(
    jsFiles.map((file) =>
      uploadSourcemapFile({
        file,
        options: options,
        releaseInfo,
      }).catch(onError),
    ),
  );
};
