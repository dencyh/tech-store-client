import React from "react";
import { TEST_USER_ID } from "../api/apiSlice";
import { useGetBookmarksQuery } from "./bookmarksSlice";

interface Props {}
const Bookmarks: React.FC<Props> = () => {
  const { data: bookmarks } = useGetBookmarksQuery({ userId: TEST_USER_ID });

  console.log(bookmarks);
  return (
    <div>
      <h1>Bookmarks</h1>
    </div>
  );
};
export default Bookmarks;
