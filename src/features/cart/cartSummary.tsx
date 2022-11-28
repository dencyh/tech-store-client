import React from "react";
import styles from "./cart.module.scss";

interface Props {}
const CartSummary: React.FC<Props> = () => {
  return (
    <div className={styles.payment}>
      <h2 className={styles.payment__title}>Итого</h2>
      <ul className={styles.payment__table}>
        <li className={styles.subtotal}>
          <p>Всего за товары</p>
          <p>360000</p>
        </li>
        <li className={styles.subtotal}>
          <p>Скидка</p>
          <p>20000</p>
        </li>
        <li className={styles.subtotal}>
          <p>Доставка</p>
          <p>Бесплатно</p>
        </li>
        <li className={styles.total}>
          <p>Всего к оплате</p>
          <p>340 000 P</p>
        </li>
      </ul>
      <button className={styles.payment__btn}>Перейти к оформлению</button>
    </div>
  );
};
export default CartSummary;
