const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { DefinePlugin } = require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');

const common = {
  entry: {
    main: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
};

const client = {
  entry: common.entry,
  output: common.output,
  module: common.module,
  devtool: common.devtool,
  plugins: common.plugins.concat([
    new ManifestPlugin({
      fileName: 'assets.json'
    }),
  ]),
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
    },
  },
}

const server = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './src/server.js'
  },
  output: Object.assign({}, common.output, {filename: '[name].js'}),
  module: common.module,
  devtool: common.devtool,
  plugins: common.plugins.concat([
    // Define compile time global variables, like feature flags, urls, DB-connections, etc.
    new DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    })
  ]),
}

module.exports = [client, server];
