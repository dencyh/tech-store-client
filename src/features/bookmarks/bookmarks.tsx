import React from "react";
import { Spinner } from "../../components/ui/spinner/spinner";
import { TEST_USER_ID } from "../api/apiSlice";
import BookmarksItem from "./bookmarksItem";
import { useGetBookmarksQuery } from "./bookmarksSlice";
import styles from "./bookmarks.module.scss";

interface Props {}
const Bookmarks: React.FC<Props> = () => {
  const { data: bookmarks, isLoading } = useGetBookmarksQuery({
    userId: TEST_USER_ID
  });

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      <ul className={styles.list}>
        {bookmarks?.products.map((product) => (
          <BookmarksItem key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};
export default Bookmarks;
