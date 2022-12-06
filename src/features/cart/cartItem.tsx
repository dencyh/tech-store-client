import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import CartQuantity from "../../components/ui/cartQuantity/cartQuantity";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { selectCurrentUser } from "../auth/userSlice";
import styles from "./cart.module.scss";
import {
  getCartSelectors,
  useGetCartQuery,
  useUpdateCartMutation
} from "./cartSlice";

interface Props {
  product: Product;
  quantity: number;
}

const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [updateCart, { isLoading, isError, isSuccess }] =
    useUpdateCartMutation();

  const imgUrl = process.env.REACT_APP_API_URL + "/" + product.imagePaths[0];

  const { data: cart } = useGetCartQuery(currentUser?._id || "");
  const cartItems = useAppSelector(
    getCartSelectors(currentUser?._id || "").selectAllCart
  );

  const handleQuantityUpdate = (
    action: "increment" | "decrement" | "delete"
  ) => {
    return function () {
      if (!cart || !cartItems) return;
      let newCart = [...cartItems];
      const inCart = cart.entities[product._id];
      switch (action) {
        case "increment": {
          if (!inCart) {
            newCart.push({ product: product, quantity: 1 });
          } else {
            newCart = cartItems.map((cartItem) =>
              cartItem.product._id === product._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }
          break;
        }
        case "decrement": {
          if (inCart && inCart.quantity === 1) {
            newCart = newCart.filter(
              (cartItem) => cartItem.product._id !== product._id
            );
          } else {
            newCart = newCart.map((cartItem) =>
              cartItem.product._id === product._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
          }
          break;
        }
        case "delete": {
          newCart = cartItems.filter(
            (cartItem) => cartItem.product._id !== product._id
          );
          break;
        }
      }
      currentUser
        ? updateCart({ userId: currentUser._id, products: newCart })
        : console.log("local cart action");
    };
  };

  if (!product) return <div>Loading...</div>;
  return (
    <li className={styles.list__item}>
      <div className={styles.img}>
        <img src={imgUrl} alt={product.name} />
      </div>
      <div className={styles.info__container}>
        <div>
          <Link className={styles.link} to="/">
            <h3 className={styles.product__title}>{product.name}</h3>
          </Link>
          <p className={styles.availability}>В наличии</p>
          <div className={styles.product__controls}>
            <button
              className={styles.product__btn}
              aria-label="favorite-button"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.product__icon}
              />
              Посмотреть позже
            </button>
            <button
              className={styles.product__btn}
              onClick={handleQuantityUpdate("delete")}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.product__icon}
                aria-label="delete-button"
              />
              Удалить
            </button>
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.price__info}>
            <CartQuantity
              quantity={quantity}
              onIncrement={handleQuantityUpdate("increment")}
              onDecrement={handleQuantityUpdate("decrement")}
            />
            <p className={styles.price__signle}>{formatPrice(product.price)}</p>
          </div>
          <div className={styles.product__total}>
            <p>Итог:</p>
            <p>{formatPrice(quantity * product.price)}</p>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
