import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useBookmark } from "../../hooks/useBookmark";
import styles from "./productMin.module.scss";
import StarRating from "../reviews/starRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

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

  const { updateQuantity, cartProduct } = useCart(product);

  const [btnIcon, setBtnIcon] = useState(
    <FontAwesomeIcon icon={faCircleCheck} />
  );

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
      </Link>
      <div className={styles.pricebox}>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <button
          className={cn(styles.btn, cartProduct && styles.in_cart)}
          aria-label="buy button"
          onClick={
            cartProduct
              ? updateQuantity("decrement")
              : updateQuantity("increment")
          }
          onMouseOver={() =>
            setBtnIcon(<FontAwesomeIcon icon={faCircleXmark} />)
          }
          onMouseLeave={() =>
            setBtnIcon(<FontAwesomeIcon icon={faCircleCheck} />)
          }
        >
          {cartProduct ? btnIcon : <FontAwesomeIcon icon={faShoppingCart} />}
        </button>
      </div>
    </div>
  );
};

export default ProductMin;
