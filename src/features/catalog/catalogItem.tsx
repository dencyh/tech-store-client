import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CartItem,
  getCartSelectors,
  productDecrement,
  productIncrement,
  selectLocalCart,
  useGetCartQuery,
  useUpdateCartMutation
} from "../cart/cartSlice";
import QuantityButton from "../../components/ui/quantityButton/quantityButton";
import KeyFeatures from "./keyFeatures";
import {
  getBookmarksSelectors,
  useUpdateBookmarksMutation
} from "../bookmarks/bookmarksSlice";
import BookmarkButton from "../../components/ui/bookmarkButton/bookmarkButton";
import store from "../../redux/store";
import { selectCurrentUser } from "../auth/userSlice";
import AddToCartButton from "../../components/ui/addToCartButton/addToCartButton";
import PlaceholderImg from "../../assets/img/placeholder-camera-sm.png";
import { useCart } from "../../hooks/useCart";

interface Props {
  product: Product & { quantity: number; bookmarks: boolean };
}

const CatalogItem: React.FC<Props> = ({ product }) => {
  const currentUser = useAppSelector(selectCurrentUser);

  const localCart = useAppSelector(selectLocalCart);

  const [updateBookmarks] = useUpdateBookmarksMutation();

  const bookmarks = useAppSelector(
    getBookmarksSelectors(currentUser?._id || "").selectAllBookmarks
  );

  const { data: cart } = useGetCartQuery(currentUser?._id || "");

  const quantity = currentUser
    ? product.quantity
    : localCart.entities[product._id]?.quantity || 0;

  const handleBookmarks = useCallback(
    (action: "add" | "remove") => {
      return function () {
        if (!bookmarks) return;
        let newList = [...bookmarks].map((product) => product._id);

        switch (action) {
          case "add": {
            newList.push(product._id);
            break;
          }
          case "remove": {
            newList = newList.filter((productId) => productId !== product._id);
            break;
          }
        }
        currentUser
          ? updateBookmarks({ userId: currentUser._id, products: newList })
          : console.log("local bookmark");
      };
    },
    [bookmarks, product, currentUser]
  );

  const { updateQuantity } = useCart(product);

  const image = product.imagePaths ? product.imagePaths[0] : "";

  const url = image
    ? process.env.REACT_APP_API_URL + "/" + image
    : PlaceholderImg;

  const productLink =
    "/products/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  return (
    <div className={styles.item}>
      <div className={`${styles.img} ${!image ? styles.img_sm : ""}`}>
        <img src={url} alt={product.name} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>
          <Link className={styles.link} to={productLink}>
            {product.name}
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

        {quantity < 1 ? (
          <AddToCartButton
            onAdd={updateQuantity("increment")}
            onRemove={updateQuantity("decrement")}
            inCart={!!cart?.entities[product._id]}
          />
        ) : (
          <div className={styles.btn__container}>
            <QuantityButton
              quantity={quantity}
              onIncrement={updateQuantity("increment")}
              onDecrement={updateQuantity("decrement")}
            />
          </div>
        )}

        <BookmarkButton
          inBookmarks={product.bookmarks}
          onAdd={handleBookmarks("add")}
          onRemove={handleBookmarks("remove")}
        />

        {/* <div className={styles.additional_info}> */}
        {/* <p>В наличии</p> */}
        {/* <p>Доставка 5-7 дней</p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CatalogItem;
