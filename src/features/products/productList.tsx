import React from "react";
import { useParams } from "react-router-dom";
import ProductListItem from "./productListItem";
import { useGetCategoryProductsQuery } from "./productsSlice";
import styles from "./products.module.scss";

const ProductList = () => {
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
          <ProductListItem key={product._id} product={product} />
        ))}
      </>
    );
  }

  return <div className={styles.list}>{content}</div>;
};

export default ProductList;
