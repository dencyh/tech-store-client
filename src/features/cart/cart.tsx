import React from "react";
import styles from "./cart.module.scss";
import CartSummary from "./cartSummary";
import CartItem from "./cartItem";
import { selectLocalCart, getCartSelectors } from "./cartSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../user/userSlice";
import Loader from "../../components/loader/loader";

const Cart = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const localCart = useAppSelector(selectLocalCart);
  const cart = useAppSelector(
    getCartSelectors(currentUser?._id || "").selectAllCart
  );

  if (!cart)
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  return (
    <>
      <h1 className={styles.title}>Корзина</h1>
      <div className={styles.container}>
        <div className={styles.products}>
          <ul className={styles.products__list}>
            {cart.map((cartItem) => (
              <CartItem
                key={cartItem.product._id}
                product={cartItem.product}
                quantity={cartItem.quantity}
              />
            ))}
          </ul>
        </div>
        <CartSummary />
      </div>
    </>
  );
};
export default Cart;
