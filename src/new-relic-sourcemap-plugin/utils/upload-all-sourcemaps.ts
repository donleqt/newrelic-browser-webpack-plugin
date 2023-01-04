import { uploadSourcemapFile } from './upload-sourcemap-file';
import { SourceMapPluginOptions } from '../types';
import { JSFile } from './get-javascript-files';

export const uploadAllSourcemaps = async ({
  jsFiles,
  options,
  onError,
}: {
  jsFiles: JSFile[];
  options: SourceMapPluginOptions;
  onError: (error: unknown) => void;
}) => {
  return await Promise.all(
    jsFiles.map((file) =>
      uploadSourcemapFile({
        file,
        options: options,
      }).catch(onError),
    ),
  );
};
