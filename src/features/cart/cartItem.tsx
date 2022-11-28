import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./cart.module.scss";

interface Props {}
const CartItem: React.FC<Props> = () => {
  return (
    <li className={styles.list__item}>
      <div className={styles.img}>
        <img
          src="http://localhost:8080/static/product/f060faad-64fc-4f6c-9fe8-7c16a452eb84.png"
          alt=""
        />
      </div>
      <div className={styles.info__container}>
        <div>
          <h3 className={styles.product__title}>
            Apple 16.2&quot; MacBook Pro with M1 Max Chip
          </h3>
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
              <div>{1}</div>
              <button className={styles.quantity__btn}>+</button>
            </div>
            <p className={styles.price__signle}>120 000 Р</p>
          </div>
          <div className={styles.product__total}>
            <p>Итог:</p>
            <p>240 000 P</p>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
