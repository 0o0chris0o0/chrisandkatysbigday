import chalk from 'chalk';
import webpack from 'webpack';
import FileSizeReporter from 'react-dev-utils/FileSizeReporter';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import printBuildError from 'react-dev-utils/printBuildError';

import clean from './utils/clean';
import createDir from './utils/createDir';
import { throwError, showMessage, showWarning } from './utils/consoleMessenger';

import buildHmtl from './template/buildIndex';

import paths from '../config/paths';
import config from '../config/webpack.config.prod';

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.templateHtml, paths.appIndexJs])) {
  process.exit(1);
}

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// The app name taken from package.json
const appName = require(paths.appPackageJson).name;
// we use this name throughout the build so run a quick check to
// make sure we're not using the template app name
if (!appName || appName === 'template') {
  showWarning(appName ? 'Using template project name' : 'No project name added');
  if (process.env.NODE_ENV === 'production') {
    throwError(
      chalk.red(`${appName ? 'Using template' : 'No'} project name and in production`),
      'make sure to update this in package.json before redeploying'
    );
  }
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appPublic)
  .then(previousFileSizes => {
    // Start the webpack build
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          `\nSearch for the ${chalk.underline(
            chalk.yellow('keywords')
          )} to learn more about each warning.`
        );
        console.log(
          `To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appPublic,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'));
      printBuildError(err);
      process.exit(1);
    }
  );

// Create the production build and print the deployment instructions.
async function build(previousFileSizes) {
  showMessage(
    `Creating a ${process.env.NODE_ENV === 'production' ? 'production' : 'staging'} build...`
  );

  // first create a new empty build directory
  await clean();
  await createDir();

  // build the index.html and include the handlebar partials
  await buildHmtl();

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings
      });
    });
  });
}
