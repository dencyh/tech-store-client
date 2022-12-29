import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../components/buttons/addToCartButton/addToCartButton";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";

import styles from "./bookmarks.module.scss";

import { useCart } from "../../hooks/useCart";
import { useBookmark } from "../../hooks/useBookmark";
import Rating from "../reviews/rating";

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

  const { handleBookmarks } = useBookmark(product);

  const { updateQuantity, cartProduct } = useCart(product);

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
        <Rating value={3.5} />
      </div>

      <AddToCartButton
        onAdd={updateQuantity("increment")}
        onRemove={updateQuantity("decrement")}
        inCart={!!cartProduct}
      />
      <button
        className={styles.cancel_btn}
        onClick={handleBookmarks("remove")}
        aria-label="remove-bookmark"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </li>
  );
};
export default BookmarksItem;
