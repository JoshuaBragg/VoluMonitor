const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false,
  }),
  new ESLintPlugin(),
];
