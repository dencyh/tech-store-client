import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
  const { data: products } = useGetCartProductsQuery({
    userId: TEST_USER_ID,
    ids: cart?.productsInCart.map((item) => item.productId) || []
  });
  console.log(products);

  if (!products) return <div>Loading...</div>;
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.products}>
          <ul className={styles.products__list}>
            {products.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </ul>
        </div>
        <CartSummary />
      </div>
    </Layout>
  );
};
export default Cart;
