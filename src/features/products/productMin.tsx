import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useBookmark } from "../../hooks/useBookmark";
import styles from "./productMin.module.scss";
import StarRating from "../reviews/starRating";

interface Props {
  product: Product;
}
const ProductMin: React.FC<Props> = ({ product }) => {
  const imgUrl = process.env.REACT_APP_API_URL + "/" + product.imagePaths[0];

  const productLink =
    "/products/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  const { handleBookmarks } = useBookmark(product);

  const { updateQuantity, cartProduct } = useCart(product);

  return (
    <div className={styles.item}>
      <Link className={styles.link} to={productLink}>
        <div className={styles.img}>
          <img src={imgUrl} alt={product.name} />
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.stars}>
          <StarRating value={3} />
        </div>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </Link>
    </div>
  );
};
export default ProductMin;
