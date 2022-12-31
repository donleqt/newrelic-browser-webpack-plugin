import { exec } from 'child_process';

export const run = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      return resolve(stdout.replace('\n', ''));
    });
  });
};
