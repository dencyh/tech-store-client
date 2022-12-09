import { Biometrics, CoreProduct } from "./core.product";

export interface Smartphone extends CoreProduct {
  type: "smartphones";
  specs: {
    os: string;
    screenSize: number;
    resolution: [number, number];
    refreshRate: number;
    capacity: number;
    ram: number;
    cellularNetwork: string;
    simCount: number;
    batteryLife: number;
    cpu: string;
    biometrics: Biometrics[];
  };
}
