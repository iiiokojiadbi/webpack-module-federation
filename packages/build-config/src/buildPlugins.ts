import webpack, { DefinePlugin } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(
  options: BuildOptions
): webpack.Configuration["plugins"] {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  const plugins = [];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());

    // plugins.push(new ForkTsCheckerWebpackPlugin());

    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  plugins.push(
    new DefinePlugin({
      _PLATFORM_: JSON.stringify(options.platform),
      _ENV_: JSON.stringify(options.mode),
    })
  );

  plugins.push(
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: options.paths.favicon,
      publicPath: "/",
    })
  );

  plugins.push(
    new CopyPlugin({
      patterns: [
        { from: options.paths.locales, to: options.paths.localesOutput },
      ],
    })
  );

  return plugins;
}
