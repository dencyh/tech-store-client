declare module "*.scss";
declare module "*.png";
declare module "*.svg";

declare namespace ymaps {
  export function ready(init: (value: unknown) => void): Promise;
}
