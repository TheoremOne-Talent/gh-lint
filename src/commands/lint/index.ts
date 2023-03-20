import { Command } from 'commander';
import { lintAction } from './actions';

const lint = new Command('lint');

lint
  .alias('l')
  .description('Lint a repository')
  .requiredOption('-u, --url <url>', 'Github repository URL')
  .action(lintAction);

export default lint;
