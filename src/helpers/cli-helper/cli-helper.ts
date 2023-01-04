import { run } from './run';

export class CLIHelper {
  static async getBuildCommit() {
    return run('git rev-parse HEAD').then((res) => res.replace('/n', ''));
  }

  static async getLastCommitMessage() {
    return run('git log -1 --pretty=%B').then((res) => res.replace('/n', ''));
  }

  static getRepoUrl() {
    return run('git config --get remote.origin.url');
  }
}
