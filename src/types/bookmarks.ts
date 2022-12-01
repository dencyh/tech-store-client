import { Product } from "./products/core.product";

export interface Bookmarks {
  userId: string;
  products: Product[];
}
