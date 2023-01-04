import { Compiler } from 'webpack';
import { PLUGIN_NAME } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any, compiler: Compiler) => {
  let errorData = error;

  if (error.response?.text) {
    try {
      errorData = JSON.parse(error.response.text).errors;
    } catch (err) {
      //
    }
  }

  if (compiler) {
    const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
    logger.warn('sourcemap upload error', errorData);
  }
};
