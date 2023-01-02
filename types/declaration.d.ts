declare module "*.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg";

declare namespace ymaps {
  export function ready(init: (value: unknown) => void): Promise;
}
