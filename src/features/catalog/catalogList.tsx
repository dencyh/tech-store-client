import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  TEST_USER_ID,
  useGetCartQuery,
  useGetCategoryProductsQuery
} from "../api/apiSlice";
import CatalogItem from "./catalogItem";
import styles from "./catalog.module.scss";
import { Product } from "../../types/products/core.product";
import { Cart } from "../../types/cart";

const CatalogList = () => {
  const { category } = useParams();
  if (!category) return null;

  const {
    data: products,
    isLoading: productsLoading,
    isSuccess
  } = useGetCategoryProductsQuery(category);

  const { data: cart, isLoading: cartLoading } = useGetCartQuery({
    userId: TEST_USER_ID
  });

  const productsWithQuantity = useMemo(
    () =>
      products?.map((product) => {
        const productAdded = cart?.productsInCart.find(
          (inCart) => inCart.productId === product._id
        );
        return productAdded
          ? { ...product, quantity: productAdded.quantity }
          : { ...product, quantity: 0 };
      }),
    [cart, products]
  );

  let content;

  if (productsLoading || cartLoading || !productsWithQuantity) {
    content = <>Loading...</>;
  } else if (isSuccess) {
    content = (
      <>
        <Link
          to={`/catalog/${category}/new`}
          className={`${styles.btn} ${styles.new__link}`}
        >
          Добавить продукт
        </Link>
        {productsWithQuantity.map((product) => (
          <CatalogItem key={product._id} product={product} />
        ))}
      </>
    );
  }

  return <div className={styles.list}>{content}</div>;
};

export default CatalogList;
