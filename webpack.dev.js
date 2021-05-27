// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require("./webpack.common");

const index = new HtmlWebpackPlugin({
  template: "./src/template/index.pug",
  filename: "index.html",
  chunks: ["index"],
});

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    host: "localhost",
    port: 8080,
    writeToDisk: true,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './public',
          noErrorOnMissing: true 
        }
      ]
    }),
    index
  ],
});

