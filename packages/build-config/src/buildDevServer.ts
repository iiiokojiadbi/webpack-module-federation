import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const isDev = options.mode === "development";

  return isDev
    ? {
        port: options.port,
        open: false,
        historyApiFallback: true,
        hot: true,
      }
    : undefined;
}
