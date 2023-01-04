import { CLIHelper } from '../../helpers';
import { ReleaseInfo } from '../types';

export const getReleaseInfo = async (): Promise<ReleaseInfo> => {
  const [commitHash, commitMessage] = await Promise.all([CLIHelper.getBuildCommit(), CLIHelper.getLastCommitMessage()]);

  return {
    releaseId: commitHash,
    releaseName: commitMessage,
    buildCommit: commitHash,
    repoUrl: await CLIHelper.getRepoUrl(),
  };
};
