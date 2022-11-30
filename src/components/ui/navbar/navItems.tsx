import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import {
  faUser,
  faCartShopping,
  faCube,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectAllProducts,
  selectCartQuantity
} from "../../../features/cart/cartSlice";
import { TEST_USER_ID, useGetCartQuery } from "../../../features/api/apiSlice";
import { Cart } from "../../../types/cart";

const menuItems = [
  { text: "Корзина", to: "/cart", icon: faCartShopping },
  { text: "Избранное", to: "/bookmarks", icon: faHeart },
  { text: "Заказы", to: "/orders", icon: faCube },
  { text: "Профиль", to: "/profile", icon: faUser }
];

const NavItems = () => {
  const { data: cart, isLoading } = useGetCartQuery({
    userId: TEST_USER_ID
  });

  const cartQuantity = useMemo(() => {
    if (cart) {
      const quantity = [...cart.productsInCart].reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      return quantity;
    }
    return 0;
  }, [cart]);

  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.text}>
          <Link to={item.to} className={styles.list__item}>
            {item.icon ? <FontAwesomeIcon icon={item.icon} /> : ""}
            {item.to === "/cart" && cartQuantity > 0 && (
              <span className={styles.cart_count}>{cartQuantity}</span>
            )}
            <div className="text-xs">{item.text}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
