import { getSdk } from '../../../generated/graphql';
import { notEmpty, sumArray } from '../../../utils';
import { client } from '../github.config';
import { getNumOfCommits } from './get-number-of-commits';

export async function generateGithubReport({
  owner,
  name,
}: {
  owner: string;
  name: string;
}) {
  const result = await getSdk(client).getRepositoryInfo({ owner, name });

  if (!result.repository) {
    console.error('Repository not found');
    return;
  }

  const numOfPrs = result.repository.pullRequests.totalCount;

  const numOfCommits = getNumOfCommits(result);

  const prs = result?.repository?.pullRequests?.nodes ?? [];
  const commitsCounts = prs.filter(notEmpty).map((pr) => pr.commits.totalCount);

  const averageCommitsPerPr = parseFloat(
    Math.round(sumArray(commitsCounts) / numOfPrs).toFixed(2)
  );
  const maxCommitsInPr = Math.max(...commitsCounts);
  const minCommitsInPr = Math.min(...commitsCounts);

  const report = {
    numOfPrs,
    numOfCommits,
    averageCommitsPerPr,
    maxCommitsInPr,
    minCommitsInPr,
  };

  return report;
}
