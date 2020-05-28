const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  entry: {
    main: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
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
    new MiniCssExtractPlugin(),
    // Define compile time global variables, like feature flags, urls, DB-connections, etc.
    new DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })
  ],
};
