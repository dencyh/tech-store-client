import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import TextInput from "../../components/common/form/textInput/textInput";
import Layout from "../../pages/layout";
import styles from "./cart.module.scss";
import CartSummary from "./cartSummary";
import CartItem from "./cartItem";

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.products}>
          <ul className={styles.products__list}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </ul>
        </div>
        <CartSummary />
      </div>
    </Layout>
  );
};
export default Cart;
