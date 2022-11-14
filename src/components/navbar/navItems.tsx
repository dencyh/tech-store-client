import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import {
  faUser,
  faCartShopping,
  faCube
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuItems = [
  { text: "Orders", to: "orders", icon: faCube },
  { text: "Profile", to: "profile", icon: faUser },
  { text: "Cart", to: "cart", icon: faCartShopping }
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
