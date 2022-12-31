import { Compiler, Stats } from 'webpack';
import path from 'path';

export type JSFile = {
  file: string;
  sourcemap: string;
};

export const getJavascriptFiles = (compiler: Compiler, stats: Stats) => {
  const { compilation } = stats;
  const resolve = (file) => path.resolve(compiler.outputPath, file);
  const fileList: JSFile[] = [];

  compilation.chunks.forEach((chunk) => {
    chunk.files.forEach((file) => {
      const info = compilation.assetsInfo.get(file);
      const sourcemap = resolve(info?.related?.sourceMap);

      if (sourcemap) {
        fileList.push({ file, sourcemap });
      }
    });
  });

  return fileList;
};
