import React, { useMemo, useState } from "react";
import Input from "../../components/common/form/input/input";
import { useAppSelector } from "../../redux/hooks";
import { formatPrice } from "../../utils/formatPrice";
import { selectCurrentUser } from "../auth/userSlice";
import styles from "./cart.module.scss";
import { getCartSelectors } from "./cartSlice";

const CartSummary = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const cartItems = useAppSelector(
    getCartSelectors(currentUser?._id || "").selectAllCart
  );

  const discount = 20000;
  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
        0
      ),
    [cartItems]
  );

  const [promo, setPromo] = useState("");

  const handleChange = ({ value }: { value: string }) => {
    setPromo(value);
  };

  return (
    <div className={styles.payment}>
      <h2 className={styles.payment__title}>Итого</h2>
      <ul className={styles.payment__table}>
        <li className={styles.subtotal}>
          <p>Всего за товары</p>
          <p>{formatPrice(total)} </p>
        </li>
        <li className={styles.subtotal}>
          <p>Скидка</p>
          <p>-{formatPrice(discount)}</p>
        </li>
        <li className={styles.subtotal}>
          <p>Доставка</p>
          <p>Бесплатно</p>
        </li>
        <li className={styles.total}>
          <p>Всего к оплате</p>
          <p>{formatPrice(total - discount)}</p>
        </li>
      </ul>
      <div className={styles.promo_input}>
        <Input
          label="Промокод"
          name="promo"
          value={promo}
          onChange={handleChange}
        />
      </div>
      <button className={styles.promo_btn}>Применить</button>
      <button className={styles.payment__btn}>Перейти к оформлению</button>
    </div>
  );
};
export default CartSummary;
