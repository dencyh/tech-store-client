import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";
import TextInput from "../../components/common/form/textInput/textInput";
import Layout from "../../pages/layout";
import styles from "./cart.module.scss";
import CartSummary from "./cartSummary";
import CartItem from "./cartItem";
import {
  TEST_USER_ID,
  useGetCartProductsQuery,
  // useGetCartProductsQuery,
  useGetCartQuery
} from "../api/apiSlice";

interface Props {}

const Cart: React.FC<Props> = () => {
  const { data: cart } = useGetCartProductsQuery({ userId: TEST_USER_ID });

  console.log(cart);

  if (!cart?.productsInCart) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <ul className={styles.products__list}>
          {cart.productsInCart.map((cartItem) => (
            <CartItem
              key={cartItem.productId._id}
              product={cartItem.productId}
              qauntity={cartItem.quantity}
            />
          ))}
        </ul>
      </div>
      <CartSummary />
    </div>
  );
};
export default Cart;
