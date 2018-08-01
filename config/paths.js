import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPublic: resolveApp('docs'),
  appHtml: resolveApp('docs/index.html'),
  templateHtml: resolveApp('src/template.html'),
  templatePhp: resolveApp('src/template.php'),
  appIndexJs: resolveApp('src/js/main.js'),
  yarnLockFile: resolveApp('yarn.lock'),
  appPackageJson: resolveApp('package.json')
};
