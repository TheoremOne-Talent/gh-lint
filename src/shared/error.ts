import chalk from 'chalk';

export function raise(message: string) {
  console.error(`
${chalk.red.bold('Error')}: ${message}
  `);

  process.exit(1);
}

export function warn(message: string) {
  console.error(`
${chalk.yellow.bold('Warning')}: ${message}
  `);
}

export function info(message: string) {
  console.error(`
${chalk.blue.bold('Info')}: ${message}
  `);
}
