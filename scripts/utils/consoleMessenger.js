import chalk from 'chalk';

export function throwError(message, description = '') {
  // TODO improve error handling
  console.log();
  const err = new Error(`${chalk.red.red(message)} \n${chalk.yellow(description)}\n`);
  console.error(err);
  process.exit(1);
}

export function showWarning(message) {
  console.log();
  console.log(chalk.yellow.bold(`WARNING!! - ${message}`));
  console.log('----');
}

export function showMessage(message) {
  console.log();
  console.log(message);
  console.log('----');
}
