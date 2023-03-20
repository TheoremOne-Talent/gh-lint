import { GetRepositoryInfoQuery } from '../../../generated/graphql';

export function getNumOfCommits(result: GetRepositoryInfoQuery): number {
  let numOfCommits = 0;

  if (result?.repository?.ref?.target?.__typename === 'Commit') {
    numOfCommits = result.repository.ref.target.history.totalCount;
  }

  return numOfCommits;
}
