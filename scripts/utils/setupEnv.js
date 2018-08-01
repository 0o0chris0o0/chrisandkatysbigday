import { showMessage, throwError } from './consoleMessenger';

// load all ENV variables to use within build
export default function setupEnv(includeMessages) {
  const envFilePath = '.env';
  const customEnvVariables = require('dotenv').config({
    path: envFilePath
  });

  // because we use this function twice,
  // use the 'includeMessages' parameter to only show these messages once.
  if (includeMessages) {
    if (customEnvVariables.error) {
      throwError(`Failed to get env config from ${envFilePath}`, "Maybe it doesn't exist...");
    }

    showMessage(`Template ENV variables loaded from '${envFilePath}'`);
  }
}
