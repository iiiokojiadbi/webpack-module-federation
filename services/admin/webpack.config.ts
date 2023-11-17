import { BuildOptions, BuildPaths, buildWebpack } from "@packages/build-config";
import path from "path";
import webpack from "webpack";
import packageJson from "./package.json";

interface EnvVariables {
  port?: BuildOptions["port"];
  mode?: BuildOptions["mode"];
  analyzer?: BuildOptions["analyzer"];
  platform?: BuildOptions["platform"];
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    favicon: path.resolve(__dirname, "public", "favicon.ico"),
    locales: path.resolve(__dirname, "public", "locales"),
    localesOutput: path.resolve(__dirname, "build", "locales"),
  };

  const config = buildWebpack({
    port: env?.port ?? 3002,
    mode: env?.mode ?? "development",
    analyzer: env?.analyzer ?? false,
    platform: env?.platform ?? "desktop",
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "admin",
      filename: "remoteEntry.js",
      exposes: {
        // "./App": path.resolve(paths.src, 'components', 'App', 'Routes.tsx'),
        "./Router": "./src/router",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
      },
    })
  );

  return config;
};
