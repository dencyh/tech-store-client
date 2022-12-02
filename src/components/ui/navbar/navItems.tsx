import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import {
  faUser,
  faCartShopping,
  faCube,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetCartQuery } from "../../../features/cart/cartSlice";
import { TEST_USER_ID, USER_IN } from "../../../features/api/apiSlice";
import Auth from "../../../features/auth/auth";

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
            {item.to === "/profile" && !USER_IN ? (
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
                {item.to === "/cart" && cartQuantity > 0 && (
                  <span className={styles.cart_count}>{cartQuantity}</span>
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
