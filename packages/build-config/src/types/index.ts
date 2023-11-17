export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  favicon: string;
  locales: string;
  localesOutput: string;
}

export type BuildMode = "production" | "development";
export type BuildPlatform = "desktop" | "mobile";

export interface BuildOptions {
  mode: BuildMode;
  port: number;
  paths: BuildPaths;
  analyzer: boolean;
  platform: BuildPlatform;
}
