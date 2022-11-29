import React from "react";
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

const menuItems = [
  { text: "Корзина", to: "/cart", icon: faCartShopping },
  { text: "Избранное", to: "/bookmarks", icon: faHeart },
  { text: "Заказы", to: "/orders", icon: faCube },
  { text: "Профиль", to: "/profile", icon: faUser }
];

const NavItems = () => {
  const quantity = useAppSelector(selectCartQuantity);
  const all = useAppSelector(selectAllProducts);
  console.log(all);

  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.text}>
          <Link to={item.to} className={styles.list__item}>
            {item.icon ? <FontAwesomeIcon icon={item.icon} /> : ""}
            {item.to === "/cart" && quantity > 0 && (
              <span className={styles.cart_count}>{quantity}</span>
            )}
            <div className="text-xs">{item.text}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
