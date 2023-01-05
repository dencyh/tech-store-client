import React from "react";
import Filters from "../filters/filters";
import CatalogList from "./catalogList";
import styles from "./catalog.module.scss";
import { useParams } from "react-router-dom";
import { translate } from "../../utils/translate";

const Catalog = () => {
  const { type = "" } = useParams();

  return (
    <>
      <h1>{translate("type", type) || "Каталог"}</h1>
      <div className={styles.container}>
        <Filters />
        <CatalogList />
      </div>
    </>
  );
};

export default Catalog;
