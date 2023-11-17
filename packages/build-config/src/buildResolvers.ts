import webpack from "webpack";
import { BuildOptions } from "./types";

export function buildResolvers(
  options: BuildOptions
): webpack.Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": options.paths.src,
    },
  };
}
