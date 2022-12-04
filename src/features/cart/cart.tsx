import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./cart.module.scss";
import CartSummary from "./cartSummary";
import CartItem from "./cartItem";
import { TEST_USER_ID } from "../api/apiSlice";
import {
  selectCartResult,
  selectLocalCart,
  useGetCartProductsQuery
} from "./cartSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, selectUser } from "../auth/userSlice";

const Cart = () => {
  // const { data: cart } = useGetCartProductsQuery({ userId: TEST_USER_ID });
  const currentUser = useAppSelector(selectCurrentUser);
  // console.log(currentUser);
  const cart = useAppSelector(selectCartResult(currentUser?._id || "")).data;
  // console.log(cart);

  // const localCart = useAppSelector(selectLocalCart);
  // console.log(localCart);

  if (!cart?.productsInCart) return <Spinner text="Loading cart" />;
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <ul className={styles.products__list}>
          {cart.productsInCart.map((cartItem) => (
            <CartItem
              key={cartItem.productId._id}
              product={cartItem.productId}
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
