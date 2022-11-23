import { CoreProduct } from "./core.product";

export interface Laptop extends CoreProduct {
  type: "laptops";
  specs: {
    os: string;
    screenSize: number;
    resolution: [number, number];
    refreshRate: number;
    cpu: string;
    cpuCores: number;
    ram: number;
    gpu: string;
    vram: number;
    capacity: number;
    batteryLife: number;
  };
}
