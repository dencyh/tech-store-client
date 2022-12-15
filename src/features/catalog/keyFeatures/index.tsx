import React from "react";
import { Product } from "../../../types/products/core.product";
import styles from "../catalog.module.scss";
import LaptopFeatures from "./laptopFeatures";
import SmartphoneFeatures from "./smartphoneFeatures";

interface Props {
  product: Product;
}
const KeyFeatures: React.FC<Props> = ({ product }) => {
  switch (product.type) {
    case "laptops":
      return <LaptopFeatures product={product} />;
    case "smartphones":
      return <SmartphoneFeatures product={product} />;
    default:
      return null;
  }
};
export default KeyFeatures;
