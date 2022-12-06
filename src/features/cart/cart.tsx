import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import styles from "./cart.module.scss";
import CartSummary from "./cartSummary";
import CartItem from "./cartItem";
import { apiSlice } from "../api/apiSlice";
import {
  selectCartResult,
  selectLocalCart,
  useGetProductsByIdsQuery,
  getCartSelectors
} from "./cartSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, selectUser } from "../auth/userSlice";

const Cart = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const localCart = useAppSelector(selectLocalCart);
  const cart = useAppSelector(
    getCartSelectors(currentUser?._id || "").selectAllCart
  );

  // if (cart) {
  //   console.log("↓".repeat(50), "LOCAL");
  //   console.log(localCart);

  //   console.log("↓".repeat(50), "API");
  //   console.log(cart);
  // }

  if (!cart) return <Spinner text="Loading cart" />;
  return (
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
  );
};
export default Cart;
