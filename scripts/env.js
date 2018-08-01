/* 
  This file returns all env variables in two different formats,
  a raw object and a stringified object for use in webpack,
  we also inject our custom env variables into the returned object
*/
import getCustomVariables from './utils/setupEnv';

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('../config/paths')];

// check for required env variables
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

export default function getClientEnvironment() {
  const raw = Object.keys(process.env).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
      ...getCustomVariables(false)
    },
  );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
}
