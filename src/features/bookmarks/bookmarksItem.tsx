import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "../../components/ui/bookmarkButton/bookmarkButton";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { TEST_USER_ID } from "../api/apiSlice";
import styles from "./bookmarks.module.scss";
import {
  useGetBookmarksQuery,
  useUpdateBookmarsMutation
} from "./bookmarksSlice";

interface Props {
  product: Product;
}
const BookmarksItem: React.FC<Props> = ({ product }) => {
  const imgUrl = process.env.REACT_APP_API_URL + "/" + product.imagePaths[0];

  const productLink =
    "/products/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  const [updateBooksmarks] = useUpdateBookmarsMutation();
  const { data: bookmarks } = useGetBookmarksQuery({
    userId: TEST_USER_ID
  });

  const handleBookmarks = (action: "add" | "remove") => {
    return function () {
      if (!bookmarks) return;
      let newProducts = [...bookmarks.products].map(
        (bookmarkItem) => bookmarkItem._id
      );

      switch (action) {
        case "add": {
          const isAdded = newProducts.find(
            (productId) => productId === product._id
          );
          if (isAdded) return;
          newProducts.push(product._id);
          break;
        }
        case "remove": {
          newProducts = newProducts.filter(
            (productId) => productId !== product._id
          );
          break;
        }
      }
      updateBooksmarks({ userId: TEST_USER_ID, products: newProducts });
    };
  };

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={productLink}>
        <div className={styles.img}>
          <img src={imgUrl} alt={product.name} />
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </Link>
      <div className={styles.rating}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
      <BookmarkButton
        inBookmarks={true}
        onAdd={() => undefined}
        onRemove={handleBookmarks("remove")}
      />
    </li>
  );
};
export default BookmarksItem;
