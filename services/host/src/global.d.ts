declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png?url";
declare module "*.jpg?url";
declare module "*.jpeg?url";
declare module "*.gif?url";
declare module "*.svg?url";
declare module "*.svg" {
  import React = require("react");
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const _PLATFORM_: "desktop" | "mobile";
declare const _ENV_: "production" | "development";
