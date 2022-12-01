import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  productDecrement,
  ProductInCart,
  productIncrement,
  selectAllProducts,
  useGetCartQuery,
  useUpdateCartMutation
} from "../cart/cartSlice";
import { TEST_USER_ID } from "../api/apiSlice";
import QuantityButton from "../../components/ui/quantityButton/quantityButton";
import KeyFeatures from "./keyFeatures";

interface Props {
  product: Product & { quantity: number };
}

const CatalogItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const [updateCart, { isLoading, isError, isSuccess }] =
    useUpdateCartMutation();

  const { data: cart, isLoading: cartLoading } = useGetCartQuery({
    userId: TEST_USER_ID
  });

  const handleQuantityUpdate = (action: "increment" | "decrement") => {
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
      }
      updateCart({ userId: TEST_USER_ID, productsInCart: newCart });
    };
  };

  const image = product.imagePaths ? product.imagePaths[0] : "";

  const url = process.env.REACT_APP_API_URL + "/" + image;

  const productLink =
    "/products/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img src={url} alt={product.name} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>
          <Link className={styles.link} to={productLink}>
            {product.name} {product._id}
          </Link>
        </h3>
        <p className={styles.reviews}>
          <span>
            <FontAwesomeIcon icon={faStar} />
            4.9
          </span>{" "}
          <span>20 отзывов</span>{" "}
        </p>
        <KeyFeatures product={product} />
        <div className={styles.benefits}>
          <span className={styles.badge}>Бонусы</span>
          <span className={styles.badge}>Бесплатная доставка</span>
          <span className={styles.badge}>Доставка завтра</span>
        </div>
      </div>

      <div className={styles.pricebox}>
        <div className={styles.price}>
          <p className={styles.price_new}>{formatPrice(product.price)}</p>
          <p className={styles.price_old}>
            {formatPrice(product.price + 10000)}
          </p>
        </div>

        {product.quantity < 1 ? (
          <button
            className={styles.btn}
            onClick={handleQuantityUpdate("increment")}
          >
            <span className={styles.btn__icon}>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
            <span>В корзину</span>
          </button>
        ) : (
          <div className={styles.btn__container}>
            <QuantityButton
              quantity={product.quantity}
              onIncrement={handleQuantityUpdate("increment")}
              onDecrement={handleQuantityUpdate("decrement")}
            />
          </div>
        )}

        <button className={styles.bookmark}>
          <span className={styles.btn__icon}>
            <FontAwesomeIcon icon={faBookmark} />
          </span>
          Добавить в израбнное
        </button>
        <div>
          <p>В наличии</p>
          <p>Доставка 5-7 дней</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
