import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
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
import { useGetReviewsQuery } from "../reviews/reviewsSlice";

const baseImageUrl = process.env.REACT_APP_API_URL + "/";

const Product = () => {
  const { id } = useParams();
  if (!id) return null;

  const { data: product, isLoading, isSuccess } = useGetProductQuery(id);
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
        <Spinner text="Loading" />
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
            <button className={styles.btn}>
              <span className={styles.btn__icon}>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span>Добавить в корзину</span>
            </button>

            <button className={styles.bookmark}>
              <span className={styles.btn__icon}>
                <FontAwesomeIcon icon={faBookmark} />
              </span>
              Посмотреть позже
            </button>
            {/* <p>Доставка 5-7 дней</p> */}
            <div className={styles.configuration}>
              <h3>Конфигурация</h3>
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
