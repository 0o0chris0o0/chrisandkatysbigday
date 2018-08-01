import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import getClientEnvironment from '../scripts/env';
import paths from './paths';

import { devStyleLoader } from './styleLoader';
import staticFiles from './staticFiles';

const env = getClientEnvironment();

module.exports = function(urls, port) {
  return {
    // This option controls if and how source maps are generated.
    // use the option 'eval-source-map' if you prefer to see the original source code in devtools
    // see https://webpack.js.org/configuration/devtool/ for more info
    devtool: 'cheap-module-source-map',

    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: {
      main: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'react-dev-utils/webpackHotDevClient',
        './src/js/main.js'
      ]
    },

    output: {
      // This options is not used in dev but WebpackDevServer crashes without it
      path: paths.appPublic,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'main.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: '[name].chunk.js',
      // Webpack uses `publicPath` to determine where the app is being served from.
      // In development, we always serve from an absolute path to allow fonts to be loaded correctly
      // https://github.com/webpack-contrib/style-loader/issues/55
      publicPath: `http://localhost:${port}/`
      // for mobile testing use your IP address like so:
      // publicPath: `http://${urls.lanUrlForConfig}:${port}/`
    },

    resolve: {
      extensions: ['.js']
    },

    module: {
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'assets/img/[name].[hash:8].[ext]'
              }
            },
            // SVG Images - use 'raw-loader' for all images inside 'img/symbols'
            {
              test: /\.svg$/,
              include: path.join(__dirname, '../src/assets/img/symbols'),
              loader: require.resolve('raw-loader')
            },
            // SVG Images - use 'file-loader' for other SVG's
            {
              test: /\.svg$/,
              include: path.join(__dirname, '../src/assets/img'),
              loader: require.resolve('file-loader'),
              options: {
                name: 'assets/img/[name].[hash:8].[ext]'
              }
            },
            // FONTS
            {
              test: [/\.eot$/, /\.ttf$/, /\.otf$/, /\.woff2$/, /\.woff$/, /\.svg$/],
              include: path.join(__dirname, '../src/assets/fonts'),
              loader: require.resolve('file-loader'),
              options: {
                name: 'assets/fonts/[name].[ext]'
              }
            },
            // Process JS with Babel.
            {
              test: /\.(js|jsx)$/,
              include: path.join(__dirname, '../src/js'),
              loader: require.resolve('babel-loader'),
              options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true
              }
            },
            {
              test: /\.scss$/,
              use: devStyleLoader
            },
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'assets/[name].[ext]'
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml
      }),
      new webpack.HotModuleReplacementPlugin(),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
      new webpack.DefinePlugin(env.stringified),
      // Add module names to factory functions so they appear in browser profiler.
      new webpack.NamedModulesPlugin(),
      // Copy files into build directory
      new CopyWebpackPlugin(staticFiles)
    ]
  };
};
