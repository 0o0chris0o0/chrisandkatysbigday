import fs from 'fs';
import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import { choosePort, createCompiler, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';

import clean from './utils/clean';
import createDir from './utils/createDir';

import buildHmtl from './template/buildIndex';

import paths from '../config/paths';
import createConfig from '../config/webpack.config.dev';
import createDevServerConfig from '../config/webpackDevServer.config';

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.templateHtml, paths.appIndexJs])) {
  process.exit(1);
}

const HOST = '0.0.0.0';
const PORT = 3000;
const useYarn = fs.existsSync(paths.yarnLockFile);

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
choosePort(HOST, PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    startServer(port);
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    throw err;
  });

async function startServer(port) {
  // first create a new empty build directory
  await clean();
  await createDir();

  // build the index.html and include the handlebar partials
  await buildHmtl();

  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const urls = prepareUrls(protocol, HOST, port);
  const config = createConfig(urls, port);

  // Create a webpack compiler that is configured with custom messages.
  const compiler = createCompiler(webpack, config, 'chrisandkatysbigday', urls, useYarn);

  const serverConfig = createDevServerConfig(HOST);
  const devServer = new WebpackDevServer(compiler, serverConfig);

  // Launch WebpackDevServer.
  devServer.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }
    console.log();
    console.log(chalk.cyan('Starting the development server...\n'));
    openBrowser(urls.localUrlForBrowser);
  });
}
