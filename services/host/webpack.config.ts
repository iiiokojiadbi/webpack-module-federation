import { BuildOptions, BuildPaths, buildWebpack } from "@packages/build-config";
import path from "path";
import webpack from "webpack";

import packageJson from "./package.json";

interface EnvVariables {
  port?: BuildOptions["port"];
  mode?: BuildOptions["mode"];
  analyzer?: BuildOptions["analyzer"];
  platform?: BuildOptions["platform"];
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
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
    port: env?.port ?? 3000,
    mode: env?.mode ?? "development",
    analyzer: env?.analyzer ?? false,
    platform: env?.platform ?? "desktop",
    paths,
  });

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002";

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
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
