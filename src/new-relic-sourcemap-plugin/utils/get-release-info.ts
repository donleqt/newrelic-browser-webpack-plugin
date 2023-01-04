import { CLIHelper } from '../../helpers';
import { ReleaseInfo } from '../types';

export const getReleaseInfo = async (releaseInfo: ReleaseInfo): Promise<ReleaseInfo> => {
  return {
    ...releaseInfo,
    releaseName: releaseInfo.releaseName || releaseInfo.releaseId,
    buildCommit: releaseInfo.buildCommit === 'auto' ? await CLIHelper.getBuildCommit() : releaseInfo.buildCommit,
    repoUrl: releaseInfo.repoUrl === 'auto' ? await CLIHelper.getRepoUrl() : releaseInfo.repoUrl,
  };
};
