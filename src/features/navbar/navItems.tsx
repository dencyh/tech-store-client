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
import {
  selectAllProducts,
  selectCart,
  useGetCartQuery
} from "../cart/cartSlice";
import { TEST_USER_ID } from "../api/apiSlice";
import Auth from "../auth/auth";
import { useAppSelector } from "../../redux/hooks";
import { selectLoggedUser } from "../auth/userSlice";

const menuItems = [
  { text: "Корзина", to: "/cart", icon: faCartShopping },
  { text: "Избранное", to: "/bookmarks", icon: faHeart },
  { text: "Заказы", to: "/orders", icon: faCube },
  { text: "Профиль", to: "/profile", icon: faUser }
];

const NavItems = () => {
  const currentUser = useAppSelector(selectLoggedUser);
  const localCart = useAppSelector(selectAllProducts);
  const cart = useAppSelector(selectCart);
  // || {
  //   userId: null,
  //   productsInCart: localCart
  // };
  console.log(cart);

  if (!cart) {
    console.log(localCart);
  }

  const cartQuantity = 0;
  // TODO move into selector in slice
  // const cartQuantity = useMemo(() => {
  //   if (cart) {
  //     const quantity = Object.keys(cart.entities).reduce(
  //       (acc, key) => acc + cart.entities[key].quantity,
  //       0
  //     );
  //     return quantity;
  //   }
  //   return 0;
  // }, [cart]);

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
