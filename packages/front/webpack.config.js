const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const inProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          inProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4000,
              name: "[name].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".sass", ".css"],
    modules: ["./src/", "node_modules"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: "./src/assets/favicon.ico",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new webpack.EnvironmentPlugin({
      REACT_APOLLO_SERVER_URL: inProduction ? "/graphql" : "http://localhost:8080/graphql",
    }),
  ],
  node: {
    fs: "empty",
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },
};
