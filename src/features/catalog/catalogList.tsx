import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TEST_USER_ID, useGetCategoryProductsQuery } from "../api/apiSlice";
import CatalogItem from "./catalogItem";
import styles from "./catalog.module.scss";
import { Product } from "../../types/products/core.product";
import { useGetCartQuery } from "../cart/cartSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../auth/userSlice";

const CatalogList = () => {
  const { category } = useParams();
  if (!category) return null;

  const currentUser = useAppSelector(selectCurrentUser);

  const {
    data: products,
    isLoading: productsLoading,
    isSuccess
  } = useGetCategoryProductsQuery(category);

  const { data: cart, isLoading: cartLoading } = useGetCartQuery(
    currentUser?._id || "",
    { skip: !currentUser }
  );

  let content;
  if (!cartLoading) {
    content = <Spinner />;
  }

  const productsWithQuantityBookmarks = products?.map((product) => ({
    ...product,
    quantity: cart?.entities[product._id]?.quantity || 0,
    bookmarks: false
  }));
  // const userProducts = useMemo(
  //   () =>
  //     products?.map((product) => {
  //       const productInCart = cart?.productsInCart.find(
  //         (inCart) => inCart.productId === product._id
  //       );
  //       const inBookmarks = bookmarks?.products.find(
  //         (inBookmarks) => inBookmarks._id === product._id
  //       );

  //       if (productInCart && inBookmarks) {
  //         return {
  //           ...product,
  //           quantity: productInCart.quantity,
  //           bookmarks: true
  //         };
  //       } else if (productInCart) {
  //         return {
  //           ...product,
  //           quantity: productInCart.quantity,
  //           bookmarks: false
  //         };
  //       } else if (inBookmarks) {
  //         return {
  //           ...product,
  //           quantity: 0,
  //           bookmarks: true
  //         };
  //       } else {
  //         return { ...product, quantity: 0, bookmarks: false };
  //       }
  //     }),
  //   [cart, products, bookmarks]
  // );

  if (!productsWithQuantityBookmarks) {
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
