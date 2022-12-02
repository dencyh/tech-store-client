import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TEST_USER_ID, useGetCategoryProductsQuery } from "../api/apiSlice";
import CatalogItem from "./catalogItem";
import styles from "./catalog.module.scss";
import { Product } from "../../types/products/core.product";
import { Cart } from "../../types/cart";
import { useGetCartQuery } from "../cart/cartSlice";
import { useGetBookmarksQuery } from "../bookmarks/bookmarksSlice";

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

  const { data: bookmarks, isLoading: bookmarksLoading } = useGetBookmarksQuery(
    {
      userId: TEST_USER_ID
    }
  );

  let content;
  if (!cart || !bookmarks) {
    content = <>Loading...</>;
  }

  const productsWithQuantityBookmarks = useMemo(
    () =>
      products?.map((product) => {
        const productInCart = cart?.productsInCart.find(
          (inCart) => inCart.productId === product._id
        );
        const inBookmarks = bookmarks?.products.find(
          (inBookmarks) => inBookmarks._id === product._id
        );

        if (productInCart && inBookmarks) {
          return {
            ...product,
            quantity: productInCart.quantity,
            bookmarks: true
          };
        } else if (productInCart) {
          return {
            ...product,
            quantity: productInCart.quantity,
            bookmarks: false
          };
        } else if (inBookmarks) {
          return {
            ...product,
            quantity: 0,
            bookmarks: true
          };
        } else {
          return { ...product, quantity: 0, bookmarks: false };
        }
      }),
    [cart, products, bookmarks]
  );

  if (!productsWithQuantityBookmarks || !cart || !bookmarks) {
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
        {productsWithQuantityBookmarks.map((product) => (
          <CatalogItem key={product._id} product={product} />
        ))}
      </>
    );
  }

  return <div className={styles.list}>{content}</div>;
};

export default CatalogList;
