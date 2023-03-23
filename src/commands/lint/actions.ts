import { GithubService } from '../../services/github-service';
import { info, raise, warn } from '../../shared/error';

const GH_URL_REGEX = /github.com\/(.+)\/(.+)/;

const MAX_PRS_THRESHOLD = 30;
const MIN_PRS_THRESHOLD = 3;

const MAX_COMMITS_THRESHOLD = 40;

const MIN_COMMITS_PER_PR_THRESHOLD = 2;
const MAX_COMMITS_PER_PR_THRESHOLD = 15;

export async function lintAction({ url }: { url: string }) {
  const [, owner, name] = url.match(GH_URL_REGEX) || [];

  if (!owner || !name) {
    raise('Invalid Github repository URL');
  }

  try {
    const report = await GithubService.generateGithubReport({ owner, name });

    if (!report) {
      raise('No repository was found');
      return;
    }

    info(`Number of PRs: ${report.numOfPrs}`);

    if (report.numOfPrs > MAX_PRS_THRESHOLD) {
      warn(`Number of PRs is greater than ${MAX_PRS_THRESHOLD}`);
    }
    if (report.numOfPrs < MIN_PRS_THRESHOLD) {
      warn(`Number of PRs is less than ${MIN_PRS_THRESHOLD}`);
    }

    info(`Number of commits: ${report.numOfCommits}`);

    if (report.numOfCommits > MAX_COMMITS_THRESHOLD) {
      warn(`Number of commits is greater than ${MAX_COMMITS_THRESHOLD}`);
    }

    report.prs.forEach((pr) => {
      if (pr.commits.totalCount > MAX_COMMITS_PER_PR_THRESHOLD) {
        warn(
          `PR #${pr.title} has ${pr.commits.totalCount} commits. Which is greater than ${MAX_COMMITS_PER_PR_THRESHOLD}`
        );
      }
      if (pr.commits.totalCount < MIN_COMMITS_PER_PR_THRESHOLD) {
        warn(
          `PR #${pr.title} has ${pr.commits.totalCount} commits. Which is less than ${MIN_COMMITS_PER_PR_THRESHOLD}`
        );
      }
    });

    info(`Average number of commits per PR: ${report.averageCommitsPerPr}`);
  } catch (error) {
    console.log(error);
  }
}
