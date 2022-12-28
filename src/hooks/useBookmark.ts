import { useMemo } from "react";
import { selectCurrentUser } from "../features/user/userSlice";
import {
  getBookmarksSelectors,
  useGetBookmarksQuery,
  useUpdateBookmarksMutation
} from "../features/bookmarks/bookmarksSlice";
import { useAppSelector } from "../redux/hooks";
import { Product } from "../types/products/core.product";

export const useBookmark = (product: Product) => {
  const currentUser = useAppSelector(selectCurrentUser);
  useGetBookmarksQuery(currentUser?._id || "", {
    skip: !currentUser
  });
  const bookmarks = useAppSelector(
    getBookmarksSelectors(currentUser?._id || "").selectAllBookmarks
  );

  const [updateBookmarks] = useUpdateBookmarksMutation();

  const inBookmarks = useMemo(
    () =>
      bookmarks.find((bookmarkProduct) => bookmarkProduct._id === product._id),
    [bookmarks]
  );

  const handleBookmarks = (action: "add" | "remove") => {
    return function () {
      if (!bookmarks) return;
      let newList = [...bookmarks].map((product) => product._id);

      switch (action) {
        case "add": {
          newList.push(product._id);
          break;
        }
        case "remove": {
          newList = newList.filter((productId) => productId !== product._id);
          break;
        }
      }
      currentUser
        ? updateBookmarks({ userId: currentUser._id, products: newList })
        : console.log("local bookmark");
    };
  };

  return { handleBookmarks, inBookmarks };
};
