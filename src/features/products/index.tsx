import styles from "./products.module.scss";
import React from "react";
import ProductList from "./productList";
import Filters from "../filters";

const Products = () => {
  return (
    <div className={styles.container}>
      <Filters />
      <ProductList />
    </div>
  );
};

export default Products;
