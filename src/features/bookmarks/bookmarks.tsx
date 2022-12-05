import React, { useEffect, useMemo } from "react";
import { Spinner } from "../../components/ui/spinner/spinner";
import { TEST_USER_ID } from "../api/apiSlice";
import BookmarksItem from "./bookmarksItem";
import {
  bookmarksAdapter,
  bookmarksApiSlice,
  getBookmarksSelectors,
  initialState,
  useGetBookmarksQuery
} from "./bookmarksSlice";
import styles from "./bookmarks.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../auth/userSlice";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

const Bookmarks = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetBookmarksQuery(currentUser?._id || "", {
    skip: !currentUser?._id
  });

  const bookmarks = useAppSelector(
    getBookmarksSelectors(currentUser?._id || "").selectAllBookmarks
  );
  console.log(bookmarks);

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      <ul className={styles.list}>
        {bookmarks.map((product) => (
          <BookmarksItem key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};
export default Bookmarks;
