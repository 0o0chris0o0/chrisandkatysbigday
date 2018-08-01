// Sometimes we might not want to have certain assets processed by Webpack.
// use this object to define paths which will be copied over to the final build destination

module.exports = [
  {
    from: 'src/assets/img/loader-spinner.svg',
    to: 'assets/img'
  }
];
