import { GithubService } from '../../services/github-service';

export async function lintAction({ url }: { url: string }) {
  const [, owner, name] = url.match(/github.com\/(.+)\/(.+)/) || [];

  if (!owner || !name) {
    console.log('Invalid repository url');
    return;
  }

  try {
    const report = await GithubService.generateGithubReport({ owner, name });
    console.table(report);
  } catch (error) {
    console.log(error);
  }
}
