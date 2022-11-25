import { Laptop } from "./laptop";
import { Smartphone } from "./smartphone";

type Rating = 1 | 2 | 3 | 4 | 5;
type ProductColor =
  | "белый"
  | "желтый"
  | "зеленый"
  | "золотой"
  | "коричневый"
  | "розовый"
  | "серебристый"
  | "серый"
  | "синий"
  | "фиолетовый"
  | "черный";

export type Biometrics = "faceId" | "touchId";

export type ProductType = "smartphones" | "laptops";

export interface CoreProduct {
  _id: string;
  name: string;
  price: number;
  brandName: string;
  color: ProductColor;
  description: string;
  // rating: Rating;
  releaseDate: number;
  imagePaths?: string[];
}

export type Product = Smartphone | Laptop;
