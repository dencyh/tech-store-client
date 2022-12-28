import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/ui/spinner/spinner";
import { useAppSelector } from "../../redux/hooks";
import { getConfigOptions } from "../../utils/findDiff";
import { formatPrice } from "../../utils/formatPrice";
import Reviews from "../reviews/reviews";
import styles from "./product.module.scss";
import {
  getProductsSelectors,
  useGetCategoryProductsQuery,
  useGetProductQuery
} from "./productSlice";
import { configKeys } from "../../utils/configKeys";
import Config from "./config";
import Benefits from "./benefits";
import imgPlaceholder from "../../assets/img/placeholder-camera-sm.png";
import Specs from "./specs";
import AddToCartButton from "../../components/buttons/addToCartButton/addToCartButton";
import BookmarkButton from "../../components/buttons/bookmarkButton/bookmarkButton";
import { useCart } from "../../hooks/useCart";
import QuantityButton from "../../components/buttons/quantityButton/quantityButton";
import { Product as ProductType } from "../../types/products/core.product";
import { useBookmark } from "../../hooks/useBookmark";
import Loader from "../../components/loader/loader";

const baseImageUrl = process.env.REACT_APP_API_URL + "/";

const Product = () => {
  const { id } = useParams();
  if (!id) return null;

  const { data: product, isLoading, isSuccess } = useGetProductQuery(id);

  const { productInCart, updateQuantity } = useCart(
    product || ({} as ProductType)
  );

  const { handleBookmarks, inBookmarks } = useBookmark(
    product || ({} as ProductType)
  );

  useGetCategoryProductsQuery(
    { name: product?.name || "" },
    {
      skip: !product
    }
  );
  const variants = useAppSelector(
    getProductsSelectors({
      name: product?.name || ""
    }).selectAllProducts
  );
  const config = getConfigOptions(
    variants,
    configKeys[product?.type || "default"]
  );

  const [currentImage, setCurrentImage] = useState(imgPlaceholder);

  useEffect(() => {
    if (product) {
      setCurrentImage(baseImageUrl + product?.imagePaths[0]);
    }
  }, [product]);

  const handleImageSelect = (path: string) => {
    setCurrentImage(path + ".png");
  };

  let content;

  if (isLoading) {
    content = content = (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  } else if (isSuccess) {
    const minRegExp = /.+(?=(.png$))/;
    const minImages = product.imagePaths.map((img) => {
      return baseImageUrl + img.match(minRegExp)?.[0];
    });

    content = (
      <>
        {/* <div>Ноутбуки &gt; Apple</div> */}
        <div className={styles.inner_wrapper}>
          <div className={styles.side_image_container}>
            {minImages.map((img) => (
              <div
                className={`${styles.side_image} ${
                  currentImage.includes(img) ? styles.active : ""
                }`}
                key={img}
                aria-label="image-select"
                onClick={() => handleImageSelect(img)}
              >
                <img src={img + ".min.png"} alt="gallery-image" />
              </div>
            ))}
          </div>

          <div className={styles.main_image}>
            <img src={currentImage} alt={product.name} />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.reviews}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className={styles.reviews__star}
                />{" "}
                <span>4.9</span>
              </span>{" "}
              <span className={styles.reviews__count}>20 отзывов</span>{" "}
            </p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <Benefits />
            <div className={styles.btn_container}>
              {!productInCart ? (
                <AddToCartButton
                  onAdd={updateQuantity("increment")}
                  inCart={false}
                />
              ) : (
                <div className={styles.btn__container}>
                  <QuantityButton
                    quantity={productInCart.quantity}
                    onIncrement={updateQuantity("increment")}
                    onDecrement={updateQuantity("decrement")}
                  />
                </div>
              )}

              <BookmarkButton
                inBookmarks={!!inBookmarks}
                onAdd={handleBookmarks("add")}
                onRemove={handleBookmarks("remove")}
              />
            </div>

            {/* <p>Доставка 5-7 дней</p> */}
            <div className={styles.configuration}>
              <h3 className={styles.configuration__title}>Конфигурация:</h3>
              <Config config={config} />
            </div>
          </div>
        </div>
        <div className={styles.specs}>
          <h3 className={styles.specs_title}>Характеристики</h3>
          <Specs product={product} />
        </div>
        <Reviews />
      </>
    );
  }

  return <div>{content}</div>;
};

export default Product;
