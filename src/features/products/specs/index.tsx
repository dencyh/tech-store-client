import React from "react";
import { Product } from "../../../types/products/core.product";
import LaptopSpecs from "./laptopSpecs";
import SmartphoneSpecs from "./smartphoneSpecs";

interface Props {
  product: Product;
}
const Specs: React.FC<Props> = ({ product }) => {
  switch (product.type) {
    case "laptops":
      return <LaptopSpecs product={product} />;
    case "smartphones":
      return <SmartphoneSpecs product={product} />;
    default:
      return null;
  }
};
export default Specs;
