import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryProductsQuery } from "../api/apiSlice";
import CatalogItem from "./catalogItem";
import styles from "./catalog.module.scss";
import { Product } from "../../types/products/core.product";
import { useGetCartQuery } from "../cart/cartSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../auth/userSlice";
import { useGetBookmarksQuery } from "../bookmarks/bookmarksSlice";

const CatalogList = () => {
  const { category } = useParams();
  if (!category) return null;

  const currentUser = useAppSelector(selectCurrentUser);

  const { data: products, isSuccess } = useGetCategoryProductsQuery(category);

  const { data: cart, isLoading: cartLoading } = useGetCartQuery(
    currentUser?._id || "",
    { skip: !currentUser }
  );

  const { data: bookmarks } = useGetBookmarksQuery(currentUser?._id || "", {
    skip: !currentUser
  });

  let content;
  if (!cartLoading) {
    content = <Spinner />;
  }

  const productsWithQuantityBookmarks = useMemo(
    () =>
      products?.map((product) => ({
        ...product,
        quantity: cart?.entities[product._id]?.quantity || 0,
        bookmarks: !!bookmarks?.entities[product._id]
      })),
    [products, bookmarks, cart]
  );

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
