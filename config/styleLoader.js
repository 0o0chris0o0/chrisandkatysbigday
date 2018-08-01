// The styling configuration used for webpack can be confusing so it has it's own file

import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const shouldEnableSourceMaps = true;

const postCssConfig = () => {
  return {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    sourceMap: shouldEnableSourceMaps,
    ident: 'postcss',
    plugins: () => [require('postcss-flexbugs-fixes'), autoprefixer()]
  };
};

const sassPaths = [path.resolve('./node_modules/'), path.resolve('./src/styles/')];

export const devStyleLoader = [
  require.resolve('style-loader'),
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      sourceMap: shouldEnableSourceMaps,
      localIdentName: '[name]__[local]-[hash:base64:5]'
    }
  },
  {
    loader: require.resolve('resolve-url-loader'),
    options: {
      sourceMap: shouldEnableSourceMaps
    }
  },
  {
    loader: require.resolve('postcss-loader'),
    options: postCssConfig()
  },
  {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: shouldEnableSourceMaps,
      includePaths: sassPaths
    }
  }
];

export const prodStyleLoader = ExtractTextPlugin.extract(
  Object.assign({
    fallback: require.resolve('style-loader'),
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]-[hash:base64:5]',
          minimize: true
        }
      },
      {
        loader: require.resolve('resolve-url-loader')
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postCssConfig()
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          outputStyle: 'compressed',
          includePaths: sassPaths
        }
      }
    ]
  })
);
