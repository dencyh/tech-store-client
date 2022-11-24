import React from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useGetProductQuery } from "../api/apiSlice";
import styles from "./product.module.scss";

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading, isSuccess } = useGetProductQuery(id);

  let content;

  if (isLoading) {
    content = content = <Spinner text="Loading" />;
  } else if (isSuccess) {
    content = (
      <>
        <div>{product.name}</div>
      </>
    );
  }

  return <div className={styles.wrapper}>{content}</div>;
};

export default Product;
