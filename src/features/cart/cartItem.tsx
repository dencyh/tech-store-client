import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { useGetProductQuery } from "../api/apiSlice";
import styles from "./cart.module.scss";
import { ProductInCart } from "./cartSlice";

interface Props {
  product: Product;
  qauntity: number;
}

const CartItem: React.FC<Props> = ({ product, qauntity }) => {
  if (!product) return <div>Loading...</div>;

  const imgUrl = process.env.REACT_APP_API_URL + "/" + product.imagePaths[0];
  return (
    <li className={styles.list__item}>
      <div className={styles.img}>
        <img src={imgUrl} alt={product.name} />
      </div>
      <div className={styles.info__container}>
        <div>
          <Link className={styles.link} to="/">
            <h3 className={styles.product__title}>{product.name}</h3>
          </Link>
          <p className={styles.availability}>В наличии</p>
          <div className={styles.product__controls}>
            <button className={styles.product__btn}>
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.product__icon}
              />
              Посмотреть позже
            </button>
            <button className={styles.product__btn}>
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.product__icon}
              />
              Удалить
            </button>
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.price__info}>
            <div className={styles.quantity}>
              <button className={styles.quantity__btn}>−</button>
              <div>{qauntity}</div>
              <button className={styles.quantity__btn}>+</button>
            </div>
            <p className={styles.price__signle}>{formatPrice(product.price)}</p>
          </div>
          <div className={styles.product__total}>
            <p>Итог:</p>
            <p>{formatPrice(qauntity * product.price)}</p>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
