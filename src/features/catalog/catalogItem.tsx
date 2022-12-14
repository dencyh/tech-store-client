import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";
import QuantityButton from "../../components/buttons/quantityButton/quantityButton";
import KeyFeatures from "./keyFeatures";
import BookmarkButton from "../../components/buttons/bookmarkButton/bookmarkButton";
import AddToCartButton from "../../components/buttons/addToCartButton/addToCartButton";
import PlaceholderImg from "../../assets/img/placeholder-camera-sm.webp";
import { useCart } from "../../hooks/useCart";
import { useBookmark } from "../../hooks/useBookmark";
import styles from "./catalog.module.scss";
import cn from "classnames";

interface Props {
  product: Product & { quantity: number; bookmarks: boolean };
}

const CatalogItem: React.FC<Props> = ({ product }) => {
  const { updateQuantity, cartProduct } = useCart(product);
  const { handleBookmarks } = useBookmark(product);

  const image = product.imagePaths ? product.imagePaths[0] : "";

  const imageSrc = image
    ? process.env.REACT_APP_API_URL + "/" + image
    : PlaceholderImg;

  const productLink =
    "/products/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  return (
    <div className={styles.item}>
      <div className={cn(styles.img, !image ? styles.img_sm : "")}>
        <img src={imageSrc} alt={product.name} />
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

        {!cartProduct ? (
          <AddToCartButton
            onAdd={updateQuantity("increment")}
            onRemove={updateQuantity("decrement")}
            inCart={!!cartProduct}
          />
        ) : (
          <div className={styles.btn__container}>
            <QuantityButton
              quantity={cartProduct.quantity}
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
      </div>
    </div>
  );
};

export default CatalogItem;
