import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CatalogItem from "./catalogItem";
import styles from "./catalog.module.scss";
import { Product } from "../../types/products/core.product";
import { useGetCartQuery } from "../cart/cartSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../auth/userSlice";
import { useGetBookmarksQuery } from "../bookmarks/bookmarksSlice";
import {
  getProductsSelectors,
  useGetCategoryProductsQuery
} from "../products/productSlice";
import ItemPlaceholder from "./itemPlaceholder";

const placeholderProducts = Array(5)
  .fill(0)
  .map((_, index) => index);

const CatalogList = () => {
  const { type } = useParams();
  if (!type) return null;

  const currentUser = useAppSelector(selectCurrentUser);

  const filters = useAppSelector((state) => state.filters.filters);
  const { isFetching: productsFetching } = useGetCategoryProductsQuery(filters);
  const products = useAppSelector(
    getProductsSelectors(filters).selectAllProducts
  );

  const { data: cart, isLoading: cartLoading } = useGetCartQuery(
    currentUser?._id || "",
    { skip: !currentUser }
  );

  useEffect(() => {
    console.log(productsFetching);
  }, [productsFetching]);

  const { data: bookmarks } = useGetBookmarksQuery(currentUser?._id || "", {
    skip: !currentUser
  });

  let content;

  const productsWithQuantityBookmarks = useMemo(
    () =>
      products?.map((product) => ({
        ...product,
        quantity: cart?.entities[product._id]?.quantity || 0,
        bookmarks: !!bookmarks?.entities[product._id]
      })),
    [products, bookmarks, cart]
  );

  if (!productsWithQuantityBookmarks || productsFetching) {
    content = (
      <>
        {placeholderProducts.map((index) => (
          <ItemPlaceholder key={index} />
        ))}
      </>
    );
  } else {
    content = (
      <>
        {productsWithQuantityBookmarks.map((product) => (
          <>
            <CatalogItem key={product._id} product={product} />
          </>
        ))}
      </>
    );
  }

  return (
    <div className={styles.list}>
      <Link
        to={`/catalog/${type}/new`}
        className={`${styles.btn} ${styles.new__link}`}
      >
        Добавить продукт
      </Link>
      {content}
    </div>
  );
};

export default CatalogList;
