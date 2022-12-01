import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import CartQuantity from "../../components/ui/cartQuantity/cartQuantity";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { TEST_USER_ID } from "../api/apiSlice";
import styles from "./cart.module.scss";
import { useGetCartQuery, useUpdateCartMutation } from "./cartSlice";

interface Props {
  product: Product;
  quantity: number;
}

const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const [updateCart, { isLoading, isError, isSuccess }] =
    useUpdateCartMutation();
  const { data: cart, isLoading: cartLoading } = useGetCartQuery({
    userId: TEST_USER_ID
  });

  const imgUrl = process.env.REACT_APP_API_URL + "/" + product.imagePaths[0];

  const handleQuantityUpdate = (
    action: "increment" | "decrement" | "delete"
  ) => {
    return function () {
      if (!cart) return;
      const { productsInCart } = cart;

      let newCart = [...productsInCart];

      const inCart = productsInCart.find(
        (cartItem) => cartItem.productId === product._id
      );

      switch (action) {
        case "increment": {
          if (!inCart) {
            newCart.push({ productId: product._id, quantity: 1 });
          } else {
            newCart = productsInCart.map((cartItem) =>
              cartItem.productId === product._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }
          break;
        }
        case "decrement": {
          if (inCart && inCart.quantity === 1) {
            newCart = productsInCart.filter(
              (cartItem) => cartItem.productId !== product._id
            );
          } else {
            newCart = productsInCart.map((cartItem) =>
              cartItem.productId === product._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
          }
          break;
        }
        case "delete": {
          newCart = productsInCart.filter(
            (cartItem) => cartItem.productId !== product._id
          );
          break;
        }
      }
      updateCart({ userId: TEST_USER_ID, productsInCart: newCart });
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
            <button className={styles.product__btn}>
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.product__icon}
              />
              Посмотреть позже
            </button>
            <button className={styles.product__btn}>
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.product__icon}
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
