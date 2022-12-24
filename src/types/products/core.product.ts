import { Laptop } from "./laptop";
import { Smartphone } from "./smartphone";

type Rating = 1 | 2 | 3 | 4 | 5;

export type Biometrics = "faceId" | "touchId";

export type ProductType = "smartphones" | "laptops";

export interface CoreProduct {
  _id: string;
  name: string;
  price: number;
  brand: string;
  color: string;
  description?: string;
  releaseDate: number;
  imagePaths: string[];
}

export type Product = Smartphone | Laptop;
