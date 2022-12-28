import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import {
  faUser,
  faCartShopping,
  faCube,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCartSelectors, selectLocalCartQuantity } from "../cart/cartSlice";
import Auth from "../user/auth";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../user/userSlice";

const menuItems = [
  { text: "Корзина", to: "/cart", icon: faCartShopping },
  { text: "Избранное", to: "/bookmarks", icon: faHeart },
  { text: "Профиль", to: "/profile", icon: faUser }
];

const NavItems = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const localCartQuantity = useAppSelector(selectLocalCartQuantity);

  const cartQuantity = useAppSelector(
    getCartSelectors(currentUser?._id || "").selectAllCart
  ).reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  const quantity = currentUser ? cartQuantity : localCartQuantity;

  const [showAuth, setShowAuth] = useState(false);

  const authRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleModal = (e: MouseEvent) => {
      if (authRef.current === e.target) {
        setShowAuth(false);
      }
    };

    document.addEventListener("mousedown", handleModal);

    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  }, []);

  return (
    <>
      {showAuth && <Auth authRef={authRef} />}
      <ul className={styles.list}>
        {menuItems.map((item) => (
          <li key={item.text}>
            {item.to === "/profile" && !currentUser ? (
              <button
                className={styles.list__item}
                onClick={() => setShowAuth(true)}
              >
                {item.icon ? <FontAwesomeIcon icon={item.icon} /> : ""}
                <div className="text-xs">{item.text}</div>
              </button>
            ) : (
              <Link to={item.to} className={styles.list__item}>
                <FontAwesomeIcon icon={item.icon} />
                {item.to === "/cart" && quantity > 0 && (
                  <span className={styles.cart_count}>{quantity}</span>
                )}
                <div className="text-xs">{item.text}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavItems;
