import {
  faCross,
  faCrosshairs,
  faStar,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "../../components/ui/bookmarkButton/bookmarkButton";
import AddToCartButton from "../../components/ui/addToCartButton/addToCartButton";
import { useAppSelector } from "../../redux/hooks";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { selectCurrentUser } from "../auth/userSlice";
import {
  CartItem,
  getCartSelectors,
  useGetCartQuery,
  useUpdateCartMutation
} from "../cart/cartSlice";
import styles from "./bookmarks.module.scss";
import {
  getBookmarksSelectors,
  useUpdateBookmarksMutation
} from "./bookmarksSlice";

interface Props {
  product: Product;
}
const BookmarksItem: React.FC<Props> = ({ product }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const imgUrl = process.env.REACT_APP_API_URL + "/" + product.imagePaths[0];

  const [updateBookmarks] = useUpdateBookmarksMutation();
  const [updateCart] = useUpdateCartMutation();

  const { data: cart } = useGetCartQuery(currentUser?._id || "");
  const cartItems = useAppSelector(
    getCartSelectors(currentUser?._id || "").selectAllCart
  );
  const bookmarks = useAppSelector(
    getBookmarksSelectors(currentUser?._id || "").selectAllBookmarks
  );

  const productLink =
    "/products/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  const handleRemoveBookmark = () => {
    if (!bookmarks) return;
    let newList = [...bookmarks]
      .filter((item) => item._id !== product._id)
      .map((item) => item._id);

    currentUser
      ? updateBookmarks({ userId: currentUser._id, products: newList })
      : console.log("add local");
  };

  const handleQuantityUpdate = (action: "increment" | "decrement") => {
    return function () {
      if (!cart) return;
      let newCart: CartItem[] = [...cartItems];
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
      }
      currentUser
        ? updateCart({ userId: currentUser._id, products: newCart })
        : console.log("local cart action");
    };
  };

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={productLink}>
        <div className={styles.img}>
          <img src={imgUrl} alt={product.name} />
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </Link>
      <div className={styles.rating}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>

      <AddToCartButton
        onAdd={handleQuantityUpdate("increment")}
        onRemove={handleQuantityUpdate("decrement")}
        inCart={!!cart?.entities[product._id]}
      />
      <button
        className={styles.cancel_btn}
        onClick={handleRemoveBookmark}
        aria-label="remove-bookmark"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </li>
  );
};
export default BookmarksItem;
