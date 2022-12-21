import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import { useAppSelector } from "../../redux/hooks";
import QuantityButton from "../../components/ui/quantityButton/quantityButton";
import KeyFeatures from "./keyFeatures";
import BookmarkButton from "../../components/ui/bookmarkButton/bookmarkButton";
import { selectCurrentUser } from "../auth/userSlice";
import AddToCartButton from "../../components/ui/addToCartButton/addToCartButton";
import PlaceholderImg from "../../assets/img/placeholder-camera-sm.png";
import { useCart } from "../../hooks/useCart";
import { useBookmark } from "../../hooks/useBookmark";
import styles from "./catalog.module.scss";

interface Props {
  product: Product & { quantity: number; bookmarks: boolean };
}

const CatalogItem: React.FC<Props> = ({ product }) => {
  const { updateQuantity, productInCart } = useCart(product);
  const { handleBookmarks } = useBookmark(product);

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

        {productInCart && productInCart.quantity < 1 ? (
          <AddToCartButton
            onAdd={updateQuantity("increment")}
            onRemove={updateQuantity("decrement")}
            inCart={!!productInCart}
          />
        ) : (
          <div className={styles.btn__container}>
            <QuantityButton
              quantity={productInCart?.quantity || 0}
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
