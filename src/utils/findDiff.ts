import { Product } from "../types/products/core.product";
import _ from "lodash";

export interface ProductConfig {
  [key: string]: {
    [key: string]: {
      _id: string[];
      value: string;
    };
  };
}

export function getConfigOptions(products: Product[], keys: string[]) {
  const result = {} as ProductConfig;

  const cache: any = {};
  for (const key of keys) {
    for (const product of products) {
      const value = JSON.stringify(_.get(product, key));

      if (cache[key + value]) {
        result[key][value] = {
          ...result[key][value],
          _id: result[key][value]._id.concat(product._id)
        };
      }

      if (!cache[key + value]) {
        cache[key + value] = true;

        if (!result[key]) {
          result[key] = {
            [value]: {
              _id: [product._id],
              value
            }
          };
        } else {
          result[key] = {
            ...result[key],
            [value]: {
              _id: [product._id],
              value
            }
          };
        }
      }
    }
  }

  return result;
}
