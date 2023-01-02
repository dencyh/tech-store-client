import React from "react";
import Filters from "../filters/filters";
import CatalogList from "./catalogList";
import styles from "./catalog.module.scss";

const Catalog = () => {
  return (
    <div className={styles.container}>
      <Filters />
      <CatalogList />
    </div>
  );
};

export default Catalog;
