import React, { useMemo } from "react";
import { Spinner } from "../../components/ui/spinner/spinner";
import { getBookmarksSelectors, useGetBookmarksQuery } from "./bookmarksSlice";
import styles from "./bookmarks.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../user/userSlice";
import { formatPrice } from "../../utils/formatPrice";
import plural from "plural-ru";
import BookmarksItem from "./bookmarksItem";
import Loader from "../../components/loader/loader";

const Bookmarks = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { isLoading } = useGetBookmarksQuery(currentUser?._id || "", {
    skip: !currentUser?._id
  });

  const bookmarks = useAppSelector(
    getBookmarksSelectors(currentUser?._id).selectAllBookmarks
  );

  const count = bookmarks.length;
  const price = useMemo(
    () => bookmarks.reduce((acc, product) => acc + product.price, 0),
    [bookmarks]
  );

  if (isLoading)
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Избранное</h2>
      <div className={styles.section}>
        <ul className={styles.list}>
          {bookmarks.map((product) => (
            <BookmarksItem key={product._id} product={product} />
          ))}
        </ul>
        <div className={styles.summary}>
          <h3 className={styles.summary__count}>
            {plural(count, "%d продукт", "%d продукта", "%d продуктов")}
          </h3>
          <p className={styles.summary__price}>Сумма: {formatPrice(price)}</p>
          <button className={styles.btn}>Добавить в корзину </button>
        </div>
      </div>
    </div>
  );
};
export default Bookmarks;
