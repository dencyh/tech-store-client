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

const menuItems = [
  { text: "Заказы", to: "/orders", icon: faCube },
  { text: "Профиль", to: "/profile", icon: faUser },
  { text: "Избранное", to: "/bookmarks", icon: faHeart },
  { text: "Корзина", to: "/cart", icon: faCartShopping }
];

const NavItems = () => {
  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.text}>
          <Link to={item.to} className={styles.list__item}>
            {item.icon ? <FontAwesomeIcon icon={item.icon} /> : ""}
            <div className="text-xs">{item.text}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
