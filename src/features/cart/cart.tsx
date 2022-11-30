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
  useGetCartQuery
} from "../api/apiSlice";

interface Props {}

const Cart: React.FC<Props> = () => {
  const { data: cart } = useGetCartQuery({ userId: TEST_USER_ID });

  if (!cart?.productsInCart) return <div>Loading...</div>;
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.products}>
          <ul className={styles.products__list}>
            {cart.productsInCart.map((product) => (
              <CartItem key={product.productId} productInCart={product} />
            ))}
          </ul>
        </div>
        <CartSummary />
      </div>
    </Layout>
  );
};
export default Cart;
