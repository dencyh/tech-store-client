import React from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryProductsQuery } from "../api/apiSlice";
import CatalogItem from "./catalogItem";
import styles from "./catalog.module.scss";

const CatalogList = () => {
  const { category } = useParams();
  const {
    data: products,
    isLoading,
    isSuccess
  } = useGetCategoryProductsQuery(category);

  let content;

  if (isLoading) {
    content = <>Loading...</>;
  } else if (isSuccess) {
    content = (
      <>
        {products.map((product: any) => (
          <CatalogItem key={product._id} product={product} />
        ))}
      </>
    );
  }

  return <div className={styles.list}>{content}</div>;
};

export default CatalogList;
