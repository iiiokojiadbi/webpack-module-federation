import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { BuildOptions } from "./types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(
  options: BuildOptions
): webpack.ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
  };

  // const babelLoader = buildBabelLoader(options);

  const scssLoader = {
    test: /\.s?css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (pathname: string) => pathname.includes(".module."),
            localIdentName: "[local]--[hash:base64:4]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    oneOf: [
      {
        type: "asset/resource",
        resourceQuery: /url/, // *.svg?url
      },
      {
        issuer: /\.tsx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              // заливает все в черный
              // svgoConfig: {
              //   plugins: [
              //     {
              //       name: "convertColors",
              //       params: {
              //         currentColor: true,
              //       },
              //     },
              //   ],
              // },
            },
          },
        ],
      },
    ],
  };

  return [
    tsLoader,
    // babelLoader,
    scssLoader,
    svgLoader,
    assetLoader,
  ];
}
